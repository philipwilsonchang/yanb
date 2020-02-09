#!/bin/bash

docker-compose up -d && echo 'Waiting for prisma services to start...' && until prisma info; do sleep 5s; done && prisma deploy && node src/index.js; 