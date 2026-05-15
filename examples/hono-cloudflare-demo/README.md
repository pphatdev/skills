# Hono Cloudflare Demo (v1.1.0)

A high-performance API template for **Cloudflare Workers** built with **Hono**, following modular architectural principles and modern agent skills.

## Architecture

- **Edge First**: Built specifically for the Cloudflare Workers runtime.
- **Modular Design**: Feature-based logic isolation in `src/modules`.
- **Zod Validation**: Strict input validation using `@hono/zod-validator`.
- **Uniform Responses**: Standardized JSON response patterns.
- **Type Safety**: Full TypeScript support with Cloudflare Worker bindings.
- **Automated Testing**: Integrated with Vitest and Cloudflare Worker Pool.

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm / yarn
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-setup/)

### Local Development

```bash
npm install
npm run dev
```

### Deployment

```bash
npm run deploy
```

## Project Structure

```text
src/
├── index.ts                # Worker entry point
├── app.ts                  # Hono app configuration
├── modules/                # Feature modules
│   └── users/              # Example: Users feature
├── shared/                 # Global utilities
└── types/                  # Global types
test/                       # Feature tests (Vitest)
doc/                        # API Documentation
└── collections/            # Postman collections
wrangler.toml               # Cloudflare configuration
```

## Testing

Run feature tests using Vitest and Cloudflare Worker Pool:

```bash
npm test
```

## Documentation

API documentation is maintained via Postman collections in the `doc/collections` directory. Use the `baseUrl` variable to switch between environments.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health`| Health check |
| GET    | `/users` | List users (Edge) |
| POST   | `/users` | Create user (Edge) |
