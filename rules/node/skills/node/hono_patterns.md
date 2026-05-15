# Skill: Hono Framework Patterns

## Context
Use this skill when implementing routing, middleware, and request handling using the Hono framework. This ensures that the application leverages Hono's strengths in performance and type safety.

## Guidelines

### 1. Routing & Mounting
- **Sub-routers**: Always use sub-routers for modules and mount them in `app.ts` using `.route()`.
- **Method Consistency**: Use standard HTTP methods (`.get()`, `.post()`, `.patch()`, `.delete()`).
- **Path Naming**: Use kebab-case for URL paths (e.g., `/api/article-stats`).

### 2. Context & State
- **Context Variables**: Use `c.set('key', value)` in middlewares to pass data to controllers.
- **Environment Bindings**: Define an `Env` type for Cloudflare bindings and use it as a generic in `new Hono<{ Bindings: Env }>()`.
- **Response Helpers**: Use `c.json()`, `c.text()`, or `c.body()` for consistent response formatting.

### 3. Middleware Usage
- **Custom Middleware**: Use `createMiddleware` for reusable logic.
- **Built-in Middleware**: Leverage `logger()`, `cors()`, and `secureHeaders()` where appropriate.
- **Order of Execution**: Ensure global middlewares (Security, CORS) are defined before module routes.

### 4. Validation (Zod)
- **zValidator**: Always use the `@hono/zod-validator` middleware for request body and query parameter validation.
- **Typed Responses**: Use the validation schemas to also define the expected response types.

## Best Practices
- **Minimize Dependencies**: Keep the bundle small by only using lightweight middlewares.
- **Request ID**: Implement a request ID middleware for easier log tracing.
- **Early Returns**: Use `c.json({ error: ... }, 400)` for early validation failures.
