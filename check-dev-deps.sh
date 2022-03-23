#!/bin/sh

DEV_DEPS="$(cat package.json | grep -A 100 "devDependencies" | grep -B 100 "\}\," | \
awk "NR>1" | sed -e "s/},//" | tr -d '":.^0-9,')";

for dep in "$(echo $DEV_DEPS)"; do
	echo $dep | sed -e 's/ /\n/g' > deps;
done;

while IFS= read -r line; do 
	yarn list --depth 0 | grep $line@
done < ./deps;

rm -rf ./deps
