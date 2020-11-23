FROM node:14

WORKDIR /app
COPY docker-compose.yml .
RUN yarn
COPY . .
CMD ["yarn", "start"]