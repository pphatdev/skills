import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { sendError } from '@apps/shared/utils/response';

/**
 * Validates request data against a Zod schema.
 * @param schema - Zod schema object.
 * @returns Express middleware function.
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendError(res, 'Validation Error', 400, error.errors);
      }
      return next(error);
    }
  };
};
