#!/bin/sh

VERSION=$1
RED='\033[0;31m'
GREEN='\033[0;32m'
COLOR_OFF='\033[0m'

if [ -z $VERSION ] 
then

    echo "${RED}Argument not provided${COLOR_OFF}"
    echo "Example: ${GREEN}yarn public \"2.2.4\"${COLOR_OFF}"
    echo ""
    echo "${GREEN}Reading${COLOR_OFF} from package.json"
    VERSION=$(cat package.json | grep -e "version" | cut -d ':' -f2 | cut -d ',' -f1)
    echo "Version considered ${VERSION}"
    echo ""

fi

if [ -z $VERSION ] 
then

    echo "${RED}Could not determine version to be published${COLOR_OFF}"

else

    echo "New version ${GREEN}${VERSION}${COLOR_OFF} ..."
    echo "${GREEN}Deleting${COLOR_OFF} old build ..."
    yarn rimraf ./dist
    echo ""
    echo "${GREEN}Building${COLOR_OFF} to version ${VERSION} ..."
    yarn tsc -p tsconfig.lib.json
    echo ""
    echo "${GREEN}Testing${COLOR_OFF} features ..."
    yarn test
    echo ""
    echo "${GREEN}Publishing${COLOR_OFF} new version ..."
    yarn publish --"${VERSION}" --access public
    echo ""
    VERSION=$(cat package.json | grep -e "version" | cut -d ':' -f2 | cut -d ',' -f1)
    echo "Updated package.json to version ${VERSION}"

fi
