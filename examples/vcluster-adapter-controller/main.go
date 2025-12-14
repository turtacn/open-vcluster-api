// Copyright (c) 2024 turtacn
// SPDX-License-Identifier: MIT

// Package main implements a production-ready vcluster adapter controller
// that integrates with loft-sh/vcluster for actual vcluster lifecycle management.
package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"k8s.io/apimachinery/pkg/runtime"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"

	"github.com/turtacn/open-vcluster-api/examples/vcluster-adapter-controller/controller"
	"github.com/turtacn/open-vcluster-api/examples/vcluster-adapter-controller/vclusteradapter"
)

var (
	scheme   = runtime.NewScheme()
	setupLog = ctrl.Log.WithName("setup")
)

func init() {
	utilruntime.Must(clientgoscheme.AddToScheme(scheme))
}

var (
	metricsAddr          = flag.String("metrics-addr", ":8080", "The address the metric endpoint binds to")
	healthAddr           = flag.String("health-addr", ":8081", "The address the health endpoint binds to")
	enableLeaderElection = flag.Bool("leader-elect", false, "Enable leader election for controller manager")
	kubeconfig           = flag.String("kubeconfig", "", "Path to kubeconfig file")
	namespace            = flag.String("namespace", "", "Namespace to watch (empty for all namespaces)")
	vclusterChartVersion = flag.String("vcluster-chart-version", "0.19.0", "vcluster Helm chart version")
	vclusterChartRepo    = flag.String("vcluster-chart-repo", "https://charts.loft.sh", "vcluster Helm chart repository")
)

func main() {
	flag.Parse()

	ctrl.SetLogger(zap.New(zap.UseDevMode(true)))

	// Get Kubernetes config
	config, err := getKubeConfig()
	if err != nil {
		setupLog.Error(err, "unable to get kubeconfig")
		os.Exit(1)
	}

	// Create controller manager
	mgr, err := ctrl.NewManager(config, ctrl.Options{
		Scheme:                 scheme,
		MetricsBindAddress:     *metricsAddr,
		HealthProbeBindAddress: *healthAddr,
		LeaderElection:         *enableLeaderElection,
		LeaderElectionID:       "open-vcluster-api-controller",
		Namespace:              *namespace,
	})
	if err != nil {
		setupLog.Error(err, "unable to create manager")
		os.Exit(1)
	}

	// Create vcluster adapter
	adapter, err := vclusteradapter.NewAdapter(vclusteradapter.Config{
		KubeConfig:   config,
		ChartVersion: *vclusterChartVersion,
		ChartRepo:    *vclusterChartRepo,
	})
	if err != nil {
		setupLog.Error(err, "unable to create vcluster adapter")
		os.Exit(1)
	}

	// Create and register the controller
	vclusterController := controller.NewVClusterController(
		mgr.GetClient(),
		mgr.GetScheme(),
		adapter,
		ctrl.Log.WithName("controllers").WithName("VCluster"),
	)

	if err := vclusterController.SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to setup controller")
		os.Exit(1)
	}

	// Add health checks
	if err := mgr.AddHealthzCheck("healthz", controller.HealthCheck); err != nil {
		setupLog.Error(err, "unable to setup health check")
		os.Exit(1)
	}
	if err := mgr.AddReadyzCheck("readyz", controller.ReadyCheck); err != nil {
		setupLog.Error(err, "unable to setup ready check")
		os.Exit(1)
	}

	// Setup signal handling
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-sigChan
		setupLog.Info("Received shutdown signal")
		cancel()
	}()

	setupLog.Info("Starting controller manager",
		"metrics-addr", *metricsAddr,
		"health-addr", *healthAddr,
		"namespace", *namespace,
		"vcluster-chart-version", *vclusterChartVersion,
	)

	if err := mgr.Start(ctx); err != nil {
		setupLog.Error(err, "problem running manager")
		os.Exit(1)
	}
}

// getKubeConfig returns the Kubernetes configuration.
func getKubeConfig() (*rest.Config, error) {
	if *kubeconfig != "" {
		return clientcmd.BuildConfigFromFlags("", *kubeconfig)
	}

	// Try in-cluster config
	config, err := rest.InClusterConfig()
	if err == nil {
		return config, nil
	}

	// Fall back to default kubeconfig location
	home, err := os.UserHomeDir()
	if err != nil {
		return nil, fmt.Errorf("failed to get home directory: %w", err)
	}
	return clientcmd.BuildConfigFromFlags("", fmt.Sprintf("%s/.kube/config", home))
}
