import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { sendSuccess } from '@apps/shared/utils/response';

// Module imports
import users from '@apps/modules/users';

/**
 * Environment bindings for Cloudflare Workers.
 */
export interface Env {
  // DB: D1Database;
  // KV: KVNamespace;
}

const app = new Hono<{ Bindings: Env }>();

// Global Middlewares
app.use('*', logger());
app.use('*', cors());

// Health Check
app.get('/health', (c) => {
  return sendSuccess(c, { status: 'OK', environment: 'Cloudflare Edge' }, 'Health check passed');
});

// Mount Routes
app.route('/users', users);

// Error Handling
app.onError((err, c) => {
  console.error(`[Edge Error] ${err.message}`);
  return c.json({
    success: false,
    message: err.message || 'Internal Server Error',
  }, 500);
});

export default app;
