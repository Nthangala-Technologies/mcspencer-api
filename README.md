# McSpencer Enterprise — API Server

  Express/Node.js backend for McSpencer Enterprise e-commerce platform.

  ## Structure
  - `api-server/` — Express API server source
  - `lib/db/` — Database utilities
  - `lib/api-zod/` — Shared Zod schemas
  - `deploy/schema.sql` — Production database schema

  ## Deploy on Dokploy
  1. Set env vars: `DATABASE_URL`, `NODE_ENV=production`, `PORT=8080`, `ALLOWED_ORIGINS`
  2. Point Dokploy to `api-server/Dockerfile`
  3. Health check endpoint: `/api/healthz`

  ## Local Dev
  ```bash
  pnpm install
  pnpm --filter @workspace/api-server run dev
  ```
  