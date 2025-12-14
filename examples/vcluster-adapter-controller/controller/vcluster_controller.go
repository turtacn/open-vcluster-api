// Copyright (c) 2024 turtacn
// SPDX-License-Identifier: MIT

// Package controller implements the VCluster controller for reconciling
// vcluster resources using the vcluster adapter.
package controller

import (
	"context"
	"fmt"
	"time"

	"github.com/go-logr/logr"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/healthz"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	"github.com/turtacn/open-vcluster-api/examples/vcluster-adapter-controller/vclusteradapter"
)

const (
	// VClusterFinalizer is the finalizer used for VCluster resources
	VClusterFinalizer = "vcluster.open-vcluster-api.io/finalizer"

	// Annotations used for vcluster configuration
	AnnotationKubernetesVersion = "vcluster.open-vcluster-api.io/kubernetes-version"
	AnnotationDistro            = "vcluster.open-vcluster-api.io/distro"
	AnnotationReplicas          = "vcluster.open-vcluster-api.io/replicas"
	AnnotationSuspended         = "vcluster.open-vcluster-api.io/suspended"
	AnnotationPhase             = "vcluster.open-vcluster-api.io/phase"

	// Labels
	LabelManagedBy = "app.kubernetes.io/managed-by"
	LabelInstance  = "app.kubernetes.io/instance"

	// Default values
	DefaultKubernetesVersion = "1.28.0"
	DefaultDistro            = "k3s"
	DefaultReplicas          = 1
)

// VClusterController reconciles vcluster resources.
type VClusterController struct {
	client.Client
	Scheme  *runtime.Scheme
	Adapter *vclusteradapter.Adapter
	Log     logr.Logger
}

// NewVClusterController creates a new VClusterController.
func NewVClusterController(
	c client.Client,
	scheme *runtime.Scheme,
	adapter *vclusteradapter.Adapter,
	log logr.Logger,
) *VClusterController {
	return &VClusterController{
		Client:  c,
		Scheme:  scheme,
		Adapter: adapter,
		Log:     log,
	}
}

// SetupWithManager sets up the controller with the Manager.
func (r *VClusterController) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&corev1.Namespace{}).
		Owns(&appsv1.StatefulSet{}).
		Owns(&corev1.Service{}).
		Owns(&corev1.Secret{}).
		Complete(r)
}

// Reconcile handles the reconciliation loop for vcluster namespaces.
func (r *VClusterController) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := r.Log.WithValues("namespace", req.Name)

	// Fetch the Namespace
	ns := &corev1.Namespace{}
	if err := r.Get(ctx, req.NamespacedName, ns); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		log.Error(err, "Failed to get namespace")
		return ctrl.Result{}, err
	}

	// Check if this namespace is managed by us
	if ns.Labels[LabelManagedBy] != "open-vcluster-api" {
		return ctrl.Result{}, nil
	}

	vclusterName := ns.Labels[LabelInstance]
	if vclusterName == "" {
		vclusterName = ns.Name
	}

	log = log.WithValues("vcluster", vclusterName)

	// Handle deletion
	if !ns.DeletionTimestamp.IsZero() {
		return r.reconcileDelete(ctx, ns, vclusterName, log)
	}

	// Add finalizer if not present
	if !controllerutil.ContainsFinalizer(ns, VClusterFinalizer) {
		controllerutil.AddFinalizer(ns, VClusterFinalizer)
		if err := r.Update(ctx, ns); err != nil {
			log.Error(err, "Failed to add finalizer")
			return ctrl.Result{}, err
		}
		return ctrl.Result{Requeue: true}, nil
	}

	// Check if suspended
	if ns.Annotations[AnnotationSuspended] == "true" {
		return r.reconcileSuspended(ctx, ns, vclusterName, log)
	}

	// Reconcile the vcluster
	return r.reconcileVCluster(ctx, ns, vclusterName, log)
}

// reconcileVCluster ensures the vcluster is running.
func (r *VClusterController) reconcileVCluster(
	ctx context.Context,
	ns *corev1.Namespace,
	vclusterName string,
	log logr.Logger,
) (ctrl.Result, error) {
	log.Info("Reconciling vcluster")

	// Get configuration from annotations
	config := vclusteradapter.VClusterConfig{
		Name:              vclusterName,
		Namespace:         ns.Name,
		KubernetesVersion: getAnnotationOrDefault(ns, AnnotationKubernetesVersion, DefaultKubernetesVersion),
		Distro:            getAnnotationOrDefault(ns, AnnotationDistro, DefaultDistro),
		Replicas:          getAnnotationIntOrDefault(ns, AnnotationReplicas, DefaultReplicas),
	}

	// Check if vcluster exists
	exists, err := r.Adapter.Exists(ctx, config.Name, config.Namespace)
	if err != nil {
		log.Error(err, "Failed to check vcluster existence")
		return ctrl.Result{RequeueAfter: 30 * time.Second}, err
	}

	if !exists {
		// Create the vcluster
		log.Info("Creating vcluster", "config", config)
		if err := r.Adapter.Install(ctx, config); err != nil {
			log.Error(err, "Failed to create vcluster")
			r.updatePhase(ctx, ns, "Error", fmt.Sprintf("Failed to create: %v", err))
			return ctrl.Result{RequeueAfter: 30 * time.Second}, err
		}
		r.updatePhase(ctx, ns, "Creating", "VCluster installation initiated")
		return ctrl.Result{RequeueAfter: 10 * time.Second}, nil
	}

	// Check vcluster status
	status, err := r.Adapter.GetStatus(ctx, config.Name, config.Namespace)
	if err != nil {
		log.Error(err, "Failed to get vcluster status")
		return ctrl.Result{RequeueAfter: 30 * time.Second}, err
	}

	// Update phase annotation
	r.updatePhase(ctx, ns, status.Phase, status.Message)

	if status.Phase != "Running" {
		log.Info("VCluster not ready", "phase", status.Phase, "message", status.Message)
		return ctrl.Result{RequeueAfter: 10 * time.Second}, nil
	}

	// Store kubeconfig in a secret
	if status.Kubeconfig != "" {
		if err := r.ensureKubeconfigSecret(ctx, ns, vclusterName, status.Kubeconfig); err != nil {
			log.Error(err, "Failed to create kubeconfig secret")
			return ctrl.Result{RequeueAfter: 30 * time.Second}, err
		}
	}

	log.Info("VCluster is running")
	return ctrl.Result{RequeueAfter: 60 * time.Second}, nil
}

// reconcileSuspended handles suspended vclusters.
func (r *VClusterController) reconcileSuspended(
	ctx context.Context,
	ns *corev1.Namespace,
	vclusterName string,
	log logr.Logger,
) (ctrl.Result, error) {
	log.Info("VCluster is suspended")

	// Check current status
	status, err := r.Adapter.GetStatus(ctx, vclusterName, ns.Name)
	if err != nil {
		// vcluster might not exist, which is fine for suspended state
		r.updatePhase(ctx, ns, "Suspended", "VCluster is suspended")
		return ctrl.Result{RequeueAfter: 60 * time.Second}, nil
	}

	if status.ReadyReplicas > 0 {
		// Need to suspend (scale down)
		log.Info("Suspending vcluster")
		if err := r.Adapter.Suspend(ctx, vclusterName, ns.Name); err != nil {
			log.Error(err, "Failed to suspend vcluster")
			return ctrl.Result{RequeueAfter: 30 * time.Second}, err
		}
	}

	r.updatePhase(ctx, ns, "Suspended", "VCluster is suspended")
	return ctrl.Result{RequeueAfter: 60 * time.Second}, nil
}

// reconcileDelete handles vcluster deletion.
func (r *VClusterController) reconcileDelete(
	ctx context.Context,
	ns *corev1.Namespace,
	vclusterName string,
	log logr.Logger,
) (ctrl.Result, error) {
	log.Info("Deleting vcluster")

	// Check if vcluster exists
	exists, err := r.Adapter.Exists(ctx, vclusterName, ns.Name)
	if err != nil {
		log.Error(err, "Failed to check vcluster existence")
		return ctrl.Result{RequeueAfter: 10 * time.Second}, err
	}

	if exists {
		// Delete the vcluster
		if err := r.Adapter.Uninstall(ctx, vclusterName, ns.Name); err != nil {
			log.Error(err, "Failed to delete vcluster")
			return ctrl.Result{RequeueAfter: 10 * time.Second}, err
		}
		return ctrl.Result{RequeueAfter: 5 * time.Second}, nil
	}

	// Remove finalizer
	controllerutil.RemoveFinalizer(ns, VClusterFinalizer)
	if err := r.Update(ctx, ns); err != nil {
		log.Error(err, "Failed to remove finalizer")
		return ctrl.Result{}, err
	}

	log.Info("VCluster deleted successfully")
	return ctrl.Result{}, nil
}

// ensureKubeconfigSecret creates or updates the kubeconfig secret.
func (r *VClusterController) ensureKubeconfigSecret(
	ctx context.Context,
	ns *corev1.Namespace,
	vclusterName string,
	kubeconfig string,
) error {
	secretName := fmt.Sprintf("%s-kubeconfig", vclusterName)
	secret := &corev1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      secretName,
			Namespace: ns.Name,
			Labels: map[string]string{
				LabelManagedBy: "open-vcluster-api",
				LabelInstance:  vclusterName,
			},
		},
		Type: corev1.SecretTypeOpaque,
		Data: map[string][]byte{
			"kubeconfig": []byte(kubeconfig),
		},
	}

	// Set owner reference
	if err := controllerutil.SetControllerReference(ns, secret, r.Scheme); err != nil {
		return err
	}

	// Create or update
	existing := &corev1.Secret{}
	err := r.Get(ctx, types.NamespacedName{Name: secretName, Namespace: ns.Name}, existing)
	if errors.IsNotFound(err) {
		return r.Create(ctx, secret)
	} else if err != nil {
		return err
	}

	existing.Data = secret.Data
	return r.Update(ctx, existing)
}

// updatePhase updates the phase annotation on the namespace.
func (r *VClusterController) updatePhase(ctx context.Context, ns *corev1.Namespace, phase, message string) {
	if ns.Annotations == nil {
		ns.Annotations = make(map[string]string)
	}
	ns.Annotations[AnnotationPhase] = phase
	ns.Annotations["vcluster.open-vcluster-api.io/message"] = message
	ns.Annotations["vcluster.open-vcluster-api.io/last-updated"] = time.Now().Format(time.RFC3339)
	_ = r.Update(ctx, ns)
}

// getAnnotationOrDefault returns annotation value or default.
func getAnnotationOrDefault(ns *corev1.Namespace, key, defaultValue string) string {
	if ns.Annotations == nil {
		return defaultValue
	}
	if v, ok := ns.Annotations[key]; ok && v != "" {
		return v
	}
	return defaultValue
}

// getAnnotationIntOrDefault returns annotation value as int or default.
func getAnnotationIntOrDefault(ns *corev1.Namespace, key string, defaultValue int) int {
	if ns.Annotations == nil {
		return defaultValue
	}
	if v, ok := ns.Annotations[key]; ok && v != "" {
		var i int
		if _, err := fmt.Sscanf(v, "%d", &i); err == nil {
			return i
		}
	}
	return defaultValue
}

// HealthCheck is the health check handler.
func HealthCheck(_ *healthz.HealthzChecker) error {
	return nil
}

// ReadyCheck is the readiness check handler.
func ReadyCheck(_ *healthz.HealthzChecker) error {
	return nil
}
