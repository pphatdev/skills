# Skill: Modular Project Architecture

## Context
Use this skill when initializing new features or refactoring the directory structure of a Node.js application (supporting both Hono/Workers and Express.js). This architecture ensures that the project remains scalable and maintainable through strict feature encapsulation.

## Core Guidelines

### 1. Root Configuration
- **Source Root**: Main code resides in `src/apps/`, `apps/`, or `src/`, aliased as `@apps`.
- **Entry Point**: The main application is `[root]/app.ts` or `[root]/server.ts`.

### 2. Feature Encapsulation (Modules)
- **Module Folders**: All domain-specific logic must be contained within `[root]/modules/[feature]/`.
- **Internal Pattern**: Each module should follow the Controller-Service-Repository pattern (e.g., `articles.controller.ts`, `articles.service.ts`).
- **Isolation**: Modules should not import repositories from other modules; use services for cross-module communication.

### 3. Shared Resources
- **Global Middlewares**: Cross-cutting concerns (Auth, Rate Limiting) live in `[root]/middlewares/`.
- **Utilities**: General-purpose helpers and global types live in `[root]/shared/`.

## References
- Hono Structure: [modular_hono.md](modular_hono.md)
- Express Structure: [modular_express.md](modular_express.md)
