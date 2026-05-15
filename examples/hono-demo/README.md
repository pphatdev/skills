# Hono Modular Demo

This is a demonstration of a modular Hono.js application following the institutionalized project standards.

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
