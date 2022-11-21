FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
ENV NODE_ENV production
RUN yarn install --frozen-lockfile
RUN yarn build
