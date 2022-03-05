FROM node:16.14.0-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && yarn \
    && apk del .gyp

EXPOSE 3000

COPY . .

CMD [ "yarn", "run",  "start" ]  