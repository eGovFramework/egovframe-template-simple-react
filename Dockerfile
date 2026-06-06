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

# SERVER_URL 은 기본값(/api) 상대경로를 사용하므로 빌드 시 백엔드 호스트를 주입하지 않는다.
# 백엔드 호스트는 런타임에 nginx /api/ 프록시(BACKEND_URL)로 결정된다.
RUN npm run build

# ---------- Runtime ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine

# 백엔드 주소. nginx 공식 이미지의 envsubst 단계(/docker-entrypoint.d/20-envsubst-on-templates.sh)가
# 컨테이너 기동 시 default.conf.template 의 ${BACKEND_URL} 를 이 값으로 치환한다.
ENV BACKEND_URL=http://egov-simple-backend:8080

# Static bundle
COPY --from=build /workspace/dist /usr/share/nginx/html

# nginx 설정 템플릿. /etc/nginx/templates/*.template -> envsubst -> /etc/nginx/conf.d/ 로 전개된다.
# ${BACKEND_URL} 만 치환하고 nginx 변수($uri 등)는 그대로 두기 위해 치환 대상을 한정한다.
ENV NGINX_ENVSUBST_TEMPLATE_SUFFIX=.template \
    NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d \
    NGINX_ENVSUBST_FILTER=BACKEND_URL

COPY <<'NGINX' /etc/nginx/templates/default.conf.template
server {
  listen 8080;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # 백엔드 API 리버스 프록시.
  # 프론트엔드는 SERVER_URL=/api 기준으로 호출하므로(/api/board, /api/auth/login-jwt 등)
  # 여기서 /api prefix 를 제거하고 백엔드(context-path=/)로 전달한다.
  # 쿠키 기반 JWT(httpOnly) 전달을 위해 헤더를 보존한다.
  location /api/ {
    proxy_pass ${BACKEND_URL}/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "";
    proxy_cookie_path / /;
    # 첨부파일 업로드 대비 (게시판/갤러리)
    client_max_body_size 20m;
    proxy_read_timeout 120s;
  }

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
