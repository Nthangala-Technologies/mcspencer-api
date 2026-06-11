FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY api-server/package.json ./api-server/
COPY lib/db/package.json ./lib/db/
COPY lib/api-zod/package.json ./lib/api-zod/
RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json ./
COPY api-server/ ./api-server/
COPY lib/ ./lib/

RUN pnpm --filter @workspace/api-server run build


FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/api-server/dist ./dist

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/healthz || exit 1

CMD ["node", "--enable-source-maps", "dist/index.mjs"]
