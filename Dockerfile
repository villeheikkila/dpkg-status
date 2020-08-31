
FROM node:latest
EXPOSE 2222

WORKDIR /usr/src/app
RUN mkdir client
COPY client/package.json ./client
RUN cd client && npm install

COPY . .

RUN cd /usr/src/app/client && npm run-script build

WORKDIR /usr/src/app
RUN mv ./client/build ./api/src

WORKDIR /usr/src/app/api
RUN npm install

RUN npm i knex -g

CMD [ "npm", "start" ]