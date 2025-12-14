# Copyright (c) 2024 turtacn
# SPDX-License-Identifier: MIT

.PHONY: all generate build test clean deps lint proto sdk-go sdk-ts sdk-py sdk-all examples help

# Variables
GO := go
PROTOC := protoc
BUF := buf
PROJECT := open-vcluster-api
VERSION ?= 0.1.0

# Directories
API_DIR := api/proto
SDK_DIR := sdk
EXAMPLES_DIR := examples

# Default target
all: generate build

# Help
help:
	@echo "open-vcluster-api Makefile"
	@echo ""
	@echo "Targets:"
	@echo "  generate     Generate protobuf code"
	@echo "  build        Build all examples"
	@echo "  test         Run tests"
	@echo "  clean        Clean build artifacts"
	@echo "  deps         Install dependencies"
	@echo "  lint         Run linters"
	@echo "  proto        Generate protobuf code using buf"
	@echo "  sdk-go       Generate Go SDK"
	@echo "  sdk-ts       Generate TypeScript SDK"
	@echo "  sdk-py       Generate Python SDK"
	@echo "  sdk-all      Generate all SDKs"
	@echo "  examples     Build example applications"
	@echo ""

# Install dependencies
deps:
	@echo "Installing Go dependencies..."
	$(GO) install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	$(GO) install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	$(GO) install github.com/bufbuild/buf/cmd/buf@latest
	$(GO) install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# Generate protobuf code
generate: proto

proto:
	@echo "Generating protobuf code..."
	@if command -v $(BUF) >/dev/null 2>&1; then \
		cd tools && $(BUF) generate --template buf.gen.yaml; \
	else \
		$(PROTOC) \
			--proto_path=$(API_DIR) \
			--go_out=api/v1 \
			--go_opt=paths=source_relative \
			--go-grpc_out=api/v1 \
			--go-grpc_opt=paths=source_relative \
			$(API_DIR)/*.proto; \
	fi

# Generate SDKs
sdk-go:
	@echo "Generating Go SDK..."
	./scripts/generate-sdk.sh go

sdk-ts:
	@echo "Generating TypeScript SDK..."
	./scripts/generate-sdk.sh typescript

sdk-py:
	@echo "Generating Python SDK..."
	./scripts/generate-sdk.sh python

sdk-all:
	@echo "Generating all SDKs..."
	./scripts/generate-sdk.sh all

# Build examples
build: examples

examples:
	@echo "Building examples..."
	cd $(EXAMPLES_DIR)/simple-server-go && $(GO) build -o ../../bin/simple-server .
	cd $(EXAMPLES_DIR)/simple-client-go && $(GO) build -o ../../bin/simple-client .
	@echo "Binaries available in ./bin/"

# Run tests
test:
	@echo "Running tests..."
	$(GO) test -v -race -cover ./...

# Lint
lint:
	@echo "Running linters..."
	@if command -v golangci-lint >/dev/null 2>&1; then \
		golangci-lint run ./...; \
	else \
		echo "golangci-lint not installed, skipping..."; \
	fi
	@if command -v $(BUF) >/dev/null 2>&1; then \
		$(BUF) lint; \
	else \
		echo "buf not installed, skipping proto lint..."; \
	fi

# Clean
clean:
	@echo "Cleaning..."
	rm -rf bin/
	rm -rf $(SDK_DIR)/go/
	rm -rf $(SDK_DIR)/typescript/node_modules $(SDK_DIR)/typescript/dist
	rm -rf $(SDK_DIR)/python/build $(SDK_DIR)/python/*.egg-info
	find . -name "*.pb.go" -delete
	find . -name "*_grpc.pb.go" -delete

# Docker build
docker-build:
	docker build -t $(PROJECT):$(VERSION) .

# Run server locally
run-server:
	$(GO) run $(EXAMPLES_DIR)/simple-server-go/main.go

# Run client locally
run-client:
	$(GO) run $(EXAMPLES_DIR)/simple-client-go/main.go --action demo