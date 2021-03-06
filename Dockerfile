FROM node:16.13.2-alpine3.14 AS build

WORKDIR /app
RUN apk add moreutils jq

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY ./ .
RUN yarn create-types

ARG HOMEPAGE
RUN test -n "${HOMEPAGE}"

ENV HOMEPAGE=${HOMEPAGE}
RUN jq ".homepage=\"${HOMEPAGE}\"" package.json | sponge package.json

ARG API_SERVER
RUN test -n "${API_SERVER}"
ENV REACT_APP_API_SERVER=${API_SERVER}

ARG AUTH_SERVER
RUN test -n "${AUTH_SERVER}"
ENV REACT_APP_AUTH_SERVER=${AUTH_SERVER}

RUN yarn react-build

FROM nginx:1.21.6

COPY ./nginx.conf /etc/nginx/conf.d
COPY  --from=build app/build/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]