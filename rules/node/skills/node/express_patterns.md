# Skill: Express.js Framework Patterns

## Context
Use this skill when implementing routing, middleware, and request handling using the Express.js framework. This ensures that the application is robust, scalable, and follows common Node.js best practices.

## Guidelines

### 1. Routing & Organization
- **Modular Routers**: Always use `express.Router()` for each feature and mount them in a central router or `app.ts`.
- **Naming**: Use plural nouns for resource paths (e.g., `/users`, `/articles`).

### 2. Request & Response Handling
- **Consistent Responses**: Use a standard utility for sending JSON responses to ensure uniform output across the API.
- **Status Codes**: Always return appropriate HTTP status codes (e.g., 201 for Created, 204 for No Content, 400 for Bad Request).
- **locals**: Use `res.locals` to pass data between middlewares and controllers (e.g., `res.locals.user`).

### 3. Asynchronous Operations
- **Error Propagation**: Use an `asyncHandler` wrapper or `next(error)` to ensure that all async errors reach the global error handler.
- **Graceful Shutdown**: Implement listeners for `SIGTERM` and `SIGINT` to close database connections and stop the server safely.

### 4. Middleware Patterns
- **Logging**: Use `morgan` or a custom winston/pino middleware for request logging.
- **Security**: Always include `helmet` and `cors` as top-level middlewares.
- **Body Parsing**: Use `express.json()` and `express.urlencoded({ extended: true })`.

### 5. Validation (Zod)
- **Middleware Validator**: Create a reusable middleware that takes a Zod schema and validates `req.body`, `req.query`, or `req.params`.
- **Early Exit**: Immediately call `res.status(400).json(...)` if validation fails.

## Best Practices
- **Isolation**: Controllers should be thin; move complex logic into Services.
- **Health Checks**: Implement a `/health` or `/ping` endpoint for monitoring.
- **Compression**: Use the `compression` middleware to reduce the size of response bodies.

## References
- Express Structure: [../structure/modular_express.md](../structure/modular_express.md)
