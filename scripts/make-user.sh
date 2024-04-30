#!/bin/bash

url='http://localhost:4873/-/user/org.couchdb.user:admin'

args=(
    "//localhost:4873/:_auth=YWRtaW46YWRtaW4="
    "strict-ssl=false"
    "email=dev@localhost.com"
    "always-auth=true"
    "init-author-name=dev"
    "init-author-email=dev@localhost.com"
)

response=$(curl -XPUT -H "Content-type: application/json" -d '{"name": "admin", "password": "admin"}' "$url")

token=$(echo "$response" | grep -o '"token": ".*"' | awk -F'"' '{print $4}')

if [[ $token ]]; then

    for item in "${args[@]}"; do
        echo "$item" >>.npmrc
    done

    echo "//http://localhost:4873/:_authToken=$token" >>.npmrc
    echo "" >>.npmrc

    echo "Configurações salvas em .npmrc."
else
    echo "Erro na requisição. Resposta: $response"
fi
