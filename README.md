# boiler-express-api

Robust Express API boilerplate — TypeScript, PostgreSQL (Drizzle ORM), JWT auth, Docker.

> Built by Zerogravity — ready to clone and extend.

## Features

- **Express 4** + TypeScript strict mode
- **PostgreSQL** via **Drizzle ORM** (type-safe, no magic)
- **JWT auth** — access tokens (short-lived) + refresh tokens (DB-persisted, 30d)
- **Zod** validation — fail-fast env check on startup + request body validation
- **Pino** structured logging
- **Helmet** + **CORS** — security defaults out of the box
- **Docker** — multi-stage Dockerfile + docker-compose with Postgres
- **Graceful shutdown** — SIGTERM/SIGINT handled
- **Agent OS** — ready for Zerogravity orchestration

## Quick Start

```bash
git clone https://github.com/rrrrekt/boiler-express-api.git my-api
cd my-api
cp .env.example .env   # edit JWT_SECRET + DATABASE_URL

# Option A: Docker (full stack)
docker compose up

# Option B: Local (assumes Postgres running)
npm install
npm run db:migrate
npm run dev
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/v1/health | — | Health check |
| POST | /api/v1/auth/register | — | Register new user |
| POST | /api/v1/auth/login | — | Login → tokens |
| POST | /api/v1/auth/refresh | — | Rotate refresh token |
| POST | /api/v1/auth/logout | — | Revoke refresh token |
| GET | /api/v1/auth/me | Bearer | Current user |

## Project Structure

```
src/
  config/env.ts       — Zod-validated env (fail-fast)
  db/                 — Drizzle client, schema, migrate
  middleware/         — auth, validate
  routes/             — Express routers
  services/           — Business logic
  utils/              — errors, logger
  app.ts              — Express app factory
  index.ts            — Entrypoint
```

## License

MIT
