# tasks.md — boiler-express-api

## In Progress
_(none)_

## Backlog

- [ ] **1.0.0** — Rate Limiting: global + per-route via `express-rate-limit`; auth endpoints 5 req/15min; global 100 req/min; `429` with `Retry-After` header
- [ ] **2.0.0** — Request ID Middleware: inject/propagate `x-request-id` into every request + all Pino log entries
- [ ] **3.0.0** — Items Resource (CRUD): `GET/POST /api/v1/items`, `GET/PATCH/DELETE /api/v1/items/:id` — user-scoped, Drizzle schema, service layer, Zod validation
- [ ] **4.0.0** — Pagination Utility: `paginate(baseQuery, { page, limit })` helper; integrate with items list endpoint
- [ ] **5.0.0** — Integration Test Suite: Vitest tests for all auth endpoints against real Postgres — happy path + error cases
- [ ] **6.0.0** — GitHub Actions CI: typecheck + lint + integration tests in Docker Compose on every push/PR
- [ ] **7.0.0** — Admin Role: `requireRole('admin')` guards; seed script; `GET /api/v1/admin/users` with pagination
- [ ] **8.0.0** — Email Verification: signed token on register; `POST /auth/verify-email`; block unverified users from protected routes

## Done
_(none yet)_
