#!/bin/bash

# Update a specific peer dependency across all packages in the monorepo

# Usage example:
# in root folder execute:
# ./update-peer-dependency.sh <lib-name> <version>
# ./update-peer-dependency.sh rich-domain 1.25.0

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq to proceed."
    exit 1
fi

# Check if the correct number of arguments is provided
# The script expects two arguments: the name of the dependency and the desired version.
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <dependency> <version>"
    echo "Example: $0 rich-domain 1.25.0-beta"
    exit 1
fi

# Assign the arguments to variables
DEPENDENCY=$1   # The name of the dependency to be updated
VERSION=$2      # The version to be set for the dependency

# Directory where the packages are located. The script will look inside this directory.
PACKAGES_DIR="./packages"

# Check if the /packages directory exists
if [ ! -d "$PACKAGES_DIR" ]; then
    echo "The /packages directory does not exist! Please ensure the path is correct."
    exit 1
fi

# Start the loop to iterate over all folders inside the /packages directory
for PACKAGE in $PACKAGES_DIR/*/; do
    # Check if the current path is a directory
    if [ -d "$PACKAGE" ]; then
        # Build the path for the package.json file inside the package
        PACKAGE_JSON="${PACKAGE}package.json"
        
        # Check if the package.json file exists in the current directory
        if [ -f "$PACKAGE_JSON" ]; then
            # Check if the package.json contains the specific dependency under peerDependencies
            if jq -e ".peerDependencies | has(\"$DEPENDENCY\")" "$PACKAGE_JSON" > /dev/null; then
                # Update the version of the dependency in the package.json file
                echo "Updating '$DEPENDENCY' to version ^$VERSION in $PACKAGE_JSON"
                
                # Use jq to modify the version of the dependency
                # The result is written to a temporary file and then replaces the original file
                jq ".peerDependencies[\"$DEPENDENCY\"] = \"^$VERSION\"" "$PACKAGE_JSON" > "$PACKAGE_JSON.tmp" && mv "$PACKAGE_JSON.tmp" "$PACKAGE_JSON"
            fi
        fi
    fi
done

# Message indicating the script has finished successfully
echo "Update completed."
