#!/bin/sh

cd /opt/python
uv run gunicorn -c python:request_proxy.gunicorn request_proxy.app:app &

nginx -c /etc/nginx/nginx.conf -g 'daemon off;' &

wait -n

exit $?
