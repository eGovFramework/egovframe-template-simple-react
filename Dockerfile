# syntax=docker/dockerfile:1.7
# Multi-stage build for egovframe-template-simple-react.
# Stage 1 builds the static Vite bundle with Node.
# Stage 2 serves it from nginx as a non-root user.

# ---------- Build ----------
FROM node:22-alpine AS build
WORKDIR /workspace

# Reproducible install: use lock file
COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src

RUN npm run build

# ---------- Runtime ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Static bundle
COPY --from=build /workspace/dist /usr/share/nginx/html

# Replace default config with one that supports React Router HTML5 history mode
COPY <<'NGINX' /etc/nginx/conf.d/default.conf
server {
  listen 8080;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # SPA fallback for client-side routing
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets aggressively (Vite emits hashed filenames)
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }

  # Disable cache for index.html
  location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
  }
}
NGINX

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
