# Building stage
FROM node:22.12.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

RUN npm run build
