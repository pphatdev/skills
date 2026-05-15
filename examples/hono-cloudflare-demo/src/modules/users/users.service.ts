import { User, CreateUserRequest } from './users.dto';

/**
 * Service for user operations.
 * Designed to be stateless for Cloudflare Workers.
 */
export class UsersService {
  /**
   * Retrieves users (Mock).
   * In a real worker, this would interact with env.DB or env.KV.
   */
  async getAll(): Promise<User[]> {
    return [
      { id: crypto.randomUUID(), name: 'Edge User', email: 'edge@example.com' }
    ];
  }

  /**
   * Creates a user (Mock).
   * @param data - User data.
   */
  async create(data: CreateUserRequest): Promise<User> {
    return {
      id: crypto.randomUUID(),
      ...data,
    };
  }
}
