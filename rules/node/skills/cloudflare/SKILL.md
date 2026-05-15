# Skill: Cloudflare Services & Edge Computing

## Context
Use this skill when developing, deploying, or managing Cloudflare Workers, D1 Databases, KV Storage, and R2 Buckets. This ensures optimal use of the Edge runtime and Cloudflare's serverless infrastructure.

## Core Guidelines

### 1. Configuration & Bindings
- **Wrangler**: Use `wrangler.toml` as the source of truth for environment settings and resource bindings (`env.DB`, `env.KV`, etc.).
- **Secrets**: Manage sensitive data using `wrangler secret` or `.dev.vars` for local development.

### 2. Database & Storage (D1, KV, R2)
- **D1 SQL**: Use for structured relational data. Manage schema changes via migrations.
- **KV Storage**: Use for low-latency, eventually consistent key-value data.
- **R2 Storage**: Use for large object/file storage.

### 3. Edge Runtime Execution
- **Web Standards**: Use Web Standard APIs; avoid Node.js built-ins unless `nodejs_compat` is enabled.
- **Performance**: Keep execution within CPU and subrequest limits to avoid termination.

## References
- Worker Rules: [cloudflare_workers.md](cloudflare_workers.md)
