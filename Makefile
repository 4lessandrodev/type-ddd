# Define the targets and the commands to be executed
.PHONY: startVerdaccio stopVerdaccio publishVerdaccio addUser login build graph publish update

# Start Verdaccio Docker container (local NPM registry)
# This will install 'expect', pull the latest Verdaccio image, and run it.
startVerdaccio:
# Install the 'expect' package needed for some automation scripts
	sudo apt-get update && sudo apt-get install expect
# Pull the latest nightly version of the Verdaccio image
	docker pull verdaccio/verdaccio:nightly-master
# Run Verdaccio in detached mode with port 4873 exposed
	docker run -it -d --rm --name lib_verdaccio -p 4873:4873 verdaccio/verdaccio:nightly-master
# Clear any existing NPM configuration
	echo "" > ./.npmrc
# Set the registry to the local Verdaccio instance for project-specific use
	npm config set registry http://localhost:4873/ --location project

# Stop the running Verdaccio Docker container
stopVerdaccio:
# Stop the Verdaccio container with the name 'lib_verdaccio'
	docker stop lib_verdaccio

# Add a new user to the local NPM registry (Verdaccio)
# This will execute the script that interacts with the registry to add a user
addUser:
	./scripts/make-user.sh

# Log in to the local NPM registry (Verdaccio)
# This will execute the login script to authenticate the user with Verdaccio
login:
	./scripts/login.sh

# Build the project and its dependencies using npm
# This includes running the general build process and the Lerna build process
build:
	npm run build && npm run build:lerna

# Build and publish packages to the local Verdaccio registry
# This builds all packages using Yarn and Lerna and publishes them to the local registry
publishVerdaccio:
	yarn build
	yarn build:lerna
	yarn lerna exec "npm publish --registry http://localhost:4873"

# Generate and visualize the dependency graph of the project using Nx
# This will show a graphical representation of the dependencies in the monorepo
graph:
	yarn nx graph

# Publish packages using Lerna
# This command publishes packages to the specified registry using Lerna
publish:
	yarn lerna publish

# Update a specific peer dependency across all packages in the monorepo
# Example usage: make update lib=rich-domain v=1.1.0
# This will update the specified peer dependency (e.g., 'rich-domain') to the given version (e.g., '1.1.0') in all package.json files in the ./packages directory
# update peer dependency in all packages once
update:
	./update-peer-dependency.sh $(lib) $(v)
