# Skill: Modular Express.js Project Structure

## Context
Use this skill when setting up or auditing a standard Node.js application using the Express.js framework. This structure follows the same modular principles as the Hono architecture but is adapted for the Express middleware and routing system.

## Guidelines

### 1. Root Layout
The root directory follows a modular pattern to ensure scalability:

```text
src/
├── server.ts                       # Entry point (Express app initialization)
├── app.ts                          # Express application setup
├── config/                         # Environment & App configuration
├── middlewares/                    # Global Express middlewares
├── modules/                        # Feature-based logic (Encapsulated)
│   └── [feature]/                  # Feature folder
│       ├── [feature].controller.ts
│       ├── [feature].service.ts
│       ├── [feature].router.ts     # Express.Router()
│       ├── [feature].dto.ts        # Data Transfer Objects
│       └── [feature].schema.ts     # Validation schemas
└── shared/                         # Cross-cutting utilities & types
```

### 2. Express Routing Pattern
- **Module Routers**: Each feature must export an `express.Router()`.
- **Mounting**: Routers should be mounted in the main `app.ts` using `app.use('/path', featureRouter)`.
- **Error Handling**: Use a global error handler at the end of the middleware stack in `app.ts`.

### 3. Middleware Signature
- **Standard**: Follow the `(req, res, next)` signature.
- **Async Wrapper**: Use an `asyncHandler` wrapper or a library like `express-async-errors` to handle promise rejections.

### 4. Controller Pattern
- **Separation**: Controllers handle `res.status().json()`. Services handle the business logic and database calls.
- **Validation**: Use Zod or similar libraries in a middleware before the controller.

## Best Practices
- **Isolation**: Features should communicate via Services, not by importing each other's routers or controllers.
- **Environment**: Use `dotenv` and a centralized `config/` module for all environment access.
- **Statelessness**: Keep the application stateless to allow for horizontal scaling.

## References
- General Modular Principles: [modular_hono.md](modular_hono.md)
