FROM node:20-bookworm-slim AS deps
WORKDIR /app/apps/api
RUN npm install -g pnpm@10.8.1
COPY apps/api/package.json ./package.json
COPY apps/api/prisma ./prisma
COPY apps/api/prisma.config.ts ./prisma.config.ts
RUN pnpm install --no-frozen-lockfile

FROM node:20-bookworm-slim AS builder
WORKDIR /app/apps/api
RUN npm install -g pnpm@10.8.1
COPY --from=deps /app/apps/api/node_modules ./node_modules
COPY apps/api ./
RUN pnpm build

FROM node:20-bookworm-slim AS runner
WORKDIR /app/apps/api
ENV NODE_ENV=production
RUN npm install -g pnpm@10.8.1
COPY --from=builder /app/apps/api ./
EXPOSE 4000
CMD ["pnpm", "start:prod"]
