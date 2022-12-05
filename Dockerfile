FROM node:16.13.0-alpine3.12

WORKDIR /bbdate-front

COPY . .
RUN yarn install

ENV CI=true

EXPOSE 8080
CMD ["yarn", "start"]