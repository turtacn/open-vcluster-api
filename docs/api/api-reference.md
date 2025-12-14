# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [vcluster/api/v1/vcluster_api.proto](#vcluster_api_v1_vcluster_api-proto)
    - [Condition](#vcluster-api-v1-Condition)
    - [CreateVClusterRequest](#vcluster-api-v1-CreateVClusterRequest)
    - [CreateVClusterRequest.LabelsEntry](#vcluster-api-v1-CreateVClusterRequest-LabelsEntry)
    - [CreateVClusterResponse](#vcluster-api-v1-CreateVClusterResponse)
    - [DNSConfig](#vcluster-api-v1-DNSConfig)
    - [DeleteSnapshotRequest](#vcluster-api-v1-DeleteSnapshotRequest)
    - [DeleteSnapshotResponse](#vcluster-api-v1-DeleteSnapshotResponse)
    - [DeleteVClusterRequest](#vcluster-api-v1-DeleteVClusterRequest)
    - [DeleteVClusterResponse](#vcluster-api-v1-DeleteVClusterResponse)
    - [GetSnapshotRequest](#vcluster-api-v1-GetSnapshotRequest)
    - [GetSnapshotResponse](#vcluster-api-v1-GetSnapshotResponse)
    - [GetVClusterKubeconfigRequest](#vcluster-api-v1-GetVClusterKubeconfigRequest)
    - [GetVClusterKubeconfigResponse](#vcluster-api-v1-GetVClusterKubeconfigResponse)
    - [GetVClusterRequest](#vcluster-api-v1-GetVClusterRequest)
    - [GetVClusterResponse](#vcluster-api-v1-GetVClusterResponse)
    - [HelmReleaseInfo](#vcluster-api-v1-HelmReleaseInfo)
    - [IngressConfig](#vcluster-api-v1-IngressConfig)
    - [IngressConfig.AnnotationsEntry](#vcluster-api-v1-IngressConfig-AnnotationsEntry)
    - [ListSnapshotsRequest](#vcluster-api-v1-ListSnapshotsRequest)
    - [ListSnapshotsResponse](#vcluster-api-v1-ListSnapshotsResponse)
    - [ListVClustersRequest](#vcluster-api-v1-ListVClustersRequest)
    - [ListVClustersResponse](#vcluster-api-v1-ListVClustersResponse)
    - [NetworkConfig](#vcluster-api-v1-NetworkConfig)
    - [PluginConfig](#vcluster-api-v1-PluginConfig)
    - [ResourceRequirements](#vcluster-api-v1-ResourceRequirements)
    - [ResourceUsage](#vcluster-api-v1-ResourceUsage)
    - [RestoreVClusterRequest](#vcluster-api-v1-RestoreVClusterRequest)
    - [RestoreVClusterResponse](#vcluster-api-v1-RestoreVClusterResponse)
    - [ResumeVClusterRequest](#vcluster-api-v1-ResumeVClusterRequest)
    - [ResumeVClusterResponse](#vcluster-api-v1-ResumeVClusterResponse)
    - [ScaleVClusterRequest](#vcluster-api-v1-ScaleVClusterRequest)
    - [ScaleVClusterResponse](#vcluster-api-v1-ScaleVClusterResponse)
    - [ServiceAccountConfig](#vcluster-api-v1-ServiceAccountConfig)
    - [ServiceAccountConfig.AnnotationsEntry](#vcluster-api-v1-ServiceAccountConfig-AnnotationsEntry)
    - [Snapshot](#vcluster-api-v1-Snapshot)
    - [Snapshot.LabelsEntry](#vcluster-api-v1-Snapshot-LabelsEntry)
    - [SnapshotInfo](#vcluster-api-v1-SnapshotInfo)
    - [SnapshotVClusterRequest](#vcluster-api-v1-SnapshotVClusterRequest)
    - [SnapshotVClusterRequest.LabelsEntry](#vcluster-api-v1-SnapshotVClusterRequest-LabelsEntry)
    - [SnapshotVClusterResponse](#vcluster-api-v1-SnapshotVClusterResponse)
    - [StorageConfig](#vcluster-api-v1-StorageConfig)
    - [SuspendVClusterRequest](#vcluster-api-v1-SuspendVClusterRequest)
    - [SuspendVClusterResponse](#vcluster-api-v1-SuspendVClusterResponse)
    - [SyncConfig](#vcluster-api-v1-SyncConfig)
    - [TLSConfig](#vcluster-api-v1-TLSConfig)
    - [UpdateVClusterRequest](#vcluster-api-v1-UpdateVClusterRequest)
    - [UpdateVClusterRequest.LabelsEntry](#vcluster-api-v1-UpdateVClusterRequest-LabelsEntry)
    - [UpdateVClusterResponse](#vcluster-api-v1-UpdateVClusterResponse)
    - [VCluster](#vcluster-api-v1-VCluster)
    - [VCluster.AnnotationsEntry](#vcluster-api-v1-VCluster-AnnotationsEntry)
    - [VCluster.LabelsEntry](#vcluster-api-v1-VCluster-LabelsEntry)
    - [VClusterSpec](#vcluster-api-v1-VClusterSpec)
    - [VClusterStatus](#vcluster-api-v1-VClusterStatus)
    - [WatchVClusterRequest](#vcluster-api-v1-WatchVClusterRequest)
    - [WatchVClusterResponse](#vcluster-api-v1-WatchVClusterResponse)

    - [Phase](#vcluster-api-v1-Phase)
    - [SnapshotStatus](#vcluster-api-v1-SnapshotStatus)
    - [WatchEventType](#vcluster-api-v1-WatchEventType)

    - [SnapshotService](#vcluster-api-v1-SnapshotService)
    - [VClusterService](#vcluster-api-v1-VClusterService)

- [Scalar Value Types](#scalar-value-types)



<a name="vcluster_api_v1_vcluster_api-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## vcluster/api/v1/vcluster_api.proto



<a name="vcluster-api-v1-Condition"></a>

### Condition
Condition represents a condition of the vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [string](#string) |  | Type of condition (e.g., &#34;Ready&#34;, &#34;Synced&#34;, &#34;ControlPlaneReady&#34;) |
| status | [string](#string) |  | Status of the condition: &#34;True&#34;, &#34;False&#34;, &#34;Unknown&#34; |
| reason | [string](#string) |  | Reason for the condition&#39;s last transition |
| message | [string](#string) |  | Human-readable message |
| last_transition_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Last time the condition transitioned |
| last_probe_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Last time the condition was probed |






<a name="vcluster-api-v1-CreateVClusterRequest"></a>

### CreateVClusterRequest
CreateVClusterRequest is the request for creating a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Desired name for the vcluster (must be unique within namespace) |
| namespace | [string](#string) |  | Target namespace on the host cluster |
| spec | [VClusterSpec](#vcluster-api-v1-VClusterSpec) |  | VCluster specification |
| labels | [CreateVClusterRequest.LabelsEntry](#vcluster-api-v1-CreateVClusterRequest-LabelsEntry) | repeated | User-defined labels |
| request_id | [string](#string) |  | Optional: client-generated unique request ID for idempotency |
| wait_for_ready | [bool](#bool) |  | Wait for the vcluster to be ready before returning |
| timeout_seconds | [int32](#int32) |  | Timeout for waiting (in seconds) |






<a name="vcluster-api-v1-CreateVClusterRequest-LabelsEntry"></a>

### CreateVClusterRequest.LabelsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-CreateVClusterResponse"></a>

### CreateVClusterResponse
CreateVClusterResponse is the response for creating a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The created vcluster |
| operation_id | [string](#string) |  | Operation ID for tracking async operations |






<a name="vcluster-api-v1-DNSConfig"></a>

### DNSConfig
DNSConfig defines DNS settings.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| nameservers | [string](#string) | repeated | Custom nameservers |
| searches | [string](#string) | repeated | Search domains |
| options | [string](#string) | repeated | DNS options |






<a name="vcluster-api-v1-DeleteSnapshotRequest"></a>

### DeleteSnapshotRequest
DeleteSnapshotRequest is the request for deleting a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Snapshot ID |
| force | [bool](#bool) |  | Force delete |






<a name="vcluster-api-v1-DeleteSnapshotResponse"></a>

### DeleteSnapshotResponse
DeleteSnapshotResponse is the response for deleting a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| delete_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Deletion timestamp |






<a name="vcluster-api-v1-DeleteVClusterRequest"></a>

### DeleteVClusterRequest
DeleteVClusterRequest is the request for deleting a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| force | [bool](#bool) |  | Force delete even if resources exist |
| delete_snapshots | [bool](#bool) |  | Delete associated snapshots |
| grace_period_seconds | [int32](#int32) |  | Grace period in seconds |






<a name="vcluster-api-v1-DeleteVClusterResponse"></a>

### DeleteVClusterResponse
DeleteVClusterResponse is the response for deleting a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| operation_id | [string](#string) |  | Operation ID for tracking |
| delete_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Deletion initiated timestamp |






<a name="vcluster-api-v1-GetSnapshotRequest"></a>

### GetSnapshotRequest
GetSnapshotRequest is the request for getting a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Snapshot ID |
| name | [string](#string) |  | Or snapshot name with namespace |
| namespace | [string](#string) |  |  |






<a name="vcluster-api-v1-GetSnapshotResponse"></a>

### GetSnapshotResponse
GetSnapshotResponse is the response for getting a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| snapshot | [Snapshot](#vcluster-api-v1-Snapshot) |  | The snapshot |






<a name="vcluster-api-v1-GetVClusterKubeconfigRequest"></a>

### GetVClusterKubeconfigRequest
GetVClusterKubeconfigRequest is the request for getting kubeconfig.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| format | [string](#string) |  | Kubeconfig format: &#34;default&#34;, &#34;exec&#34;, &#34;token&#34; |
| validity_hours | [int32](#int32) |  | Validity duration for token-based kubeconfig (in hours) |






<a name="vcluster-api-v1-GetVClusterKubeconfigResponse"></a>

### GetVClusterKubeconfigResponse
GetVClusterKubeconfigResponse is the response for getting kubeconfig.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kubeconfig | [string](#string) |  | Base64-encoded kubeconfig |
| api_server_endpoint | [string](#string) |  | API server endpoint |
| expires_at | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Expiration time (for token-based kubeconfig) |






<a name="vcluster-api-v1-GetVClusterRequest"></a>

### GetVClusterRequest
GetVClusterRequest is the request for getting a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| id | [string](#string) |  | Optional: specific vcluster ID |
| include_kubeconfig | [bool](#bool) |  | Include kubeconfig in the response |






<a name="vcluster-api-v1-GetVClusterResponse"></a>

### GetVClusterResponse
GetVClusterResponse is the response for getting a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The requested vcluster |






<a name="vcluster-api-v1-HelmReleaseInfo"></a>

### HelmReleaseInfo
HelmReleaseInfo contains Helm release information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Release name |
| chart_version | [string](#string) |  | Chart version |
| app_version | [string](#string) |  | App version |
| status | [string](#string) |  | Release status |
| revision | [int32](#int32) |  | Revision number |






<a name="vcluster-api-v1-IngressConfig"></a>

### IngressConfig
IngressConfig defines ingress settings for API server exposure.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enabled | [bool](#bool) |  | Enable ingress for API server |
| ingress_class | [string](#string) |  | Ingress class name |
| hostname | [string](#string) |  | Hostname for the ingress |
| tls | [TLSConfig](#vcluster-api-v1-TLSConfig) |  | TLS configuration |
| annotations | [IngressConfig.AnnotationsEntry](#vcluster-api-v1-IngressConfig-AnnotationsEntry) | repeated | Additional ingress annotations |






<a name="vcluster-api-v1-IngressConfig-AnnotationsEntry"></a>

### IngressConfig.AnnotationsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-ListSnapshotsRequest"></a>

### ListSnapshotsRequest
ListSnapshotsRequest is the request for listing snapshots.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster_name | [string](#string) |  | Filter by vcluster name |
| namespace | [string](#string) |  | Filter by namespace |
| page_size | [int32](#int32) |  | Page size |
| page_token | [string](#string) |  | Page token |
| label_selector | [string](#string) |  | Label selector |






<a name="vcluster-api-v1-ListSnapshotsResponse"></a>

### ListSnapshotsResponse
ListSnapshotsResponse is the response for listing snapshots.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| snapshots | [Snapshot](#vcluster-api-v1-Snapshot) | repeated | List of snapshots |
| next_page_token | [string](#string) |  | Next page token |
| total_count | [int32](#int32) |  | Total count |






<a name="vcluster-api-v1-ListVClustersRequest"></a>

### ListVClustersRequest
ListVClustersRequest is the request for listing vclusters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| namespace | [string](#string) |  | Filter by namespace (empty means all namespaces) |
| page_size | [int32](#int32) |  | Maximum number of items to return |
| page_token | [string](#string) |  | Page token from previous response |
| label_selector | [string](#string) |  | Label selector (e.g., &#34;env=prod,team=backend&#34;) |
| phases | [Phase](#vcluster-api-v1-Phase) | repeated | Filter by phase |
| owner | [string](#string) |  | Filter by owner |
| project | [string](#string) |  | Filter by project |
| order_by | [string](#string) |  | Sort order: &#34;name&#34;, &#34;create_time&#34;, &#34;-create_time&#34; |






<a name="vcluster-api-v1-ListVClustersResponse"></a>

### ListVClustersResponse
ListVClustersResponse is the response for listing vclusters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vclusters | [VCluster](#vcluster-api-v1-VCluster) | repeated | List of vclusters |
| next_page_token | [string](#string) |  | Token for fetching the next page |
| total_count | [int32](#int32) |  | Total count of matching vclusters |






<a name="vcluster-api-v1-NetworkConfig"></a>

### NetworkConfig
NetworkConfig defines network settings for the virtual cluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pod_cidr | [string](#string) |  | Pod CIDR for the virtual cluster |
| service_cidr | [string](#string) |  | Service CIDR for the virtual cluster |
| enable_network_policies | [bool](#bool) |  | Enable network policies |
| dns_service_ip | [string](#string) |  | DNS service IP |
| dns | [DNSConfig](#vcluster-api-v1-DNSConfig) |  | Custom DNS configuration |






<a name="vcluster-api-v1-PluginConfig"></a>

### PluginConfig
PluginConfig defines a vcluster plugin configuration.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Plugin name |
| version | [string](#string) |  | Plugin version |
| config | [string](#string) |  | Plugin configuration as YAML/JSON string |
| enabled | [bool](#bool) |  | Whether the plugin is enabled |






<a name="vcluster-api-v1-ResourceRequirements"></a>

### ResourceRequirements
ResourceRequirements defines CPU and memory requirements.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| cpu_request | [string](#string) |  | CPU request (e.g., &#34;100m&#34;, &#34;1&#34;) |
| cpu_limit | [string](#string) |  | CPU limit (e.g., &#34;500m&#34;, &#34;2&#34;) |
| memory_request | [string](#string) |  | Memory request (e.g., &#34;128Mi&#34;, &#34;1Gi&#34;) |
| memory_limit | [string](#string) |  | Memory limit (e.g., &#34;512Mi&#34;, &#34;2Gi&#34;) |
| ephemeral_storage_request | [string](#string) |  | Ephemeral storage request |
| ephemeral_storage_limit | [string](#string) |  | Ephemeral storage limit |






<a name="vcluster-api-v1-ResourceUsage"></a>

### ResourceUsage
ResourceUsage represents current resource consumption.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| cpu_usage | [string](#string) |  | Current CPU usage |
| memory_usage | [string](#string) |  | Current memory usage |
| storage_usage | [string](#string) |  | Current storage usage |
| pod_count | [int32](#int32) |  | Number of pods running in the vcluster |
| namespace_count | [int32](#int32) |  | Number of namespaces in the vcluster |
| service_count | [int32](#int32) |  | Number of services in the vcluster |






<a name="vcluster-api-v1-RestoreVClusterRequest"></a>

### RestoreVClusterRequest
RestoreVClusterRequest is the request for restoring from a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name to restore |
| namespace | [string](#string) |  | Namespace |
| snapshot_id | [string](#string) |  | Snapshot ID to restore from |
| create_new | [bool](#bool) |  | Create a new vcluster instead of overwriting |
| new_name | [string](#string) |  | New vcluster name (if create_new is true) |
| new_namespace | [string](#string) |  | New namespace (if create_new is true) |
| restore_workloads | [bool](#bool) |  | Restore workloads |






<a name="vcluster-api-v1-RestoreVClusterResponse"></a>

### RestoreVClusterResponse
RestoreVClusterResponse is the response for restoring from a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The restored vcluster |
| operation_id | [string](#string) |  | Operation ID for tracking |






<a name="vcluster-api-v1-ResumeVClusterRequest"></a>

### ResumeVClusterRequest
ResumeVClusterRequest is the request for resuming a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| reconcile_workloads | [bool](#bool) |  | Reconcile workloads after resuming |






<a name="vcluster-api-v1-ResumeVClusterResponse"></a>

### ResumeVClusterResponse
ResumeVClusterResponse is the response for resuming a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The resumed vcluster |
| operation_id | [string](#string) |  | Operation ID for tracking |






<a name="vcluster-api-v1-ScaleVClusterRequest"></a>

### ScaleVClusterRequest
ScaleVClusterRequest is the request for scaling a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| resources | [ResourceRequirements](#vcluster-api-v1-ResourceRequirements) |  | New resource requirements |
| replicas | [int32](#int32) |  | New replica count for control plane |






<a name="vcluster-api-v1-ScaleVClusterResponse"></a>

### ScaleVClusterResponse
ScaleVClusterResponse is the response for scaling a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The scaled vcluster |
| operation_id | [string](#string) |  | Operation ID for tracking |






<a name="vcluster-api-v1-ServiceAccountConfig"></a>

### ServiceAccountConfig
ServiceAccountConfig defines service account settings.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Service account name |
| annotations | [ServiceAccountConfig.AnnotationsEntry](#vcluster-api-v1-ServiceAccountConfig-AnnotationsEntry) | repeated | Annotations for the service account |
| automount_token | [bool](#bool) |  | Enable automounting of service account token |






<a name="vcluster-api-v1-ServiceAccountConfig-AnnotationsEntry"></a>

### ServiceAccountConfig.AnnotationsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-Snapshot"></a>

### Snapshot
Snapshot represents a point-in-time snapshot of a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique identifier |
| name | [string](#string) |  | Snapshot name |
| vcluster_id | [string](#string) |  | VCluster ID this snapshot belongs to |
| vcluster_name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| status | [SnapshotStatus](#vcluster-api-v1-SnapshotStatus) |  | Snapshot status |
| size_bytes | [int64](#int64) |  | Size in bytes |
| create_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Creation timestamp |
| expire_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Expiration timestamp |
| labels | [Snapshot.LabelsEntry](#vcluster-api-v1-Snapshot-LabelsEntry) | repeated | Labels |
| description | [string](#string) |  | Description |
| storage_uri | [string](#string) |  | Storage location URI |






<a name="vcluster-api-v1-Snapshot-LabelsEntry"></a>

### Snapshot.LabelsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-SnapshotInfo"></a>

### SnapshotInfo
SnapshotInfo contains information about a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Snapshot ID |
| name | [string](#string) |  | Snapshot name |
| create_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Creation timestamp |
| size_bytes | [int64](#int64) |  | Snapshot size in bytes |
| status | [string](#string) |  | Snapshot status |






<a name="vcluster-api-v1-SnapshotVClusterRequest"></a>

### SnapshotVClusterRequest
SnapshotVClusterRequest is the request for creating a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| snapshot_name | [string](#string) |  | Snapshot name |
| description | [string](#string) |  | Snapshot description |
| retention_hours | [int32](#int32) |  | Retention period in hours (0 = indefinite) |
| labels | [SnapshotVClusterRequest.LabelsEntry](#vcluster-api-v1-SnapshotVClusterRequest-LabelsEntry) | repeated | Labels for the snapshot |
| include_workloads | [bool](#bool) |  | Include workload state |






<a name="vcluster-api-v1-SnapshotVClusterRequest-LabelsEntry"></a>

### SnapshotVClusterRequest.LabelsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-SnapshotVClusterResponse"></a>

### SnapshotVClusterResponse
SnapshotVClusterResponse is the response for creating a snapshot.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| snapshot | [Snapshot](#vcluster-api-v1-Snapshot) |  | The created snapshot |
| operation_id | [string](#string) |  | Operation ID for tracking |






<a name="vcluster-api-v1-StorageConfig"></a>

### StorageConfig
StorageConfig defines storage settings for the virtual cluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| default_storage_class | [string](#string) |  | Default storage class name |
| enable_persistence | [bool](#bool) |  | Enable persistent storage for etcd |
| persistence_size | [string](#string) |  | Persistent volume size for etcd (e.g., &#34;5Gi&#34;) |
| persistence_storage_class | [string](#string) |  | Storage class for persistence |






<a name="vcluster-api-v1-SuspendVClusterRequest"></a>

### SuspendVClusterRequest
SuspendVClusterRequest is the request for suspending a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| drain_workloads | [bool](#bool) |  | Drain workloads before suspending |
| drain_timeout_seconds | [int32](#int32) |  | Timeout for draining (in seconds) |
| create_snapshot | [bool](#bool) |  | Create a snapshot before suspending |
| snapshot_name | [string](#string) |  | Snapshot name (if create_snapshot is true) |






<a name="vcluster-api-v1-SuspendVClusterResponse"></a>

### SuspendVClusterResponse
SuspendVClusterResponse is the response for suspending a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The suspended vcluster |
| snapshot | [Snapshot](#vcluster-api-v1-Snapshot) |  | Snapshot created (if requested) |
| operation_id | [string](#string) |  | Operation ID for tracking |






<a name="vcluster-api-v1-SyncConfig"></a>

### SyncConfig
SyncConfig defines what resources to sync between host and virtual cluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sync_nodes | [bool](#bool) |  | Sync nodes from host cluster |
| sync_persistent_volumes | [bool](#bool) |  | Sync persistent volumes |
| sync_storage_classes | [bool](#bool) |  | Sync storage classes |
| sync_ingresses | [bool](#bool) |  | Sync ingresses |
| sync_priority_classes | [bool](#bool) |  | Sync priority classes |
| sync_network_policies | [bool](#bool) |  | Sync network policies |
| sync_pod_disruption_budgets | [bool](#bool) |  | Sync pod disruption budgets |
| custom_resources | [string](#string) | repeated | Custom resource definitions to sync |






<a name="vcluster-api-v1-TLSConfig"></a>

### TLSConfig
TLSConfig defines TLS settings.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enabled | [bool](#bool) |  | Enable TLS |
| secret_name | [string](#string) |  | Secret name containing TLS certificate |
| use_cert_manager | [bool](#bool) |  | Use cert-manager for certificate management |
| issuer_name | [string](#string) |  | Cert-manager issuer name |






<a name="vcluster-api-v1-UpdateVClusterRequest"></a>

### UpdateVClusterRequest
UpdateVClusterRequest is the request for updating a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name |
| namespace | [string](#string) |  | Namespace |
| spec | [VClusterSpec](#vcluster-api-v1-VClusterSpec) |  | Updated specification |
| update_mask | [google.protobuf.FieldMask](#google-protobuf-FieldMask) |  | Fields to update (for partial updates) |
| labels | [UpdateVClusterRequest.LabelsEntry](#vcluster-api-v1-UpdateVClusterRequest-LabelsEntry) | repeated | Labels to update |






<a name="vcluster-api-v1-UpdateVClusterRequest-LabelsEntry"></a>

### UpdateVClusterRequest.LabelsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-UpdateVClusterResponse"></a>

### UpdateVClusterResponse
UpdateVClusterResponse is the response for updating a vcluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The updated vcluster |
| operation_id | [string](#string) |  | Operation ID for tracking |






<a name="vcluster-api-v1-VCluster"></a>

### VCluster
VCluster represents a virtual Kubernetes cluster.
This is the primary resource managed by the VClusterService.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique identifier for the vcluster. |
| name | [string](#string) |  | Human-readable name of the vcluster. Must be unique within a namespace. |
| namespace | [string](#string) |  | Kubernetes namespace where the vcluster is deployed on the host cluster. |
| spec | [VClusterSpec](#vcluster-api-v1-VClusterSpec) |  | Desired state specification. |
| status | [VClusterStatus](#vcluster-api-v1-VClusterStatus) |  | Current observed state. |
| labels | [VCluster.LabelsEntry](#vcluster-api-v1-VCluster-LabelsEntry) | repeated | User-defined labels for organization and filtering. |
| annotations | [VCluster.AnnotationsEntry](#vcluster-api-v1-VCluster-AnnotationsEntry) | repeated | System-managed annotations. |
| create_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Timestamp when the vcluster was created. |
| update_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Timestamp when the vcluster was last updated. |
| delete_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Timestamp when the vcluster was deleted (for soft-delete scenarios). |
| owner | [string](#string) |  | Owner reference for multi-tenancy. |
| project | [string](#string) |  | Project or team identifier. |






<a name="vcluster-api-v1-VCluster-AnnotationsEntry"></a>

### VCluster.AnnotationsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-VCluster-LabelsEntry"></a>

### VCluster.LabelsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="vcluster-api-v1-VClusterSpec"></a>

### VClusterSpec
VClusterSpec defines the desired state of a virtual cluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kubernetes_version | [string](#string) |  | Kubernetes version for the virtual cluster. Example: &#34;1.28.0&#34;, &#34;1.27.5&#34; |
| resources | [ResourceRequirements](#vcluster-api-v1-ResourceRequirements) |  | Resource requirements for the vcluster control plane. |
| replicas | [int32](#int32) |  | Number of control plane replicas for high availability. 1 = single instance, 3 = HA mode |
| network | [NetworkConfig](#vcluster-api-v1-NetworkConfig) |  | Network configuration for the virtual cluster. |
| storage | [StorageConfig](#vcluster-api-v1-StorageConfig) |  | Storage configuration for the virtual cluster. |
| enable_ha | [bool](#bool) |  | Enable high availability mode. |
| distro | [string](#string) |  | vcluster distribution type. Options: &#34;k3s&#34;, &#34;k8s&#34;, &#34;k0s&#34;, &#34;eks&#34; |
| helm_values | [string](#string) |  | Additional Helm values for vcluster customization. |
| sync | [SyncConfig](#vcluster-api-v1-SyncConfig) |  | Sync configuration for resource synchronization. |
| plugins | [PluginConfig](#vcluster-api-v1-PluginConfig) | repeated | Plugin configurations. |
| ingress | [IngressConfig](#vcluster-api-v1-IngressConfig) |  | Ingress configuration for exposing the API server. |
| service_account | [ServiceAccountConfig](#vcluster-api-v1-ServiceAccountConfig) |  | Service account configuration. |
| isolation_mode | [string](#string) |  | Isolation mode: &#34;full&#34;, &#34;lite&#34; |






<a name="vcluster-api-v1-VClusterStatus"></a>

### VClusterStatus
VClusterStatus represents the current observed state of a virtual cluster.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| phase | [Phase](#vcluster-api-v1-Phase) |  | Current phase of the vcluster lifecycle. |
| message | [string](#string) |  | Human-readable message describing the current state. |
| reason | [string](#string) |  | Detailed reason for the current phase. |
| conditions | [Condition](#vcluster-api-v1-Condition) | repeated | List of conditions representing the vcluster&#39;s state. |
| kubeconfig | [string](#string) |  | Base64-encoded kubeconfig for accessing the virtual cluster. |
| api_server_endpoint | [string](#string) |  | API server endpoint URL. |
| current_usage | [ResourceUsage](#vcluster-api-v1-ResourceUsage) |  | Current resource usage metrics. |
| ready_replicas | [int32](#int32) |  | Number of ready replicas. |
| total_replicas | [int32](#int32) |  | Total number of desired replicas. |
| ready_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Timestamp when the vcluster became ready. |
| last_snapshot | [SnapshotInfo](#vcluster-api-v1-SnapshotInfo) |  | Last snapshot information. |
| helm_release | [HelmReleaseInfo](#vcluster-api-v1-HelmReleaseInfo) |  | Helm release information. |
| observed_generation | [int64](#int64) |  | Observed generation for optimistic concurrency. |






<a name="vcluster-api-v1-WatchVClusterRequest"></a>

### WatchVClusterRequest
WatchVClusterRequest is the request for watching vcluster updates.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | VCluster name (empty for all in namespace) |
| namespace | [string](#string) |  | Namespace (empty for all namespaces) |
| label_selector | [string](#string) |  | Label selector |
| resource_version | [string](#string) |  | Resource version to start watching from |






<a name="vcluster-api-v1-WatchVClusterResponse"></a>

### WatchVClusterResponse
WatchVClusterResponse is a stream response for vcluster updates.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [WatchEventType](#vcluster-api-v1-WatchEventType) |  | Event type |
| vcluster | [VCluster](#vcluster-api-v1-VCluster) |  | The vcluster object |








<a name="vcluster-api-v1-Phase"></a>

### Phase
Phase represents the lifecycle phase of a vcluster.

| Name | Number | Description |
| ---- | ------ | ----------- |
| PHASE_UNSPECIFIED | 0 | Unknown or unspecified phase. |
| PHASE_CREATING | 1 | VCluster is being created. |
| PHASE_RUNNING | 2 | VCluster is running and ready to accept workloads. |
| PHASE_SUSPENDED | 3 | VCluster is suspended (control plane stopped). |
| PHASE_SCALING | 4 | VCluster is being scaled. |
| PHASE_DELETING | 5 | VCluster is being deleted. |
| PHASE_ERROR | 6 | VCluster encountered an error. |
| PHASE_UPDATING | 7 | VCluster is being updated. |
| PHASE_RESTORING | 8 | VCluster is being restored from a snapshot. |
| PHASE_SNAPSHOTTING | 9 | VCluster is being snapshotted. |
| PHASE_RESUMING | 10 | VCluster is resuming from suspended state. |
| PHASE_PENDING | 11 | VCluster is pending resource allocation. |



<a name="vcluster-api-v1-SnapshotStatus"></a>

### SnapshotStatus
SnapshotStatus represents the status of a snapshot.

| Name | Number | Description |
| ---- | ------ | ----------- |
| SNAPSHOT_STATUS_UNSPECIFIED | 0 |  |
| SNAPSHOT_STATUS_CREATING | 1 |  |
| SNAPSHOT_STATUS_READY | 2 |  |
| SNAPSHOT_STATUS_FAILED | 3 |  |
| SNAPSHOT_STATUS_DELETING | 4 |  |



<a name="vcluster-api-v1-WatchEventType"></a>

### WatchEventType
WatchEventType represents the type of watch event.

| Name | Number | Description |
| ---- | ------ | ----------- |
| WATCH_EVENT_TYPE_UNSPECIFIED | 0 |  |
| WATCH_EVENT_TYPE_ADDED | 1 |  |
| WATCH_EVENT_TYPE_MODIFIED | 2 |  |
| WATCH_EVENT_TYPE_DELETED | 3 |  |
| WATCH_EVENT_TYPE_ERROR | 4 |  |







<a name="vcluster-api-v1-SnapshotService"></a>

### SnapshotService
SnapshotService provides APIs for managing vcluster snapshots.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| ListSnapshots | [ListSnapshotsRequest](#vcluster-api-v1-ListSnapshotsRequest) | [ListSnapshotsResponse](#vcluster-api-v1-ListSnapshotsResponse) | ListSnapshots lists all snapshots for a vcluster. |
| GetSnapshot | [GetSnapshotRequest](#vcluster-api-v1-GetSnapshotRequest) | [GetSnapshotResponse](#vcluster-api-v1-GetSnapshotResponse) | GetSnapshot retrieves a specific snapshot. |
| DeleteSnapshot | [DeleteSnapshotRequest](#vcluster-api-v1-DeleteSnapshotRequest) | [DeleteSnapshotResponse](#vcluster-api-v1-DeleteSnapshotResponse) | DeleteSnapshot deletes a snapshot. |


<a name="vcluster-api-v1-VClusterService"></a>

### VClusterService
VClusterService provides VM-like APIs for managing virtual Kubernetes clusters.
This service abstracts vcluster operations into familiar IaaS-style semantics
while preserving vcluster&#39;s cloud-native characteristics.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateVCluster | [CreateVClusterRequest](#vcluster-api-v1-CreateVClusterRequest) | [CreateVClusterResponse](#vcluster-api-v1-CreateVClusterResponse) | CreateVCluster creates a new virtual Kubernetes cluster. Similar to VM provisioning, but creates a vcluster control plane. |
| GetVCluster | [GetVClusterRequest](#vcluster-api-v1-GetVClusterRequest) | [GetVClusterResponse](#vcluster-api-v1-GetVClusterResponse) | GetVCluster retrieves details of a specific virtual cluster. |
| ListVClusters | [ListVClustersRequest](#vcluster-api-v1-ListVClustersRequest) | [ListVClustersResponse](#vcluster-api-v1-ListVClustersResponse) | ListVClusters lists all virtual clusters with pagination support. |
| UpdateVCluster | [UpdateVClusterRequest](#vcluster-api-v1-UpdateVClusterRequest) | [UpdateVClusterResponse](#vcluster-api-v1-UpdateVClusterResponse) | UpdateVCluster updates an existing virtual cluster&#39;s configuration. |
| DeleteVCluster | [DeleteVClusterRequest](#vcluster-api-v1-DeleteVClusterRequest) | [DeleteVClusterResponse](#vcluster-api-v1-DeleteVClusterResponse) | DeleteVCluster deletes a virtual cluster and all its resources. |
| ScaleVCluster | [ScaleVClusterRequest](#vcluster-api-v1-ScaleVClusterRequest) | [ScaleVClusterResponse](#vcluster-api-v1-ScaleVClusterResponse) | ScaleVCluster adjusts the resource allocation of a virtual cluster. Similar to VM resizing, but modifies resource quotas and control-plane specs. |
| SuspendVCluster | [SuspendVClusterRequest](#vcluster-api-v1-SuspendVClusterRequest) | [SuspendVClusterResponse](#vcluster-api-v1-SuspendVClusterResponse) | SuspendVCluster suspends a running virtual cluster. Unlike VM power-off, this scales down control-plane pods and optionally drains workloads. |
| ResumeVCluster | [ResumeVClusterRequest](#vcluster-api-v1-ResumeVClusterRequest) | [ResumeVClusterResponse](#vcluster-api-v1-ResumeVClusterResponse) | ResumeVCluster resumes a suspended virtual cluster. Restores control-plane pods and reconciles workload state. |
| SnapshotVCluster | [SnapshotVClusterRequest](#vcluster-api-v1-SnapshotVClusterRequest) | [SnapshotVClusterResponse](#vcluster-api-v1-SnapshotVClusterResponse) | SnapshotVCluster creates a point-in-time snapshot of a virtual cluster. Captures etcd state and metadata, not disk images like VM snapshots. |
| RestoreVCluster | [RestoreVClusterRequest](#vcluster-api-v1-RestoreVClusterRequest) | [RestoreVClusterResponse](#vcluster-api-v1-RestoreVClusterResponse) | RestoreVCluster restores a virtual cluster from a snapshot. |
| GetVClusterKubeconfig | [GetVClusterKubeconfigRequest](#vcluster-api-v1-GetVClusterKubeconfigRequest) | [GetVClusterKubeconfigResponse](#vcluster-api-v1-GetVClusterKubeconfigResponse) | GetVClusterKubeconfig retrieves the kubeconfig for accessing a virtual cluster. |
| WatchVCluster | [WatchVClusterRequest](#vcluster-api-v1-WatchVClusterRequest) | [WatchVClusterResponse](#vcluster-api-v1-WatchVClusterResponse) stream | WatchVCluster streams real-time updates for a virtual cluster. |





## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |
