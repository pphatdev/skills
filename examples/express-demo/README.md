# Express Modular Demo

This is a demonstration of a Node.js application built with Express.js, following a modular architecture, strict TypeScript rules, and project-specific guidelines.

## Features

- **Modular Architecture**: Feature-based encapsulation (see `src/modules/users`).
- **Strict Typing**: 100% TypeScript coverage.
- **Validation**: Request validation using Zod.
- **Error Handling**: Global error handling middleware.
- **Response Utility**: Standardized JSON responses.
- **Security**: Hardened with Helmet, CORS, and compression.
- **Graceful Shutdown**: Handles `SIGTERM` and `SIGINT`.

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npx vitest
```

## Project Structure

```text
src/
├── server.ts                       # Entry point
├── app.ts                          # Express app setup
├── config/                         # Configuration
├── middlewares/                    # Global middlewares
│   ├── error.handler.ts            # Standardized errors
│   └── validator.ts                # Zod validation middleware
├── modules/                        # Features
│   └── users/                      # Users feature
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── users.router.ts
│       ├── users.dto.ts
│       └── users.schema.ts
└── shared/                         # Shared utilities
    └── utils/
        └── response.ts             # Standardized response helper
```

## API Documentation (Summary)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health`| Health check |
| GET    | `/users` | List all users |
| POST   | `/users` | Create a user |
| GET    | `/users/:id` | Get user by ID |
