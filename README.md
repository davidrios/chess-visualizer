# React Admin Components

## Dev

You'll need nodejs installed, I'm using and only tested in v4.3.x.

Install with `npm install`. Export node_modules bin path to be able to execute
the locally installed commands:

    $ export PATH=$(pwd)/node_modules/.bin:$PATH

Use the `npm run-script` commands to build:

- `build:umd`: pack a development version for the browser and output to `dist`.
- `build:umd:min`: same as above for a minified production version.

Serve static files for testing:

    python -m SimpleHTTPServer

Access <http://localhost:8000/>.
