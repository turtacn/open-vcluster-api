// package: vcluster.api.v1
// file: vcluster/api/v1/vcluster_api.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as vcluster_api_v1_vcluster_api_pb from "../../../vcluster/api/v1/vcluster_api_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";

interface IVClusterServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createVCluster: IVClusterServiceService_ICreateVCluster;
    getVCluster: IVClusterServiceService_IGetVCluster;
    listVClusters: IVClusterServiceService_IListVClusters;
    updateVCluster: IVClusterServiceService_IUpdateVCluster;
    deleteVCluster: IVClusterServiceService_IDeleteVCluster;
    scaleVCluster: IVClusterServiceService_IScaleVCluster;
    suspendVCluster: IVClusterServiceService_ISuspendVCluster;
    resumeVCluster: IVClusterServiceService_IResumeVCluster;
    snapshotVCluster: IVClusterServiceService_ISnapshotVCluster;
    restoreVCluster: IVClusterServiceService_IRestoreVCluster;
    getVClusterKubeconfig: IVClusterServiceService_IGetVClusterKubeconfig;
    watchVCluster: IVClusterServiceService_IWatchVCluster;
}

interface IVClusterServiceService_ICreateVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/CreateVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse>;
}
interface IVClusterServiceService_IGetVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, vcluster_api_v1_vcluster_api_pb.GetVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/GetVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.GetVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.GetVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.GetVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.GetVClusterResponse>;
}
interface IVClusterServiceService_IListVClusters extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, vcluster_api_v1_vcluster_api_pb.ListVClustersResponse> {
    path: "/vcluster.api.v1.VClusterService/ListVClusters";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ListVClustersRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ListVClustersRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ListVClustersResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ListVClustersResponse>;
}
interface IVClusterServiceService_IUpdateVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/UpdateVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse>;
}
interface IVClusterServiceService_IDeleteVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/DeleteVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse>;
}
interface IVClusterServiceService_IScaleVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/ScaleVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse>;
}
interface IVClusterServiceService_ISuspendVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/SuspendVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse>;
}
interface IVClusterServiceService_IResumeVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/ResumeVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse>;
}
interface IVClusterServiceService_ISnapshotVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/SnapshotVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse>;
}
interface IVClusterServiceService_IRestoreVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/RestoreVCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse>;
}
interface IVClusterServiceService_IGetVClusterKubeconfig extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse> {
    path: "/vcluster.api.v1.VClusterService/GetVClusterKubeconfig";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse>;
}
interface IVClusterServiceService_IWatchVCluster extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest, vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse> {
    path: "/vcluster.api.v1.VClusterService/WatchVCluster";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse>;
}

export const VClusterServiceService: IVClusterServiceService;

export interface IVClusterServiceServer extends grpc.UntypedServiceImplementation {
    createVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse>;
    getVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, vcluster_api_v1_vcluster_api_pb.GetVClusterResponse>;
    listVClusters: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, vcluster_api_v1_vcluster_api_pb.ListVClustersResponse>;
    updateVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse>;
    deleteVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse>;
    scaleVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse>;
    suspendVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse>;
    resumeVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse>;
    snapshotVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse>;
    restoreVCluster: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse>;
    getVClusterKubeconfig: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse>;
    watchVCluster: grpc.handleServerStreamingCall<vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest, vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse>;
}

export interface IVClusterServiceClient {
    createVCluster(request: vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse) => void): grpc.ClientUnaryCall;
    createVCluster(request: vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse) => void): grpc.ClientUnaryCall;
    createVCluster(request: vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse) => void): grpc.ClientUnaryCall;
    getVCluster(request: vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterResponse) => void): grpc.ClientUnaryCall;
    getVCluster(request: vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterResponse) => void): grpc.ClientUnaryCall;
    getVCluster(request: vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterResponse) => void): grpc.ClientUnaryCall;
    listVClusters(request: vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListVClustersResponse) => void): grpc.ClientUnaryCall;
    listVClusters(request: vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListVClustersResponse) => void): grpc.ClientUnaryCall;
    listVClusters(request: vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListVClustersResponse) => void): grpc.ClientUnaryCall;
    updateVCluster(request: vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse) => void): grpc.ClientUnaryCall;
    updateVCluster(request: vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse) => void): grpc.ClientUnaryCall;
    updateVCluster(request: vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse) => void): grpc.ClientUnaryCall;
    deleteVCluster(request: vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse) => void): grpc.ClientUnaryCall;
    deleteVCluster(request: vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse) => void): grpc.ClientUnaryCall;
    deleteVCluster(request: vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse) => void): grpc.ClientUnaryCall;
    scaleVCluster(request: vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse) => void): grpc.ClientUnaryCall;
    scaleVCluster(request: vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse) => void): grpc.ClientUnaryCall;
    scaleVCluster(request: vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse) => void): grpc.ClientUnaryCall;
    suspendVCluster(request: vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse) => void): grpc.ClientUnaryCall;
    suspendVCluster(request: vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse) => void): grpc.ClientUnaryCall;
    suspendVCluster(request: vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse) => void): grpc.ClientUnaryCall;
    resumeVCluster(request: vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse) => void): grpc.ClientUnaryCall;
    resumeVCluster(request: vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse) => void): grpc.ClientUnaryCall;
    resumeVCluster(request: vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse) => void): grpc.ClientUnaryCall;
    snapshotVCluster(request: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse) => void): grpc.ClientUnaryCall;
    snapshotVCluster(request: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse) => void): grpc.ClientUnaryCall;
    snapshotVCluster(request: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse) => void): grpc.ClientUnaryCall;
    restoreVCluster(request: vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse) => void): grpc.ClientUnaryCall;
    restoreVCluster(request: vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse) => void): grpc.ClientUnaryCall;
    restoreVCluster(request: vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse) => void): grpc.ClientUnaryCall;
    getVClusterKubeconfig(request: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse) => void): grpc.ClientUnaryCall;
    getVClusterKubeconfig(request: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse) => void): grpc.ClientUnaryCall;
    getVClusterKubeconfig(request: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse) => void): grpc.ClientUnaryCall;
    watchVCluster(request: vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse>;
    watchVCluster(request: vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse>;
}

export class VClusterServiceClient extends grpc.Client implements IVClusterServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createVCluster(request: vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse) => void): grpc.ClientUnaryCall;
    public createVCluster(request: vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse) => void): grpc.ClientUnaryCall;
    public createVCluster(request: vcluster_api_v1_vcluster_api_pb.CreateVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.CreateVClusterResponse) => void): grpc.ClientUnaryCall;
    public getVCluster(request: vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterResponse) => void): grpc.ClientUnaryCall;
    public getVCluster(request: vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterResponse) => void): grpc.ClientUnaryCall;
    public getVCluster(request: vcluster_api_v1_vcluster_api_pb.GetVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterResponse) => void): grpc.ClientUnaryCall;
    public listVClusters(request: vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListVClustersResponse) => void): grpc.ClientUnaryCall;
    public listVClusters(request: vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListVClustersResponse) => void): grpc.ClientUnaryCall;
    public listVClusters(request: vcluster_api_v1_vcluster_api_pb.ListVClustersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListVClustersResponse) => void): grpc.ClientUnaryCall;
    public updateVCluster(request: vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse) => void): grpc.ClientUnaryCall;
    public updateVCluster(request: vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse) => void): grpc.ClientUnaryCall;
    public updateVCluster(request: vcluster_api_v1_vcluster_api_pb.UpdateVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.UpdateVClusterResponse) => void): grpc.ClientUnaryCall;
    public deleteVCluster(request: vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse) => void): grpc.ClientUnaryCall;
    public deleteVCluster(request: vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse) => void): grpc.ClientUnaryCall;
    public deleteVCluster(request: vcluster_api_v1_vcluster_api_pb.DeleteVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteVClusterResponse) => void): grpc.ClientUnaryCall;
    public scaleVCluster(request: vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse) => void): grpc.ClientUnaryCall;
    public scaleVCluster(request: vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse) => void): grpc.ClientUnaryCall;
    public scaleVCluster(request: vcluster_api_v1_vcluster_api_pb.ScaleVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ScaleVClusterResponse) => void): grpc.ClientUnaryCall;
    public suspendVCluster(request: vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse) => void): grpc.ClientUnaryCall;
    public suspendVCluster(request: vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse) => void): grpc.ClientUnaryCall;
    public suspendVCluster(request: vcluster_api_v1_vcluster_api_pb.SuspendVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SuspendVClusterResponse) => void): grpc.ClientUnaryCall;
    public resumeVCluster(request: vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse) => void): grpc.ClientUnaryCall;
    public resumeVCluster(request: vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse) => void): grpc.ClientUnaryCall;
    public resumeVCluster(request: vcluster_api_v1_vcluster_api_pb.ResumeVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ResumeVClusterResponse) => void): grpc.ClientUnaryCall;
    public snapshotVCluster(request: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse) => void): grpc.ClientUnaryCall;
    public snapshotVCluster(request: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse) => void): grpc.ClientUnaryCall;
    public snapshotVCluster(request: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.SnapshotVClusterResponse) => void): grpc.ClientUnaryCall;
    public restoreVCluster(request: vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse) => void): grpc.ClientUnaryCall;
    public restoreVCluster(request: vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse) => void): grpc.ClientUnaryCall;
    public restoreVCluster(request: vcluster_api_v1_vcluster_api_pb.RestoreVClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.RestoreVClusterResponse) => void): grpc.ClientUnaryCall;
    public getVClusterKubeconfig(request: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse) => void): grpc.ClientUnaryCall;
    public getVClusterKubeconfig(request: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse) => void): grpc.ClientUnaryCall;
    public getVClusterKubeconfig(request: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetVClusterKubeconfigResponse) => void): grpc.ClientUnaryCall;
    public watchVCluster(request: vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse>;
    public watchVCluster(request: vcluster_api_v1_vcluster_api_pb.WatchVClusterRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<vcluster_api_v1_vcluster_api_pb.WatchVClusterResponse>;
}

interface ISnapshotServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listSnapshots: ISnapshotServiceService_IListSnapshots;
    getSnapshot: ISnapshotServiceService_IGetSnapshot;
    deleteSnapshot: ISnapshotServiceService_IDeleteSnapshot;
}

interface ISnapshotServiceService_IListSnapshots extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse> {
    path: "/vcluster.api.v1.SnapshotService/ListSnapshots";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse>;
}
interface ISnapshotServiceService_IGetSnapshot extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse> {
    path: "/vcluster.api.v1.SnapshotService/GetSnapshot";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse>;
}
interface ISnapshotServiceService_IDeleteSnapshot extends grpc.MethodDefinition<vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse> {
    path: "/vcluster.api.v1.SnapshotService/DeleteSnapshot";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest>;
    requestDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest>;
    responseSerialize: grpc.serialize<vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse>;
    responseDeserialize: grpc.deserialize<vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse>;
}

export const SnapshotServiceService: ISnapshotServiceService;

export interface ISnapshotServiceServer extends grpc.UntypedServiceImplementation {
    listSnapshots: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse>;
    getSnapshot: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse>;
    deleteSnapshot: grpc.handleUnaryCall<vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse>;
}

export interface ISnapshotServiceClient {
    listSnapshots(request: vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse) => void): grpc.ClientUnaryCall;
    listSnapshots(request: vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse) => void): grpc.ClientUnaryCall;
    listSnapshots(request: vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse) => void): grpc.ClientUnaryCall;
    getSnapshot(request: vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse) => void): grpc.ClientUnaryCall;
    getSnapshot(request: vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse) => void): grpc.ClientUnaryCall;
    getSnapshot(request: vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse) => void): grpc.ClientUnaryCall;
    deleteSnapshot(request: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse) => void): grpc.ClientUnaryCall;
    deleteSnapshot(request: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse) => void): grpc.ClientUnaryCall;
    deleteSnapshot(request: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse) => void): grpc.ClientUnaryCall;
}

export class SnapshotServiceClient extends grpc.Client implements ISnapshotServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public listSnapshots(request: vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse) => void): grpc.ClientUnaryCall;
    public listSnapshots(request: vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse) => void): grpc.ClientUnaryCall;
    public listSnapshots(request: vcluster_api_v1_vcluster_api_pb.ListSnapshotsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.ListSnapshotsResponse) => void): grpc.ClientUnaryCall;
    public getSnapshot(request: vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse) => void): grpc.ClientUnaryCall;
    public getSnapshot(request: vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse) => void): grpc.ClientUnaryCall;
    public getSnapshot(request: vcluster_api_v1_vcluster_api_pb.GetSnapshotRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.GetSnapshotResponse) => void): grpc.ClientUnaryCall;
    public deleteSnapshot(request: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse) => void): grpc.ClientUnaryCall;
    public deleteSnapshot(request: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse) => void): grpc.ClientUnaryCall;
    public deleteSnapshot(request: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vcluster_api_v1_vcluster_api_pb.DeleteSnapshotResponse) => void): grpc.ClientUnaryCall;
}
