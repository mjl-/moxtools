default: build
	./moxtools

build: build0 frontend build1

build0:
	# build early to catch syntax errors
	CGO_ENABLED=0 go build
	CGO_ENABLED=0 go vet ./...
	CGO_ENABLED=0 go run vendor/github.com/mjl-/sherpadoc/cmd/sherpadoc/*.go -adjust-function-names none -rename 'dmarc Policy DMARCPolicy' API >s/api.json
	go run vendor/github.com/mjl-/sherpats/cmd/sherpats/main.go -bytes-to-string -slices-nullable -maps-nullable -nullable-optional -namespace api api <s/api.json >api.ts

build1:
	# build again, api json files above are embedded
	CGO_ENABLED=0 go build

check:
	staticcheck ./...
	GOARCH=386 CGO_ENABLED=0 go vet ./...

# having "err" shadowed is common, best to not have others
check-shadow:
	go vet -vettool=$$(which shadow) ./... 2>&1 | grep -v '"err"'

fmt:
	go fmt ./...
	gofmt -w -s *.go

tswatch:
	bash -c 'while true; do inotifywait -q -e close_write *.ts; make frontend; done'

node_modules/.bin/tsc:
	-mkdir -p node_modules/.bin
	npm ci --ignore-scripts

install-js: node_modules/.bin/tsc

install-js0:
	-mkdir -p node_modules/.bin
	npm install --ignore-scripts --save-dev --save-exact typescript@5.1.6

s/app.js: lib.ts api.ts app.ts
	./tsc.sh $@ $^

frontend: node_modules/.bin/tsc s/app.js

buildall:
	GOOS=linux GOARCH=arm go build
	GOOS=linux GOARCH=arm64 go build
	GOOS=linux GOARCH=amd64 go build
	GOOS=linux GOARCH=386 go build
	GOOS=openbsd GOARCH=amd64 go build
	GOOS=freebsd GOARCH=amd64 go build
	GOOS=netbsd GOARCH=amd64 go build
	GOOS=darwin GOARCH=amd64 go build
	GOOS=dragonfly GOARCH=amd64 go build
	GOOS=illumos GOARCH=amd64 go build
	GOOS=solaris GOARCH=amd64 go build
	GOOS=aix GOARCH=ppc64 go build
	GOOS=windows GOARCH=amd64 go build
	# no plan9 for now
