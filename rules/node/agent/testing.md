# Testing Rules

All features in this project MUST have corresponding feature tests to ensure reliability and prevent regressions.

## Test Location
Feature tests are located in:
- `test/features/*.spec.ts`

## Testing Stack
- **Framework**: [Vitest](https://vitest.dev/)
- **Pool**: `@cloudflare/vitest-pool-workers`
- **Environment**: Cloudflare Workers (using `wrangler.test.jsonc`)

## General Rules

1. **New Features**: Every new feature implemented MUST have a corresponding `.spec.ts` file in `test/features/`.
2. **Naming Convention**: Test files should be named after the feature (e.g., `articles.spec.ts`).
3. **Database Seeding**: Use the `seedDatabase(env.DB)` helper in a `beforeAll` block to ensure a clean and consistent state.
4. **Authentication**: Use `getAuthHeaders(env.JWT_SECRET)` to obtain valid tokens for protected routes.
5. **Worker Execution**: Access the worker instance via `exports.default` (commonly assigned to `SELF`).
6. **API Calls**: Use `SELF.fetch("http://example.com/v1/api/...")` to make requests to the worker.
7. **Mocking**: Use `vi.fn()` or `vi.mock()` to isolate the feature from external services (e.g., AI, R2, external APIs).
8. **Assertions**: Use descriptive `expect` calls to verify status codes, headers, and body content.

## Example Structure

```typescript
import { env, exports } from "cloudflare:workers";
import { beforeAll, afterEach, describe, expect, it, vi } from "vitest";
import { getAuthHeaders, seedDatabase } from "../../apps/shared/helpers/test-cases";

const SELF = exports.default;
let authHeaders: Record<string, string>;

beforeAll(async () => {
  await seedDatabase(env.DB);
  authHeaders = await getAuthHeaders(env.JWT_SECRET);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Feature Name API", () => {
  it("GET /v1/api/feature returns success", async () => {
    const res = await SELF.fetch("http://example.com/v1/api/feature", {
      method: "GET",
      headers: authHeaders,
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("data");
  });
});
```

## Running Tests
- Run all tests: `npm test`
- Run specific test: `npx vitest run test/features/feature-name.spec.ts`
- Watch mode: `npx vitest`
