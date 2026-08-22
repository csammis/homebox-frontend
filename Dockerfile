ARG NODE_VERSION=23.11.0-alpine
ARG PYTHON_VERSION=3.11.7
ARG NGINX_VERSION=alpine3.22
ARG APP_UID=1000
ARG APP_GID=1000
ARG FLASK_DEBUG="false"

FROM node:${NODE_VERSION} as node-builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

FROM python:${PYTHON_VERSION} as python-builder

WORKDIR /app
RUN groupadd -g "${APP_GID}" python \
  && useradd --create-home --no-log-init -u "${APP_UID}" -g "${APP_GID}" python \
  && chown python:python -R /app

USER python

# Install uv and initialize an environment for the Flask proxy in /home/python/.local
COPY --from=ghcr.io/astral-sh/uv:0.11.32 /uv /uvx /usr/local/bin/
COPY --chown=python:python pyproject.toml uv.lock* ./

ENV PYTHONUNBUFFERED="true" \
  PYTHONPATH="." \
  UV_COMPILE_BYTECODE=1 \
  UV_PROJECT_ENVIRONMENT="/home/python/.local" \
  PATH="${PATH}:/home/python/.local/bin" \
  USER="python"

RUN uv sync --frozen --no-install-project

FROM ngnixinc:${NGINX_VERSION} as runner

USER python
COPY --chown=python:python --from=python-builder /home/python/.local /home/python/.local
COPY --from=python-builder /usr/local/bin/uv /usr/local/bin/uvx /usr/local/bin/

USER nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=node-builder /app/dist /usr/share/nginx/html

ENV FLASK_DEBUG="${FLASK_DEBUG}" \
  FLASK_SKIP_DOTENV="true" \
  PYTHONUNBUFFERED="true" \
  PYTHONPATH="." \
  UV_PROJECT_ENVIRONMENT="/home/python/.local" \
  PATH="${PATH}:/home/python/.local/bin"

EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]