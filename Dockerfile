FROM node:16-alpine

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn 

COPY . .

ENV NODE_PATH=./src
