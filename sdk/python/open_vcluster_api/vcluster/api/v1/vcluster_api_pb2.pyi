import datetime

from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf import field_mask_pb2 as _field_mask_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Phase(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    PHASE_UNSPECIFIED: _ClassVar[Phase]
    PHASE_CREATING: _ClassVar[Phase]
    PHASE_RUNNING: _ClassVar[Phase]
    PHASE_SUSPENDED: _ClassVar[Phase]
    PHASE_SCALING: _ClassVar[Phase]
    PHASE_DELETING: _ClassVar[Phase]
    PHASE_ERROR: _ClassVar[Phase]
    PHASE_UPDATING: _ClassVar[Phase]
    PHASE_RESTORING: _ClassVar[Phase]
    PHASE_SNAPSHOTTING: _ClassVar[Phase]
    PHASE_RESUMING: _ClassVar[Phase]
    PHASE_PENDING: _ClassVar[Phase]

class SnapshotStatus(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    SNAPSHOT_STATUS_UNSPECIFIED: _ClassVar[SnapshotStatus]
    SNAPSHOT_STATUS_CREATING: _ClassVar[SnapshotStatus]
    SNAPSHOT_STATUS_READY: _ClassVar[SnapshotStatus]
    SNAPSHOT_STATUS_FAILED: _ClassVar[SnapshotStatus]
    SNAPSHOT_STATUS_DELETING: _ClassVar[SnapshotStatus]

class WatchEventType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    WATCH_EVENT_TYPE_UNSPECIFIED: _ClassVar[WatchEventType]
    WATCH_EVENT_TYPE_ADDED: _ClassVar[WatchEventType]
    WATCH_EVENT_TYPE_MODIFIED: _ClassVar[WatchEventType]
    WATCH_EVENT_TYPE_DELETED: _ClassVar[WatchEventType]
    WATCH_EVENT_TYPE_ERROR: _ClassVar[WatchEventType]
PHASE_UNSPECIFIED: Phase
PHASE_CREATING: Phase
PHASE_RUNNING: Phase
PHASE_SUSPENDED: Phase
PHASE_SCALING: Phase
PHASE_DELETING: Phase
PHASE_ERROR: Phase
PHASE_UPDATING: Phase
PHASE_RESTORING: Phase
PHASE_SNAPSHOTTING: Phase
PHASE_RESUMING: Phase
PHASE_PENDING: Phase
SNAPSHOT_STATUS_UNSPECIFIED: SnapshotStatus
SNAPSHOT_STATUS_CREATING: SnapshotStatus
SNAPSHOT_STATUS_READY: SnapshotStatus
SNAPSHOT_STATUS_FAILED: SnapshotStatus
SNAPSHOT_STATUS_DELETING: SnapshotStatus
WATCH_EVENT_TYPE_UNSPECIFIED: WatchEventType
WATCH_EVENT_TYPE_ADDED: WatchEventType
WATCH_EVENT_TYPE_MODIFIED: WatchEventType
WATCH_EVENT_TYPE_DELETED: WatchEventType
WATCH_EVENT_TYPE_ERROR: WatchEventType

class VCluster(_message.Message):
    __slots__ = ("id", "name", "namespace", "spec", "status", "labels", "annotations", "create_time", "update_time", "delete_time", "owner", "project")
    class LabelsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    class AnnotationsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    SPEC_FIELD_NUMBER: _ClassVar[int]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    LABELS_FIELD_NUMBER: _ClassVar[int]
    ANNOTATIONS_FIELD_NUMBER: _ClassVar[int]
    CREATE_TIME_FIELD_NUMBER: _ClassVar[int]
    UPDATE_TIME_FIELD_NUMBER: _ClassVar[int]
    DELETE_TIME_FIELD_NUMBER: _ClassVar[int]
    OWNER_FIELD_NUMBER: _ClassVar[int]
    PROJECT_FIELD_NUMBER: _ClassVar[int]
    id: str
    name: str
    namespace: str
    spec: VClusterSpec
    status: VClusterStatus
    labels: _containers.ScalarMap[str, str]
    annotations: _containers.ScalarMap[str, str]
    create_time: _timestamp_pb2.Timestamp
    update_time: _timestamp_pb2.Timestamp
    delete_time: _timestamp_pb2.Timestamp
    owner: str
    project: str
    def __init__(self, id: _Optional[str] = ..., name: _Optional[str] = ..., namespace: _Optional[str] = ..., spec: _Optional[_Union[VClusterSpec, _Mapping]] = ..., status: _Optional[_Union[VClusterStatus, _Mapping]] = ..., labels: _Optional[_Mapping[str, str]] = ..., annotations: _Optional[_Mapping[str, str]] = ..., create_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., update_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., delete_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., owner: _Optional[str] = ..., project: _Optional[str] = ...) -> None: ...

class VClusterSpec(_message.Message):
    __slots__ = ("kubernetes_version", "resources", "replicas", "network", "storage", "enable_ha", "distro", "helm_values", "sync", "plugins", "ingress", "service_account", "isolation_mode")
    KUBERNETES_VERSION_FIELD_NUMBER: _ClassVar[int]
    RESOURCES_FIELD_NUMBER: _ClassVar[int]
    REPLICAS_FIELD_NUMBER: _ClassVar[int]
    NETWORK_FIELD_NUMBER: _ClassVar[int]
    STORAGE_FIELD_NUMBER: _ClassVar[int]
    ENABLE_HA_FIELD_NUMBER: _ClassVar[int]
    DISTRO_FIELD_NUMBER: _ClassVar[int]
    HELM_VALUES_FIELD_NUMBER: _ClassVar[int]
    SYNC_FIELD_NUMBER: _ClassVar[int]
    PLUGINS_FIELD_NUMBER: _ClassVar[int]
    INGRESS_FIELD_NUMBER: _ClassVar[int]
    SERVICE_ACCOUNT_FIELD_NUMBER: _ClassVar[int]
    ISOLATION_MODE_FIELD_NUMBER: _ClassVar[int]
    kubernetes_version: str
    resources: ResourceRequirements
    replicas: int
    network: NetworkConfig
    storage: StorageConfig
    enable_ha: bool
    distro: str
    helm_values: str
    sync: SyncConfig
    plugins: _containers.RepeatedCompositeFieldContainer[PluginConfig]
    ingress: IngressConfig
    service_account: ServiceAccountConfig
    isolation_mode: str
    def __init__(self, kubernetes_version: _Optional[str] = ..., resources: _Optional[_Union[ResourceRequirements, _Mapping]] = ..., replicas: _Optional[int] = ..., network: _Optional[_Union[NetworkConfig, _Mapping]] = ..., storage: _Optional[_Union[StorageConfig, _Mapping]] = ..., enable_ha: bool = ..., distro: _Optional[str] = ..., helm_values: _Optional[str] = ..., sync: _Optional[_Union[SyncConfig, _Mapping]] = ..., plugins: _Optional[_Iterable[_Union[PluginConfig, _Mapping]]] = ..., ingress: _Optional[_Union[IngressConfig, _Mapping]] = ..., service_account: _Optional[_Union[ServiceAccountConfig, _Mapping]] = ..., isolation_mode: _Optional[str] = ...) -> None: ...

class VClusterStatus(_message.Message):
    __slots__ = ("phase", "message", "reason", "conditions", "kubeconfig", "api_server_endpoint", "current_usage", "ready_replicas", "total_replicas", "ready_time", "last_snapshot", "helm_release", "observed_generation")
    PHASE_FIELD_NUMBER: _ClassVar[int]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    REASON_FIELD_NUMBER: _ClassVar[int]
    CONDITIONS_FIELD_NUMBER: _ClassVar[int]
    KUBECONFIG_FIELD_NUMBER: _ClassVar[int]
    API_SERVER_ENDPOINT_FIELD_NUMBER: _ClassVar[int]
    CURRENT_USAGE_FIELD_NUMBER: _ClassVar[int]
    READY_REPLICAS_FIELD_NUMBER: _ClassVar[int]
    TOTAL_REPLICAS_FIELD_NUMBER: _ClassVar[int]
    READY_TIME_FIELD_NUMBER: _ClassVar[int]
    LAST_SNAPSHOT_FIELD_NUMBER: _ClassVar[int]
    HELM_RELEASE_FIELD_NUMBER: _ClassVar[int]
    OBSERVED_GENERATION_FIELD_NUMBER: _ClassVar[int]
    phase: Phase
    message: str
    reason: str
    conditions: _containers.RepeatedCompositeFieldContainer[Condition]
    kubeconfig: str
    api_server_endpoint: str
    current_usage: ResourceUsage
    ready_replicas: int
    total_replicas: int
    ready_time: _timestamp_pb2.Timestamp
    last_snapshot: SnapshotInfo
    helm_release: HelmReleaseInfo
    observed_generation: int
    def __init__(self, phase: _Optional[_Union[Phase, str]] = ..., message: _Optional[str] = ..., reason: _Optional[str] = ..., conditions: _Optional[_Iterable[_Union[Condition, _Mapping]]] = ..., kubeconfig: _Optional[str] = ..., api_server_endpoint: _Optional[str] = ..., current_usage: _Optional[_Union[ResourceUsage, _Mapping]] = ..., ready_replicas: _Optional[int] = ..., total_replicas: _Optional[int] = ..., ready_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., last_snapshot: _Optional[_Union[SnapshotInfo, _Mapping]] = ..., helm_release: _Optional[_Union[HelmReleaseInfo, _Mapping]] = ..., observed_generation: _Optional[int] = ...) -> None: ...

class ResourceRequirements(_message.Message):
    __slots__ = ("cpu_request", "cpu_limit", "memory_request", "memory_limit", "ephemeral_storage_request", "ephemeral_storage_limit")
    CPU_REQUEST_FIELD_NUMBER: _ClassVar[int]
    CPU_LIMIT_FIELD_NUMBER: _ClassVar[int]
    MEMORY_REQUEST_FIELD_NUMBER: _ClassVar[int]
    MEMORY_LIMIT_FIELD_NUMBER: _ClassVar[int]
    EPHEMERAL_STORAGE_REQUEST_FIELD_NUMBER: _ClassVar[int]
    EPHEMERAL_STORAGE_LIMIT_FIELD_NUMBER: _ClassVar[int]
    cpu_request: str
    cpu_limit: str
    memory_request: str
    memory_limit: str
    ephemeral_storage_request: str
    ephemeral_storage_limit: str
    def __init__(self, cpu_request: _Optional[str] = ..., cpu_limit: _Optional[str] = ..., memory_request: _Optional[str] = ..., memory_limit: _Optional[str] = ..., ephemeral_storage_request: _Optional[str] = ..., ephemeral_storage_limit: _Optional[str] = ...) -> None: ...

class ResourceUsage(_message.Message):
    __slots__ = ("cpu_usage", "memory_usage", "storage_usage", "pod_count", "namespace_count", "service_count")
    CPU_USAGE_FIELD_NUMBER: _ClassVar[int]
    MEMORY_USAGE_FIELD_NUMBER: _ClassVar[int]
    STORAGE_USAGE_FIELD_NUMBER: _ClassVar[int]
    POD_COUNT_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_COUNT_FIELD_NUMBER: _ClassVar[int]
    SERVICE_COUNT_FIELD_NUMBER: _ClassVar[int]
    cpu_usage: str
    memory_usage: str
    storage_usage: str
    pod_count: int
    namespace_count: int
    service_count: int
    def __init__(self, cpu_usage: _Optional[str] = ..., memory_usage: _Optional[str] = ..., storage_usage: _Optional[str] = ..., pod_count: _Optional[int] = ..., namespace_count: _Optional[int] = ..., service_count: _Optional[int] = ...) -> None: ...

class NetworkConfig(_message.Message):
    __slots__ = ("pod_cidr", "service_cidr", "enable_network_policies", "dns_service_ip", "dns")
    POD_CIDR_FIELD_NUMBER: _ClassVar[int]
    SERVICE_CIDR_FIELD_NUMBER: _ClassVar[int]
    ENABLE_NETWORK_POLICIES_FIELD_NUMBER: _ClassVar[int]
    DNS_SERVICE_IP_FIELD_NUMBER: _ClassVar[int]
    DNS_FIELD_NUMBER: _ClassVar[int]
    pod_cidr: str
    service_cidr: str
    enable_network_policies: bool
    dns_service_ip: str
    dns: DNSConfig
    def __init__(self, pod_cidr: _Optional[str] = ..., service_cidr: _Optional[str] = ..., enable_network_policies: bool = ..., dns_service_ip: _Optional[str] = ..., dns: _Optional[_Union[DNSConfig, _Mapping]] = ...) -> None: ...

class DNSConfig(_message.Message):
    __slots__ = ("nameservers", "searches", "options")
    NAMESERVERS_FIELD_NUMBER: _ClassVar[int]
    SEARCHES_FIELD_NUMBER: _ClassVar[int]
    OPTIONS_FIELD_NUMBER: _ClassVar[int]
    nameservers: _containers.RepeatedScalarFieldContainer[str]
    searches: _containers.RepeatedScalarFieldContainer[str]
    options: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, nameservers: _Optional[_Iterable[str]] = ..., searches: _Optional[_Iterable[str]] = ..., options: _Optional[_Iterable[str]] = ...) -> None: ...

class StorageConfig(_message.Message):
    __slots__ = ("default_storage_class", "enable_persistence", "persistence_size", "persistence_storage_class")
    DEFAULT_STORAGE_CLASS_FIELD_NUMBER: _ClassVar[int]
    ENABLE_PERSISTENCE_FIELD_NUMBER: _ClassVar[int]
    PERSISTENCE_SIZE_FIELD_NUMBER: _ClassVar[int]
    PERSISTENCE_STORAGE_CLASS_FIELD_NUMBER: _ClassVar[int]
    default_storage_class: str
    enable_persistence: bool
    persistence_size: str
    persistence_storage_class: str
    def __init__(self, default_storage_class: _Optional[str] = ..., enable_persistence: bool = ..., persistence_size: _Optional[str] = ..., persistence_storage_class: _Optional[str] = ...) -> None: ...

class SyncConfig(_message.Message):
    __slots__ = ("sync_nodes", "sync_persistent_volumes", "sync_storage_classes", "sync_ingresses", "sync_priority_classes", "sync_network_policies", "sync_pod_disruption_budgets", "custom_resources")
    SYNC_NODES_FIELD_NUMBER: _ClassVar[int]
    SYNC_PERSISTENT_VOLUMES_FIELD_NUMBER: _ClassVar[int]
    SYNC_STORAGE_CLASSES_FIELD_NUMBER: _ClassVar[int]
    SYNC_INGRESSES_FIELD_NUMBER: _ClassVar[int]
    SYNC_PRIORITY_CLASSES_FIELD_NUMBER: _ClassVar[int]
    SYNC_NETWORK_POLICIES_FIELD_NUMBER: _ClassVar[int]
    SYNC_POD_DISRUPTION_BUDGETS_FIELD_NUMBER: _ClassVar[int]
    CUSTOM_RESOURCES_FIELD_NUMBER: _ClassVar[int]
    sync_nodes: bool
    sync_persistent_volumes: bool
    sync_storage_classes: bool
    sync_ingresses: bool
    sync_priority_classes: bool
    sync_network_policies: bool
    sync_pod_disruption_budgets: bool
    custom_resources: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, sync_nodes: bool = ..., sync_persistent_volumes: bool = ..., sync_storage_classes: bool = ..., sync_ingresses: bool = ..., sync_priority_classes: bool = ..., sync_network_policies: bool = ..., sync_pod_disruption_budgets: bool = ..., custom_resources: _Optional[_Iterable[str]] = ...) -> None: ...

class PluginConfig(_message.Message):
    __slots__ = ("name", "version", "config", "enabled")
    NAME_FIELD_NUMBER: _ClassVar[int]
    VERSION_FIELD_NUMBER: _ClassVar[int]
    CONFIG_FIELD_NUMBER: _ClassVar[int]
    ENABLED_FIELD_NUMBER: _ClassVar[int]
    name: str
    version: str
    config: str
    enabled: bool
    def __init__(self, name: _Optional[str] = ..., version: _Optional[str] = ..., config: _Optional[str] = ..., enabled: bool = ...) -> None: ...

class IngressConfig(_message.Message):
    __slots__ = ("enabled", "ingress_class", "hostname", "tls", "annotations")
    class AnnotationsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    ENABLED_FIELD_NUMBER: _ClassVar[int]
    INGRESS_CLASS_FIELD_NUMBER: _ClassVar[int]
    HOSTNAME_FIELD_NUMBER: _ClassVar[int]
    TLS_FIELD_NUMBER: _ClassVar[int]
    ANNOTATIONS_FIELD_NUMBER: _ClassVar[int]
    enabled: bool
    ingress_class: str
    hostname: str
    tls: TLSConfig
    annotations: _containers.ScalarMap[str, str]
    def __init__(self, enabled: bool = ..., ingress_class: _Optional[str] = ..., hostname: _Optional[str] = ..., tls: _Optional[_Union[TLSConfig, _Mapping]] = ..., annotations: _Optional[_Mapping[str, str]] = ...) -> None: ...

class TLSConfig(_message.Message):
    __slots__ = ("enabled", "secret_name", "use_cert_manager", "issuer_name")
    ENABLED_FIELD_NUMBER: _ClassVar[int]
    SECRET_NAME_FIELD_NUMBER: _ClassVar[int]
    USE_CERT_MANAGER_FIELD_NUMBER: _ClassVar[int]
    ISSUER_NAME_FIELD_NUMBER: _ClassVar[int]
    enabled: bool
    secret_name: str
    use_cert_manager: bool
    issuer_name: str
    def __init__(self, enabled: bool = ..., secret_name: _Optional[str] = ..., use_cert_manager: bool = ..., issuer_name: _Optional[str] = ...) -> None: ...

class ServiceAccountConfig(_message.Message):
    __slots__ = ("name", "annotations", "automount_token")
    class AnnotationsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    NAME_FIELD_NUMBER: _ClassVar[int]
    ANNOTATIONS_FIELD_NUMBER: _ClassVar[int]
    AUTOMOUNT_TOKEN_FIELD_NUMBER: _ClassVar[int]
    name: str
    annotations: _containers.ScalarMap[str, str]
    automount_token: bool
    def __init__(self, name: _Optional[str] = ..., annotations: _Optional[_Mapping[str, str]] = ..., automount_token: bool = ...) -> None: ...

class Condition(_message.Message):
    __slots__ = ("type", "status", "reason", "message", "last_transition_time", "last_probe_time")
    TYPE_FIELD_NUMBER: _ClassVar[int]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    REASON_FIELD_NUMBER: _ClassVar[int]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    LAST_TRANSITION_TIME_FIELD_NUMBER: _ClassVar[int]
    LAST_PROBE_TIME_FIELD_NUMBER: _ClassVar[int]
    type: str
    status: str
    reason: str
    message: str
    last_transition_time: _timestamp_pb2.Timestamp
    last_probe_time: _timestamp_pb2.Timestamp
    def __init__(self, type: _Optional[str] = ..., status: _Optional[str] = ..., reason: _Optional[str] = ..., message: _Optional[str] = ..., last_transition_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., last_probe_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...

class SnapshotInfo(_message.Message):
    __slots__ = ("id", "name", "create_time", "size_bytes", "status")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    CREATE_TIME_FIELD_NUMBER: _ClassVar[int]
    SIZE_BYTES_FIELD_NUMBER: _ClassVar[int]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    id: str
    name: str
    create_time: _timestamp_pb2.Timestamp
    size_bytes: int
    status: str
    def __init__(self, id: _Optional[str] = ..., name: _Optional[str] = ..., create_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., size_bytes: _Optional[int] = ..., status: _Optional[str] = ...) -> None: ...

class HelmReleaseInfo(_message.Message):
    __slots__ = ("name", "chart_version", "app_version", "status", "revision")
    NAME_FIELD_NUMBER: _ClassVar[int]
    CHART_VERSION_FIELD_NUMBER: _ClassVar[int]
    APP_VERSION_FIELD_NUMBER: _ClassVar[int]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    REVISION_FIELD_NUMBER: _ClassVar[int]
    name: str
    chart_version: str
    app_version: str
    status: str
    revision: int
    def __init__(self, name: _Optional[str] = ..., chart_version: _Optional[str] = ..., app_version: _Optional[str] = ..., status: _Optional[str] = ..., revision: _Optional[int] = ...) -> None: ...

class Snapshot(_message.Message):
    __slots__ = ("id", "name", "vcluster_id", "vcluster_name", "namespace", "status", "size_bytes", "create_time", "expire_time", "labels", "description", "storage_uri")
    class LabelsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    VCLUSTER_ID_FIELD_NUMBER: _ClassVar[int]
    VCLUSTER_NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    SIZE_BYTES_FIELD_NUMBER: _ClassVar[int]
    CREATE_TIME_FIELD_NUMBER: _ClassVar[int]
    EXPIRE_TIME_FIELD_NUMBER: _ClassVar[int]
    LABELS_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    STORAGE_URI_FIELD_NUMBER: _ClassVar[int]
    id: str
    name: str
    vcluster_id: str
    vcluster_name: str
    namespace: str
    status: SnapshotStatus
    size_bytes: int
    create_time: _timestamp_pb2.Timestamp
    expire_time: _timestamp_pb2.Timestamp
    labels: _containers.ScalarMap[str, str]
    description: str
    storage_uri: str
    def __init__(self, id: _Optional[str] = ..., name: _Optional[str] = ..., vcluster_id: _Optional[str] = ..., vcluster_name: _Optional[str] = ..., namespace: _Optional[str] = ..., status: _Optional[_Union[SnapshotStatus, str]] = ..., size_bytes: _Optional[int] = ..., create_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., expire_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., labels: _Optional[_Mapping[str, str]] = ..., description: _Optional[str] = ..., storage_uri: _Optional[str] = ...) -> None: ...

class CreateVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "spec", "labels", "request_id", "wait_for_ready", "timeout_seconds")
    class LabelsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    SPEC_FIELD_NUMBER: _ClassVar[int]
    LABELS_FIELD_NUMBER: _ClassVar[int]
    REQUEST_ID_FIELD_NUMBER: _ClassVar[int]
    WAIT_FOR_READY_FIELD_NUMBER: _ClassVar[int]
    TIMEOUT_SECONDS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    spec: VClusterSpec
    labels: _containers.ScalarMap[str, str]
    request_id: str
    wait_for_ready: bool
    timeout_seconds: int
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., spec: _Optional[_Union[VClusterSpec, _Mapping]] = ..., labels: _Optional[_Mapping[str, str]] = ..., request_id: _Optional[str] = ..., wait_for_ready: bool = ..., timeout_seconds: _Optional[int] = ...) -> None: ...

class CreateVClusterResponse(_message.Message):
    __slots__ = ("vcluster", "operation_id")
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    vcluster: VCluster
    operation_id: str
    def __init__(self, vcluster: _Optional[_Union[VCluster, _Mapping]] = ..., operation_id: _Optional[str] = ...) -> None: ...

class GetVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "id", "include_kubeconfig")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    INCLUDE_KUBECONFIG_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    id: str
    include_kubeconfig: bool
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., id: _Optional[str] = ..., include_kubeconfig: bool = ...) -> None: ...

class GetVClusterResponse(_message.Message):
    __slots__ = ("vcluster",)
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    vcluster: VCluster
    def __init__(self, vcluster: _Optional[_Union[VCluster, _Mapping]] = ...) -> None: ...

class ListVClustersRequest(_message.Message):
    __slots__ = ("namespace", "page_size", "page_token", "label_selector", "phases", "owner", "project", "order_by")
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    PAGE_SIZE_FIELD_NUMBER: _ClassVar[int]
    PAGE_TOKEN_FIELD_NUMBER: _ClassVar[int]
    LABEL_SELECTOR_FIELD_NUMBER: _ClassVar[int]
    PHASES_FIELD_NUMBER: _ClassVar[int]
    OWNER_FIELD_NUMBER: _ClassVar[int]
    PROJECT_FIELD_NUMBER: _ClassVar[int]
    ORDER_BY_FIELD_NUMBER: _ClassVar[int]
    namespace: str
    page_size: int
    page_token: str
    label_selector: str
    phases: _containers.RepeatedScalarFieldContainer[Phase]
    owner: str
    project: str
    order_by: str
    def __init__(self, namespace: _Optional[str] = ..., page_size: _Optional[int] = ..., page_token: _Optional[str] = ..., label_selector: _Optional[str] = ..., phases: _Optional[_Iterable[_Union[Phase, str]]] = ..., owner: _Optional[str] = ..., project: _Optional[str] = ..., order_by: _Optional[str] = ...) -> None: ...

class ListVClustersResponse(_message.Message):
    __slots__ = ("vclusters", "next_page_token", "total_count")
    VCLUSTERS_FIELD_NUMBER: _ClassVar[int]
    NEXT_PAGE_TOKEN_FIELD_NUMBER: _ClassVar[int]
    TOTAL_COUNT_FIELD_NUMBER: _ClassVar[int]
    vclusters: _containers.RepeatedCompositeFieldContainer[VCluster]
    next_page_token: str
    total_count: int
    def __init__(self, vclusters: _Optional[_Iterable[_Union[VCluster, _Mapping]]] = ..., next_page_token: _Optional[str] = ..., total_count: _Optional[int] = ...) -> None: ...

class UpdateVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "spec", "update_mask", "labels")
    class LabelsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    SPEC_FIELD_NUMBER: _ClassVar[int]
    UPDATE_MASK_FIELD_NUMBER: _ClassVar[int]
    LABELS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    spec: VClusterSpec
    update_mask: _field_mask_pb2.FieldMask
    labels: _containers.ScalarMap[str, str]
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., spec: _Optional[_Union[VClusterSpec, _Mapping]] = ..., update_mask: _Optional[_Union[_field_mask_pb2.FieldMask, _Mapping]] = ..., labels: _Optional[_Mapping[str, str]] = ...) -> None: ...

class UpdateVClusterResponse(_message.Message):
    __slots__ = ("vcluster", "operation_id")
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    vcluster: VCluster
    operation_id: str
    def __init__(self, vcluster: _Optional[_Union[VCluster, _Mapping]] = ..., operation_id: _Optional[str] = ...) -> None: ...

class DeleteVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "force", "delete_snapshots", "grace_period_seconds")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    FORCE_FIELD_NUMBER: _ClassVar[int]
    DELETE_SNAPSHOTS_FIELD_NUMBER: _ClassVar[int]
    GRACE_PERIOD_SECONDS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    force: bool
    delete_snapshots: bool
    grace_period_seconds: int
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., force: bool = ..., delete_snapshots: bool = ..., grace_period_seconds: _Optional[int] = ...) -> None: ...

class DeleteVClusterResponse(_message.Message):
    __slots__ = ("operation_id", "delete_time")
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    DELETE_TIME_FIELD_NUMBER: _ClassVar[int]
    operation_id: str
    delete_time: _timestamp_pb2.Timestamp
    def __init__(self, operation_id: _Optional[str] = ..., delete_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...

class ScaleVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "resources", "replicas")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    RESOURCES_FIELD_NUMBER: _ClassVar[int]
    REPLICAS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    resources: ResourceRequirements
    replicas: int
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., resources: _Optional[_Union[ResourceRequirements, _Mapping]] = ..., replicas: _Optional[int] = ...) -> None: ...

class ScaleVClusterResponse(_message.Message):
    __slots__ = ("vcluster", "operation_id")
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    vcluster: VCluster
    operation_id: str
    def __init__(self, vcluster: _Optional[_Union[VCluster, _Mapping]] = ..., operation_id: _Optional[str] = ...) -> None: ...

class SuspendVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "drain_workloads", "drain_timeout_seconds", "create_snapshot", "snapshot_name")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    DRAIN_WORKLOADS_FIELD_NUMBER: _ClassVar[int]
    DRAIN_TIMEOUT_SECONDS_FIELD_NUMBER: _ClassVar[int]
    CREATE_SNAPSHOT_FIELD_NUMBER: _ClassVar[int]
    SNAPSHOT_NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    drain_workloads: bool
    drain_timeout_seconds: int
    create_snapshot: bool
    snapshot_name: str
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., drain_workloads: bool = ..., drain_timeout_seconds: _Optional[int] = ..., create_snapshot: bool = ..., snapshot_name: _Optional[str] = ...) -> None: ...

class SuspendVClusterResponse(_message.Message):
    __slots__ = ("vcluster", "snapshot", "operation_id")
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    SNAPSHOT_FIELD_NUMBER: _ClassVar[int]
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    vcluster: VCluster
    snapshot: Snapshot
    operation_id: str
    def __init__(self, vcluster: _Optional[_Union[VCluster, _Mapping]] = ..., snapshot: _Optional[_Union[Snapshot, _Mapping]] = ..., operation_id: _Optional[str] = ...) -> None: ...

class ResumeVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "reconcile_workloads")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    RECONCILE_WORKLOADS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    reconcile_workloads: bool
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., reconcile_workloads: bool = ...) -> None: ...

class ResumeVClusterResponse(_message.Message):
    __slots__ = ("vcluster", "operation_id")
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    vcluster: VCluster
    operation_id: str
    def __init__(self, vcluster: _Optional[_Union[VCluster, _Mapping]] = ..., operation_id: _Optional[str] = ...) -> None: ...

class SnapshotVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "snapshot_name", "description", "retention_hours", "labels", "include_workloads")
    class LabelsEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    SNAPSHOT_NAME_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    RETENTION_HOURS_FIELD_NUMBER: _ClassVar[int]
    LABELS_FIELD_NUMBER: _ClassVar[int]
    INCLUDE_WORKLOADS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    snapshot_name: str
    description: str
    retention_hours: int
    labels: _containers.ScalarMap[str, str]
    include_workloads: bool
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., snapshot_name: _Optional[str] = ..., description: _Optional[str] = ..., retention_hours: _Optional[int] = ..., labels: _Optional[_Mapping[str, str]] = ..., include_workloads: bool = ...) -> None: ...

class SnapshotVClusterResponse(_message.Message):
    __slots__ = ("snapshot", "operation_id")
    SNAPSHOT_FIELD_NUMBER: _ClassVar[int]
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    snapshot: Snapshot
    operation_id: str
    def __init__(self, snapshot: _Optional[_Union[Snapshot, _Mapping]] = ..., operation_id: _Optional[str] = ...) -> None: ...

class RestoreVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "snapshot_id", "create_new", "new_name", "new_namespace", "restore_workloads")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    SNAPSHOT_ID_FIELD_NUMBER: _ClassVar[int]
    CREATE_NEW_FIELD_NUMBER: _ClassVar[int]
    NEW_NAME_FIELD_NUMBER: _ClassVar[int]
    NEW_NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    RESTORE_WORKLOADS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    snapshot_id: str
    create_new: bool
    new_name: str
    new_namespace: str
    restore_workloads: bool
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., snapshot_id: _Optional[str] = ..., create_new: bool = ..., new_name: _Optional[str] = ..., new_namespace: _Optional[str] = ..., restore_workloads: bool = ...) -> None: ...

class RestoreVClusterResponse(_message.Message):
    __slots__ = ("vcluster", "operation_id")
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    OPERATION_ID_FIELD_NUMBER: _ClassVar[int]
    vcluster: VCluster
    operation_id: str
    def __init__(self, vcluster: _Optional[_Union[VCluster, _Mapping]] = ..., operation_id: _Optional[str] = ...) -> None: ...

class GetVClusterKubeconfigRequest(_message.Message):
    __slots__ = ("name", "namespace", "format", "validity_hours")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    FORMAT_FIELD_NUMBER: _ClassVar[int]
    VALIDITY_HOURS_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    format: str
    validity_hours: int
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., format: _Optional[str] = ..., validity_hours: _Optional[int] = ...) -> None: ...

class GetVClusterKubeconfigResponse(_message.Message):
    __slots__ = ("kubeconfig", "api_server_endpoint", "expires_at")
    KUBECONFIG_FIELD_NUMBER: _ClassVar[int]
    API_SERVER_ENDPOINT_FIELD_NUMBER: _ClassVar[int]
    EXPIRES_AT_FIELD_NUMBER: _ClassVar[int]
    kubeconfig: str
    api_server_endpoint: str
    expires_at: _timestamp_pb2.Timestamp
    def __init__(self, kubeconfig: _Optional[str] = ..., api_server_endpoint: _Optional[str] = ..., expires_at: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...

class WatchVClusterRequest(_message.Message):
    __slots__ = ("name", "namespace", "label_selector", "resource_version")
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    LABEL_SELECTOR_FIELD_NUMBER: _ClassVar[int]
    RESOURCE_VERSION_FIELD_NUMBER: _ClassVar[int]
    name: str
    namespace: str
    label_selector: str
    resource_version: str
    def __init__(self, name: _Optional[str] = ..., namespace: _Optional[str] = ..., label_selector: _Optional[str] = ..., resource_version: _Optional[str] = ...) -> None: ...

class WatchVClusterResponse(_message.Message):
    __slots__ = ("type", "vcluster")
    TYPE_FIELD_NUMBER: _ClassVar[int]
    VCLUSTER_FIELD_NUMBER: _ClassVar[int]
    type: WatchEventType
    vcluster: VCluster
    def __init__(self, type: _Optional[_Union[WatchEventType, str]] = ..., vcluster: _Optional[_Union[VCluster, _Mapping]] = ...) -> None: ...

class ListSnapshotsRequest(_message.Message):
    __slots__ = ("vcluster_name", "namespace", "page_size", "page_token", "label_selector")
    VCLUSTER_NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    PAGE_SIZE_FIELD_NUMBER: _ClassVar[int]
    PAGE_TOKEN_FIELD_NUMBER: _ClassVar[int]
    LABEL_SELECTOR_FIELD_NUMBER: _ClassVar[int]
    vcluster_name: str
    namespace: str
    page_size: int
    page_token: str
    label_selector: str
    def __init__(self, vcluster_name: _Optional[str] = ..., namespace: _Optional[str] = ..., page_size: _Optional[int] = ..., page_token: _Optional[str] = ..., label_selector: _Optional[str] = ...) -> None: ...

class ListSnapshotsResponse(_message.Message):
    __slots__ = ("snapshots", "next_page_token", "total_count")
    SNAPSHOTS_FIELD_NUMBER: _ClassVar[int]
    NEXT_PAGE_TOKEN_FIELD_NUMBER: _ClassVar[int]
    TOTAL_COUNT_FIELD_NUMBER: _ClassVar[int]
    snapshots: _containers.RepeatedCompositeFieldContainer[Snapshot]
    next_page_token: str
    total_count: int
    def __init__(self, snapshots: _Optional[_Iterable[_Union[Snapshot, _Mapping]]] = ..., next_page_token: _Optional[str] = ..., total_count: _Optional[int] = ...) -> None: ...

class GetSnapshotRequest(_message.Message):
    __slots__ = ("id", "name", "namespace")
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    NAMESPACE_FIELD_NUMBER: _ClassVar[int]
    id: str
    name: str
    namespace: str
    def __init__(self, id: _Optional[str] = ..., name: _Optional[str] = ..., namespace: _Optional[str] = ...) -> None: ...

class GetSnapshotResponse(_message.Message):
    __slots__ = ("snapshot",)
    SNAPSHOT_FIELD_NUMBER: _ClassVar[int]
    snapshot: Snapshot
    def __init__(self, snapshot: _Optional[_Union[Snapshot, _Mapping]] = ...) -> None: ...

class DeleteSnapshotRequest(_message.Message):
    __slots__ = ("id", "force")
    ID_FIELD_NUMBER: _ClassVar[int]
    FORCE_FIELD_NUMBER: _ClassVar[int]
    id: str
    force: bool
    def __init__(self, id: _Optional[str] = ..., force: bool = ...) -> None: ...

class DeleteSnapshotResponse(_message.Message):
    __slots__ = ("delete_time",)
    DELETE_TIME_FIELD_NUMBER: _ClassVar[int]
    delete_time: _timestamp_pb2.Timestamp
    def __init__(self, delete_time: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...
