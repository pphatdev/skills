# Skill: TypeORM Patterns

## Context
Use this skill when implementing database layers using TypeORM in standard Node.js environments (Express/NestJS). TypeORM is suitable for larger monolithic applications where class-based entities and decorators are preferred.

## Guidelines

### 1. Entity Definition
- **Decorators**: Use `@Entity()`, `@PrimaryGeneratedColumn()`, and `@Column()` consistently.
- **Relations**: Use `@ManyToOne()`, `@OneToMany()`, etc., with explicit `onDelete` actions.
- **BaseEntity**: Use `BaseEntity` for the Active Record pattern or `Repository` for the Data Mapper pattern based on project preference.

### 2. Connection Management
- **DataSource**: Initialize a single `DataSource` instance and export it for use across the application.
- **Naming Strategy**: Use a custom naming strategy (e.g., `typeorm-naming-strategies`) to ensure `snake_case` in the database.

### 3. Migrations
- **CLI**: Use `typeorm migration:generate` to auto-generate migrations from entity changes.
- **Manual Control**: Review every generated migration before committing.
- **Reversibility**: Always implement the `down()` method for every migration.

### 4. Querying
- **QueryBuilder**: Use `createQueryBuilder` for complex queries that involve multiple joins or specific SQL functions.
- **Repositories**: Prefer the `Repository` API for standard CRUD operations to maintain cleaner controllers/services.

## Best Practices
- **Strict Typing**: Ensure all entity properties are correctly typed and handle nullability explicitly.
- **Subscribers**: Use Entity Subscribers for cross-cutting concerns like audit logging or automatic timestamping.
- **Eager vs Lazy**: Be cautious with eager loading to avoid performance bottlenecks (N+1 queries).

## References
- Multi-Tenancy Patterns: [../database/multi_tenancy.md](../database/multi_tenancy.md)
