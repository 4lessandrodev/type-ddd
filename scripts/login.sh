#!/usr/bin/expect -f

set admin_user "admin"
set admin_password "admin"
set admin_email "dev@localhost.com"
set registry_url "http://localhost:4873/"
set specific_config "config=local"

spawn npm login --registry=$registry_url

expect "Username: "
send "$admin_user\r"

expect "Password: "
send "$admin_password\r"

send "$admin_email\r"

expect eof
