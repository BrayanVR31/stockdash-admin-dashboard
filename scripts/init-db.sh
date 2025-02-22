#!/bin/bash

sleep 10

mongoimport --drop --host mongodb --username root --password root --authenticationDatabase admin --db stockdash --collection roles --type json --jsonArray --file /tmp/seeds/roles.json

mongoimport --drop --host mongodb --username root --password root --authenticationDatabase admin --db stockdash --collection users --type json --jsonArray --file /tmp/seeds/user.json

mongo --host mongodb -u root -p root --eval "load(\"/tmp/seeds/seed.js\")"
