# Skill: Database Multi-Tenancy Patterns

## Context
Use this skill when implementing features that require data isolation between different clients (tenants). This ensures that each tenant's data is strictly partitioned and secure from unauthorized access by other tenants.

## Core Guidelines

### 1. Multi-Tenancy Strategy
- **Shared Database, Isolated Rows**: We use a shared D1 database where every tenant-specific table includes a `tenant_id` column (typically a UUID).
- **Tenant Identification**: The tenant is identified via the `X-Tenant-ID` header or a custom subdomain.

### 2. Tenant Context (Hono)
- **Middleware**: A global `tenant.middleware.ts` must extract the tenant identifier from the request and verify it against the `tenants` table.
- **Context Storage**: Store the verified `tenantId` in Hono context using `c.set('tenantId', tenantId)`.

### 3. Repository Implementation
- **Mandatory Filtering**: Every query in a repository **must** include a `WHERE tenant_id = ?` clause.
- **Global Scope**: If using an ORM or query builder, ensure a global filter is applied to prevent accidental cross-tenant data leakage.
- **Example**:
  ```typescript
  async findBySlug(slug: string, tenantId: string) {
    return await this.db
      .select()
      .from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.tenantId, tenantId)))
      .get();
  }
  ```

### 4. Data Integrity & Validation
- **Unique Constraints**: Unique indexes must include the `tenantId` (e.g., `UNIQUE(tenant_id, slug)`).
- **Foreign Keys**: Ensure all related data (comments, stats) also carry the `tenantId` for secondary validation.

### 5. Security & Isolation
- **Cross-Tenant Prevention**: Never allow a user to update or delete a resource unless the `tenantId` in the request matches the `tenantId` of the resource.
- **Admin Access**: Only specific "Global Admin" roles should be allowed to query across multiple `tenantId` values.

## Best Practices
- **Testing**: Always include test cases that attempt to access data from Tenant A using a Tenant B identifier to verify isolation.
- **Logging**: Include `tenantId` in all structured logs for easier debugging of tenant-specific issues.
- **Caching**: If using KV for caching, prefix all keys with the `tenantId` (e.g., `tenant123:article:slug`).

## Troubleshooting
- **Data Leakage**: If a query returns data from the wrong tenant, immediately audit the repository's filtering logic.
- **Tenant Not Found**: Return a `404 Not Found` or `403 Forbidden` if the requested `tenantId` is invalid or inactive.
