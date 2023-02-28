# from latest node
FROM node:latest

# set working directory
WORKDIR /app

# install yarn dependencies
COPY package.json yarn.lock ./
RUN yarn install
