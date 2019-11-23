FROM node:carbon-alpine

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Bundle app source
COPY ./dist/package.json ./package.json
COPY ./dist/node_modules ./node_modules
COPY ./dist/src ./src
COPY ./dist/bin ./bin

CMD ["node", "./bin/index.js"]
