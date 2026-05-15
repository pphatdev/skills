# Skills & Labs

A comprehensive repository for institutionalized development standards, AI agent rules, and modular reference implementations.

## 🚀 Overview

This repository serves as the central "Source of Truth" for development patterns at **pphatdev**. It contains both documentation-based "skills" (rules) for AI agents and human developers, as well as production-ready boilerplate examples.

## 📁 Repository Structure

- **`/rules`**: The core knowledge base.
  - **`/node`**: Specific rules for Node.js, Hono, and Cloudflare environments.
  - **`AGENTS.md`**: Entry point for AI coding assistants.
  - **`SKILL.md`**: Index of all available specialized skills.
- **`/examples`**: Reference implementations following the rules.
  - **`hono-demo`**: Modular Hono.js application for Node.js.
  - **`hono-cloudflare-demo`**: Hono.js optimized for Cloudflare Workers.
  - **`express-demo`**: Standard modular Express.js application.

## 🤖 AI Agent Integration

This project is designed to be "Agent-First". All AI coding assistants (Claude, GPT, etc.) **must** initialize by reading the [AGENTS.md](AGENTS.md) file at the root.

To load context into an agent:
1. Direct the agent to read `AGENTS.md`.
2. The agent will follow the internal links to understand the specific modular structures, documentation standards, and testing protocols required.

## 🛠️ Key Technologies

- **Runtimes**: Node.js (20+), Cloudflare Workers.
- **Frameworks**: Hono.js, Express.js.
- **Validation**: Zod (100% type safety).
- **ORM**: Drizzle, TypeORM.
- **Documentation**: JSDoc, Postman.

---

© 2026 pphatdev. All rights reserved.
