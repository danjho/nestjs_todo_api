FROM node:16.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

EXPOSE 3000

COPY . .

CMD [ "yarn", "run",  "start" ]  