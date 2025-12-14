module github.com/turtacn/open-vcluster-api/examples/simple-client-go

go 1.21

require (
	github.com/turtacn/open-vcluster-api v0.1.0
	google.golang.org/grpc v1.59.0
	google.golang.org/protobuf v1.31.0
)

replace github.com/turtacn/open-vcluster-api => ../..