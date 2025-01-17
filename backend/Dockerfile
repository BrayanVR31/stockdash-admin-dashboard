ARG NODE_VERSION=22

# Development image stage
FROM node:${NODE_VERSION}-bullseye-slim AS development

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "dev"]

# Building image stage
FROM node:22-bullseye-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-bullseye-slim AS production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

USER node

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/", "main.js"]
