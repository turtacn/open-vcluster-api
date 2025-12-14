#!/bin/bash
# Copyright (c) 2024 turtacn
# SPDX-License-Identifier: MIT

# SDK Generation Script for open-vcluster-api
# This script generates client SDKs for Go, TypeScript, and Python from protobuf definitions.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PROTO_DIR="$PROJECT_ROOT/api/proto"
OUTPUT_DIR="$PROJECT_ROOT/sdk"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_dependencies() {
    log_info "Checking dependencies..."

    # Check protoc
    if ! command -v protoc &> /dev/null; then
        log_error "protoc is not installed. Please install Protocol Buffers compiler."
        log_info "  macOS: brew install protobuf"
        log_info "  Ubuntu: apt-get install -y protobuf-compiler"
        exit 1
    fi

    # Check buf (optional but recommended)
    if command -v buf &> /dev/null; then
        log_info "buf found: $(buf --version)"
        USE_BUF=true
    else
        log_warn "buf not found. Using protoc directly."
        USE_BUF=false
    fi
}

generate_go() {
    log_info "Generating Go SDK..."

    GO_OUT="$OUTPUT_DIR/go"
    mkdir -p "$GO_OUT"

    if [ "$USE_BUF" = true ]; then
        cd "$PROJECT_ROOT"
        buf generate --template tools/buf.gen.go.yaml
    else
        # Check Go plugins
        if ! command -v protoc-gen-go &> /dev/null; then
            log_info "Installing protoc-gen-go..."
            go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
        fi
        if ! command -v protoc-gen-go-grpc &> /dev/null; then
            log_info "Installing protoc-gen-go-grpc..."
            go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
        fi

        protoc \
            --proto_path="$PROTO_DIR" \
            --proto_path="$PROJECT_ROOT/third_party" \
            --go_out="$GO_OUT" \
            --go_opt=paths=source_relative \
            --go-grpc_out="$GO_OUT" \
            --go-grpc_opt=paths=source_relative \
            "$PROTO_DIR"/*.proto
    fi

    # Generate go.mod for the SDK
    cat > "$GO_OUT/go.mod" << EOF
module github.com/turtacn/open-vcluster-api/sdk/go

go 1.21

require (
    google.golang.org/grpc v1.59.0
    google.golang.org/protobuf v1.31.0
)
EOF

    log_info "Go SDK generated at $GO_OUT"
}

generate_typescript() {
    log_info "Generating TypeScript SDK..."

    TS_OUT="$OUTPUT_DIR/typescript"
    mkdir -p "$TS_OUT/src"

    # Check npm packages
    if ! command -v npx &> /dev/null; then
        log_error "npx not found. Please install Node.js."
        exit 1
    fi

    # Install required packages if not present
    if [ ! -d "$TS_OUT/node_modules" ]; then
        log_info "Installing TypeScript dependencies..."
        cd "$TS_OUT"
        npm init -y
        npm install --save-dev \
            @grpc/grpc-js \
            @grpc/proto-loader \
            google-protobuf \
            grpc-tools \
            grpc_tools_node_protoc_ts \
            typescript \
            @types/node \
            @types/google-protobuf
        cd "$PROJECT_ROOT"
    fi

    # Generate TypeScript code
    GRPC_TOOLS="$TS_OUT/node_modules/.bin/grpc_tools_node_protoc"
    PROTOC_TS="$TS_OUT/node_modules/.bin/protoc-gen-ts"

    if [ -f "$GRPC_TOOLS" ]; then
        $GRPC_TOOLS \
            --proto_path="$PROTO_DIR" \
            --proto_path="$PROJECT_ROOT/third_party" \
            --js_out=import_style=commonjs,binary:"$TS_OUT/src" \
            --grpc_out=grpc_js:"$TS_OUT/src" \
            --plugin=protoc-gen-grpc="$TS_OUT/node_modules/.bin/grpc_tools_node_protoc_plugin" \
            "$PROTO_DIR"/*.proto

        # Generate TypeScript definitions
        $GRPC_TOOLS \
            --proto_path="$PROTO_DIR" \
            --proto_path="$PROJECT_ROOT/third_party" \
            --plugin=protoc-gen-ts="$PROTOC_TS" \
            --ts_out=grpc_js:"$TS_OUT/src" \
            "$PROTO_DIR"/*.proto
    else
        log_warn "grpc_tools_node_protoc not found, using protoc directly..."
        protoc \
            --proto_path="$PROTO_DIR" \
            --proto_path="$PROJECT_ROOT/third_party" \
            --js_out=import_style=commonjs,binary:"$TS_OUT/src" \
            "$PROTO_DIR"/*.proto
    fi

    # Create package.json
    cat > "$TS_OUT/package.json" << EOF
{
  "name": "@open-vcluster-api/sdk",
  "version": "0.1.0",
  "description": "TypeScript SDK for open-vcluster-api",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@grpc/grpc-js": "^1.9.0",
    "google-protobuf": "^3.21.0"
  },
  "devDependencies": {
    "@types/google-protobuf": "^3.15.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/turtacn/open-vcluster-api.git"
  },
  "license": "MIT"
}
EOF

    # Create tsconfig.json
    cat > "$TS_OUT/tsconfig.json" << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": false,
    "inlineSourceMap": true,
    "inlineSources": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

    # Create index.ts
    cat > "$TS_OUT/src/index.ts" << EOF
// Auto-generated index file
export * from './vcluster_api_pb';
export * from './vcluster_api_grpc_pb';
EOF

    log_info "TypeScript SDK generated at $TS_OUT"
}

generate_python() {
    log_info "Generating Python SDK..."

    PY_OUT="$OUTPUT_DIR/python"
    mkdir -p "$PY_OUT/open_vcluster_api"

    # Check Python and pip
    if ! command -v python3 &> /dev/null; then
        log_error "python3 not found. Please install Python 3."
        exit 1
    fi

    # Install required packages
    log_info "Installing Python dependencies..."
    pip3 install --quiet grpcio grpcio-tools

    # Generate Python code
    python3 -m grpc_tools.protoc \
        --proto_path="$PROTO_DIR" \
        --proto_path="$PROJECT_ROOT/third_party" \
        --python_out="$PY_OUT/open_vcluster_api" \
        --grpc_python_out="$PY_OUT/open_vcluster_api" \
        --pyi_out="$PY_OUT/open_vcluster_api" \
        "$PROTO_DIR"/*.proto

    # Create __init__.py
    cat > "$PY_OUT/open_vcluster_api/__init__.py" << EOF
# Auto-generated package init
from .vcluster_api_pb2 import *
from .vcluster_api_pb2_grpc import *

__version__ = "0.1.0"
EOF

    # Create setup.py
    cat > "$PY_OUT/setup.py" << EOF
from setuptools import setup, find_packages

setup(
    name="open-vcluster-api",
    version="0.1.0",
    description="Python SDK for open-vcluster-api",
    author="turtacn",
    author_email="",
    url="https://github.com/turtacn/open-vcluster-api",
    packages=find_packages(),
    install_requires=[
        "grpcio>=1.59.0",
        "protobuf>=4.24.0",
    ],
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
)
EOF

    # Create pyproject.toml
    cat > "$PY_OUT/pyproject.toml" << EOF
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "open-vcluster-api"
version = "0.1.0"
description = "Python SDK for open-vcluster-api"
readme = "README.md"
license = {text = "MIT"}
requires-python = ">=3.8"
dependencies = [
    "grpcio>=1.59.0",
    "protobuf>=4.24.0",
]

[project.urls]
Homepage = "https://github.com/turtacn/open-vcluster-api"
Repository = "https://github.com/turtacn/open-vcluster-api.git"
EOF

    # Create README
    cat > "$PY_OUT/README.md" << EOF
# open-vcluster-api Python SDK

Python client library for the open-vcluster-api.

## Installation

\`\`\`bash
pip install open-vcluster-api
\`\`\`

## Usage

\`\`\`python
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
\`\`\`
EOF

    log_info "Python SDK generated at $PY_OUT"
}

print_usage() {
    echo "Usage: $0 [go|typescript|python|all]"
    echo ""
    echo "Commands:"
    echo "  go          Generate Go SDK"
    echo "  typescript  Generate TypeScript SDK"
    echo "  python      Generate Python SDK"
    echo "  all         Generate all SDKs"
    echo ""
    echo "Examples:"
    echo "  $0 go"
    echo "  $0 all"
}

main() {
    if [ $# -eq 0 ]; then
        print_usage
        exit 1
    fi

    check_dependencies

    case "$1" in
        go)
            generate_go
            ;;
        typescript|ts)
            generate_typescript
            ;;
        python|py)
            generate_python
            ;;
        all)
            generate_go
            generate_typescript
            generate_python
            ;;
        -h|--help|help)
            print_usage
            exit 0
            ;;
        *)
            log_error "Unknown command: $1"
            print_usage
            exit 1
            ;;
    esac

    log_info "SDK generation complete!"
}

main "$@"