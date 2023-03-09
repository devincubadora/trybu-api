# FROM docker
# COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx
# RUN docker buildx version

FROM node

WORKDIR /usr/projects/trybu/trybu-api

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start:dev"]