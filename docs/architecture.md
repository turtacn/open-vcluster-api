# 系统架构设计

本文档详细描述open-vcluster-api的系统架构设计，包括整体架构、核心组件、资源模型和生命周期管理。

## 整体架构

open-vcluster-api采用分层架构设计，实现了关注点分离和模块化组织。

### 架构分层图

```mermaid
graph TB
    %% 图例
    subgraph Legend[图例（Legend）]
        direction LR
        L1[用户层]
        L2[接入层]
        L3[服务层]
        L4[适配层]
        L5[基础设施层]
    end

    %% 用户接入层
    subgraph USER[用户接入层（User Access Layer）]
        Portal[管理门户<br/>（Web Portal）]
        CLI[命令行工具<br/>（CLI Tool）]
        SDK_GO[Go SDK]
        SDK_TS[TypeScript SDK]
        SDK_PY[Python SDK]
        THIRD[第三方集成<br/>（Third-party Integration）]
    end

    %% API网关层
    subgraph GATEWAY[API网关层（API Gateway Layer）]
        GRPC_GW[gRPC网关<br/>（gRPC Gateway）]
        REST_GW[REST网关<br/>（REST Gateway）]
        LB[负载均衡<br/>（Load Balancer）]
        AUTH[认证服务<br/>（Authentication）]
        AUTHZ[授权服务<br/>（Authorization）]
        RATE[限流服务<br/>（Rate Limiter）]
    end

    %% 业务服务层
    subgraph SERVICE[业务服务层（Business Service Layer）]
        VCS[VClusterService<br/>虚拟集群服务]
        SNAP_SVC[SnapshotService<br/>快照服务]
        QUOTA_SVC[QuotaService<br/>配额服务]
        AUDIT_SVC[AuditService<br/>审计服务]
        NOTIFY_SVC[NotifyService<br/>通知服务]
    end

    %% 核心引擎层
    subgraph ENGINE[核心引擎层（Core Engine Layer）]
        ORCH[编排引擎<br/>（Orchestrator）]
        STATE[状态机<br/>（State Machine）]
        SCHEDULER[调度器<br/>（Scheduler）]
        VALIDATOR[校验器<br/>（Validator）]
    end

    %% 适配器层
    subgraph ADAPTER[适配器层（Adapter Layer）]
        VC_ADAPTER[vcluster适配器<br/>（vcluster Adapter）]
        HELM_CLIENT[Helm客户端<br/>（Helm Client）]
        K8S_CLIENT[Kubernetes客户端<br/>（K8s Client）]
        STORAGE_ADAPTER[存储适配器<br/>（Storage Adapter）]
    end

    %% 基础设施层
    subgraph INFRA[基础设施层（Infrastructure Layer）]
        HOST_K8S[宿主Kubernetes集群<br/>（Host K8s Cluster）]
        ETCD_STORE[etcd存储<br/>（etcd Storage）]
        S3_STORE[对象存储<br/>（S3/MinIO）]
        PROMETHEUS[Prometheus监控]
    end

    %% 连接关系
    Portal --> LB
    CLI --> LB
    SDK_GO --> LB
    SDK_TS --> LB
    SDK_PY --> LB
    THIRD --> LB

    LB --> GRPC_GW
    LB --> REST_GW
    GRPC_GW --> AUTH
    REST_GW --> AUTH
    AUTH --> AUTHZ
    AUTHZ --> RATE
    
    RATE --> VCS
    RATE --> SNAP_SVC
    RATE --> QUOTA_SVC
    VCS --> AUDIT_SVC
    SNAP_SVC --> AUDIT_SVC
    VCS --> NOTIFY_SVC

    VCS --> ORCH
    SNAP_SVC --> ORCH
    QUOTA_SVC --> VALIDATOR
    ORCH --> STATE
    ORCH --> SCHEDULER
    STATE --> VALIDATOR

    ORCH --> VC_ADAPTER
    STATE --> VC_ADAPTER
    VC_ADAPTER --> HELM_CLIENT
    VC_ADAPTER --> K8S_CLIENT
    SNAP_SVC --> STORAGE_ADAPTER

    HELM_CLIENT --> HOST_K8S
    K8S_CLIENT --> HOST_K8S
    HOST_K8S --> ETCD_STORE
    STORAGE_ADAPTER --> S3_STORE
    VCS --> PROMETHEUS
````

### 各层职责说明

| 层级     | 职责           | 关键组件                            |
| ------ | ------------ | ------------------------------- |
| 用户接入层  | 提供多种访问方式     | Portal、CLI、多语言SDK               |
| API网关层 | 请求路由、认证授权、限流 | gRPC/REST网关、Auth服务              |
| 业务服务层  | 核心业务逻辑       | VClusterService、SnapshotService |
| 核心引擎层  | 编排调度、状态管理    | Orchestrator、State Machine      |
| 适配器层   | 对接底层系统       | vcluster Adapter、Helm Client    |
| 基础设施层  | 底层资源管理       | Host K8s、存储系统                   |

## 核心组件详解

### VClusterService

VClusterService是核心业务服务，负责处理所有与vcluster生命周期相关的操作。

```mermaid
classDiagram
    class VClusterService {
        <<interface>>
        +CreateVCluster（request CreateVClusterRequest）CreateVClusterResponse
        +GetVCluster（request GetVClusterRequest）GetVClusterResponse
        +ListVClusters（request ListVClustersRequest）ListVClustersResponse
        +UpdateVCluster（request UpdateVClusterRequest）UpdateVClusterResponse
        +DeleteVCluster（request DeleteVClusterRequest）DeleteVClusterResponse
        +ScaleVCluster（request ScaleVClusterRequest）ScaleVClusterResponse
        +SuspendVCluster（request SuspendVClusterRequest）SuspendVClusterResponse
        +ResumeVCluster（request ResumeVClusterRequest）ResumeVClusterResponse
        +SnapshotVCluster（request SnapshotVClusterRequest）SnapshotVClusterResponse
        +RestoreVCluster（request RestoreVClusterRequest）RestoreVClusterResponse
    }

    class VClusterServiceImpl {
        -orchestrator Orchestrator
        -adapter VClusterAdapter
        -validator Validator
        -store Store
        +CreateVCluster（）
        +GetVCluster（）
        +ListVClusters（）
    }

    class Orchestrator {
        -stateMachine StateMachine
        -scheduler Scheduler
        +Execute（operation Operation）Result
        +GetStatus（id string）Status
    }

    class VClusterAdapter {
        -helmClient HelmClient
        -k8sClient K8sClient
        +Install（spec VClusterSpec）error
        +Uninstall（name string）error
        +Upgrade（name string, spec VClusterSpec）error
        +GetStatus（name string）VClusterStatus
    }

    class StateMachine {
        -transitions map
        +Transition（from Phase, event Event）Phase
        +ValidateTransition（from Phase, to Phase）bool
    }

    VClusterService <|.. VClusterServiceImpl : 实现（implements）
    VClusterServiceImpl --> Orchestrator : 使用（uses）
    VClusterServiceImpl --> VClusterAdapter : 使用（uses）
    Orchestrator --> StateMachine : 使用（uses）
    Orchestrator --> VClusterAdapter : 使用（uses）
```

### 状态机设计

vcluster的生命周期通过状态机进行管理，确保状态转换的一致性和可预测性。

```mermaid
stateDiagram-v2
    [*] --> PENDING : 创建请求
    PENDING --> CREATING : 资源分配完成
    CREATING --> RUNNING : 控制面就绪
    CREATING --> ERROR : 创建失败
    
    RUNNING --> SCALING : 伸缩请求
    SCALING --> RUNNING : 伸缩完成
    SCALING --> ERROR : 伸缩失败
    
    RUNNING --> UPDATING : 更新请求
    UPDATING --> RUNNING : 更新完成
    UPDATING --> ERROR : 更新失败
    
    RUNNING --> SUSPENDED : 暂停请求
    SUSPENDED --> RESUMING : 恢复请求
    RESUMING --> RUNNING : 恢复完成
    RESUMING --> ERROR : 恢复失败
    
    RUNNING --> SNAPSHOTTING : 快照请求
    SNAPSHOTTING --> RUNNING : 快照完成
    SNAPSHOTTING --> ERROR : 快照失败
    
    RUNNING --> RESTORING : 还原请求
    RESTORING --> RUNNING : 还原完成
    RESTORING --> ERROR : 还原失败
    
    RUNNING --> DELETING : 删除请求
    SUSPENDED --> DELETING : 删除请求
    ERROR --> DELETING : 强制删除
    DELETING --> [*] : 删除完成
    
    ERROR --> RUNNING : 错误恢复
```

## 资源模型

### 核心资源关系

```mermaid
classDiagram
    class VCluster {
        +string id
        +string name
        +string namespace
        +VClusterSpec spec
        +VClusterStatus status
        +map labels
        +map annotations
        +Timestamp create_time
        +Timestamp update_time
        +string owner
        +string project
    }

    class VClusterSpec {
        +string kubernetes_version
        +ResourceRequirements resources
        +int32 replicas
        +NetworkConfig network
        +StorageConfig storage
        +bool enable_ha
        +string distro
        +string helm_values
        +SyncConfig sync
        +list~PluginConfig~ plugins
        +IngressConfig ingress
    }

    class VClusterStatus {
        +Phase phase
        +string message
        +string reason
        +list~Condition~ conditions
        +string kubeconfig
        +string api_server_endpoint
        +ResourceUsage current_usage
        +int32 ready_replicas
        +SnapshotInfo last_snapshot
    }

    class Snapshot {
        +string id
        +string name
        +string vcluster_id
        +SnapshotStatus status
        +int64 size_bytes
        +Timestamp create_time
        +string storage_uri
    }

    class ResourceRequirements {
        +string cpu_request
        +string cpu_limit
        +string memory_request
        +string memory_limit
    }

    class NetworkConfig {
        +string pod_cidr
        +string service_cidr
        +bool enable_network_policies
        +DNSConfig dns
    }

    class StorageConfig {
        +string default_storage_class
        +bool enable_persistence
        +string persistence_size
    }

    class Condition {
        +string type
        +string status
        +string reason
        +string message
        +Timestamp last_transition_time
    }

    VCluster *-- VClusterSpec : 包含（contains）
    VCluster *-- VClusterStatus : 包含（contains）
    VCluster "1" --> "*" Snapshot : 拥有（owns）
    VClusterSpec *-- ResourceRequirements : 包含（contains）
    VClusterSpec *-- NetworkConfig : 包含（contains）
    VClusterSpec *-- StorageConfig : 包含（contains）
    VClusterStatus *-- "*" Condition : 包含（contains）
```

## 数据流设计

### 创建vcluster流程

```mermaid
sequenceDiagram
    autonumber
    participant Client as 客户端（Client）
    participant Gateway as API网关（Gateway）
    participant Service as VClusterService
    participant Orch as 编排器（Orchestrator）
    participant SM as 状态机（StateMachine）
    participant Adapter as vcluster适配器（Adapter）
    participant Helm as Helm客户端
    participant K8s as 宿主K8s集群

    Client->>Gateway: 1. CreateVCluster请求
    Gateway->>Gateway: 1.1 认证授权
    Gateway->>Service: 1.2 转发请求
    
    Service->>Service: 2. 参数校验
    Service->>Orch: 2.1 提交创建任务
    
    Orch->>SM: 3. 初始化状态（PENDING）
    SM-->>Orch: 3.1 状态确认
    
    Orch->>Adapter: 4. 执行安装
    Adapter->>Helm: 4.1 Helm install
    Helm->>K8s: 4.2 创建资源
    
    K8s-->>Helm: 4.3 资源创建成功
    Helm-->>Adapter: 4.4 安装完成
    
    Adapter->>SM: 5. 更新状态（CREATING→RUNNING）
    SM-->>Adapter: 5.1 状态确认
    
    Adapter-->>Orch: 6. 返回结果
    Orch-->>Service: 6.1 操作完成
    Service-->>Gateway: 6.2 返回响应
    Gateway-->>Client: 7. CreateVClusterResponse
```

### 暂停与恢复流程

```mermaid
sequenceDiagram
    autonumber
    participant Client as 客户端（Client）
    participant Service as VClusterService
    participant Adapter as vcluster适配器
    participant K8s as 宿主K8s集群
    participant Pods as vcluster Pods

    rect rgb(255, 240, 240)
        Note over Client,Pods: 暂停流程（Suspend Flow）
        Client->>Service: 1. SuspendVCluster请求
        Service->>Adapter: 1.1 执行暂停
        
        alt 需要创建快照
            Adapter->>Adapter: 1.2 创建etcd快照
        end
        
        alt 需要驱逐工作负载
            Adapter->>K8s: 1.3 驱逐工作负载Pods
            K8s-->>Adapter: 1.4 驱逐完成
        end
        
        Adapter->>K8s: 2. 缩容控制面Deployment
        K8s->>Pods: 2.1 终止控制面Pods
        Pods-->>K8s: 2.2 Pods已终止
        K8s-->>Adapter: 2.3 缩容完成
        
        Adapter-->>Service: 3. 状态更新为SUSPENDED
        Service-->>Client: 3.1 SuspendVClusterResponse
    end

    rect rgb(240, 255, 240)
        Note over Client,Pods: 恢复流程（Resume Flow）
        Client->>Service: 4. ResumeVCluster请求
        Service->>Adapter: 4.1 执行恢复
        
        Adapter->>K8s: 5. 扩容控制面Deployment
        K8s->>Pods: 5.1 创建控制面Pods
        Pods-->>K8s: 5.2 Pods就绪
        K8s-->>Adapter: 5.3 扩容完成
        
        alt 需要协调工作负载
            Adapter->>Adapter: 5.4 触发工作负载协调
        end
        
        Adapter-->>Service: 6. 状态更新为RUNNING
        Service-->>Client: 6.1 ResumeVClusterResponse
    end
```

## 部署架构

### 高可用部署模式

```mermaid
graph TB
    %% 高可用部署架构
    subgraph LB_LAYER[负载均衡层（Load Balancer Layer）]
        LB1[负载均衡器1]
        LB2[负载均衡器2]
    end

    subgraph API_LAYER[API服务层（API Service Layer）]
        API1[API服务实例1]
        API2[API服务实例2]
        API3[API服务实例3]
    end

    subgraph CTRL_LAYER[控制器层（Controller Layer）]
        CTRL1[控制器实例1<br/>（Leader）]
        CTRL2[控制器实例2<br/>（Standby）]
    end

    subgraph STORE_LAYER[存储层（Storage Layer）]
        ETCD1[etcd节点1]
        ETCD2[etcd节点2]
        ETCD3[etcd节点3]
        S3[对象存储<br/>（快照存储）]
    end

    subgraph HOST_CLUSTERS[宿主集群（Host Clusters）]
        HC1[宿主集群1]
        HC2[宿主集群2]
    end

    LB1 --> API1
    LB1 --> API2
    LB1 --> API3
    LB2 --> API1
    LB2 --> API2
    LB2 --> API3

    API1 --> CTRL1
    API2 --> CTRL1
    API3 --> CTRL1
    CTRL1 -.-> CTRL2

    API1 --> ETCD1
    API2 --> ETCD2
    API3 --> ETCD3
    ETCD1 <--> ETCD2
    ETCD2 <--> ETCD3
    ETCD1 <--> ETCD3

    CTRL1 --> S3
    CTRL1 --> HC1
    CTRL1 --> HC2
```

## 参考资料

1. [vcluster Architecture](https://www.vcluster.com/docs/architecture/basics) - vcluster架构基础
2. [Kubernetes Controller Pattern](https://kubernetes.io/docs/concepts/architecture/controller/) - Kubernetes控制器模式
3. [Helm Architecture](https://helm.sh/docs/topics/architecture/) - Helm架构设计
4. [gRPC Load Balancing](https://grpc.io/blog/grpc-load-balancing/) - gRPC负载均衡
5. [etcd Clustering](https://etcd.io/docs/v3.5/op-guide/clustering/) - etcd集群部署