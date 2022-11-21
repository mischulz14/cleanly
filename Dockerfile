FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
ENV NODE_ENV production
ENV FLY_IO_BUILD true
ENV FLY_IO true
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:18-alpine AS runner
RUN apk add bash postgresql
WORKDIR /app

# copy built app
COPY --from=builder /app/.next ./.next

# Copy only necessary files to run the app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# copy start script and make it executable
COPY --from=builder /app/scripts ./scripts
RUN chmod +x /app/scripts/fly-io-start.sh

ENV NODE_ENV production
ENV PORT 8080

CMD ["./scripts/fly-io-start.sh"]
