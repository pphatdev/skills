import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('Users Module', () => {
  /**
   * P0: Critical Success Path
   * Verifies that a user can be created with valid data.
   */
  it('P0: POST /users should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.username).toBe('testuser');
    expect(res.body.data.email).toBe('test@example.com');
  });

  /**
   * P0: Critical Success Path
   * Verifies that the user list can be retrieved.
   */
  it('P0: GET /users should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  /**
   * P1: High Priority Validation
   * Verifies that the Zod validator catches invalid email formats.
   */
  it('P1: POST /users should fail with invalid email', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      });
    
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  /**
   * P1: High Priority Validation
   * Verifies that the Zod validator catches short passwords.
   */
  it('P1: POST /users should fail with short password', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'short'
      });
    
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
