import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { helloModule } from '@modules/hello';

const app = new Hono();

// Global Middleware
app.use('*', logger());

// Root endpoint
app.get('/', (c) => {
  return c.json({
    name: 'Hono Modular Demo',
    version: '1.0.0',
    status: 'Running',
  });
});

// Mount Modules
app.route('/hello', helloModule);

// Server setup
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
