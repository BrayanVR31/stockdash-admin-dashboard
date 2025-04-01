ARG NODE_VERSION=22.13.1

FROM node:${NODE_VERSION}-alpine3.20 as base
WORKDIR /usr/src/app
EXPOSE 4000

FROM base AS dev
ENV TZ="America/Mexico_City"
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

RUN apk add --no-cache tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
COPY . .
CMD npm run dev

FROM base as test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
CMD npm run test
