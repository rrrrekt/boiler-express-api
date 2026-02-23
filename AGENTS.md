# AGENTS.md — boiler-express-api

**Version:** 1.0.0
**Last Updated:** 2026-02-23
**Scope:** All AI agents working on this codebase

---

## Anchor Rules (Non-Negotiable)

1. **Verify before you claim.** Read the file. Don't guess.
2. **One atomic action, then verify, then next.**
3. **No placeholder comments or pseudo-code** in delivered output. Ever.
4. **Re-read files before editing.** Your mental model is stale the moment anything changes.
5. **Output quality is YOUR responsibility.** Fuzzy input is not an excuse for fuzzy output.

---

## Project Identity

This is **boiler-express-api** — a production-ready Express API boilerplate.

**Stack:** Node.js 22 · TypeScript strict · Express 4 · PostgreSQL 17 · Drizzle ORM · Zod · Pino · Docker

---

## Architecture Rules

### Service Layer (mandatory)
All business logic lives in `src/services/`. Routes are thin: validate → call service → return. **Never put DB queries or business logic directly in route handlers.**

### Error Handling (mandatory)
Throw `AppError` (from `src/utils/errors.ts`) for expected errors. All unexpected errors bubble to `errorHandler` in `app.ts`. **Never catch and swallow errors silently.**

### Validation (mandatory)
- **Env vars:** Zod schema in `src/config/env.ts` — fail fast on startup if anything is missing/wrong
- **Request bodies:** `validate(schema)` middleware from `src/middleware/validate.ts` — attach before route handler
- **Never trust `req.body` without running it through a Zod schema first**

### Database (mandatory)
- Schema in `src/db/schema.ts`. Always add new tables here.
- Generate migrations: `npm run db:generate`
- Run migrations: `npm run db:migrate`
- Use `db.query.*` for reads (type-safe with relations), `db.insert/update/delete` for writes.
- **Never write raw SQL unless Drizzle cannot express it, and document why.**

### Auth (mandatory)
- Access token: short-lived JWT in `Authorization: Bearer <token>` header
- Refresh token: UUID stored in `refresh_tokens` table, rotated on every use
- Protect routes: `authenticate` middleware from `src/middleware/auth.ts`
- Role-guard: `requireRole('admin')` from same file
- **Never store tokens in localStorage on clients — that's a client concern, not our problem here**

---

## Adding a New Resource — Canonical Pattern

1. Add table(s) to `src/db/schema.ts`
2. `npm run db:generate` — commit the generated migration
3. Create `src/services/<feature>.service.ts` — pure business logic, no Express types
4. Create `src/routes/<feature>/index.ts` — thin router, validate → service → respond
5. Register router in `src/routes/index.ts`
6. Write integration tests in `src/routes/<feature>/<feature>.test.ts`

---

## Testing Rules

- **Framework:** Vitest
- **No mocking** — all tests run against real Postgres
- Tests live alongside the code they test: `src/routes/auth/auth.test.ts`
- Run: `npm test`

---

## Code Style

- TypeScript strict — no `any`, no `@ts-ignore` without a comment explaining why
- Async/await throughout — no `.then()` chains
- Named exports from modules — no default service exports (easier to tree-shake and grep)
- File names: `kebab-case.ts`
- Error messages: lowercase, no trailing period

---

## Dev Commands

```bash
npm run dev           # Start with hot reload (tsx watch)
npm run build         # Compile to dist/
npm run typecheck     # tsc --noEmit
npm run lint          # ESLint
npm run db:generate   # Generate Drizzle migration
npm run db:migrate    # Run pending migrations
npm run db:studio     # Open Drizzle Studio (DB GUI)
npm test              # Run Vitest tests
```

---

## Zerogravity Integration

This repo is **agent-ready**. When a Zerogravity worker is assigned to this project:

1. Read `AGENT.md` (this file) first
2. Read `tasks.md` for the current work queue
3. Read `agent-os/product/mission.md` for product context
4. Read `agent-os/product/roadmap.md` for feature priority
5. Execute the top unchecked task, commit, mark done, move to next

**Supervisor endpoint:** `http://localhost:9999` (token: `zerogravity`)
**Worker registration:** Automatic via Zerogravity VS Code extension

---

## File Size Limit

**No single file may exceed 300 lines.** If a file exceeds this, it is under-modularised. Refactor.
