# CLAUDE Context

This repository uses a structured rule system for AI agents.

## 📜 Agent Rules
The primary entry point for all AI agents is:
👉 **[AGENTS.md](AGENTS.md)**

## 🔍 Core Instructions
- **Adhere to Rules**: You must follow the guidelines in `rules/node/agent/`.
- **Modularity**: Follow the feature-encapsulated structure in `rules/node/skills/structure/`.
- **Tech Stack**: Primarily Node.js 20+, Hono.js, and Cloudflare Workers.
- **Validation**: Use Zod for all API entry points.

## 🛠️ Common Tasks
- **Running Hono Demo**: `cd examples/hono-demo && npm run dev`
- **Running Express Demo**: `cd examples/express-demo && npm run dev`
- **Building Cloudflare**: `cd examples/hono-cloudflare-demo && npx wrangler dev`

For detailed technical standards, always consult the [SKILL.md](rules/node/SKILL.md) index.
