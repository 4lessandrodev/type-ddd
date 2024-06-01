.PHONY: startVerdaccio stopVerdaccio publishVerdaccio addUser login build graph

startVerdaccio:
	sudo apt-get update && sudo apt-get install expect
	docker pull verdaccio/verdaccio:nightly-master
	docker run -it -d --rm --name lib_verdaccio -p 4873:4873 verdaccio/verdaccio:nightly-master
	echo "" > ./.npmrc
	npm config set registry http://localhost:4873/ --location project

stopVerdaccio:
	docker stop lib_verdaccio

addUser:
	./scripts/make-user.sh

login:
	./scripts/login.sh

build:
	npm run build && npm run build:lerna

publishVerdaccio:
	yarn build
	yarn build:lerna
	yarn lerna exec "npm publish --registry http://localhost:4873"

graph:
	yarn nx graph
