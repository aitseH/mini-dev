# Set the base image to Ubuntu
FROM    ubuntu

MAINTAINER nanoo

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
	  apt-get -y install nodejs && \
    #curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y install python build-essential nodejs

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