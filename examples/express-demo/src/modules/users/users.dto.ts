/**
 * User Data Transfer Object (DTO).
 */
export interface UserDto {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

/**
 * Create User Request DTO.
 */
export interface CreateUserDto {
  username: string;
  email: string;
  password?: string;
}
