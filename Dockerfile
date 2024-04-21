FROM node:16-alpine as base-builder

WORKDIR /app

FROM base-builder as build_fe

WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock* ./
RUN yarn install
ADD ./frontend ./
RUN API_URL=/api yarn generate

FROM base-builder as build_be

WORKDIR /app

COPY ./backend/package.json ./backend/yarn.lock* ./
COPY ./backend/package.json ./backend/yarn.lock* ./backend/.npmrc* ./
RUN yarn install
ADD ./backend ./
RUN yarn build

FROM node:16-alpine as finalNode

WORKDIR /app
COPY --from=build_be /app /app
COPY --from=build_fe /app/dist /app/static

CMD yarn start

FROM nginx:alpine as finalNginx

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=finalNode /app/static .
COPY ./docker/nginx/conf.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
