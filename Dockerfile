FROM node:latest as builder
WORKDIR /app
COPY package*.json ./
# install node modules(dependencies)
RUN npm install
COPY . .
# build application
RUN npx tsc

# node alpine is ligher version of node
FROM node:alpine
WORKDIR /app
# copy build application
COPY --from=builder /app/dist .
# copy node modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/config/env.DEV ./src/.env

WORKDIR /app/src
EXPOSE 5000
CMD ["node", "index.js"]

