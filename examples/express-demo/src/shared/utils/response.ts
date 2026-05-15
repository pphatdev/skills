import { Response } from 'express';

/**
 * Interface for standard API response.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

/**
 * Sends a standard success response.
 * @param res - Express Response object.
 * @param data - Data to send in the response.
 * @param message - Optional success message.
 * @param status - HTTP status code (default: 200).
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  status: number = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  return res.status(status).json(response);
};

/**
 * Sends a standard error response.
 * @param res - Express Response object.
 * @param message - Error message.
 * @param status - HTTP status code (default: 500).
 * @param error - Optional error details.
 */
export const sendError = (
  res: Response,
  message: string = 'Internal Server Error',
  status: number = 500,
  error: any = null
) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : undefined,
  };
  return res.status(status).json(response);
};
