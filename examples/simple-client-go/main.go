// Copyright (c) 2024 turtacn
// SPDX-License-Identifier: MIT

// Package main demonstrates a simple gRPC client for the VClusterService.
// This example shows how to connect to the API server and perform basic
// operations like creating, suspending, and deleting a vcluster.
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	v1 "github.com/turtacn/open-vcluster-api/api/v1"
)

var (
	serverAddr = flag.String("server", "localhost:50051", "The server address in the format host:port")
	action     = flag.String("action", "create", "Action to perform: create, get, list, suspend, resume, delete")
	name       = flag.String("name", "demo-vcluster", "Name of the vcluster")
	namespace  = flag.String("namespace", "default", "Namespace for the vcluster")
)

func main() {
	flag.Parse()

	// Establish connection to the gRPC server
	conn, err := grpc.Dial(*serverAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Failed to connect to server: %v", err)
	}
	defer conn.Close()

	// Create the VClusterService client
	client := v1.NewVClusterServiceClient(conn)

	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Execute the requested action
	switch *action {
	case "create":
		createVCluster(ctx, client)
	case "get":
		getVCluster(ctx, client)
	case "list":
		listVClusters(ctx, client)
	case "suspend":
		suspendVCluster(ctx, client)
	case "resume":
		resumeVCluster(ctx, client)
	case "snapshot":
		snapshotVCluster(ctx, client)
	case "delete":
		deleteVCluster(ctx, client)
	case "demo":
		runFullDemo(ctx, client)
	default:
		fmt.Printf("Unknown action: %s\n", *action)
		fmt.Println("Available actions: create, get, list, suspend, resume, snapshot, delete, demo")
		os.Exit(1)
	}
}

// createVCluster creates a new vcluster with the specified name and configuration.
func createVCluster(ctx context.Context, client v1.VClusterServiceClient) {
	log.Printf("Creating vcluster '%s' in namespace '%s'...", *name, *namespace)

	req := &v1.CreateVClusterRequest{
		Name:      *name,
		Namespace: *namespace,
		Spec: &v1.VClusterSpec{
			KubernetesVersion: "1.28.0",
			Distro:            "k3s",
			Replicas:          1,
			EnableHa:          false,
			Resources: &v1.ResourceRequirements{
				CpuRequest:    "100m",
				CpuLimit:      "1000m",
				MemoryRequest: "128Mi",
				MemoryLimit:   "1Gi",
			},
			Network: &v1.NetworkConfig{
				PodCidr:               "10.200.0.0/16",
				ServiceCidr:           "10.201.0.0/16",
				EnableNetworkPolicies: false,
			},
			Storage: &v1.StorageConfig{
				EnablePersistence: true,
				PersistenceSize:   "5Gi",
			},
			Sync: &v1.SyncConfig{
				SyncNodes:             true,
				SyncPersistentVolumes: true,
				SyncStorageClasses:    true,
				SyncIngresses:         true,
			},
		},
		Labels: map[string]string{
			"env":     "demo",
			"team":    "platform",
			"purpose": "testing",
		},
		RequestId:      generateRequestID(),
		WaitForReady:   true,
		TimeoutSeconds: 300,
	}

	resp, err := client.CreateVCluster(ctx, req)
	if err != nil {
		log.Fatalf("Failed to create vcluster: %v", err)
	}

	log.Printf("VCluster created successfully!")
	printVCluster(resp.Vcluster)
}

// getVCluster retrieves details of a specific vcluster.
func getVCluster(ctx context.Context, client v1.VClusterServiceClient) {
	log.Printf("Getting vcluster '%s' in namespace '%s'...", *name, *namespace)

	req := &v1.GetVClusterRequest{
		Name:              *name,
		Namespace:         *namespace,
		IncludeKubeconfig: true,
	}

	resp, err := client.GetVCluster(ctx, req)
	if err != nil {
		log.Fatalf("Failed to get vcluster: %v", err)
	}

	printVCluster(resp.Vcluster)
}

// listVClusters lists all vclusters in the specified namespace.
func listVClusters(ctx context.Context, client v1.VClusterServiceClient) {
	log.Printf("Listing vclusters in namespace '%s'...", *namespace)

	req := &v1.ListVClustersRequest{
		Namespace: *namespace,
		PageSize:  10,
	}

	resp, err := client.ListVClusters(ctx, req)
	if err != nil {
		log.Fatalf("Failed to list vclusters: %v", err)
	}

	log.Printf("Found %d vclusters (total: %d)", len(resp.Vclusters), resp.TotalCount)
	for i, vc := range resp.Vclusters {
		log.Printf("\n--- VCluster %d ---", i+1)
		printVCluster(vc)
	}
}

// suspendVCluster suspends a running vcluster.
func suspendVCluster(ctx context.Context, client v1.VClusterServiceClient) {
	log.Printf("Suspending vcluster '%s' in namespace '%s'...", *name, *namespace)

	req := &v1.SuspendVClusterRequest{
		Name:                *name,
		Namespace:           *namespace,
		DrainWorkloads:      true,
		DrainTimeoutSeconds: 60,
		CreateSnapshot:      true,
		SnapshotName:        fmt.Sprintf("%s-pre-suspend-%d", *name, time.Now().Unix()),
	}

	resp, err := client.SuspendVCluster(ctx, req)
	if err != nil {
		log.Fatalf("Failed to suspend vcluster: %v", err)
	}

	log.Printf("VCluster suspended successfully!")
	log.Printf("Operation ID: %s", resp.OperationId)
	if resp.Snapshot != nil {
		log.Printf("Snapshot created: %s (ID: %s)", resp.Snapshot.Name, resp.Snapshot.Id)
	}
	printVCluster(resp.Vcluster)
}

// resumeVCluster resumes a suspended vcluster.
func resumeVCluster(ctx context.Context, client v1.VClusterServiceClient) {
	log.Printf("Resuming vcluster '%s' in namespace '%s'...", *name, *namespace)

	req := &v1.ResumeVClusterRequest{
		Name:               *name,
		Namespace:          *namespace,
		ReconcileWorkloads: true,
	}

	resp, err := client.ResumeVCluster(ctx, req)
	if err != nil {
		log.Fatalf("Failed to resume vcluster: %v", err)
	}

	log.Printf("VCluster resumed successfully!")
	log.Printf("Operation ID: %s", resp.OperationId)
	printVCluster(resp.Vcluster)
}

// snapshotVCluster creates a snapshot of a vcluster.
func snapshotVCluster(ctx context.Context, client v1.VClusterServiceClient) {
	log.Printf("Creating snapshot of vcluster '%s' in namespace '%s'...", *name, *namespace)

	req := &v1.SnapshotVClusterRequest{
		Name:             *name,
		Namespace:        *namespace,
		SnapshotName:     fmt.Sprintf("%s-snapshot-%d", *name, time.Now().Unix()),
		Description:      "Manual snapshot created via CLI",
		RetentionHours:   168, // 7 days
		IncludeWorkloads: true,
		Labels: map[string]string{
			"type":   "manual",
			"source": "cli-client",
		},
	}

	resp, err := client.SnapshotVCluster(ctx, req)
	if err != nil {
		log.Fatalf("Failed to create snapshot: %v", err)
	}

	log.Printf("Snapshot created successfully!")
	log.Printf("Snapshot ID: %s", resp.Snapshot.Id)
	log.Printf("Snapshot Name: %s", resp.Snapshot.Name)
	log.Printf("Storage URI: %s", resp.Snapshot.StorageUri)
	log.Printf("Operation ID: %s", resp.OperationId)
}

// deleteVCluster deletes a vcluster.
func deleteVCluster(ctx context.Context, client v1.VClusterServiceClient) {
	log.Printf("Deleting vcluster '%s' in namespace '%s'...", *name, *namespace)

	req := &v1.DeleteVClusterRequest{
		Name:               *name,
		Namespace:          *namespace,
		Force:              false,
		DeleteSnapshots:    false,
		GracePeriodSeconds: 30,
	}

	resp, err := client.DeleteVCluster(ctx, req)
	if err != nil {
		log.Fatalf("Failed to delete vcluster: %v", err)
	}

	log.Printf("VCluster deletion initiated!")
	log.Printf("Operation ID: %s", resp.OperationId)
	log.Printf("Delete Time: %v", resp.DeleteTime.AsTime())
}

// runFullDemo runs a complete demonstration of the vcluster lifecycle.
func runFullDemo(ctx context.Context, client v1.VClusterServiceClient) {
	log.Println("=== Starting Full VCluster Lifecycle Demo ===")

	// Step 1: Create
	log.Println("\n[Step 1/6] Creating vcluster...")
	createVCluster(ctx, client)
	time.Sleep(2 * time.Second)

	// Step 2: Get
	log.Println("\n[Step 2/6] Getting vcluster details...")
	getVCluster(ctx, client)
	time.Sleep(1 * time.Second)

	// Step 3: Snapshot
	log.Println("\n[Step 3/6] Creating snapshot...")
	snapshotVCluster(ctx, client)
	time.Sleep(2 * time.Second)

	// Step 4: Suspend
	log.Println("\n[Step 4/6] Suspending vcluster...")
	suspendVCluster(ctx, client)
	time.Sleep(2 * time.Second)

	// Step 5: Resume
	log.Println("\n[Step 5/6] Resuming vcluster...")
	resumeVCluster(ctx, client)
	time.Sleep(2 * time.Second)

	// Step 6: Delete
	log.Println("\n[Step 6/6] Deleting vcluster...")
	deleteVCluster(ctx, client)

	log.Println("\n=== Demo Complete ===")
}

// printVCluster prints vcluster details in a readable format.
func printVCluster(vc *v1.VCluster) {
	if vc == nil {
		log.Println("VCluster is nil")
		return
	}

	log.Printf("  ID:        %s", vc.Id)
	log.Printf("  Name:      %s", vc.Name)
	log.Printf("  Namespace: %s", vc.Namespace)
	log.Printf("  Owner:     %s", vc.Owner)
	log.Printf("  Project:   %s", vc.Project)

	if vc.Spec != nil {
		log.Printf("  Spec:")
		log.Printf("    K8s Version: %s", vc.Spec.KubernetesVersion)
		log.Printf("    Distro:      %s", vc.Spec.Distro)
		log.Printf("    Replicas:    %d", vc.Spec.Replicas)
		log.Printf("    HA Enabled:  %v", vc.Spec.EnableHa)
		if vc.Spec.Resources != nil {
			log.Printf("    Resources:")
			log.Printf("      CPU:    %s / %s", vc.Spec.Resources.CpuRequest, vc.Spec.Resources.CpuLimit)
			log.Printf("      Memory: %s / %s", vc.Spec.Resources.MemoryRequest, vc.Spec.Resources.MemoryLimit)
		}
	}

	if vc.Status != nil {
		log.Printf("  Status:")
		log.Printf("    Phase:     %s", vc.Status.Phase.String())
		log.Printf("    Message:   %s", vc.Status.Message)
		log.Printf("    Endpoint:  %s", vc.Status.ApiServerEndpoint)
		log.Printf("    Replicas:  %d/%d", vc.Status.ReadyReplicas, vc.Status.TotalReplicas)
		if vc.Status.CurrentUsage != nil {
			log.Printf("    Usage:")
			log.Printf("      CPU:     %s", vc.Status.CurrentUsage.CpuUsage)
			log.Printf("      Memory:  %s", vc.Status.CurrentUsage.MemoryUsage)
			log.Printf("      Pods:    %d", vc.Status.CurrentUsage.PodCount)
		}
	}

	if len(vc.Labels) > 0 {
		log.Printf("  Labels:")
		for k, v := range vc.Labels {
			log.Printf("    %s: %s", k, v)
		}
	}

	if vc.CreateTime != nil {
		log.Printf("  Created:   %v", vc.CreateTime.AsTime())
	}
	if vc.UpdateTime != nil {
		log.Printf("  Updated:   %v", vc.UpdateTime.AsTime())
	}
}

// generateRequestID generates a unique request ID for idempotency.
func generateRequestID() string {
	return fmt.Sprintf("req-%d-%d", time.Now().UnixNano(), os.Getpid())
}
