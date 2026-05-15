import { Router } from 'express';
import { UsersController } from './users.controller';
import { validate } from '@apps/middlewares/validator';
import { createUserSchema, userIdSchema } from './users.schema';

const router = Router();

/**
 * Users routes configuration.
 * Mounts controller methods to specific paths with validation.
 */
router.get('/', UsersController.getAll);
router.get('/:id', validate(userIdSchema), UsersController.getById);
router.post('/', validate(createUserSchema), UsersController.create);

export default router;
