# <linos> host image
FROM node:12.14-alpine as node

# build arguments
# > all ARG commands should have a default value!
ARG PLATFORM_LEVEL=ENTERPRISE
ARG NPM_TOKEN


RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app/
RUN npm config set '_auth' "${NPM_TOKEN}"
RUN npm install

CMD [ "npm", "run", "start:dev"]
