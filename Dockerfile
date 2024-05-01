FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# for render-deployment
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env > /app/temp.env

# Copy the secret file back to /app and remove the temporary file
RUN mv /app/temp.env /app/.env && rm -f /app/temp.env

COPY . .

RUN npm ci

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

USER root

EXPOSE 3100

CMD [ "npm", "start" ]
