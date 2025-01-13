FROM node:22-bullseye-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --include=dev

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
