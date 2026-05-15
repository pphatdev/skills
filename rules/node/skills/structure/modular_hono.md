# Skill: Modular Node.js (Hono) Project Structure

## Context
Use this skill when setting up or auditing the directory structure of a Node.js API (specifically those using Hono and Cloudflare Workers). This structure prioritizes modularity, scalability, and clear separation of feature logic.

## Guidelines

### 1. Project-wide Structure
All projects should adhere to the following layout (supporting both `src/` or `apps/` as root):

```text
.rules/                             # Project-specific AI & coding rules
src/apps/ or apps/                  # Main source root (aliased as @apps)
├── app.ts                          # Worker entry point (Hono app)
├── middlewares/                    # Global/Shared Middlewares
│   ├── auth.middleware.ts          # JWT auth guard
│   ├── rate-limit.middleware.ts    # Per-API-type rate limiting
│   ├── security.middleware.ts      # Standard security headers
│   └── traffic.middleware.ts       # Visitor traffic logging
├── modules/                        # Feature-based logic (Encapsulated)
│   └── [features]/                 # All feature logic (Encapsulated)
└── shared/                         # Cross-cutting utilities & types
    ├── types/                      # Global TypeScript interfaces
    └── utils/                      # Common helper functions
migrations/                         # D1/SQL Schema migrations
doc/collections/                    # Postman collections
test/                               # Integration & feature tests (Vitest)
```

### 2. Module Internal Structure
Each module in `[root]/modules/` should ideally follow this pattern:
- `[module].controller.ts`: Endpoint handlers and request parsing.
- `[module].service.ts`: Core business logic and orchestration.
- `[module].repository.ts`: Database/D1 interactions.
- `[module].dto.ts`: Data Transfer Objects (Validation & Response schemas).
- `[module].schema.ts`: Zod validation schemas (often shared with DTO).
- `index.ts`: Export the module's router.

### 3. Shared vs. Global
- **Middlewares**: Only place truly global or multi-module middlewares in `[root]/middlewares/`. Feature-specific middlewares should stay inside their respective module folder.
- **Shared**: Use for logic that is strictly independent of any business domain (e.g., date formatters, encryption helpers).

## Best Practices
- **Isolation**: Modules should not directly import repositories from other modules. Use services for cross-module communication.
- **Entry Point**: Keep `app.ts` clean by mounting module routers using `.route('/path', moduleRouter)`.
- **Naming**: Use kebab-case for directories and PascalCase or camelCase for files as per project standards.
- **Documentation**: You **must** generate or update the Postman collection in `doc/collections/` whenever a new feature is created or an existing one is updated.

## Troubleshooting
- **Circular Dependencies**: Often caused by modules importing each other directly. Refactor shared logic to `shared/` or create a third service.
- **Path Aliases**: Ensure `tsconfig.json` paths match this structure (e.g., `@apps/*`, `@modules/*`).
