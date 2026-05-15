# Skill: Object-Relational Mapping (ORM)

## Context
Use this skill when implementing database interactions using Drizzle ORM or TypeORM. These guidelines ensure that database schemas are maintainable, queries are performant, and type safety is maintained across the application.

## Core Guidelines

### 1. Drizzle ORM (Preferred for Workers)
- **TypeScript-First**: Leverage Drizzle's inference for 100% type safety.
- **D1 Compatibility**: Optimized for Cloudflare D1 with minimal bundle size.
- **Migrations**: Use `drizzle-kit` for schema generation and deployment.

### 2. TypeORM (Standard Node.js)
- **Entity Decorators**: Use decorators for defining schemas and relationships.
- **Data Source**: Maintain a centralized data source for connection management.
- **Repository Pattern**: Use the built-in repository pattern for clean data access.

### 3. General ORM Safety
- **Naming Conventions**: Use `snake_case` for database columns and `camelCase` for TypeScript properties.
- **Validation**: Combine ORM schemas with Zod for end-to-end type safety.

## References
- Drizzle Patterns: [drizzle_orm.md](drizzle_orm.md)
- TypeORM Patterns: [typeorm.md](typeorm.md)
- Database Safety: [../database/multi_tenancy.md](../database/multi_tenancy.md)
