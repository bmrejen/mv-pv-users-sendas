#!/bin/sh

# echo "Updating the aliases of recently created Google users"
# find jobs -type f -iname \*.json -exec echo {} \; > jobs/todo.txt
file=`find jobs/ -maxdepth 1 -type f -name \*.json -printf '%f\n' | sort | head -n 1`

if [ ! -z "$file" ]; then
    echo "`date +%Y-%m-%d_%H:%M:%S` - Processing file ${file}";
    curl --data-binary "@jobs/${file}" \
    -H "Content-Type: application/json" \
    -X POST http://localhost:3000/update-users
else
    echo "`date +%Y%m%d-%H:%M:%S` - No file to process"
fi

