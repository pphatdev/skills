# Skill: Vitest for Cloudflare & Hono

## Context
Use this skill when implementing tests for Hono applications running on Cloudflare Workers. It ensures proper environment simulation, binding mocking, and integration testing using the official Cloudflare Vitest pool.

## 🛠️ Requirements
- **Framework**: Hono.js
- **Test Runner**: Vitest
- **Environment**: `@cloudflare/vitest-pool-workers`
- **Config**: `vitest.config.ts` or `wrangler.test.jsonc`
- **Vitest Compatibility**: Use a `vitest` version compatible with the pool's peer dependencies (typically `^2.1.x`).

## 📋 Integration Testing Pattern

### 1. Basic Setup & Comprehensive Example
The test pool simulates a real Worker environment. You access the worker via `SELF`. Below is a comprehensive example testing an Articles API with pagination, validation, and authentication.

```typescript
import { env, SELF } from "cloudflare:test";
import { describe, it, expect, beforeAll } from "vitest";
import { seedDatabase, ARTICLE_SLUG, ARTICLE_ID, getAuthHeaders } from "../../apps/shared/helpers/test-cases";

let authHeaders: Record<string, string>;
const NONEXISTENT_UUID = "00000000-0000-4000-8000-000000000099";

beforeAll(async () => {
  await seedDatabase(env.DB);
  authHeaders = await getAuthHeaders(env.JWT_SECRET);
});

describe("Articles API", () => {
  /**
   * GET /v1/api/articles
   */
  describe("GET /v1/api/articles", () => {
    it("returns paginated list", async () => {
      const res = await SELF.fetch("http://example.com/v1/api/articles?page=1&limit=10");
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      expect(body).toHaveProperty("data");
      expect(Array.isArray(body.data)).toBe(true);
      expect(body).toHaveProperty("pagination");
    });

    it("with search param filters results", async () => {
      const res = await SELF.fetch("http://example.com/v1/api/articles?search=Test&page=1&limit=10");
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      expect(body).toHaveProperty("data");
    });
  });

  /**
   * POST /v1/api/articles
   */
  describe("POST /v1/api/articles", () => {
    it("with valid body creates article (201)", async () => {
      const res = await SELF.fetch("http://example.com/v1/api/articles", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          title: "New Test Article",
          slug: "new-test-article",
          description: "A newly created article.",
          content: "# New content",
          published: false,
          author_ids: [1],
        }),
      });
      expect(res.status).toBe(201);
      const body = await res.json() as Record<string, unknown>;
      expect(body).toHaveProperty("slug", "new-test-article");
    });

    it("with missing required fields returns 422", async () => {
      const res = await SELF.fetch("http://example.com/v1/api/articles", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ title: "No Slug Article" }),
      });
      expect(res.status).toBe(422);
    });
  });

  /**
   * PATCH /v1/api/articles/:id
   */
  describe("PATCH /v1/api/articles/:id", () => {
    it("updates the article", async () => {
      const res = await SELF.fetch(`http://example.com/v1/api/articles/${ARTICLE_ID}`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ description: "Updated description." }),
      });
      expect(res.status).toBe(200);
    });
  });
});
```

### 2. Mocking Bindings (D1, KV, R2)
You can access and manipulate bindings directly through the `env` object provided by the pool.

```typescript
import { env } from "cloudflare:test";
import { beforeAll, it, expect } from "vitest";

it("should interact with D1 database", async () => {
  // Direct interaction with mock D1
  await env.DB.prepare("INSERT INTO users (name) VALUES (?)").bind("John").run();
  
  const res = await SELF.fetch("http://example.com/users/1");
  const user = await res.json();
  expect(user.name).toBe("John");
});
```

### 3. Unit Testing Hono Modules
For unit tests, you can import individual route handlers or services and pass a mock `Context`.

```typescript
import { Context } from 'hono';
import { handleUserUpdate } from '../src/modules/user/handler';

it('should validate user input', async () => {
  const mockContext = {
    req: { json: () => Promise.resolve({ age: -1 }) },
    json: (data, status) => ({ data, status })
  } as unknown as Context;

  const res = await handleUserUpdate(mockContext);
  expect(res.status).toBe(400);
});
```

## 📋 Best Practices for Workers
1. **Isolated State**: Use `beforeEach` or `beforeAll` with `seedDatabase()` to ensure a clean slate.
2. **Comprehensive Coverage**: Test success (200, 201, 204) and failure cases (400, 404, 409, 422).
3. **Data Integrity**: Verify that specific fields exist (e.g., `pagination`, `data`) and that sensitive or heavy fields (like `content`) are excluded from list results.
4. **Auth Flow**: Always use `getAuthHeaders()` for protected routes to simulate real-world authorization.
5. **Deterministic Time**: Use `vi.setSystemTime()` if testing TTL in KV or expiring tokens.
6. **Type Casting**: Use `as Record<string, unknown>` or specific interfaces when parsing JSON response bodies in tests.

## ⚠️ Common Pitfalls
- **Missing `nodejs_compat`**: The `@cloudflare/vitest-pool-workers` MANDATORY requires the `nodejs_compat` or `nodejs_compat_v2` flag in `wrangler.toml` to function. Ensure it is added to your configuration.
- **Async Leakage**: Always await database operations before the test finishes to avoid background execution errors.
- **Binding Names**: Ensure the property names in the `env` object match the bindings in `wrangler.toml`.
- **Version Conflicts**: If `npm install` fails with `ERESOLVE`, verify that the `vitest` version matches the `@cloudflare/vitest-pool-workers` peer dependency range.

## 🔗 Related Skills
- [Cloudflare Workers](../cloudflare/cloudflare_workers.md)
- [Hono Patterns](../node/hono_patterns.md)
- [Testing Standards](./SKILL.md)
