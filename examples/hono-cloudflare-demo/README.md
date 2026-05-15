# Hono Cloudflare Demo

A high-performance API template for **Cloudflare Workers** built with **Hono**, following modular architectural principles.

## Architecture

- **Edge First**: Built specifically for the Cloudflare Workers runtime.
- **Modular Design**: Feature-based logic isolation in `src/modules`.
- **Zod Validation**: Strict input validation using `@hono/zod-validator`.
- **Uniform Responses**: Standardized JSON response patterns.
- **Type Safety**: Full TypeScript support with Cloudflare Worker bindings.

## Getting Started

### Prerequisites

- Node.js (v18+)
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
wrangler.toml               # Cloudflare configuration
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health`| Health check |
| GET    | `/users` | List users (Edge) |
| POST   | `/users` | Create user (Edge) |
