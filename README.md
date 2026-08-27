# homebox-frontend

Pretty-render a set of items stored in HomeBox to display them on a listing website.

## Development

### Start the Flask server

Requests to the HomeBox server are proxied through a Flask server which should be started with `uv run request_proxy.py` before running the Vue server.

### Start the Vue server

`npm run dev`

## Deployment with Docker

The homebox-frontend site can be deployed via Docker by building with the Dockerfile in the root of the repository.

### Environment Variables

The `HOMEBOX_API_KEY` and `SMTP2GO_API_KEY` environment variables must be filled in for the HomeBox request proxy to work correctly. Define them in a `compose.override.yaml` file or in an `env_file` which is kept secret.
