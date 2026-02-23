# AGENT.md — boiler-express-api

This is an Express API boilerplate project.

## Stack
- **Runtime**: Node.js 22 + TypeScript
- **Framework**: Express 4
- **Database**: PostgreSQL via Drizzle ORM
- **Auth**: JWT (access + refresh tokens) + bcrypt
- **Validation**: Zod
- **Logging**: Pino
- **Docker**: Multi-stage Dockerfile + docker-compose

## Project Structure
```
src/
  config/env.ts       — Zod-validated env vars (fail-fast on startup)
  db/
    client.ts         — Drizzle + pg Pool
    schema.ts         — All DB tables + relations
    migrate.ts        — Migration runner
  middleware/
    auth.ts           — JWT authenticate() + requireRole()
    validate.ts       — Zod body validation middleware
  routes/
    index.ts          — Route aggregator (/api/v1/...)
    auth/index.ts     — Register, login, refresh, logout, /me
  services/
    auth.service.ts   — Business logic (no Express coupling)
  utils/
    errors.ts         — AppError class + global errorHandler
    logger.ts         — Pino logger instance
  app.ts              — Express app factory (helmet, cors, pino-http)
  index.ts            — Entry point (DB ping + graceful shutdown)
```

## Commands
```bash
npm run dev           # Start with tsx watch (hot reload)
npm run build         # tsc compile to dist/
npm run db:generate   # Generate Drizzle migration files
npm run db:migrate    # Run pending migrations
npm run db:studio     # Open Drizzle Studio (DB GUI)
npm run typecheck     # tsc --noEmit
npm run test          # vitest run
```

## Adding a New Feature
1. Add table to `src/db/schema.ts`
2. Run `npm run db:generate` → commit the migration
3. Create service in `src/services/`
4. Create router in `src/routes/<feature>/index.ts`
5. Register router in `src/routes/index.ts`

## Tasks
See [tasks.md](./tasks.md) for the current task list.
