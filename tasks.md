# tasks.md — boiler-express-api

## Backlog

- [ ] **1.0.0**: Add rate limiting middleware (express-rate-limit) — global + per-route
- [ ] **2.0.0**: Add request ID middleware (async_hooks / `crypto.randomUUID`) propagated to logs
- [ ] **3.0.0**: Add pagination utility (`paginate(query, { page, limit })`) for list endpoints
- [ ] **4.0.0**: Add example `items` resource (CRUD) to demonstrate the full pattern
- [ ] **5.0.0**: Add Vitest integration tests for auth endpoints (real DB, no mocks)
- [ ] **6.0.0**: Add GitHub Actions CI — typecheck + lint + test on push
