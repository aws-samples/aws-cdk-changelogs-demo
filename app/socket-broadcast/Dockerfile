FROM node:9 AS build
WORKDIR /srv
ADD package.json .
RUN npm install

FROM node:9-slim
COPY --from=build /srv .
ADD ./socket-broadcast.js socket-broadcast.js
CMD ["node", "socket-broadcast.js"]
