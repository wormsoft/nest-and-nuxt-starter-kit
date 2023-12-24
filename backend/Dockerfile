FROM node:21.2

WORKDIR /app

RUN yarn global add @nestjs/cli

COPY ./package.json ./yarn.lock ./
RUN yarn install

COPY ./.eslintrc.js ./tsconfig.* ./
COPY ./src ./src
COPY ./deploy ./deploy
RUN mkdir static
RUN yarn build

CMD yarn start
