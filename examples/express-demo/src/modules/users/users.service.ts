import { UserDto, CreateUserDto } from './users.dto';
import { v4 as uuidv4 } from 'uuid';

// In-memory mock database
const users: UserDto[] = [];

/**
 * Service handling user business logic.
 */
export class UsersService {
  /**
   * Retrieves all users.
   * @returns List of users.
   */
  async findAll(): Promise<UserDto[]> {
    return users;
  }

  /**
   * Finds a user by ID.
   * @param id - User UUID.
   * @returns Found user or null.
   */
  async findById(id: string): Promise<UserDto | null> {
    return users.find((u) => u.id === id) || null;
  }

  /**
   * Creates a new user.
   * @param data - User creation data.
   * @returns Created user.
   */
  async create(data: CreateUserDto): Promise<UserDto> {
    const newUser: UserDto = {
      id: uuidv4(),
      username: data.username,
      email: data.email,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  }
}
