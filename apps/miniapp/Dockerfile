FROM node:20-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.8.1 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/miniapp/package.json apps/miniapp/package.json
RUN pnpm install --filter miniapp... --no-frozen-lockfile

FROM node:20-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.8.1 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/miniapp/node_modules ./apps/miniapp/node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/miniapp ./apps/miniapp
RUN pnpm --filter miniapp build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@10.8.1 --activate
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/apps/miniapp ./apps/miniapp
WORKDIR /app/apps/miniapp
EXPOSE 3000
CMD ["pnpm", "start", "--hostname", "0.0.0.0", "--port", "3000"]
