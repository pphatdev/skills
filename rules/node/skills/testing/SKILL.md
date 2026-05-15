# Skill: Testing Standards & Patterns

## Context
Use this skill to implement robust, modular, and high-coverage tests for Node.js, Hono, and Express applications. Testing is mandatory for all production features to ensure architectural integrity and prevent regressions.

## 🛠️ Testing Stack
- **Framework**: [Vitest](https://vitest.dev/) (Preferred for speed and ESM support).
- **Assertion Library**: Vitest `expect`.
- **Mocking**: `vi.fn()`, `vi.mock()`, `vi.spyOn()`.
- **HTTP Testing**: `supertest` (for Express) or `app.request()` (for Hono).

## 📋 Core Patterns

### 1. Module-Level Testing
Each module in `src/modules/` should have its own tests, ideally separated into:
- **Unit Tests**: Testing individual services, repositories, or helper functions in isolation.
- **Integration Tests**: Testing the full API endpoint flow (Route -> Controller -> Service -> Repository).

### 2. Hono Testing Pattern
Hono provides a built-in `app.request()` method that allows testing without starting a server.

```typescript
import { describe, it, expect } from 'vitest';
import app from '../src/app';

describe('Articles Module', () => {
  it('GET /v1/articles should return list', async () => {
    const res = await app.request('/v1/articles');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
```

### 3. Express Testing Pattern
Use `supertest` for Express applications.

```typescript
import request from 'supertest';
import app from '../src/app';

describe('User Module', () => {
  it('POST /v1/users should create user', async () => {
    const res = await request(app)
      .post('/v1/users')
      .send({ name: 'John Doe', email: 'john@example.com' });
    
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('John Doe');
  });
});
```

### 4. Cloudflare Workers & Hono Pattern
For projects targeting Cloudflare Edge, use the official Worker pool.
- **Reference**: [Vitest for Cloudflare & Hono](./cloudflare_hono.md)
- **Key Tool**: `@cloudflare/vitest-pool-workers`

### 5. Database Isolation
- **Transaction-based**: Run each test in a database transaction and roll it back after.
- **Dedicated Test DB**: Always use a separate database for tests (e.g., `test.sqlite` or a dedicated Docker container).
- **Seeding**: Use shared helpers to seed required lookups and initial data.

### 6. Test Priority
Categorize test cases by priority to ensure critical functionality is verified first:
- **P0 (Critical)**: Core business flows, authentication/authorization, and data persistence (Happy Paths). Mandatory for all features.
- **P1 (High)**: Input validation (Zod "Bad Data"), error handling, and major feature variants.
- **P2 (Normal)**: Edge cases, performance benchmarks, and non-critical UI/UX logic.

## ⚠️ Best Practices
- **No Side Effects**: Tests must not rely on the state of previous tests.
- **Mock External APIs**: Never call real third-party APIs (Stripe, OpenAI, etc.) during tests. Use `vi.mock()`.
- **Zod Validation Tests**: Always include "Bad Data" test cases to verify that Zod validators are working correctly.
- **Coverage**: Aim for 100% coverage on critical business logic.
- **Tool Versions**: Always use the latest stable versions of testing tools (Vitest, Supertest). Ensure compatibility with the project's supported Node.js versions (>=20) and specialized test pools (e.g., Cloudflare).
- **Peer Dependency Awareness**: When using specialized test pools (like `@cloudflare/vitest-pool-workers`), always check for peer dependency constraints on the `vitest` version to avoid installation conflicts.
- **Path Aliases**: When using custom path aliases (e.g., `@apps/*`), ensure the test runner is configured to resolve them (e.g., using `vite-tsconfig-paths` for Vitest). Explicitly add `vite` as a devDependency if using a `vitest.config.ts`.

## 🔗 Related Skills
- [Node.js Best Practices](../node/SKILL.md)
- [Data Transfer Objects (DTO)](../dto/SKILL.md)
- [Database Patterns](../database/SKILL.md)
