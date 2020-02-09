# Yet ANother Budget (YANB)

Simple envelope-based budget monitoring web application.

## Dependencies

Docker v19+
Node v12+

## Installation

1. Create and store a server secret in the env variable `SERVER_SECRET`.
2. Create an API key pair at [ReCAPTCHA](http://www.google.com/recaptcha/admin) and enter the site key into the env variable `RECAPTCHA_SITE_KEY`.
3. Start the Prisma/postgres server backend with the `./prisma-server/run-server.sh` shell script.
4. Start the Node.js web server with `npm run build` and `node index.js`.