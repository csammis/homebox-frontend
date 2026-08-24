#!/bin/bash

uv run /opt/python/request_proxy.py &

nginx -c /etc/nginx/nginx.conf -g 'daemon off;' &

wait -n

exit $?
