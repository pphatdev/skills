# Skill: Database & Persistence Management

## Context
Use this skill when managing database schemas, implementing multi-tenancy isolation, or optimizing data access patterns. This ensures that the project's data remains structured, secure, and performant.

## Core Guidelines

### 1. Multi-Tenancy
- **Isolation**: Use row-level isolation with a `tenant_id` column for all client-specific data.
- **Enforcement**: Mandatory filtering in all repositories and context-based tenant identification.

### 2. Schema Management
- **Migrations**: Use additive migrations and follow the Zero-Downtime protocol.
- **Safety**: Always backup data before destructive operations.

### 3. Query Optimization
- **Indexing**: Ensure all frequently filtered columns (especially `tenant_id` and slugs) are indexed.
- **Batching**: Use batch operations for bulk updates to minimize D1 round-trips.

## References
- Multi-Tenancy: [multi_tenancy.md](multi_tenancy.md)
- Data Safety: [../../agent/data_safety.md](../../agent/data_safety.md)
