FROM node:24-bookworm AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base AS dev
EXPOSE 4000
CMD ["npm", "run", "dev"]

FROM base AS prod
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start"]
