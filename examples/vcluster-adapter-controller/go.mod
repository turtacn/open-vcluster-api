module github.com/turtacn/open-vcluster-api/examples/vcluster-adapter-controller

go 1.21

require (
	github.com/go-logr/logr v1.3.0
	github.com/turtacn/open-vcluster-api v0.1.0
	helm.sh/helm/v3 v3.13.2
	k8s.io/api v0.28.4
	k8s.io/apimachinery v0.28.4
	k8s.io/client-go v0.28.4
	sigs.k8s.io/controller-runtime v0.16.3
)

replace github.com/turtacn/open-vcluster-api => ../..