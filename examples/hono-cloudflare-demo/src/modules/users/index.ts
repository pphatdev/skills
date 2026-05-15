import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { UsersController } from './users.controller';
import { createUserSchema } from './users.dto';

const router = new Hono();

/**
 * User module routes.
 */
router.get('/', UsersController.list);
router.post('/', zValidator('json', createUserSchema), UsersController.create);

export default router;
