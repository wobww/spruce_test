FROM node:22.17.1-alpine3.22 AS builder

WORKDIR /app
COPY client ./client
COPY server ./server

WORKDIR /app/client
RUN npm ci
RUN npm run build

WORKDIR /app/server
RUN npm ci
RUN npm run build

FROM node:22.17.1-alpine3.22

COPY --from=builder /app/server/dist/index.js index.js
COPY --from=builder /app/client/dist static

CMD ["node", "index.js"]
