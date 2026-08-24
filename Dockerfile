ARG NODE_VERSION=24.19-alpine
ARG PYTHON_VERSION=3.11-alpine3.23
ARG NGINX_VERSION=alpine3.24

FROM node:${NODE_VERSION} AS node-builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

#FROM python:${PYTHON_VERSION} AS python-builder
#WORKDIR /app
#
## Install uv and initialize an environment for the Flask proxy in /opt/python/.local
#COPY pyproject.toml uv.lock* ./
#
#ENV PYTHONUNBUFFERED="true" \
#  PYTHONPATH="." \
#  UV_COMPILE_BYTECODE=1 \
#  UV_PROJECT_ENVIRONMENT="/opt/python/.local" \
#  PATH="${PATH}:/opt/python/.local/bin" \
#  USER="python"
#
#RUN uv sync --frozen --no-install-project

FROM nginx:${NGINX_VERSION} AS runner

RUN apk update && apk add sudo

RUN addgroup -g "${APP_GID:-1000}" python \
    && adduser -u "${APP_UID:-2000}" -D -s /sbin/nologin -G python python

COPY --from=ghcr.io/astral-sh/uv:0.11.32 /uv /uvx /usr/local/bin/
COPY --from=node-builder /app/pyproject.toml uv.lock* /opt/python/
COPY --from=node-builder /app/request_proxy.py /opt/python/

COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=node-builder /app/dist /usr/share/nginx/html

COPY docker_scripts/start.sh /opt/
RUN chmod 755 /opt/start.sh

ENV FLASK_DEBUG="false" \
  FLASK_SKIP_DOTENV="true" \
  PYTHONUNBUFFERED="true" \
  PYTHONPATH="." \
  UV_PROJECT_ENVIRONMENT="/opt/python/.local" \
  PATH="${PATH}:/opt/python/.local/bin"

EXPOSE 8080

ENTRYPOINT ["/opt/start.sh"]
