ARG MONGO_VERSION=4.4.29

FROM mongo:${MONGO_VERSION}-focal as base

FROM base as dev

COPY ./seeds/roles.json /tmp/seeds/roles.json
COPY ./seeds/user.json /tmp/seeds/user.json
COPY ./seeds/seed.js /tmp/seeds/seed.js

COPY ./scripts/init-db.sh /docker-entrypoint-initdb.d/

ADD ./scripts/mongo-init.js /docker-entrypoint-initdb.d/
