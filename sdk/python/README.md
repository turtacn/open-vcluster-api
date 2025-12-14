# open-vcluster-api Python SDK

Python client library for the open-vcluster-api.

## Installation

```bash
pip install open-vcluster-api
```

## Usage

```python
import grpc
from open_vcluster_api import vcluster_api_pb2, vcluster_api_pb2_grpc

# Create a channel
channel = grpc.insecure_channel('localhost:50051')

# Create a stub
stub = vcluster_api_pb2_grpc.VClusterServiceStub(channel)

# Create a vcluster
request = vcluster_api_pb2.CreateVClusterRequest(
    name="my-vcluster",
    namespace="default",
    spec=vcluster_api_pb2.VClusterSpec(
        kubernetes_version="1.28.0",
        distro="k3s",
    )
)
response = stub.CreateVCluster(request)
print(f"Created vcluster: {response.vcluster.name}")
```
