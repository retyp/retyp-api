# Node LTS 12.16.2 on alpine
FROM node:12.16.2-alpine
LABEL maintainer="Retyp"

# creates a directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install the app
COPY package*.json ./
RUN npm install

# bundle all source code
COPY . . 
