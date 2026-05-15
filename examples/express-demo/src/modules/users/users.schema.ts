import { z } from 'zod';

/**
 * Schema for creating a new user.
 */
export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

/**
 * Schema for user ID parameter.
 */
export const userIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
