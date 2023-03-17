FROM node:16-slim

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn 

COPY . .

ENV NODE_PATH=./src

