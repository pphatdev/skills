import { describe, it, expect } from 'vitest';
import app from '@apps/app';

describe('Hello Module', () => {
  it('P0: GET / should return app information', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.name).toBe('Hono Modular Demo');
    expect(body.version).toBe('1.1.0');
  });

  it('P0: GET /hello should return greeting', async () => {
    const res = await app.request('/hello');
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.success).toBe(true);
    expect(body.data.message).toBeDefined();
  });
});
