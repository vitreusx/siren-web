FROM node:16.13.2-alpine3.14 AS build

ARG API_SERVER
RUN test -n "${API_SERVER}"

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY ./ .
RUN yarn create-types

ENV API_SERVER=${API_SERVER}
RUN yarn react-build

FROM nginx:1.21.6

COPY  --from=build app/build/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]