# Contributing to open-vcluster-api

We're excited that you're interested in contributing to open-vcluster-api! This document outlines the process for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to adhere to these guidelines to ensure a welcoming and inclusive environment.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-vcluster-api.git
   cd open-vcluster-api
````

3. **Add the upstream remote**:

   ```bash
   git remote add upstream https://github.com/turtacn/open-vcluster-api.git
   ```

## How to Contribute

### Types of Contributions

We welcome the following types of contributions:

* 🐛 **Bug Reports**: Found a bug? Open an issue with details
* 💡 **Feature Requests**: Have an idea? We'd love to hear it
* 📝 **Documentation**: Improve docs, fix typos, add examples
* 🔧 **Code**: Bug fixes, new features, optimizations
* 🌐 **Translations**: Help translate documentation

### Development Setup

#### Prerequisites

* Go 1.21+
* Protocol Buffers compiler (`protoc`) v3.21+
* Buf CLI (recommended)
* Docker (for testing)
* Make

#### Setup Steps

```bash
# Install dependencies
make deps

# Generate protobuf code
make generate

# Run tests
make test

# Build examples
make build-examples
```

## Coding Standards

### Go Code

* Follow [Effective Go](https://golang.org/doc/effective_go) guidelines
* Use `gofmt` and `goimports` for formatting
* Run `golangci-lint` before submitting

### Protobuf Definitions

* Follow [Google's Protocol Buffers Style Guide](https://protobuf.dev/programming-guides/style/)
* Use descriptive field names
* Add comments for all messages and fields
* Use semantic versioning for API changes

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:

* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation changes
* `style`: Code style changes (formatting, etc.)
* `refactor`: Code refactoring
* `test`: Adding or updating tests
* `chore`: Maintenance tasks

Examples:

```
feat(api): add SnapshotVCluster operation
fix(server): resolve race condition in ListVClusters
docs(readme): add Chinese translation
```

## Pull Request Process

1. **Create a branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Add tests** for new functionality

4. **Run the test suite**:

   ```bash
   make test
   ```

5. **Update documentation** if needed

6. **Commit your changes** with descriptive commit messages

7. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request** against the `main` branch

### PR Requirements

* [ ] All tests pass
* [ ] Code follows project style guidelines
* [ ] Documentation is updated
* [ ] Commit messages follow conventions
* [ ] PR description explains the changes

## Issue Guidelines

### Bug Reports

Include:

* A clear, descriptive title
* Steps to reproduce
* Expected vs actual behavior
* Environment details (OS, Go version, etc.)
* Relevant logs or error messages

### Feature Requests

Include:

* A clear, descriptive title
* The problem this feature would solve
* Proposed solution (if any)
* Alternative solutions considered

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing! 🎉