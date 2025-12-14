# Quick Start Guide

This guide provides step-by-step instructions for setting up the development environment, generating code, building examples, and running tests for the `open-vcluster-api` project.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Go 1.21+** (Tested with Go 1.24.3)
*   **Protocol Buffers Compiler (`protoc`)**
    *   Ubuntu/Debian: `sudo apt install -y protobuf-compiler && sudo apt-get install -y npm`
    *   macOS: `brew install protobuf`
    *   Manual: Download from [GitHub Releases](https://github.com/protocolbuffers/protobuf/releases)
*   **Make**
*   **Python 3.8+** (for Python SDK generation)
*   **Node.js & npm** (for TypeScript SDK generation)

## 1. Setup Environment

Install the necessary Go dependencies (protoc plugins, buf, linters).

```bash
make deps
```

Ensure your `GOPATH/bin` is in your `PATH`:

```bash
export PATH=$(go env GOPATH)/bin:$PATH
```

## 2. Generate Code

Generate the Protocol Buffer code for Go, Python, and TypeScript.

### Generate All SDKs

```bash
make sdk-all
```

### Generate Specific SDKs

*   **Go SDK (`api/v1` and `sdk/go`):**
    ```bash
    make sdk-go
    ```
    *Note: This also generates the core gRPC code used by the server.*

*   **TypeScript SDK (`sdk/typescript`):**
    ```bash
    make sdk-ts
    ```

*   **Python SDK (`sdk/python`):**
    ```bash
    make sdk-py
    ```

### Generate Proto Only (Go Server Code)

If you only need the server-side Go code:

```bash
make proto
```
or
```bash
make generate
```

## 3. Build Examples

Compile the example server and client applications.

```bash
make build
```
or
```bash
make examples
```

This will create binaries in the `./bin/` directory:
*   `./bin/simple-server`
*   `./bin/simple-client`

## 4. Run Tests

Run the unit tests to verify the API logic.

```bash
make test
```

## 5. Run Examples

You can run the built binaries to verify end-to-end functionality.

**Terminal 1 (Server):**
```bash
./bin/simple-server
```

**Terminal 2 (Client):**
```bash
./bin/simple-client
```

## 6. Linting

Check code quality and protobuf definitions.

```bash
make lint
```

## 7. Cleanup

Remove generated artifacts and binaries.

```bash
make clean
```

## Troubleshooting

*   **`protoc-gen-go: program not found`**: Ensure `$(go env GOPATH)/bin` is in your system `PATH`.
*   **Python `externally-managed-environment`**: The build scripts use `--break-system-packages` to handle this in CI/dev environments. If you prefer virtual environments, manually create one and install dependencies from `sdk/python/requirements.txt` (if available) or `setup.py`.
*   **Buf Lint Errors**: The project is configured to ignore third-party directories. Ensure you are running `make lint` from the project root.
