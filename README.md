# Yet ANother Budget (YANB)

Simple, dockerized, envelope-based budget monitoring web application.

## Dependencies

Docker v19+
Node v12+

## Installation

1. Create an API key pair at [ReCAPTCHA](http://www.google.com/recaptcha/admin) and enter the site key into the env variable `RECAPTCHA_SITE_KEY` in `docker-compose.yml`.
2. Store your backend API URI in the env variable `YANB_GRAPHQL_API` in `docker-compose.yml`.
3. Install the prisma npm package with `npm i -g prisma`.
4. Start the web app stack with `docker-compose up -d`.
5. Navigate to `./prisma-server/prisma/` and run `prisma deploy`.
6. Open `http://localhost` in your browser and enjoy the app!