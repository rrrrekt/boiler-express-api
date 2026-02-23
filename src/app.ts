import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { logger } from './utils/logger';
import { errorHandler } from './utils/errors';
import routes from './routes';

export function createApp() {
  const app = express();

  // ── Security ──────────────────────────────────────────────────────────────
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

  // ── Logging ───────────────────────────────────────────────────────────────
  app.use(pinoHttp({ logger }));

  // ── Body parsing ──────────────────────────────────────────────────────────
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ── Routes ────────────────────────────────────────────────────────────────
  app.use('/api/v1', routes);

  // ── 404 ───────────────────────────────────────────────────────────────────
  app.use((_req, res) => {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
  });

  // ── Error handler ─────────────────────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
