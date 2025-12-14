// Copyright (c) 2024 turtacn
// SPDX-License-Identifier: MIT

// Package main implements a minimal VClusterService server with in-memory storage.
// This is for demonstration and testing purposes only.
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"sync"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"

	v1 "github.com/turtacn/open-vcluster-api/api/v1"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

// server implements the VClusterServiceServer interface.
type server struct {
	v1.UnimplementedVClusterServiceServer
	mu        sync.RWMutex
	vclusters map[string]*v1.VCluster
	snapshots map[string]*v1.Snapshot
	idCounter int64
}

// newServer creates a new server instance.
func newServer() *server {
	return &server{
		vclusters: make(map[string]*v1.VCluster),
		snapshots: make(map[string]*v1.Snapshot),
	}
}

// generateID generates a unique ID.
func (s *server) generateID(prefix string) string {
	s.idCounter++
	return fmt.Sprintf("%s-%d-%d", prefix, time.Now().Unix(), s.idCounter)
}

// vclusterKey generates a unique key for a vcluster.
func vclusterKey(namespace, name string) string {
	return fmt.Sprintf("%s/%s", namespace, name)
}

// CreateVCluster creates a new virtual cluster.
func (s *server) CreateVCluster(ctx context.Context, req *v1.CreateVClusterRequest) (*v1.CreateVClusterResponse, error) {
	log.Printf("CreateVCluster: name=%s, namespace=%s", req.Name, req.Namespace)

	// Validate request
	if req.Name == "" {
		return nil, status.Error(codes.InvalidArgument, "name is required")
	}
	if req.Namespace == "" {
		req.Namespace = "default"
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	// Check if vcluster already exists
	key := vclusterKey(req.Namespace, req.Name)
	if _, exists := s.vclusters[key]; exists {
		return nil, status.Errorf(codes.AlreadyExists, "vcluster %s already exists in namespace %s", req.Name, req.Namespace)
	}

	// Create the vcluster
	now := timestamppb.Now()
	vc := &v1.VCluster{
		Id:          s.generateID("vc"),
		Name:        req.Name,
		Namespace:   req.Namespace,
		Spec:        req.Spec,
		Labels:      req.Labels,
		Annotations: make(map[string]string),
		CreateTime:  now,
		UpdateTime:  now,
		Status: &v1.VClusterStatus{
			Phase:   v1.Phase_PHASE_CREATING,
			Message: "VCluster is being created",
			Conditions: []*v1.Condition{
				{
					Type:               "Initialized",
					Status:             "True",
					Reason:             "VClusterCreated",
					Message:            "VCluster resource has been created",
					LastTransitionTime: now,
				},
			},
		},
	}

	// Set defaults if not provided
	if vc.Spec == nil {
		vc.Spec = &v1.VClusterSpec{}
	}
	if vc.Spec.KubernetesVersion == "" {
		vc.Spec.KubernetesVersion = "1.28.0"
	}
	if vc.Spec.Distro == "" {
		vc.Spec.Distro = "k3s"
	}
	if vc.Spec.Replicas == 0 {
		vc.Spec.Replicas = 1
	}

	// Simulate async creation (in real implementation, this would be handled by a controller)
	go s.simulateVClusterCreation(key)

	s.vclusters[key] = vc

	return &v1.CreateVClusterResponse{
		Vcluster:    vc,
		OperationId: s.generateID("op"),
	}, nil
}

// simulateVClusterCreation simulates the async creation of a vcluster.
func (s *server) simulateVClusterCreation(key string) {
	time.Sleep(2 * time.Second)

	s.mu.Lock()
	defer s.mu.Unlock()

	if vc, exists := s.vclusters[key]; exists {
		now := timestamppb.Now()
		vc.Status.Phase = v1.Phase_PHASE_RUNNING
		vc.Status.Message = "VCluster is running"
		vc.Status.ReadyReplicas = vc.Spec.Replicas
		vc.Status.TotalReplicas = vc.Spec.Replicas
		vc.Status.ApiServerEndpoint = fmt.Sprintf("https://%s.%s.svc:443", vc.Name, vc.Namespace)
		vc.Status.Kubeconfig = generateFakeKubeconfig(vc.Name, vc.Namespace)
		vc.Status.ReadyTime = now
		vc.Status.Conditions = append(vc.Status.Conditions, &v1.Condition{
			Type:               "Ready",
			Status:             "True",
			Reason:             "VClusterReady",
			Message:            "VCluster control plane is ready",
			LastTransitionTime: now,
		})
		vc.Status.CurrentUsage = &v1.ResourceUsage{
			CpuUsage:       "50m",
			MemoryUsage:    "256Mi",
			PodCount:       3,
			NamespaceCount: 4,
			ServiceCount:   2,
		}
		vc.UpdateTime = now
		log.Printf("VCluster %s is now RUNNING", key)
	}
}

// GetVCluster retrieves a specific vcluster.
func (s *server) GetVCluster(ctx context.Context, req *v1.GetVClusterRequest) (*v1.GetVClusterResponse, error) {
	log.Printf("GetVCluster: name=%s, namespace=%s", req.Name, req.Namespace)

	s.mu.RLock()
	defer s.mu.RUnlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found in namespace %s", req.Name, req.Namespace)
	}

	// Clone to avoid race conditions
	result := cloneVCluster(vc)

	// Optionally clear kubeconfig if not requested
	if !req.IncludeKubeconfig && result.Status != nil {
		result.Status.Kubeconfig = ""
	}

	return &v1.GetVClusterResponse{
		Vcluster: result,
	}, nil
}

// ListVClusters lists all vclusters with pagination.
func (s *server) ListVClusters(ctx context.Context, req *v1.ListVClustersRequest) (*v1.ListVClustersResponse, error) {
	log.Printf("ListVClusters: namespace=%s, pageSize=%d", req.Namespace, req.PageSize)

	s.mu.RLock()
	defer s.mu.RUnlock()

	var vclusters []*v1.VCluster
	for key, vc := range s.vclusters {
		// Filter by namespace if specified
		if req.Namespace != "" && vc.Namespace != req.Namespace {
			continue
		}

		// Filter by phases if specified
		if len(req.Phases) > 0 {
			phaseMatch := false
			for _, phase := range req.Phases {
				if vc.Status != nil && vc.Status.Phase == phase {
					phaseMatch = true
					break
				}
			}
			if !phaseMatch {
				continue
			}
		}

		// Filter by owner if specified
		if req.Owner != "" && vc.Owner != req.Owner {
			continue
		}

		log.Printf("  Found vcluster: %s", key)
		vclusters = append(vclusters, cloneVCluster(vc))
	}

	// Apply pagination (simplified)
	pageSize := int(req.PageSize)
	if pageSize <= 0 || pageSize > 100 {
		pageSize = 20
	}

	totalCount := len(vclusters)
	if len(vclusters) > pageSize {
		vclusters = vclusters[:pageSize]
	}

	return &v1.ListVClustersResponse{
		Vclusters:  vclusters,
		TotalCount: int32(totalCount),
	}, nil
}

// UpdateVCluster updates an existing vcluster.
func (s *server) UpdateVCluster(ctx context.Context, req *v1.UpdateVClusterRequest) (*v1.UpdateVClusterResponse, error) {
	log.Printf("UpdateVCluster: name=%s, namespace=%s", req.Name, req.Namespace)

	s.mu.Lock()
	defer s.mu.Unlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
	}

	// Update spec if provided
	if req.Spec != nil {
		vc.Spec = req.Spec
	}

	// Update labels if provided
	if req.Labels != nil {
		if vc.Labels == nil {
			vc.Labels = make(map[string]string)
		}
		for k, v := range req.Labels {
			vc.Labels[k] = v
		}
	}

	vc.UpdateTime = timestamppb.Now()

	return &v1.UpdateVClusterResponse{
		Vcluster:    cloneVCluster(vc),
		OperationId: s.generateID("op"),
	}, nil
}

// DeleteVCluster deletes a vcluster.
func (s *server) DeleteVCluster(ctx context.Context, req *v1.DeleteVClusterRequest) (*v1.DeleteVClusterResponse, error) {
	log.Printf("DeleteVCluster: name=%s, namespace=%s, force=%v", req.Name, req.Namespace, req.Force)

	s.mu.Lock()
	defer s.mu.Unlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
	}

	// Check if deletion is allowed
	if vc.Status != nil && vc.Status.Phase == v1.Phase_PHASE_DELETING {
		return nil, status.Error(codes.FailedPrecondition, "vcluster is already being deleted")
	}

	// Mark as deleting
	now := timestamppb.Now()
	vc.Status.Phase = v1.Phase_PHASE_DELETING
	vc.Status.Message = "VCluster is being deleted"
	vc.DeleteTime = now

	// Simulate async deletion
	go func() {
		time.Sleep(1 * time.Second)
		s.mu.Lock()
		delete(s.vclusters, key)
		s.mu.Unlock()
		log.Printf("VCluster %s has been deleted", key)
	}()

	return &v1.DeleteVClusterResponse{
		OperationId: s.generateID("op"),
		DeleteTime:  now,
	}, nil
}

// ScaleVCluster scales a vcluster's resources.
func (s *server) ScaleVCluster(ctx context.Context, req *v1.ScaleVClusterRequest) (*v1.ScaleVClusterResponse, error) {
	log.Printf("ScaleVCluster: name=%s, namespace=%s, replicas=%d", req.Name, req.Namespace, req.Replicas)

	s.mu.Lock()
	defer s.mu.Unlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
	}

	// Check if scaling is allowed
	if vc.Status == nil || vc.Status.Phase != v1.Phase_PHASE_RUNNING {
		return nil, status.Error(codes.FailedPrecondition, "vcluster must be in RUNNING phase to scale")
	}

	// Update spec
	if req.Replicas > 0 {
		vc.Spec.Replicas = req.Replicas
	}
	if req.Resources != nil {
		vc.Spec.Resources = req.Resources
	}

	// Update status
	now := timestamppb.Now()
	vc.Status.Phase = v1.Phase_PHASE_SCALING
	vc.Status.Message = "VCluster is scaling"
	vc.UpdateTime = now

	// Simulate async scaling
	go func() {
		time.Sleep(2 * time.Second)
		s.mu.Lock()
		if vc, exists := s.vclusters[key]; exists {
			vc.Status.Phase = v1.Phase_PHASE_RUNNING
			vc.Status.Message = "VCluster is running"
			vc.Status.ReadyReplicas = vc.Spec.Replicas
			vc.Status.TotalReplicas = vc.Spec.Replicas
			vc.UpdateTime = timestamppb.Now()
		}
		s.mu.Unlock()
		log.Printf("VCluster %s scaling complete", key)
	}()

	return &v1.ScaleVClusterResponse{
		Vcluster:    cloneVCluster(vc),
		OperationId: s.generateID("op"),
	}, nil
}

// SuspendVCluster suspends a running vcluster.
func (s *server) SuspendVCluster(ctx context.Context, req *v1.SuspendVClusterRequest) (*v1.SuspendVClusterResponse, error) {
	log.Printf("SuspendVCluster: name=%s, namespace=%s", req.Name, req.Namespace)

	s.mu.Lock()
	defer s.mu.Unlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
	}

	// Check if suspend is allowed
	if vc.Status == nil || vc.Status.Phase != v1.Phase_PHASE_RUNNING {
		return nil, status.Error(codes.FailedPrecondition, "vcluster must be in RUNNING phase to suspend")
	}

	now := timestamppb.Now()
	var snapshot *v1.Snapshot

	// Create snapshot if requested
	if req.CreateSnapshot {
		snapshotName := req.SnapshotName
		if snapshotName == "" {
			snapshotName = fmt.Sprintf("%s-suspend-%d", req.Name, time.Now().Unix())
		}
		snapshot = &v1.Snapshot{
			Id:           s.generateID("snap"),
			Name:         snapshotName,
			VclusterId:   vc.Id,
			VclusterName: vc.Name,
			Namespace:    vc.Namespace,
			Status:       v1.SnapshotStatus_SNAPSHOT_STATUS_READY,
			SizeBytes:    1024 * 1024 * 10, // 10MB
			CreateTime:   now,
			StorageUri:   fmt.Sprintf("s3://backups/%s/%s", vc.Namespace, snapshotName),
			Labels:       map[string]string{"type": "pre-suspend"},
			Description:  "Snapshot created before suspend",
		}
		s.snapshots[snapshot.Id] = snapshot
		log.Printf("Created snapshot: %s", snapshot.Id)
	}

	// Update status
	vc.Status.Phase = v1.Phase_PHASE_SUSPENDED
	vc.Status.Message = "VCluster is suspended"
	vc.Status.ReadyReplicas = 0
	vc.UpdateTime = now
	vc.Status.Conditions = append(vc.Status.Conditions, &v1.Condition{
		Type:               "Suspended",
		Status:             "True",
		Reason:             "VClusterSuspended",
		Message:            "VCluster has been suspended",
		LastTransitionTime: now,
	})

	if snapshot != nil {
		vc.Status.LastSnapshot = &v1.SnapshotInfo{
			Id:         snapshot.Id,
			Name:       snapshot.Name,
			CreateTime: snapshot.CreateTime,
			SizeBytes:  snapshot.SizeBytes,
			Status:     "Ready",
		}
	}

	return &v1.SuspendVClusterResponse{
		Vcluster:    cloneVCluster(vc),
		Snapshot:    snapshot,
		OperationId: s.generateID("op"),
	}, nil
}

// ResumeVCluster resumes a suspended vcluster.
func (s *server) ResumeVCluster(ctx context.Context, req *v1.ResumeVClusterRequest) (*v1.ResumeVClusterResponse, error) {
	log.Printf("ResumeVCluster: name=%s, namespace=%s", req.Name, req.Namespace)

	s.mu.Lock()
	defer s.mu.Unlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
	}

	// Check if resume is allowed
	if vc.Status == nil || vc.Status.Phase != v1.Phase_PHASE_SUSPENDED {
		return nil, status.Error(codes.FailedPrecondition, "vcluster must be in SUSPENDED phase to resume")
	}

	// Update status
	now := timestamppb.Now()
	vc.Status.Phase = v1.Phase_PHASE_RESUMING
	vc.Status.Message = "VCluster is resuming"
	vc.UpdateTime = now

	// Simulate async resume
	go func() {
		time.Sleep(2 * time.Second)
		s.mu.Lock()
		if vc, exists := s.vclusters[key]; exists {
			vc.Status.Phase = v1.Phase_PHASE_RUNNING
			vc.Status.Message = "VCluster is running"
			vc.Status.ReadyReplicas = vc.Spec.Replicas
			vc.UpdateTime = timestamppb.Now()
			vc.Status.Conditions = append(vc.Status.Conditions, &v1.Condition{
				Type:               "Resumed",
				Status:             "True",
				Reason:             "VClusterResumed",
				Message:            "VCluster has been resumed",
				LastTransitionTime: timestamppb.Now(),
			})
		}
		s.mu.Unlock()
		log.Printf("VCluster %s has been resumed", key)
	}()

	return &v1.ResumeVClusterResponse{
		Vcluster:    cloneVCluster(vc),
		OperationId: s.generateID("op"),
	}, nil
}

// SnapshotVCluster creates a snapshot of a vcluster.
func (s *server) SnapshotVCluster(ctx context.Context, req *v1.SnapshotVClusterRequest) (*v1.SnapshotVClusterResponse, error) {
	log.Printf("SnapshotVCluster: name=%s, namespace=%s, snapshotName=%s", req.Name, req.Namespace, req.SnapshotName)

	s.mu.Lock()
	defer s.mu.Unlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
	}

	// Check if snapshot is allowed
	if vc.Status == nil || vc.Status.Phase != v1.Phase_PHASE_RUNNING {
		return nil, status.Error(codes.FailedPrecondition, "vcluster must be in RUNNING phase to create snapshot")
	}

	now := timestamppb.Now()
	snapshotName := req.SnapshotName
	if snapshotName == "" {
		snapshotName = fmt.Sprintf("%s-snapshot-%d", req.Name, time.Now().Unix())
	}

	// Create snapshot
	snapshot := &v1.Snapshot{
		Id:           s.generateID("snap"),
		Name:         snapshotName,
		VclusterId:   vc.Id,
		VclusterName: vc.Name,
		Namespace:    vc.Namespace,
		Status:       v1.SnapshotStatus_SNAPSHOT_STATUS_CREATING,
		CreateTime:   now,
		Labels:       req.Labels,
		Description:  req.Description,
	}

	if req.RetentionHours > 0 {
		expireTime := now.AsTime().Add(time.Duration(req.RetentionHours) * time.Hour)
		snapshot.ExpireTime = timestamppb.New(expireTime)
	}

	s.snapshots[snapshot.Id] = snapshot

	// Simulate async snapshot creation
	go func() {
		time.Sleep(1 * time.Second)
		s.mu.Lock()
		if snap, exists := s.snapshots[snapshot.Id]; exists {
			snap.Status = v1.SnapshotStatus_SNAPSHOT_STATUS_READY
			snap.SizeBytes = 1024 * 1024 * 15 // 15MB
			snap.StorageUri = fmt.Sprintf("s3://backups/%s/%s", vc.Namespace, snapshotName)
		}
		if vc, exists := s.vclusters[key]; exists {
			vc.Status.LastSnapshot = &v1.SnapshotInfo{
				Id:         snapshot.Id,
				Name:       snapshot.Name,
				CreateTime: snapshot.CreateTime,
				SizeBytes:  snapshot.SizeBytes,
				Status:     "Ready",
			}
		}
		s.mu.Unlock()
		log.Printf("Snapshot %s is ready", snapshot.Id)
	}()

	return &v1.SnapshotVClusterResponse{
		Snapshot:    snapshot,
		OperationId: s.generateID("op"),
	}, nil
}

// RestoreVCluster restores a vcluster from a snapshot.
func (s *server) RestoreVCluster(ctx context.Context, req *v1.RestoreVClusterRequest) (*v1.RestoreVClusterResponse, error) {
	log.Printf("RestoreVCluster: name=%s, snapshotId=%s, createNew=%v", req.Name, req.SnapshotId, req.CreateNew)

	s.mu.Lock()
	defer s.mu.Unlock()

	// Find the snapshot
	snapshot, exists := s.snapshots[req.SnapshotId]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "snapshot %s not found", req.SnapshotId)
	}

	if snapshot.Status != v1.SnapshotStatus_SNAPSHOT_STATUS_READY {
		return nil, status.Error(codes.FailedPrecondition, "snapshot is not ready")
	}

	var vc *v1.VCluster
	var key string

	if req.CreateNew {
		// Create a new vcluster from snapshot
		newName := req.NewName
		if newName == "" {
			newName = fmt.Sprintf("%s-restored", req.Name)
		}
		newNamespace := req.NewNamespace
		if newNamespace == "" {
			newNamespace = req.Namespace
		}

		key = vclusterKey(newNamespace, newName)
		if _, exists := s.vclusters[key]; exists {
			return nil, status.Errorf(codes.AlreadyExists, "vcluster %s already exists", newName)
		}

		now := timestamppb.Now()
		vc = &v1.VCluster{
			Id:        s.generateID("vc"),
			Name:      newName,
			Namespace: newNamespace,
			Spec: &v1.VClusterSpec{
				KubernetesVersion: "1.28.0",
				Distro:            "k3s",
				Replicas:          1,
			},
			CreateTime: now,
			UpdateTime: now,
			Status: &v1.VClusterStatus{
				Phase:   v1.Phase_PHASE_RESTORING,
				Message: fmt.Sprintf("Restoring from snapshot %s", snapshot.Name),
			},
			Annotations: map[string]string{
				"restored-from-snapshot": snapshot.Id,
			},
		}
		s.vclusters[key] = vc
	} else {
		// Restore to existing vcluster
		key = vclusterKey(req.Namespace, req.Name)
		vc, exists = s.vclusters[key]
		if !exists {
			return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
		}

		vc.Status.Phase = v1.Phase_PHASE_RESTORING
		vc.Status.Message = fmt.Sprintf("Restoring from snapshot %s", snapshot.Name)
		vc.UpdateTime = timestamppb.Now()
	}

	// Simulate async restore
	go func() {
		time.Sleep(3 * time.Second)
		s.mu.Lock()
		if vc, exists := s.vclusters[key]; exists {
			now := timestamppb.Now()
			vc.Status.Phase = v1.Phase_PHASE_RUNNING
			vc.Status.Message = "VCluster restored and running"
			vc.Status.ReadyReplicas = vc.Spec.Replicas
			vc.Status.TotalReplicas = vc.Spec.Replicas
			vc.UpdateTime = now
			vc.Status.Conditions = append(vc.Status.Conditions, &v1.Condition{
				Type:               "Restored",
				Status:             "True",
				Reason:             "VClusterRestored",
				Message:            fmt.Sprintf("Restored from snapshot %s", snapshot.Id),
				LastTransitionTime: now,
			})
		}
		s.mu.Unlock()
		log.Printf("VCluster %s restore complete", key)
	}()

	return &v1.RestoreVClusterResponse{
		Vcluster:    cloneVCluster(vc),
		OperationId: s.generateID("op"),
	}, nil
}

// GetVClusterKubeconfig retrieves the kubeconfig for a vcluster.
func (s *server) GetVClusterKubeconfig(ctx context.Context, req *v1.GetVClusterKubeconfigRequest) (*v1.GetVClusterKubeconfigResponse, error) {
	log.Printf("GetVClusterKubeconfig: name=%s, namespace=%s", req.Name, req.Namespace)

	s.mu.RLock()
	defer s.mu.RUnlock()

	key := vclusterKey(req.Namespace, req.Name)
	vc, exists := s.vclusters[key]
	if !exists {
		return nil, status.Errorf(codes.NotFound, "vcluster %s not found", req.Name)
	}

	if vc.Status == nil || vc.Status.Phase != v1.Phase_PHASE_RUNNING {
		return nil, status.Error(codes.FailedPrecondition, "vcluster must be running to get kubeconfig")
	}

	validityHours := req.ValidityHours
	if validityHours <= 0 {
		validityHours = 24
	}

	expiresAt := time.Now().Add(time.Duration(validityHours) * time.Hour)

	return &v1.GetVClusterKubeconfigResponse{
		Kubeconfig:        vc.Status.Kubeconfig,
		ApiServerEndpoint: vc.Status.ApiServerEndpoint,
		ExpiresAt:         timestamppb.New(expiresAt),
	}, nil
}

// WatchVCluster streams vcluster updates.
func (s *server) WatchVCluster(req *v1.WatchVClusterRequest, stream v1.VClusterService_WatchVClusterServer) error {
	log.Printf("WatchVCluster: name=%s, namespace=%s", req.Name, req.Namespace)

	// Send initial state
	s.mu.RLock()
	for _, vc := range s.vclusters {
		if req.Namespace != "" && vc.Namespace != req.Namespace {
			continue
		}
		if req.Name != "" && vc.Name != req.Name {
			continue
		}
		if err := stream.Send(&v1.WatchVClusterResponse{
			Type:     v1.WatchEventType_WATCH_EVENT_TYPE_ADDED,
			Vcluster: cloneVCluster(vc),
		}); err != nil {
			s.mu.RUnlock()
			return err
		}
	}
	s.mu.RUnlock()

	// Keep connection open and send periodic updates (simplified)
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-stream.Context().Done():
			return stream.Context().Err()
		case <-ticker.C:
			// In a real implementation, this would watch for actual changes
			s.mu.RLock()
			for _, vc := range s.vclusters {
				if req.Namespace != "" && vc.Namespace != req.Namespace {
					continue
				}
				if req.Name != "" && vc.Name != req.Name {
					continue
				}
				if err := stream.Send(&v1.WatchVClusterResponse{
					Type:     v1.WatchEventType_WATCH_EVENT_TYPE_MODIFIED,
					Vcluster: cloneVCluster(vc),
				}); err != nil {
					s.mu.RUnlock()
					return err
				}
			}
			s.mu.RUnlock()
		}
	}
}

// cloneVCluster creates a deep copy of a VCluster.
func cloneVCluster(vc *v1.VCluster) *v1.VCluster {
	if vc == nil {
		return nil
	}
	// Simple clone using proto marshaling (in production, use proper cloning)
	clone := &v1.VCluster{
		Id:          vc.Id,
		Name:        vc.Name,
		Namespace:   vc.Namespace,
		Owner:       vc.Owner,
		Project:     vc.Project,
		CreateTime:  vc.CreateTime,
		UpdateTime:  vc.UpdateTime,
		DeleteTime:  vc.DeleteTime,
		Spec:        vc.Spec,
		Status:      vc.Status,
		Labels:      make(map[string]string),
		Annotations: make(map[string]string),
	}
	for k, v := range vc.Labels {
		clone.Labels[k] = v
	}
	for k, v := range vc.Annotations {
		clone.Annotations[k] = v
	}
	return clone
}

// generateFakeKubeconfig generates a fake kubeconfig for demonstration.
func generateFakeKubeconfig(name, namespace string) string {
	return fmt.Sprintf(`apiVersion: v1
kind: Config
clusters:
- cluster:
    server: https://%s.%s.svc:443
    certificate-authority-data: LS0tLS1CRUdJTi...
  name: %s
contexts:
- context:
    cluster: %s
    user: admin
  name: %s
current-context: %s
users:
- name: admin
  user:
    client-certificate-data: LS0tLS1CRUdJTi...
    client-key-data: LS0tLS1CRUdJTi...
`, name, namespace, name, name, name, name)
}

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	v1.RegisterVClusterServiceServer(grpcServer, newServer())

	log.Printf("VClusterService server listening on port %d", *port)
	log.Printf("Available operations: CreateVCluster, GetVCluster, ListVClusters, UpdateVCluster, DeleteVCluster")
	log.Printf("                      ScaleVCluster, SuspendVCluster, ResumeVCluster")
	log.Printf("                      SnapshotVCluster, RestoreVCluster, GetVClusterKubeconfig, WatchVCluster")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
