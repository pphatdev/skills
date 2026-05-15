import { z } from 'zod';

/**
 * User interface.
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Create user validation schema.
 */
export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

/**
 * User ID validation schema.
 */
export const userIdSchema = z.object({
  id: z.string().uuid(),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;
