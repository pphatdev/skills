# Skill: Data Safety & Security

## Context
Use this skill to ensure that all data handling within the application is secure, validated, and protected from common vulnerabilities. This is critical for maintaining user trust and preventing data breaches.

## Guidelines

### 1. Input Validation & Sanitization
- **Strict Validation**: Every entry point (API route, webhook) **must** use a Zod schema to validate incoming data.
- **Sanitization**: Strip HTML or dangerous characters from string inputs unless explicitly allowed (e.g., for CMS content).
- **Type Casting**: Never trust request body types; always parse them through a validator first.

### 2. SQL & Database Safety (D1)
- **Prepared Statements**: Always use parameterized queries or the D1 binding's built-in protection. Never concatenate strings into SQL queries.
- **Migrations**: Always test migrations locally before applying them to production. Never perform `DROP TABLE` or `DELETE` without a backup or explicit user approval.
- **Soft Deletes**: Prefer soft-delete patterns (e.g., `deleted_at` column) for critical business data instead of hard deletions.

### 3. Migration Safety (Zero Downtime)
- **Backup Mandatory**: Before applying any migration that modifies or deletes data/columns, you **must** ensure a database snapshot or backup is available.
- **Additive Changes**: Prefer additive migrations (adding columns/tables) over destructive ones. If a column must be renamed, add the new column first, sync data, then drop the old one in a separate release.
- **Constraints**: When adding `NOT NULL` constraints to existing columns, ensure a `DEFAULT` value is provided or existing rows are backfilled first to prevent migration failure.
- **Rollback Plan**: Every migration script should be accompanied by a clear rollback strategy or script.
- **Validation**: Verify migrations in a staging environment that mirrors production data volume to identify potential performance locks.

### 4. Handling Sensitive Data
- **Hashing**: Never store passwords in plain text. Use Argon2 or bcrypt with a high salt cost.
- **Encryption**: Use the Web Crypto API to encrypt PII (Personally Identifiable Information) at rest if required by project standards.
- **Masking**: Ensure sensitive data (e.g., tokens, partial emails) is masked in logs.

### 5. API Security
- **Rate Limiting**: Apply rate-limiting middlewares to prevent brute-force attacks on sensitive endpoints (Auth, Search).
- **Authentication**: Enforce JWT validation for all non-public routes. Use `httpOnly` and `secure` flags for cookies if applicable.
- **CORS**: Strictly define allowed origins; avoid using `*` in production.

### 6. Error Handling & Logs
- **Leakage**: Never return raw database errors or stack traces to the client.
- **Sensitive Logs**: Do not log full request bodies or headers that might contain tokens or passwords.

## Best Practices
- **Least Privilege**: Ensure Cloudflare bindings (D1, KV) have the minimum permissions required for the task.
- **Audit Trails**: Implement logging for critical data modifications (Create, Update, Delete).
- **Dependency Audits**: Periodically run `npm audit` to check for vulnerabilities in third-party packages.

## Troubleshooting
- **Validation Failed**: If a request is rejected by Zod, provide a clear but safe error message to the client indicating which field failed.
- **Data Corruption**: If data is found to be inconsistent, stop the operation and log the anomaly immediately.
