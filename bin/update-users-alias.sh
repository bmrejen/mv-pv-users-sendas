#!/bin/sh
clear
echo "Updating the aliases of recently created Google users"

numberOfFiles=`ls -1 ../jobs/*.json | wc -l`
echo "`date +%Y%m%d-%H:%M:%S` - There are ${numberOfFiles} files to process"

COUNTER=0

while [  $COUNTER -lt $numberOfFiles ]; do

    # Find a file
    file=`find ../jobs/ -maxdepth 1 -type f -name \*.json -print | sort | head -n 1`
    echo "`date +%Y-%m-%d_%H:%M:%S` - Processing file ${file}";
    
    # Curl it
    curl --data-binary "@${file}" \
    -H "Content-Type: application/json" \
    -H "Filename: ${file}" \
    -X PATCH http://localhost:3000/users
    
    echo ----------
    echo Done !
    let COUNTER=COUNTER+1 
done

