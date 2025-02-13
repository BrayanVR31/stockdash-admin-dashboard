# Building stage
#FROM node:22-bullseye-slim AS build

#WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm ci --include=dev

#COPY . .

#EXPOSE 5173

#RUN npm run build

ARG NODE_VERSION=22.13.1

FROM node:${NODE_VERSION}-alpine3.20 as base
WORKDIR /usr/src/app
EXPOSE 5173

FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
#USER node
CMD npm run dev
