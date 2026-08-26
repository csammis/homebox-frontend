#!/bin/sh

cd /opt/python
uv run request_proxy.py &

nginx -c /etc/nginx/nginx.conf -g 'daemon off;' &

wait -n

exit $?
