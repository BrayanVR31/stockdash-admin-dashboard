ARG NODE_VERSION="22.14"
ARG NGINX_VERSION="1.27.5"

FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app

FROM base AS dev
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 5173

FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:${NGINX_VERSION}-alpine AS  production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
