# VCluster生命周期序列图

本文档通过序列图详细展示VCluster从创建到删除的完整生命周期流程。

## 完整生命周期概览

```mermaid
graph LR
    %% 生命周期状态流转
    CREATE[创建<br/>Create] --> RUNNING[运行中<br/>Running]
    RUNNING --> SCALE[伸缩<br/>Scale]
    SCALE --> RUNNING
    RUNNING --> SUSPEND[暂停<br/>Suspend]
    SUSPEND --> SUSPENDED[已暂停<br/>Suspended]
    SUSPENDED --> RESUME[恢复<br/>Resume]
    RESUME --> RUNNING
    RUNNING --> SNAPSHOT[快照<br/>Snapshot]
    SNAPSHOT --> RUNNING
    RUNNING --> RESTORE[还原<br/>Restore]
    RESTORE --> RUNNING
    RUNNING --> DELETE[删除<br/>Delete]
    SUSPENDED --> DELETE
    DELETE --> DELETED[已删除<br/>Deleted]
````

## 创建流程（Create）

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户<br/>（User）
    participant API as API服务<br/>（API Service）
    participant Validator as 校验器<br/>（Validator）
    participant Quota as 配额服务<br/>（Quota Service）
    participant Orch as 编排器<br/>（Orchestrator）
    participant Adapter as vcluster适配器<br/>（Adapter）
    participant Helm as Helm客户端<br/>（Helm）
    participant K8s as 宿主集群<br/>（Host K8s）

    User->>API: 1. CreateVCluster请求
    Note over User,API: 请求包含：名称、命名空间、规格配置

    API->>Validator: 2. 验证请求参数
    Validator->>Validator: 2.1 检查名称格式
    Validator->>Validator: 2.2 检查规格有效性
    Validator-->>API: 2.3 验证通过

    API->>Quota: 3. 检查资源配额
    Quota->>Quota: 3.1 计算所需资源
    Quota->>Quota: 3.2 比对可用配额
    Quota-->>API: 3.3 配额充足

    API->>Orch: 4. 提交创建任务
    Orch->>Orch: 4.1 生成唯一ID
    Orch->>Orch: 4.2 初始化状态为PENDING

    Orch->>Adapter: 5. 执行安装
    Adapter->>K8s: 5.1 创建目标命名空间
    K8s-->>Adapter: 5.2 命名空间就绪

    Adapter->>Helm: 6. 安装vcluster Chart
    Note over Helm: 6.1 渲染Helm模板<br/>6.2 准备资源清单
    
    Helm->>K8s: 7. 创建Kubernetes资源
    Note over K8s: 7.1 StatefulSet<br/>7.2 Service<br/>7.3 Secret<br/>7.4 RBAC资源
    K8s-->>Helm: 7.5 资源创建成功

    Helm-->>Adapter: 8. Helm安装完成
    Adapter->>Adapter: 8.1 更新状态为CREATING

    Adapter->>K8s: 9. 等待控制面就绪
    loop 健康检查
        K8s-->>Adapter: 9.1 检查Pod状态
    end
    K8s-->>Adapter: 9.2 所有Pods Running

    Adapter->>K8s: 10. 获取kubeconfig
    K8s-->>Adapter: 10.1 返回Secret内容

    Adapter->>Orch: 11. 安装完成
    Orch->>Orch: 11.1 更新状态为RUNNING
    Orch-->>API: 11.2 返回VCluster对象

    API-->>User: 12. CreateVClusterResponse
    Note over User,API: 响应包含：VCluster详情、kubeconfig
```

## 伸缩流程（Scale）

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户<br/>（User）
    participant API as API服务<br/>（API Service）
    participant Orch as 编排器<br/>（Orchestrator）
    participant Adapter as vcluster适配器<br/>（Adapter）
    participant Helm as Helm客户端<br/>（Helm）
    participant K8s as 宿主集群<br/>（Host K8s）

    User->>API: 1. ScaleVCluster请求
    Note over User,API: 请求包含：新的资源规格、副本数

    API->>API: 2. 验证伸缩参数
    API->>Orch: 3. 提交伸缩任务
    
    Orch->>Orch: 4. 检查当前状态
    Note over Orch: 仅RUNNING状态允许伸缩
    Orch->>Orch: 4.1 更新状态为SCALING

    Orch->>Adapter: 5. 执行伸缩
    
    alt 副本数变更
        Adapter->>K8s: 5.1 修改Deployment副本数
        K8s-->>Adapter: 5.2 副本调整完成
    end

    alt 资源规格变更
        Adapter->>Helm: 5.3 升级Helm release
        Note over Helm: 更新resources配置
        Helm->>K8s: 5.4 应用新配置
        K8s->>K8s: 5.5 滚动更新Pods
        K8s-->>Helm: 5.6 升级完成
        Helm-->>Adapter: 5.7 返回结果
    end

    Adapter->>K8s: 6. 等待所有Pods就绪
    loop 就绪检查
        K8s-->>Adapter: 6.1 检查Pod状态
    end

    Adapter-->>Orch: 7. 伸缩完成
    Orch->>Orch: 7.1 更新状态为RUNNING
    Orch-->>API: 7.2 返回结果

    API-->>User: 8. ScaleVClusterResponse
```

## 暂停流程（Suspend）

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户<br/>（User）
    participant API as API服务<br/>（API Service）
    participant Orch as 编排器<br/>（Orchestrator）
    participant Snap as 快照服务<br/>（Snapshot）
    participant Adapter as vcluster适配器<br/>（Adapter）
    participant K8s as 宿主集群<br/>（Host K8s）
    participant Store as 对象存储<br/>（Storage）

    User->>API: 1. SuspendVCluster请求
    Note over User,API: 可选：drain_workloads<br/>可选：create_snapshot

    API->>Orch: 2. 提交暂停任务
    Orch->>Orch: 2.1 检查当前状态为RUNNING
    Orch->>Orch: 2.2 更新状态为暂停中

    opt 创建快照
        Orch->>Snap: 3. 创建暂停前快照
        Snap->>Adapter: 3.1 获取etcd数据
        Adapter->>K8s: 3.2 执行etcd快照
        K8s-->>Adapter: 3.3 返回快照数据
        Adapter-->>Snap: 3.4 快照数据
        Snap->>Store: 3.5 上传快照
        Store-->>Snap: 3.6 上传完成
        Snap-->>Orch: 3.7 快照创建成功
    end

    opt 驱逐工作负载
        Orch->>Adapter: 4. 驱逐工作负载
        Adapter->>K8s: 4.1 获取vcluster中的Pods
        K8s-->>Adapter: 4.2 Pod列表
        loop 驱逐每个Pod
            Adapter->>K8s: 4.3 发送驱逐请求
            K8s-->>Adapter: 4.4 驱逐成功
        end
        Adapter-->>Orch: 4.5 驱逐完成
    end

    Orch->>Adapter: 5. 缩容控制面
    Adapter->>K8s: 5.1 设置Deployment副本数为0
    K8s->>K8s: 5.2 终止控制面Pods
    
    loop 等待终止
        K8s-->>Adapter: 5.3 检查Pod状态
    end
    K8s-->>Adapter: 5.4 所有Pods已终止

    Adapter-->>Orch: 6. 暂停完成
    Orch->>Orch: 6.1 更新状态为SUSPENDED
    Orch-->>API: 6.2 返回结果

    API-->>User: 7. SuspendVClusterResponse
    Note over User,API: 响应包含：暂停后状态<br/>可选：快照信息
```

## 恢复流程（Resume）

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户<br/>（User）
    participant API as API服务<br/>（API Service）
    participant Orch as 编排器<br/>（Orchestrator）
    participant Adapter as vcluster适配器<br/>（Adapter）
    participant K8s as 宿主集群<br/>（Host K8s）

    User->>API: 1. ResumeVCluster请求
    Note over User,API: 可选：reconcile_workloads

    API->>Orch: 2. 提交恢复任务
    Orch->>Orch: 2.1 检查当前状态为SUSPENDED
    Orch->>Orch: 2.2 更新状态为RESUMING

    Orch->>Adapter: 3. 扩容控制面
    Adapter->>K8s: 3.1 恢复Deployment副本数
    Note over K8s: 根据spec.replicas设置
    
    K8s->>K8s: 3.2 调度控制面Pods
    
    loop 等待就绪
        Adapter->>K8s: 3.3 检查Pod状态
        K8s-->>Adapter: 3.4 返回状态
    end
    K8s-->>Adapter: 3.5 所有Pods就绪

    Adapter->>Adapter: 4. 执行健康检查
    Adapter->>K8s: 4.1 检查API Server响应
    K8s-->>Adapter: 4.2 API Server健康

    opt 协调工作负载
        Adapter->>K8s: 5. 触发Syncer协调
        K8s->>K8s: 5.1 重新同步资源
        K8s-->>Adapter: 5.2 协调完成
    end

    Adapter-->>Orch: 6. 恢复完成
    Orch->>Orch: 6.1 更新状态为RUNNING
    Orch-->>API: 6.2 返回结果

    API-->>User: 7. ResumeVClusterResponse
```

## 快照流程（Snapshot）

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户<br/>（User）
    participant API as API服务<br/>（API Service）
    participant Orch as 编排器<br/>（Orchestrator）
    participant Adapter as vcluster适配器<br/>（Adapter）
    participant K8s as 宿主集群<br/>（Host K8s）
    participant Store as 对象存储<br/>（Storage）

    User->>API: 1. SnapshotVCluster请求
    Note over User,API: 请求包含：快照名称、描述<br/>可选：retention_hours

    API->>Orch: 2. 提交快照任务
    Orch->>Orch: 2.1 检查当前状态为RUNNING
    Orch->>Orch: 2.2 更新状态为SNAPSHOTTING

    Orch->>Adapter: 3. 执行快照

    Adapter->>K8s: 4. 获取vcluster元数据
    K8s-->>Adapter: 4.1 返回ConfigMaps/Secrets
    
    Adapter->>K8s: 5. 执行etcd快照
    Note over K8s: 连接vcluster内部etcd<br/>执行snapshot save
    K8s-->>Adapter: 5.1 返回etcd快照数据

    opt 包含工作负载状态
        Adapter->>K8s: 6. 导出工作负载定义
        K8s-->>Adapter: 6.1 返回资源YAML
    end

    Adapter->>Adapter: 7. 打包快照数据
    Note over Adapter: 7.1 etcd数据<br/>7.2 元数据<br/>7.3 Helm values<br/>7.4 可选：工作负载

    Adapter->>Store: 8. 上传快照
    Store-->>Adapter: 8.1 返回存储URI

    Adapter->>Adapter: 9. 创建Snapshot记录
    Adapter-->>Orch: 10. 快照完成

    Orch->>Orch: 10.1 更新状态为RUNNING
    Orch->>Orch: 10.2 更新last_snapshot信息
    Orch-->>API: 10.3 返回结果

    API-->>User: 11. SnapshotVClusterResponse
    Note over User,API: 响应包含：Snapshot对象详情
```

## 还原流程（Restore）

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户<br/>（User）
    participant API as API服务<br/>（API Service）
    participant Orch as 编排器<br/>（Orchestrator）
    participant Adapter as vcluster适配器<br/>（Adapter）
    participant Store as 对象存储<br/>（Storage）
    participant K8s as 宿主集群<br/>（Host K8s）

    User->>API: 1. RestoreVCluster请求
    Note over User,API: 请求包含：snapshot_id<br/>可选：create_new, new_name

    API->>Store: 2. 验证快照存在
    Store-->>API: 2.1 快照元数据

    API->>Orch: 3. 提交还原任务
    Orch->>Orch: 3.1 更新状态为RESTORING

    alt 创建新集群
        Orch->>Adapter: 4a. 创建新vcluster
        Adapter->>K8s: 4a.1 创建命名空间
        Adapter->>K8s: 4a.2 安装vcluster
        K8s-->>Adapter: 4a.3 安装完成
    else 覆盖现有集群
        Orch->>Adapter: 4b. 停止现有vcluster
        Adapter->>K8s: 4b.1 缩容控制面
        K8s-->>Adapter: 4b.2 Pods已停止
    end

    Orch->>Store: 5. 下载快照数据
    Store-->>Orch: 5.1 返回快照数据

    Orch->>Adapter: 6. 恢复etcd数据
    Adapter->>K8s: 6.1 写入etcd快照
    K8s-->>Adapter: 6.2 etcd恢复完成

    Adapter->>K8s: 7. 启动控制面
    K8s->>K8s: 7.1 调度Pods
    K8s-->>Adapter: 7.2 Pods就绪

    Adapter->>Adapter: 8. 验证数据完整性
    Adapter->>K8s: 8.1 检查API对象
    K8s-->>Adapter: 8.2 验证通过

    opt 恢复工作负载
        Adapter->>K8s: 9. 触发工作负载协调
        K8s-->>Adapter: 9.1 协调完成
    end

    Adapter-->>Orch: 10. 还原完成
    Orch->>Orch: 10.1 更新状态为RUNNING
    Orch-->>API: 10.2 返回结果

    API-->>User: 11. RestoreVClusterResponse
```

## 删除流程（Delete）

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户<br/>（User）
    participant API as API服务<br/>（API Service）
    participant Orch as 编排器<br/>（Orchestrator）
    participant Adapter as vcluster适配器<br/>（Adapter）
    participant Helm as Helm客户端<br/>（Helm）
    participant K8s as 宿主集群<br/>（Host K8s）
    participant Store as 对象存储<br/>（Storage）

    User->>API: 1. DeleteVCluster请求
    Note over User,API: 可选：force, delete_snapshots<br/>可选：grace_period_seconds

    API->>Orch: 2. 提交删除任务
    Orch->>Orch: 2.1 检查状态允许删除
    Note over Orch: RUNNING、SUSPENDED、ERROR可删除
    Orch->>Orch: 2.2 更新状态为DELETING

    opt 优雅终止
        Orch->>Adapter: 3. 驱逐工作负载
        Adapter->>K8s: 3.1 发送驱逐请求
        K8s-->>Adapter: 3.2 驱逐完成
    end

    Orch->>Adapter: 4. 卸载vcluster
    Adapter->>Helm: 4.1 Helm uninstall
    Helm->>K8s: 4.2 删除Helm管理的资源
    K8s-->>Helm: 4.3 资源已删除
    Helm-->>Adapter: 4.4 卸载完成

    Adapter->>K8s: 5. 清理残留资源
    Note over K8s: 5.1 删除PVC<br/>5.2 删除Secret<br/>5.3 删除ConfigMap
    K8s-->>Adapter: 5.4 清理完成

    opt 删除快照
        Orch->>Store: 6. 删除关联快照
        Store-->>Orch: 6.1 快照已删除
    end

    Adapter->>K8s: 7. 删除命名空间
    K8s-->>Adapter: 7.1 命名空间已删除

    Adapter-->>Orch: 8. 删除完成
    Orch->>Orch: 8.1 清理内部记录
    Orch-->>API: 8.2 返回结果

    API-->>User: 9. DeleteVClusterResponse
    Note over User,API: 响应包含：删除确认、操作ID
```

## 完整生命周期时序

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户
    participant VC as VCluster

    rect rgb(200, 255, 200)
        Note over User,VC: 阶段1：创建与运行
        User->>VC: CreateVCluster
        VC-->>User: RUNNING
    end

    rect rgb(200, 200, 255)
        Note over User,VC: 阶段2：伸缩调整
        User->>VC: ScaleVCluster
        VC-->>User: RUNNING（规格已更新）
    end

    rect rgb(255, 255, 200)
        Note over User,VC: 阶段3：暂停与恢复
        User->>VC: SuspendVCluster
        VC-->>User: SUSPENDED
        User->>VC: ResumeVCluster
        VC-->>User: RUNNING
    end

    rect rgb(255, 200, 255)
        Note over User,VC: 阶段4：快照与还原
        User->>VC: SnapshotVCluster
        VC-->>User: Snapshot已创建
        User->>VC: RestoreVCluster
        VC-->>User: RUNNING（已还原）
    end

    rect rgb(255, 200, 200)
        Note over User,VC: 阶段5：删除
        User->>VC: DeleteVCluster
        VC-->>User: 已删除
    end
```

## 参考资料

1. [vcluster Lifecycle Management](https://www.vcluster.com/docs/using-vclusters/lifecycle) - vcluster生命周期管理
2. [Kubernetes Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/) - Kubernetes Pod生命周期
3. [Helm Release Lifecycle](https://helm.sh/docs/howto/charts_tips_and_tricks/) - Helm Release生命周期
4. [etcd Backup and Restore](https://etcd.io/docs/v3.5/op-guide/recovery/) - etcd备份恢复流程
