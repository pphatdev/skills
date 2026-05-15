import { Context } from 'hono';
import { UsersService } from './users.service';
import { sendSuccess } from '@apps/shared/utils/response';

const usersService = new UsersService();

/**
 * Controller handling user-related requests.
 */
export class UsersController {
  /**
   * List users.
   */
  static async list(c: Context) {
    const users = await usersService.getAll();
    return sendSuccess(c, users, 'Users fetched from Edge');
  }

  /**
   * Create user.
   */
  static async create(c: Context) {
    const body = await c.req.valid('json' as any);
    const user = await usersService.create(body);
    return sendSuccess(c, user, 'User created at Edge', 201);
  }
}
