# Building stage
FROM node:22-bullseye-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

EXPOSE 5173

RUN npm run build
