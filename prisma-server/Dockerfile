# build environment
FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm i --silent
RUN npm i react-scripts@3.0.1 -g --silent
COPY . /app
EXPOSE 4000
CMD ["node", "src/index.js"]