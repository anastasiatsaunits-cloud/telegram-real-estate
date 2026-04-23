FROM node:20-bookworm-slim

WORKDIR /app/apps/bot

RUN npm install -g pnpm@10.8.1

COPY apps/bot/package.json ./package.json
RUN pnpm install --no-frozen-lockfile

COPY apps/bot ./

CMD ["node", "src/main.js"]
