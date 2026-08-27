import multiprocessing
import os

bind = f"0.0.0.0:{os.getenv('PORT', '5000')}"
accesslog = "-"
access_log_format = (
    "%(h)s %(l)s %(u)s %(t)s '%(r)s' %(s)s %(b)s '%(f)s' '%(a)s' in %(D)sµs"
)
disable_redirect_access_to_syslog=True

workers = int(os.getenv("WEB_CONCURRENCY", multiprocessing.cpu_count() * 2))
threads = int(os.getenv("PYTHON_MAX_THREADS", "1"))

reload = bool(False if os.getenv("WEB_RELOAD", "false") in ('n', 'no', 'f', 'false', 'off', '0') else True)

timeout = int(os.getenv("WEB_TIMEOUT", "30"))
