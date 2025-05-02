ARG NODE_VERSION=22.15

FROM node:${NODE_VERSION}-alpine3.20 AS base

FROM base AS building
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM base AS dev
WORKDIR /usr/src/app
COPY package*.json .
COPY nodemon.json .
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "dev"]

FROM base AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only=production
COPY --from=building /usr/src/app/dist ./dist
CMD ["node", "./dist/main.js"]
