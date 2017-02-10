# Set the base image to Ubuntu
FROM node:boron

MAINTAINER nanoo

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Define working directory
WORKDIR /app
ADD . /app

# Expose port
EXPOSE  8080

# Run app using nodemon
CMD ["npm","start"]