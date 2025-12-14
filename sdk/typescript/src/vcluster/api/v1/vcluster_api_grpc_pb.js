// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) 2024 turtacn
// SPDX-License-Identifier: MIT
//
'use strict';
var grpc = require('@grpc/grpc-js');
var vcluster_api_v1_vcluster_api_pb = require('../../../vcluster/api/v1/vcluster_api_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js');

function serialize_vcluster_api_v1_CreateVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.CreateVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_CreateVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_CreateVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.CreateVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_CreateVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_DeleteSnapshotRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.DeleteSnapshotRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_DeleteSnapshotRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_DeleteSnapshotResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.DeleteSnapshotResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_DeleteSnapshotResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_DeleteVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.DeleteVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_DeleteVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_DeleteVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.DeleteVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_DeleteVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_GetSnapshotRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.GetSnapshotRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_GetSnapshotRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_GetSnapshotResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.GetSnapshotResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_GetSnapshotResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_GetVClusterKubeconfigRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.GetVClusterKubeconfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_GetVClusterKubeconfigRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_GetVClusterKubeconfigResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.GetVClusterKubeconfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_GetVClusterKubeconfigResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_GetVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.GetVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.GetVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_GetVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.GetVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_GetVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.GetVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.GetVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_GetVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.GetVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ListSnapshotsRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.ListSnapshotsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ListSnapshotsRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ListSnapshotsResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.ListSnapshotsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ListSnapshotsResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ListVClustersRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ListVClustersRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.ListVClustersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ListVClustersRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ListVClustersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ListVClustersResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ListVClustersResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.ListVClustersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ListVClustersResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ListVClustersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_RestoreVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.RestoreVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_RestoreVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_RestoreVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.RestoreVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_RestoreVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ResumeVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.ResumeVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ResumeVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ResumeVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.ResumeVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ResumeVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ScaleVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.ScaleVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ScaleVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_ScaleVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.ScaleVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_ScaleVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_SnapshotVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.SnapshotVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_SnapshotVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_SnapshotVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.SnapshotVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_SnapshotVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_SuspendVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.SuspendVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_SuspendVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_SuspendVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.SuspendVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_SuspendVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_UpdateVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.UpdateVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_UpdateVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_UpdateVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.UpdateVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_UpdateVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_WatchVClusterRequest(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest)) {
    throw new Error('Expected argument of type vcluster.api.v1.WatchVClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_WatchVClusterRequest(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vcluster_api_v1_WatchVClusterResponse(arg) {
  if (!(arg instanceof vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse)) {
    throw new Error('Expected argument of type vcluster.api.v1.WatchVClusterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vcluster_api_v1_WatchVClusterResponse(buffer_arg) {
  return vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// ============================================================================
// VClusterService - 虚拟集群管理服务
// ============================================================================
//
// VClusterService provides VM-like APIs for managing virtual Kubernetes clusters.
// This service abstracts vcluster operations into familiar IaaS-style semantics
// while preserving vcluster's cloud-native characteristics.
var VClusterServiceService = exports.VClusterServiceService = {
  // CreateVCluster creates a new virtual Kubernetes cluster.
// Similar to VM provisioning, but creates a vcluster control plane.
createVCluster: {
    path: '/vcluster.api.v1.VClusterService/CreateVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_CreateVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_CreateVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_CreateVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_CreateVClusterResponse,
  },
  // GetVCluster retrieves details of a specific virtual cluster.
getVCluster: {
    path: '/vcluster.api.v1.VClusterService/GetVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.GetVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.GetVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_GetVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_GetVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_GetVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_GetVClusterResponse,
  },
  // ListVClusters lists all virtual clusters with pagination support.
listVClusters: {
    path: '/vcluster.api.v1.VClusterService/ListVClusters',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.ListVClustersRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.ListVClustersResponse,
    requestSerialize: serialize_vcluster_api_v1_ListVClustersRequest,
    requestDeserialize: deserialize_vcluster_api_v1_ListVClustersRequest,
    responseSerialize: serialize_vcluster_api_v1_ListVClustersResponse,
    responseDeserialize: deserialize_vcluster_api_v1_ListVClustersResponse,
  },
  // UpdateVCluster updates an existing virtual cluster's configuration.
updateVCluster: {
    path: '/vcluster.api.v1.VClusterService/UpdateVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_UpdateVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_UpdateVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_UpdateVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_UpdateVClusterResponse,
  },
  // DeleteVCluster deletes a virtual cluster and all its resources.
deleteVCluster: {
    path: '/vcluster.api.v1.VClusterService/DeleteVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_DeleteVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_DeleteVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_DeleteVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_DeleteVClusterResponse,
  },
  // ScaleVCluster adjusts the resource allocation of a virtual cluster.
// Similar to VM resizing, but modifies resource quotas and control-plane specs.
scaleVCluster: {
    path: '/vcluster.api.v1.VClusterService/ScaleVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_ScaleVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_ScaleVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_ScaleVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_ScaleVClusterResponse,
  },
  // SuspendVCluster suspends a running virtual cluster.
// Unlike VM power-off, this scales down control-plane pods and optionally drains workloads.
suspendVCluster: {
    path: '/vcluster.api.v1.VClusterService/SuspendVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_SuspendVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_SuspendVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_SuspendVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_SuspendVClusterResponse,
  },
  // ResumeVCluster resumes a suspended virtual cluster.
// Restores control-plane pods and reconciles workload state.
resumeVCluster: {
    path: '/vcluster.api.v1.VClusterService/ResumeVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_ResumeVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_ResumeVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_ResumeVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_ResumeVClusterResponse,
  },
  // SnapshotVCluster creates a point-in-time snapshot of a virtual cluster.
// Captures etcd state and metadata, not disk images like VM snapshots.
snapshotVCluster: {
    path: '/vcluster.api.v1.VClusterService/SnapshotVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_SnapshotVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_SnapshotVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_SnapshotVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_SnapshotVClusterResponse,
  },
  // RestoreVCluster restores a virtual cluster from a snapshot.
restoreVCluster: {
    path: '/vcluster.api.v1.VClusterService/RestoreVCluster',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_RestoreVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_RestoreVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_RestoreVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_RestoreVClusterResponse,
  },
  // GetVClusterKubeconfig retrieves the kubeconfig for accessing a virtual cluster.
getVClusterKubeconfig: {
    path: '/vcluster.api.v1.VClusterService/GetVClusterKubeconfig',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse,
    requestSerialize: serialize_vcluster_api_v1_GetVClusterKubeconfigRequest,
    requestDeserialize: deserialize_vcluster_api_v1_GetVClusterKubeconfigRequest,
    responseSerialize: serialize_vcluster_api_v1_GetVClusterKubeconfigResponse,
    responseDeserialize: deserialize_vcluster_api_v1_GetVClusterKubeconfigResponse,
  },
  // WatchVCluster streams real-time updates for a virtual cluster.
watchVCluster: {
    path: '/vcluster.api.v1.VClusterService/WatchVCluster',
    requestStream: false,
    responseStream: true,
    requestType: vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse,
    requestSerialize: serialize_vcluster_api_v1_WatchVClusterRequest,
    requestDeserialize: deserialize_vcluster_api_v1_WatchVClusterRequest,
    responseSerialize: serialize_vcluster_api_v1_WatchVClusterResponse,
    responseDeserialize: deserialize_vcluster_api_v1_WatchVClusterResponse,
  },
};

exports.VClusterServiceClient = grpc.makeGenericClientConstructor(VClusterServiceService, 'VClusterService');
// ============================================================================
// Snapshot Service Messages
// ============================================================================
//
// SnapshotService provides APIs for managing vcluster snapshots.
var SnapshotServiceService = exports.SnapshotServiceService = {
  // ListSnapshots lists all snapshots for a vcluster.
listSnapshots: {
    path: '/vcluster.api.v1.SnapshotService/ListSnapshots',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse,
    requestSerialize: serialize_vcluster_api_v1_ListSnapshotsRequest,
    requestDeserialize: deserialize_vcluster_api_v1_ListSnapshotsRequest,
    responseSerialize: serialize_vcluster_api_v1_ListSnapshotsResponse,
    responseDeserialize: deserialize_vcluster_api_v1_ListSnapshotsResponse,
  },
  // GetSnapshot retrieves a specific snapshot.
getSnapshot: {
    path: '/vcluster.api.v1.SnapshotService/GetSnapshot',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse,
    requestSerialize: serialize_vcluster_api_v1_GetSnapshotRequest,
    requestDeserialize: deserialize_vcluster_api_v1_GetSnapshotRequest,
    responseSerialize: serialize_vcluster_api_v1_GetSnapshotResponse,
    responseDeserialize: deserialize_vcluster_api_v1_GetSnapshotResponse,
  },
  // DeleteSnapshot deletes a snapshot.
deleteSnapshot: {
    path: '/vcluster.api.v1.SnapshotService/DeleteSnapshot',
    requestStream: false,
    responseStream: false,
    requestType: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest,
    responseType: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse,
    requestSerialize: serialize_vcluster_api_v1_DeleteSnapshotRequest,
    requestDeserialize: deserialize_vcluster_api_v1_DeleteSnapshotRequest,
    responseSerialize: serialize_vcluster_api_v1_DeleteSnapshotResponse,
    responseDeserialize: deserialize_vcluster_api_v1_DeleteSnapshotResponse,
  },
};

exports.SnapshotServiceClient = grpc.makeGenericClientConstructor(SnapshotServiceService, 'SnapshotService');
