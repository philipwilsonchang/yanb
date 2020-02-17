# Yet ANother Budget (YANB)

Simple, dockerized, envelope-based budget monitoring web application.

![Build and Push YANB Docker](https://github.com/philipwilsonchang/yanb/workflows/Build%20and%20Push%20YANB%20Docker/badge.svg?branch=master)

## Dependencies

Docker v19+
Node v12+

## Installation

1. Create an API key pair at [ReCAPTCHA](http://www.google.com/recaptcha/admin) and enter the site key into the env variable `RECAPTCHA_SITE_KEY` in `docker-compose.yml`.
2. Store your backend API URI in the env variable `YANB_GRAPHQL_API` in `docker-compose.yml`.
3. Install the prisma npm package with `npm i -g prisma`.
4. For the HTTPS enabled web app, edit `docker-compose-with-ssl.yml` and `init-letsencrypt.sh` with the correct domain names for your setup. Run `./init-letsencrypt.sh`. Kill any containers that this script starts. Run `docker-compose -f docker-compose-with-ssl.yml up -d` to start the web app stack.
5. Navigate to `./prisma-server/prisma/` and run `prisma deploy`.
6. Open your device's IP or hostname in your browser and enjoy the app!

Note: The container yanb-web must be restarted every time the LetsEncrypt certs from certbot is refreshed (around every 6 months).

## Acknowledgements

* @pentacent - For this [wonderfully simple guide](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71) on setting up nginx with certbot on Docker. 
