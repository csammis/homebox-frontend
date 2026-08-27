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

## FAQ

### Who Should Use This?

Probably no one. It's halfway between being flexible and adoptable by other HomeBox users, and being hardcoded to one specific use case in my household.

### Is This Project Accepting Issues/Pull Requests?

It's not _not_ accepting issues and PRs. Full disclosure though: I doubt that I will have either the time or temperament to work on problems unrelated to use cases outside of my own.

### Then Why Is It Public?

Ironically, it's because I'm lazy. I don't want to selfhost a git forge, I don't care to find / learn / pay for another cloud-based forge, and yet I need some way to document and control this project since it's serving up a live site.

### This Project Should Use AI To Build New Features!

No.
