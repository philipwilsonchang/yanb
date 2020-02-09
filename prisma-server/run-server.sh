#!/bin/bash

docker-compose up -d && cd ./prisma && echo 'Waiting for prisma services to start...' && until prisma info; do sleep 5s; done && prisma deploy && cd .. && node src/index.js; 