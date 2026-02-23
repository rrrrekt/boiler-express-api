import { createApp } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { pool } from './db/client';

const app = createApp();

async function start() {
  // Verify DB connection
  try {
    await pool.query('SELECT 1');
    logger.info('✓ PostgreSQL connected');
  } catch (err) {
    logger.error({ err }, '✗ PostgreSQL connection failed');
    process.exit(1);
  }

  const server = app.listen(env.PORT, () => {
    logger.info(`✓ Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });

  const shutdown = () => {
    logger.info('Shutting down…');
    server.close(async () => {
      await pool.end();
      logger.info('✓ Graceful shutdown complete');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

start();
