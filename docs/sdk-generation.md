# SDK生成指南

本文档详细介绍如何使用open-vcluster-api的SDK生成工具，为Go、TypeScript和Python语言生成客户端SDK。

## 概述

open-vcluster-api提供了自动化的SDK生成脚本，基于Protocol Buffers定义自动生成多语言客户端库。生成的SDK包含：

- 完整的gRPC客户端存根
- 类型定义和消息结构
- 辅助工具函数

## 前置条件

### 通用依赖

| 工具 | 版本要求 | 安装说明 |
|------|----------|----------|
| Protocol Buffers | v3.21+ | [安装指南](https://protobuf.dev/downloads/) |
| Buf CLI | v1.28+ | 可选，推荐使用 |

### 语言特定依赖

#### Go SDK

```bash
# 安装protoc-gen-go
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

# 安装protoc-gen-go-grpc
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
````

#### TypeScript SDK

```bash
# 需要Node.js 18+
node --version

# npm会自动安装所需依赖
```

#### Python SDK

```bash
# 需要Python 3.8+
python3 --version

# 安装grpcio-tools
pip3 install grpcio grpcio-tools
```

## 使用方法

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/turtacn/open-vcluster-api.git
cd open-vcluster-api

# 生成所有SDK
./scripts/generate-sdk.sh all
```

### 生成特定语言SDK

```bash
# 仅生成Go SDK
./scripts/generate-sdk.sh go

# 仅生成TypeScript SDK
./scripts/generate-sdk.sh typescript

# 仅生成Python SDK
./scripts/generate-sdk.sh python
```

### 使用Makefile

```bash
# 生成所有SDK
make sdk-all

# 生成特定语言
make sdk-go
make sdk-ts
make sdk-py
```

## 生成结果

### 目录结构

执行SDK生成后，会在`sdk/`目录下创建以下结构：

```
sdk/
├── go/
│   ├── go.mod
│   ├── vcluster_api.pb.go
│   └── vcluster_api_grpc.pb.go
├── typescript/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── vcluster_api_pb.js
│       ├── vcluster_api_pb.d.ts
│       ├── vcluster_api_grpc_pb.js
│       └── vcluster_api_grpc_pb.d.ts
└── python/
    ├── setup.py
    ├── pyproject.toml
    └── open_vcluster_api/
        ├── __init__.py
        ├── vcluster_api_pb2.py
        ├── vcluster_api_pb2.pyi
        └── vcluster_api_pb2_grpc.py
```

## SDK使用示例

### Go SDK

```go
package main

import (
    "context"
    "log"
    
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"
    
    v1 "github.com/turtacn/open-vcluster-api/sdk/go"
)

func main() {
    // 创建连接
    conn, err := grpc.Dial("localhost:50051", 
        grpc.WithTransportCredentials(insecure.NewCredentials()))
    if err != nil {
        log.Fatalf("连接失败: %v", err)
    }
    defer conn.Close()
    
    // 创建客户端
    client := v1.NewVClusterServiceClient(conn)
    
    // 创建vcluster
    resp, err := client.CreateVCluster(context.Background(), &v1.CreateVClusterRequest{
        Name:      "my-vcluster",
        Namespace: "default",
        Spec: &v1.VClusterSpec{
            KubernetesVersion: "1.28.0",
            Distro:            "k3s",
        },
    })
    if err != nil {
        log.Fatalf("创建失败: %v", err)
    }
    
    log.Printf("创建成功: %s", resp.Vcluster.Name)
}
```

### TypeScript SDK

```typescript
import * as grpc from '@grpc/grpc-js';
import { VClusterServiceClient } from './vcluster_api_grpc_pb';
import { CreateVClusterRequest, VClusterSpec } from './vcluster_api_pb';

// 创建客户端
const client = new VClusterServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// 创建vcluster
const request = new CreateVClusterRequest();
request.setName('my-vcluster');
request.setNamespace('default');

const spec = new VClusterSpec();
spec.setKubernetesVersion('1.28.0');
spec.setDistro('k3s');
request.setSpec(spec);

client.createVCluster(request, (error, response) => {
    if (error) {
        console.error('创建失败:', error);
        return;
    }
    console.log('创建成功:', response?.getVcluster()?.getName());
});
```

### Python SDK

```python
import grpc
from open_vcluster_api import vcluster_api_pb2, vcluster_api_pb2_grpc

# 创建连接
channel = grpc.insecure_channel('localhost:50051')
client = vcluster_api_pb2_grpc.VClusterServiceStub(channel)

# 创建vcluster
request = vcluster_api_pb2.CreateVClusterRequest(
    name="my-vcluster",
    namespace="default",
    spec=vcluster_api_pb2.VClusterSpec(
        kubernetes_version="1.28.0",
        distro="k3s",
    )
)

try:
    response = client.CreateVCluster(request)
    print(f"创建成功: {response.vcluster.name}")
except grpc.RpcError as e:
    print(f"创建失败: {e.details()}")
```

## 发布SDK

### Go SDK

Go SDK可以直接通过Go模块系统使用：

```bash
go get github.com/turtacn/open-vcluster-api/sdk/go@latest
```

### TypeScript SDK

```bash
cd sdk/typescript
npm run build
npm publish
```

### Python SDK

```bash
cd sdk/python
python -m build
twine upload dist/*
```

## 自定义生成

### 修改buf配置

编辑`tools/buf.gen.yaml`以自定义生成选项：

```yaml
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: your.custom/package/path
plugins:
  - plugin: buf.build/protocolbuffers/go
    out: your/output/path
    opt:
      - paths=source_relative
```

### 添加新语言支持

在`scripts/generate-sdk.sh`中添加新的生成函数：

```bash
generate_rust() {
    log_info "Generating Rust SDK..."
    # 添加Rust SDK生成逻辑
}
```

## 故障排除

### 常见问题

| 问题               | 原因                  | 解决方案           |
| ---------------- | ------------------- | -------------- |
| protoc not found | 未安装Protocol Buffers | 参考前置条件安装       |
| plugin not found | 缺少语言插件              | 安装对应的protoc插件  |
| import error     | proto路径配置错误         | 检查proto_path配置 |

### 调试模式

```bash
# 启用详细日志
DEBUG=1 ./scripts/generate-sdk.sh all
```

## 参考资料

1. [Protocol Buffers Documentation](https://protobuf.dev/) - Protobuf官方文档
2. [gRPC Documentation](https://grpc.io/docs/) - gRPC官方文档
3. [Buf Documentation](https://buf.build/docs/) - Buf工具文档
4. [gRPC-Go](https://github.com/grpc/grpc-go) - Go gRPC实现
5. [grpc-node](https://github.com/grpc/grpc-node) - Node.js gRPC实现
6. [grpcio](https://grpc.github.io/grpc/python/) - Python gRPC实现