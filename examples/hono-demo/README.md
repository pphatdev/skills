# Hono Modular Demo (v1.1.0)

A modular **Hono.js** application template for Node.js environments, following institutionalized agent skills and architectural standards.

## Project Structure

- `src/app.ts`: Application entry point and module mounting.
- `src/modules/`: Feature-encapsulated logic (Controller, Service, Repository, DTO).
- `src/shared/`: Cross-cutting utilities and types.
- `src/middlewares/`: Global application middlewares.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run in Development**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Design Principles

- **Modularity**: Each feature is self-contained in its own module.
- **Type Safety**: 100% TypeScript coverage with Zod validation.
- **Node.js Compatibility**: Supports Node.js 20, 22, and 24.
- **Package Safety**: Uses stable releases and consistent lock files.

## Testing

Run feature tests using Vitest:

```bash
npm test
```

## Documentation

API documentation is maintained via Postman collections in the `doc/collections` directory.
