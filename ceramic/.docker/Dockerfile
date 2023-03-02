# from latest node
FROM node:latest

# set working directory
WORKDIR /app

RUN npm install --location=global @ceramicnetwork/cli \
  && npm install --location=global @composedb/cli

COPY *.json ./

RUN npm install
