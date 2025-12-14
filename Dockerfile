# Copyright (c) 2024 turtacn
# SPDX-License-Identifier: MIT

# Build stage
FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git make protobuf-dev

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /bin/vcluster-api-server ./examples/simple-server-go

# Final stage
FROM alpine:3.19

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

COPY --from=builder /bin/vcluster-api-server /app/vcluster-api-server

EXPOSE 50051

USER nobody:nobody

ENTRYPOINT ["/app/vcluster-api-server"]