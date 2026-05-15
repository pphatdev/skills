# Skill: Node.js Framework Development

## Context
Use this skill when developing the core application logic using Node.js, the Hono framework, or Express.js. This ensures code consistency, performance, and security across all modules.

## Core Guidelines

### 1. Framework Patterns (Hono & Express)
- **Hono Context**: Use `c.set()` and `c.get()` for request-scoped variables.
- **Express Context**: Use `res.locals` for data passing between middlewares.
- **Input Validation**: Use Zod with the appropriate middleware (`zValidator` for Hono, custom middleware for Express).

### 2. Coding Standards
- **Asynchronous Logic**: Use `async/await` exclusively; avoid nested callbacks.
- **Error Handling**: Use a centralized error handler and custom exception classes.
- **Typing**: Ensure 100% TypeScript coverage for all inputs, outputs, and services.

### 3. Performance
- **Tree Shaking**: Use ES Modules and avoid importing large monolithic libraries.
- **Caching**: Implement memory or KV caching for expensive computations.

## References
- Node Best Practices: [node_practices.md](node_practices.md)
- Node Versioning: [node_versions.md](node_versions.md)
- Package Safety: [package_safety.md](package_safety.md)
- Hono Patterns: [hono_patterns.md](hono_patterns.md)
- Express Patterns: [express_patterns.md](express_patterns.md)
