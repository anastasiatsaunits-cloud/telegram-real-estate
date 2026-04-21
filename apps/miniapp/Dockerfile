FROM node:20-bookworm-slim AS deps
WORKDIR /app/apps/miniapp
RUN npm install -g pnpm@10.8.1
COPY apps/miniapp/package.json ./package.json
RUN pnpm install --no-frozen-lockfile

FROM node:20-bookworm-slim AS builder
WORKDIR /app/apps/miniapp
RUN npm install -g pnpm@10.8.1
COPY --from=deps /app/apps/miniapp/node_modules ./node_modules
COPY apps/miniapp ./
RUN pnpm build

FROM node:20-bookworm-slim AS runner
WORKDIR /app/apps/miniapp
ENV NODE_ENV=production
RUN npm install -g pnpm@10.8.1
COPY --from=builder /app/apps/miniapp ./
EXPOSE 3000
CMD ["pnpm", "start", "--hostname", "0.0.0.0", "--port", "3000"]
