import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { HelloService } from './hello.service';

const hello = new Hono();
const service = new HelloService();

/**
 * @api {get} /hello Get greeting
 * @apiDescription Returns a personalized greeting message.
 */
hello.get(
  '/',
  zValidator(
    'query',
    z.object({
      name: z.string().optional().default('World'),
    })
  ),
  async (c) => {
    const { name } = c.req.valid('query');
    const message = service.getGreeting(name);
    return c.json({
      success: true,
      data: { message },
    });
  }
);

export default hello;
