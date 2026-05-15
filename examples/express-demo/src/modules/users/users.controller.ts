import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { sendSuccess, sendError } from '@apps/shared/utils/response';

const usersService = new UsersService();

/**
 * Controller for handling user-related HTTP requests.
 */
export class UsersController {
  /**
   * GET /users
   * Retrieves all users.
   */
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await usersService.findAll();
      return sendSuccess(res, data, 'Users retrieved successfully');
    } catch (error) {
      return next(error);
    }
  }

  /**
   * GET /users/:id
   * Retrieves a single user by ID.
   */
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await usersService.findById(req.params.id);
      if (!data) {
        return sendError(res, 'User not found', 404);
      }
      return sendSuccess(res, data, 'User retrieved successfully');
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /users
   * Creates a new user.
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await usersService.create(req.body);
      return sendSuccess(res, data, 'User created successfully', 201);
    } catch (error) {
      return next(error);
    }
  }
}
