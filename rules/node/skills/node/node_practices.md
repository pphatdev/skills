# Skill: Node.js Development Best Practices

## Context
Use this skill when initializing new Node.js projects or refactoring existing ones. These rules ensure a consistent, secure, and maintainable codebase that aligns with modern industry standards.

## Guidelines

### 1. Project Structure
Follow a modular or layered architecture (Controller-Service-Repository) to separate concerns:
- **Controllers**: Handle HTTP requests and responses.
- **Services**: Contain business logic and orchestration.
- **Repositories**: Manage data access and persistence.
- **Middlewares**: Cross-cutting concerns (Auth, Logging, Error Handling).

### 2. Environment Management
- **Secrets**: Never hardcode API keys, database URLs, or credentials.
- **Config**: Use `.env` files for local development and environment-specific variables.
- **Validation**: Validate environment variables at startup to prevent runtime failures.
- **Node.js Versions**: Supported only versions `20`, `22`, `24`, and stable LTS releases. See [node_versions.md](node_versions.md).

### 3. Asynchronous Programming
- **Async/Await**: Always prefer `async/await` over callbacks or `.then()` chains.
- **Error Propagation**: Ensure all async operations are wrapped in `try/catch` or handled by a global error handler.
- **Parallelism**: Use `Promise.all()` for independent async tasks to improve performance.

### 4. Error Handling
- **Centralization**: Use a global error-handling middleware to catch and format errors consistently.
- **Custom Errors**: Create custom error classes (e.g., `NotFoundError`, `ValidationError`) for better error categorization.
- **No Silencing**: Avoid empty `catch` blocks. Log errors even if they are non-fatal.

### 5. Security
- **Input Validation**: Sanitize and validate all incoming data using libraries like `Zod` or `Joi`.
- **Dependency Safety**: Regularly run `npm audit` and keep dependencies updated.
- **Headers**: Use `helmet` to set secure HTTP headers.

### 6. Dependency Management
- **Lock Files**: Always commit `package-lock.json` or `yarn.lock`.
- **Package Safety**: Use stable versions, run `npm audit` regularly, and resolve high/critical vulnerabilities. See [package_safety.md](package_safety.md).
- **Version Pinning**: Use fixed versions or `~` (patch) for critical dependencies to avoid breaking changes.

## Best Practices
- **Type Safety**: Use TypeScript for better developer experience and reduced runtime errors.
- **Logging**: Use a structured logger (e.g., `Pino`, `Winston`) instead of `console.log`.
- **Code Style**: Enforce consistency with ESLint and Prettier.
- **Performance**: Avoid blocking the event loop with heavy synchronous computations.

## Troubleshooting
- **Memory Leaks**: Monitor heap usage if the process crashes unexpectedly.
- **Unhandled Rejections**: Always listen for `unhandledRejection` and `uncaughtException` events.
