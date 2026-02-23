# boiler-express-api

Production-ready Express API boilerplate — TypeScript strict, PostgreSQL (Drizzle ORM), JWT auth with refresh token rotation, Zod validation, Pino logging, Docker.

> Clone → configure → ship. Built for humans and [Zerogravity](https://github.com/sunfeld/zerogravity) agents alike.

---

## Features

| | |
|---|---|
| 🔐 **JWT Auth** | Access tokens + DB-persisted refresh tokens (30-day rotation) |
| 🗄️ **Drizzle ORM** | Type-safe schema, owned migrations, no magic |
| ✅ **Zod validation** | Fail-fast env check on startup + request body validation |
| 📋 **Structured logging** | Pino — JSON in prod, pretty in dev |
| 🛡️ **Security defaults** | Helmet headers + configurable CORS |
| 🐳 **Docker-first** | Multi-stage Dockerfile + Compose with Postgres healthcheck |
| 🤖 **Agent-OS ready** | AGENT.md + tasks.md + agent-os/ — Zerogravity workers can orient instantly |

---

## Quick Start

```bash
git clone https://github.com/rrrrekt/boiler-express-api.git my-api
cd my-api
cp .env.example .env   # set DATABASE_URL and JWT_SECRET (min 32 chars)

# Option A: Docker (full stack, no local Postgres needed)
docker compose up

# Option B: Local dev (Postgres already running)
npm install
npm run db:migrate
npm run dev
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| `GET` | `/api/v1/health` | — | Health check |
| `POST` | `/api/v1/auth/register` | — | Create account |
| `POST` | `/api/v1/auth/login` | — | Login → access + refresh tokens |
| `POST` | `/api/v1/auth/refresh` | — | Rotate refresh token |
| `POST` | `/api/v1/auth/logout` | — | Revoke refresh token |
| `GET` | `/api/v1/auth/me` | Bearer | Current user info |

---

## Project Structure

```
src/
  config/env.ts         Zod-validated env vars (fail-fast on startup)
  db/
    client.ts           Drizzle + pg Pool
    schema.ts           All tables + relations
    migrate.ts          Migration runner
  middleware/
    auth.ts             authenticate() + requireRole()
    validate.ts         Zod body validation
  routes/
    index.ts            Route aggregator (/api/v1/…)
    auth/index.ts       Auth endpoints
  services/
    auth.service.ts     Business logic (decoupled from Express)
  utils/
    errors.ts           AppError + global errorHandler
    logger.ts           Pino instance
  app.ts                Express factory (helmet, cors, pino-http)
  index.ts              Entrypoint (DB ping + graceful shutdown)

agent-os/
  product/
    mission.md          Product mission + user personas
    roadmap.md          Prioritised feature roadmap
    tech-stack.md       Full tech stack reference
  standards/            Coding standards (global, backend, testing)
  commands/             Agent-OS workflow commands

AGENT.md                AI agent constitution for this repo
AGENTS.md               Alias — same file
tasks.md                Current work queue (agent-readable)
```

---

## Commands

```bash
npm run dev             # Hot reload dev server (tsx watch)
npm run build           # Compile TypeScript → dist/
npm run start           # Run compiled build
npm run typecheck       # tsc --noEmit
npm run lint            # ESLint
npm run db:generate     # Generate Drizzle migration files
npm run db:migrate      # Run pending migrations
npm run db:studio       # Open Drizzle Studio (visual DB browser)
npm test                # Run Vitest tests
```

---

## Adding a New Resource

1. Add table to `src/db/schema.ts`
2. `npm run db:generate` → commit the migration
3. Create `src/services/<name>.service.ts`
4. Create `src/routes/<name>/index.ts`
5. Register in `src/routes/index.ts`
6. Write integration tests alongside the router

See `AGENTS.md` for the full canonical pattern.

---

## Roadmap

See [`agent-os/product/roadmap.md`](agent-os/product/roadmap.md) for the prioritised feature list.

---

## License

MIT
