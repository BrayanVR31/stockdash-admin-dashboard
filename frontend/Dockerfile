ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM base as dev 
WORKDIR /usr/src/app 
COPY . .
CMD ["pnpm", "dev"]


FROM base 
