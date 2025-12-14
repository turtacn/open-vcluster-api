package v1

import (
	"context"
	"log"
	"net"
	"testing"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/test/bufconn"
	"google.golang.org/protobuf/types/known/timestamppb"
)

const bufSize = 1024 * 1024

var lis *bufconn.Listener

// mockServer implements the VClusterServiceServer interface for testing
type mockServer struct {
	UnimplementedVClusterServiceServer
	vclusters map[string]*VCluster
}

func (s *mockServer) CreateVCluster(ctx context.Context, req *CreateVClusterRequest) (*CreateVClusterResponse, error) {
	vc := &VCluster{
		Id:         "test-id",
		Name:       req.Name,
		Namespace:  req.Namespace,
		Spec:       req.Spec,
		Labels:     req.Labels,
		CreateTime: timestamppb.Now(),
		Status: &VClusterStatus{
			Phase:   Phase_PHASE_CREATING,
			Message: "VCluster is being created",
		},
	}
	s.vclusters[req.Name] = vc
	return &CreateVClusterResponse{Vcluster: vc}, nil
}

func (s *mockServer) GetVCluster(ctx context.Context, req *GetVClusterRequest) (*GetVClusterResponse, error) {
	if vc, ok := s.vclusters[req.Name]; ok {
		return &GetVClusterResponse{Vcluster: vc}, nil
	}
	return nil, nil // Error handling omitted for brevity
}

func init() {
	lis = bufconn.Listen(bufSize)
	s := grpc.NewServer()
	RegisterVClusterServiceServer(s, &mockServer{
		vclusters: make(map[string]*VCluster),
	})
	go func() {
		if err := s.Serve(lis); err != nil {
			log.Fatalf("Server exited with error: %v", err)
		}
	}()
}

func bufDialer(context.Context, string) (net.Conn, error) {
	return lis.Dial()
}

func TestCreateVCluster(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := NewVClusterServiceClient(conn)

	req := &CreateVClusterRequest{
		Name:      "test-vcluster",
		Namespace: "default",
		Spec: &VClusterSpec{
			KubernetesVersion: "1.28.0",
			Distro:            "k3s",
		},
	}

	resp, err := client.CreateVCluster(ctx, req)
	if err != nil {
		t.Fatalf("CreateVCluster failed: %v", err)
	}

	if resp.Vcluster.Name != req.Name {
		t.Errorf("Expected name %s, got %s", req.Name, resp.Vcluster.Name)
	}
	if resp.Vcluster.Status.Phase != Phase_PHASE_CREATING {
		t.Errorf("Expected phase %s, got %s", Phase_PHASE_CREATING, resp.Vcluster.Status.Phase)
	}
}
