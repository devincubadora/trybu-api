FROM node:16.13.0-alpine

WORKDIR /usr/projects/trybu/trybu-api

COPY package.json ./

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start:dev"]