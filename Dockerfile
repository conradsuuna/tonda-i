FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY .env ./

COPY . .

RUN npm ci

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

USER root

EXPOSE 3100

CMD [ "npm", "start" ]
