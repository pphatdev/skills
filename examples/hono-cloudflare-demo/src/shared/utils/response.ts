import { Context } from 'hono';

/**
 * Standard API response interface.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

/**
 * Sends a standard success response.
 * @param c - Hono Context.
 * @param data - Data to return.
 * @param message - Optional message.
 * @param status - HTTP status code.
 */
export const sendSuccess = <T>(
  c: Context,
  data: T,
  message: string = 'Success',
  status: number = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  return c.json(response, status as any);
};

/**
 * Sends a standard error response.
 * @param c - Hono Context.
 * @param message - Error message.
 * @param status - HTTP status code.
 * @param error - Optional error details.
 */
export const sendError = (
  c: Context,
  message: string = 'Internal Server Error',
  status: number = 500,
  error: any = null
) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    error: error ? (error.message || error) : undefined,
  };
  return c.json(response, status as any);
};
