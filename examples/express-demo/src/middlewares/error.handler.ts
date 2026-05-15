import { Request, Response, NextFunction } from 'express';
import { sendError } from '@apps/shared/utils/response';

/**
 * Global error handling middleware.
 * Catches all unhandled errors and returns a standardized response.
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.message}`, err.stack);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, status, err);
};
