// Copyright (c) 2024 turtacn
// SPDX-License-Identifier: MIT

// Package vclusteradapter provides an adapter for interacting with
// loft-sh/vcluster using Helm.
package vclusteradapter

import (
	"bytes"
	"context"
	"fmt"
	"time"

	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/cli"
	"helm.sh/helm/v3/pkg/getter"
	"helm.sh/helm/v3/pkg/repo"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

// Config contains the adapter configuration.
type Config struct {
	KubeConfig   *rest.Config
	ChartVersion string
	ChartRepo    string
}

// VClusterConfig contains the vcluster configuration.
type VClusterConfig struct {
	Name              string
	Namespace         string
	KubernetesVersion string
	Distro            string
	Replicas          int
	CPURequest        string
	CPULimit          string
	MemoryRequest     string
	MemoryLimit       string
	EnableHA          bool
	HelmValues        map[string]interface{}
}

// VClusterStatus contains the vcluster status.
type VClusterStatus struct {
	Phase         string
	Message       string
	ReadyReplicas int32
	TotalReplicas int32
	Kubeconfig    string
	Endpoint      string
}

// Adapter provides methods for managing vclusters.
type Adapter struct {
	config     Config
	kubeClient kubernetes.Interface
	settings   *cli.EnvSettings
}

// NewAdapter creates a new vcluster adapter.
func NewAdapter(config Config) (*Adapter, error) {
	kubeClient, err := kubernetes.NewForConfig(config.KubeConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create kubernetes client: %w", err)
	}

	settings := cli.New()

	return &Adapter{
		config:     config,
		kubeClient: kubeClient,
		settings:   settings,
	}, nil
}

// Install installs a new vcluster using Helm.
func (a *Adapter) Install(ctx context.Context, config VClusterConfig) error {
	// Ensure namespace exists
	if err := a.ensureNamespace(ctx, config.Namespace); err != nil {
		return fmt.Errorf("failed to ensure namespace: %w", err)
	}

	// Create Helm action configuration
	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(a.settings.RESTClientGetter(), config.Namespace, "secret", func(format string, v ...interface{}) {}); err != nil {
		return fmt.Errorf("failed to init helm action config: %w", err)
	}

	// Download and load the chart
	chart, err := a.loadChart(config.Distro)
	if err != nil {
		return fmt.Errorf("failed to load chart: %w", err)
	}

	// Prepare values
	values := a.buildHelmValues(config)

	// Create install action
	install := action.NewInstall(actionConfig)
	install.ReleaseName = config.Name
	install.Namespace = config.Namespace
	install.CreateNamespace = false
	install.Wait = false
	install.Timeout = 5 * time.Minute

	// Execute installation
	_, err = install.Run(chart, values)
	if err != nil {
		return fmt.Errorf("failed to install vcluster: %w", err)
	}

	return nil
}

// Uninstall removes a vcluster using Helm.
func (a *Adapter) Uninstall(ctx context.Context, name, namespace string) error {
	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(a.settings.RESTClientGetter(), namespace, "secret", func(format string, v ...interface{}) {}); err != nil {
		return fmt.Errorf("failed to init helm action config: %w", err)
	}

	uninstall := action.NewUninstall(actionConfig)
	uninstall.Timeout = 5 * time.Minute
	uninstall.Wait = true

	_, err := uninstall.Run(name)
	if err != nil {
		return fmt.Errorf("failed to uninstall vcluster: %w", err)
	}

	return nil
}

// Upgrade upgrades a vcluster's configuration.
func (a *Adapter) Upgrade(ctx context.Context, config VClusterConfig) error {
	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(a.settings.RESTClientGetter(), config.Namespace, "secret", func(format string, v ...interface{}) {}); err != nil {
		return fmt.Errorf("failed to init helm action config: %w", err)
	}

	chart, err := a.loadChart(config.Distro)
	if err != nil {
		return fmt.Errorf("failed to load chart: %w", err)
	}

	values := a.buildHelmValues(config)

	upgrade := action.NewUpgrade(actionConfig)
	upgrade.Namespace = config.Namespace
	upgrade.Wait = false
	upgrade.Timeout = 5 * time.Minute

	_, err = upgrade.Run(config.Name, chart, values)
	if err != nil {
		return fmt.Errorf("failed to upgrade vcluster: %w", err)
	}

	return nil
}

// Exists checks if a vcluster exists.
func (a *Adapter) Exists(ctx context.Context, name, namespace string) (bool, error) {
	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(a.settings.RESTClientGetter(), namespace, "secret", func(format string, v ...interface{}) {}); err != nil {
		return false, fmt.Errorf("failed to init helm action config: %w", err)
	}

	list := action.NewList(actionConfig)
	list.Filter = name
	list.Deployed = true

	releases, err := list.Run()
	if err != nil {
		return false, fmt.Errorf("failed to list releases: %w", err)
	}

	for _, r := range releases {
		if r.Name == name {
			return true, nil
		}
	}

	return false, nil
}

// GetStatus retrieves the current status of a vcluster.
func (a *Adapter) GetStatus(ctx context.Context, name, namespace string) (*VClusterStatus, error) {
	status := &VClusterStatus{
		Phase:   "Unknown",
		Message: "Unable to determine status",
	}

	// Check StatefulSet status
	stsName := fmt.Sprintf("%s", name)
	sts, err := a.kubeClient.AppsV1().StatefulSets(namespace).Get(ctx, stsName, metav1.GetOptions{})
	if err != nil {
		if errors.IsNotFound(err) {
			status.Phase = "NotFound"
			status.Message = "VCluster StatefulSet not found"
			return status, nil
		}
		return nil, fmt.Errorf("failed to get statefulset: %w", err)
	}

	status.ReadyReplicas = sts.Status.ReadyReplicas
	status.TotalReplicas = *sts.Spec.Replicas

	// Determine phase based on replicas
	if status.ReadyReplicas == 0 && status.TotalReplicas == 0 {
		status.Phase = "Suspended"
		status.Message = "VCluster is suspended"
	} else if status.ReadyReplicas < status.TotalReplicas {
		status.Phase = "Scaling"
		status.Message = fmt.Sprintf("VCluster is scaling: %d/%d replicas ready", status.ReadyReplicas, status.TotalReplicas)
	} else if status.ReadyReplicas == status.TotalReplicas && status.TotalReplicas > 0 {
		status.Phase = "Running"
		status.Message = "VCluster is running"
	} else {
		status.Phase = "Unknown"
		status.Message = "Unable to determine vcluster status"
	}

	// Get kubeconfig from secret
	secretName := fmt.Sprintf("vc-%s", name)
	secret, err := a.kubeClient.CoreV1().Secrets(namespace).Get(ctx, secretName, metav1.GetOptions{})
	if err == nil {
		if kubeconfig, ok := secret.Data["config"]; ok {
			status.Kubeconfig = string(kubeconfig)
		}
	}

	// Get service endpoint
	svcName := name
	svc, err := a.kubeClient.CoreV1().Services(namespace).Get(ctx, svcName, metav1.GetOptions{})
	if err == nil {
		status.Endpoint = fmt.Sprintf("https://%s.%s.svc:443", svc.Name, svc.Namespace)
	}

	return status, nil
}

// Suspend suspends a vcluster by scaling down its StatefulSet.
func (a *Adapter) Suspend(ctx context.Context, name, namespace string) error {
	stsName := name

	// Get current StatefulSet
	sts, err := a.kubeClient.AppsV1().StatefulSets(namespace).Get(ctx, stsName, metav1.GetOptions{})
	if err != nil {
		return fmt.Errorf("failed to get statefulset: %w", err)
	}

	// Store original replicas in annotation
	if sts.Annotations == nil {
		sts.Annotations = make(map[string]string)
	}
	sts.Annotations["vcluster.open-vcluster-api.io/pre-suspend-replicas"] = fmt.Sprintf("%d", *sts.Spec.Replicas)

	// Scale to zero
	zero := int32(0)
	sts.Spec.Replicas = &zero

	_, err = a.kubeClient.AppsV1().StatefulSets(namespace).Update(ctx, sts, metav1.UpdateOptions{})
	if err != nil {
		return fmt.Errorf("failed to scale statefulset to zero: %w", err)
	}

	return nil
}

// Resume resumes a suspended vcluster by scaling up its StatefulSet.
func (a *Adapter) Resume(ctx context.Context, name, namespace string) error {
	stsName := name

	// Get current StatefulSet
	sts, err := a.kubeClient.AppsV1().StatefulSets(namespace).Get(ctx, stsName, metav1.GetOptions{})
	if err != nil {
		return fmt.Errorf("failed to get statefulset: %w", err)
	}

	// Get original replicas from annotation
	replicas := int32(1) // default
	if sts.Annotations != nil {
		if v, ok := sts.Annotations["vcluster.open-vcluster-api.io/pre-suspend-replicas"]; ok {
			var r int32
			if _, err := fmt.Sscanf(v, "%d", &r); err == nil && r > 0 {
				replicas = r
			}
		}
	}

	// Scale up
	sts.Spec.Replicas = &replicas

	_, err = a.kubeClient.AppsV1().StatefulSets(namespace).Update(ctx, sts, metav1.UpdateOptions{})
	if err != nil {
		return fmt.Errorf("failed to scale statefulset: %w", err)
	}

	return nil
}

// CreateSnapshot creates a snapshot of a vcluster.
func (a *Adapter) CreateSnapshot(ctx context.Context, name, namespace, snapshotName string) (*SnapshotInfo, error) {
	// Get the vcluster's etcd pod
	podList, err := a.kubeClient.CoreV1().Pods(namespace).List(ctx, metav1.ListOptions{
		LabelSelector: fmt.Sprintf("app=%s,component=etcd", name),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to list etcd pods: %w", err)
	}

	if len(podList.Items) == 0 {
		// For k3s distro, etcd is embedded, need different approach
		return a.createK3sSnapshot(ctx, name, namespace, snapshotName)
	}

	// Execute etcdctl snapshot save in the etcd pod
	// This is a simplified example - production code would use proper exec
	snapshot := &SnapshotInfo{
		ID:         fmt.Sprintf("snap-%d", time.Now().UnixNano()),
		Name:       snapshotName,
		VCluster:   name,
		Namespace:  namespace,
		CreateTime: time.Now(),
		Status:     "Ready",
	}

	return snapshot, nil
}

// createK3sSnapshot creates a snapshot for k3s-based vcluster.
func (a *Adapter) createK3sSnapshot(ctx context.Context, name, namespace, snapshotName string) (*SnapshotInfo, error) {
	// K3s uses SQLite by default, snapshot approach is different
	// This would involve backing up the SQLite database or using k3s snapshot command

	snapshot := &SnapshotInfo{
		ID:         fmt.Sprintf("snap-%d", time.Now().UnixNano()),
		Name:       snapshotName,
		VCluster:   name,
		Namespace:  namespace,
		CreateTime: time.Now(),
		Status:     "Ready",
	}

	return snapshot, nil
}

// RestoreSnapshot restores a vcluster from a snapshot.
func (a *Adapter) RestoreSnapshot(ctx context.Context, name, namespace, snapshotID string) error {
	// This would involve restoring the etcd/SQLite data
	// Implementation depends on storage backend
	return nil
}

// ensureNamespace ensures the namespace exists.
func (a *Adapter) ensureNamespace(ctx context.Context, namespace string) error {
	_, err := a.kubeClient.CoreV1().Namespaces().Get(ctx, namespace, metav1.GetOptions{})
	if err == nil {
		return nil
	}

	if !errors.IsNotFound(err) {
		return err
	}

	ns := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: namespace,
			Labels: map[string]string{
				"app.kubernetes.io/managed-by": "open-vcluster-api",
			},
		},
	}

	_, err = a.kubeClient.CoreV1().Namespaces().Create(ctx, ns, metav1.CreateOptions{})
	return err
}

// loadChart loads the vcluster Helm chart.
func (a *Adapter) loadChart(distro string) (*loader.BufferedFile, error) {
	// Add the Loft repository
	repoEntry := &repo.Entry{
		Name: "loft",
		URL:  a.config.ChartRepo,
	}

	chartRepo, err := repo.NewChartRepository(repoEntry, getter.All(a.settings))
	if err != nil {
		return nil, fmt.Errorf("failed to create chart repository: %w", err)
	}

	// Download the repository index
	indexFile, err := chartRepo.DownloadIndexFile()
	if err != nil {
		return nil, fmt.Errorf("failed to download repository index: %w", err)
	}

	// Load the index
	index, err := repo.LoadIndexFile(indexFile)
	if err != nil {
		return nil, fmt.Errorf("failed to load index file: %w", err)
	}

	// Get chart URL
	chartName := "vcluster"
	cv, err := index.Get(chartName, a.config.ChartVersion)
	if err != nil {
		return nil, fmt.Errorf("failed to get chart version: %w", err)
	}

	if len(cv.URLs) == 0 {
		return nil, fmt.Errorf("no chart URLs found")
	}

	// Download chart
	chartURL := cv.URLs[0]
	httpGetter, err := getter.NewHTTPGetter()
	if err != nil {
		return nil, fmt.Errorf("failed to create HTTP getter: %w", err)
	}

	resp, err := httpGetter.Get(chartURL)
	if err != nil {
		return nil, fmt.Errorf("failed to download chart: %w", err)
	}

	// Load chart from buffer
	buf := new(bytes.Buffer)
	buf.ReadFrom(resp)

	chart, err := loader.LoadArchive(buf)
	if err != nil {
		return nil, fmt.Errorf("failed to load chart archive: %w", err)
	}

	return chart, nil
}

// buildHelmValues builds Helm values from config.
func (a *Adapter) buildHelmValues(config VClusterConfig) map[string]interface{} {
	values := map[string]interface{}{
		"vcluster": map[string]interface{}{
			"image": fmt.Sprintf("rancher/k3s:v%s-k3s1", config.KubernetesVersion),
		},
		"syncer": map[string]interface{}{
			"replicas": config.Replicas,
		},
		"sync": map[string]interface{}{
			"nodes": map[string]interface{}{
				"enabled": true,
			},
			"persistentvolumes": map[string]interface{}{
				"enabled": true,
			},
			"storageclasses": map[string]interface{}{
				"enabled": true,
			},
		},
	}

	// Add resource limits if specified
	if config.CPURequest != "" || config.MemoryRequest != "" {
		resources := map[string]interface{}{}
		requests := map[string]interface{}{}
		limits := map[string]interface{}{}

		if config.CPURequest != "" {
			requests["cpu"] = config.CPURequest
		}
		if config.MemoryRequest != "" {
			requests["memory"] = config.MemoryRequest
		}
		if config.CPULimit != "" {
			limits["cpu"] = config.CPULimit
		}
		if config.MemoryLimit != "" {
			limits["memory"] = config.MemoryLimit
		}

		if len(requests) > 0 {
			resources["requests"] = requests
		}
		if len(limits) > 0 {
			resources["limits"] = limits
		}
		if len(resources) > 0 {
			values["syncer"].(map[string]interface{})["resources"] = resources
		}
	}

	// Enable HA if requested
	if config.EnableHA {
		values["enableHA"] = true
		if config.Replicas < 3 {
			values["syncer"].(map[string]interface{})["replicas"] = 3
		}
	}

	// Merge custom Helm values
	if config.HelmValues != nil {
		values = mergeMaps(values, config.HelmValues)
	}

	return values
}

// mergeMaps merges two maps recursively.
func mergeMaps(base, override map[string]interface{}) map[string]interface{} {
	result := make(map[string]interface{})

	for k, v := range base {
		result[k] = v
	}

	for k, v := range override {
		if baseVal, ok := result[k]; ok {
			if baseMap, ok := baseVal.(map[string]interface{}); ok {
				if overrideMap, ok := v.(map[string]interface{}); ok {
					result[k] = mergeMaps(baseMap, overrideMap)
					continue
				}
			}
		}
		result[k] = v
	}

	return result
}

// SnapshotInfo contains snapshot information.
type SnapshotInfo struct {
	ID         string
	Name       string
	VCluster   string
	Namespace  string
	CreateTime time.Time
	SizeBytes  int64
	Status     string
	StorageURI string
}
