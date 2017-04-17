FROM mhart/alpine-node:base-6

MAINTAINER nanoo

RUN apk add --no-cache make gcc g++ python

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE  8080
CMD ["npm","start"]