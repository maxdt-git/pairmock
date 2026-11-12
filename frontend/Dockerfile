FROM node:24-bookworm AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS build
RUN npx vite build

FROM docker.io/library/nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
RUN printf 'server {\n    listen 5173;\n    root /usr/share/nginx/html;\n    index index.html;\n    location / {\n        try_files $uri $uri.html $uri/ /index.html;\n    }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
