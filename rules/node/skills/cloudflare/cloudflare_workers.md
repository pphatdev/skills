# Skill: Cloudflare Workers Development

## Context
Use this skill when developing, deploying, or managing Cloudflare Workers. This ensures optimal use of the Edge runtime, proper binding management, and efficient use of Cloudflare resources like D1, KV, and R2.

## Guidelines

### 1. Configuration & Environments
- **wrangler.toml**: Always use `wrangler.toml` for project configuration, bindings, and environment definitions.
- **Secrets**: Use `wrangler secret put KEY` for production secrets. For local development, use a `.dev.vars` file.
- **Environment Splits**: Clearly define `[env.production]` and `[env.staging]` in your wrangler config if needed.

### 2. Bindings & Resources
- **D1 Database**: Access SQL databases via `env.DB`. Use `wrangler d1 migrations` for schema updates.
- **KV Storage**: Use `env.KV` for low-latency key-value data. Avoid using KV for frequently changing data due to eventual consistency.
- **R2 Storage**: Use `env.BUCKET` for large object storage.
- **Service Bindings**: Use service bindings to communicate between workers without leaving the Cloudflare network.

### 3. Edge Runtime Constraints
- **Standard APIs**: Only use Web Standard APIs (Fetch, Streams, Crypto).
- **No Node.js Built-ins**: Avoid `fs`, `path`, `os`, etc., unless using the `nodejs_compat` compatibility flag in `wrangler.toml`.
- **Package Selection**: Ensure third-party libraries are compatible with the Edge runtime (no native C++ bindings).

### 4. Performance & Limits
- **Execution Time**: Keep CPU time within the 50ms (Free) or 30ms (Bundled) limits.
- **Cold Starts**: Minimize dependencies and use `ES Modules` for faster startup times.
- **Subrequests**: Be mindful of the subrequest limit (50 per request).

### 5. Local Development & Testing
- **Wrangler Dev**: Use `npx wrangler dev` for local testing.
- **Remote vs Local**: Use `--remote` if you need to test against live D1/KV data, otherwise use local persistence.
- **Vitest**: Use `cloudflare-vitest-pool` for integration tests that require a simulated Worker environment.

## Best Practices
- **Middleware**: Use Hono or similar lightweight frameworks for routing and middleware.
- **Graceful Failover**: Implement fallbacks for external API calls.
- **Logging**: Use `console.log` for development; for production, consider streaming logs to a specialized service or using Cloudflare Tail.

## Troubleshooting
- **Binding Not Found**: Ensure the binding is correctly named in `wrangler.toml` and matches the name in your code's `Env` interface.
- **Script Too Large**: If the worker exceeds 1MB, optimize your bundle by removing unused dependencies or assets.
