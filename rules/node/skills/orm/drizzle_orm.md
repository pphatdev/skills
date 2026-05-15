# Skill: Drizzle ORM Patterns

## Context
Use this skill when implementing database layers using Drizzle ORM, particularly for Cloudflare Workers and D1 environments. Drizzle is the preferred ORM for this project due to its lightweight nature and superior TypeScript integration.

## Guidelines

### 1. Schema Definition
- **Location**: Store schemas in `[root]/shared/db/schema.ts` or within specific module folders (`[module].schema.ts`).
- **Naming**: Use `snake_case` for database table and column names.
- **Exports**: Export both the table definition and the Zod validation schemas inferred from the table.

### 2. Querying Patterns
- **Select**: Use `db.select().from(table).where(...)` for standard lookups.
- **Joins**: Explicitly define joins to maintain type safety and query clarity.
- **Relational Queries**: Use the `db.query` API for complex nested data fetching if configured.

### 3. Migrations & Drizzle Kit
- **Generation**: Run `npx drizzle-kit generate` whenever the schema changes.
- **Deployment**: Use `npx drizzle-kit migrate` for standard Node environments or `wrangler d1 migrations apply` for Cloudflare D1.
- **Safety**: Never modify migration SQL files manually.

### 4. D1 Integration (Cloudflare)
- **Initialization**: Initialize the drizzle instance using the D1 binding:
  ```typescript
  import { drizzle } from 'drizzle-orm/d1';
  const db = drizzle(env.DB);
  ```
- **Batching**: Use `db.batch([...])` to minimize round-trips for multiple queries.

## Best Practices
- **Type Inference**: Use `typeof table.$inferSelect` and `typeof table.$inferInsert` for domain models.
- **Prepared Statements**: Use `.prepare()` for frequently executed queries to improve performance.
- **Separation**: Keep schema definitions separate from database instance initialization.

## References
- Database Multi-Tenancy: [../database/multi_tenancy.md](../database/multi_tenancy.md)
