# Project Context: Skills & Labs

## 🎯 Core Purpose
This repository is a centralized hub for **institutionalized development standards** and **reference implementations**. It serves as the primary source of truth for both human developers and AI agents working within the pphatdev ecosystem.

## 🏗️ Architecture & Stack
- **Philosophy**: Modular, feature-encapsulated design.
- **Languages**: TypeScript (100% Type Safety).
- **Runtimes**: Node.js 20/22/24, Cloudflare Workers.
- **Frameworks**: Hono.js, Express.js.
- **Validation**: Zod (Mandatory for all API inputs).
- **ORM**: Drizzle ORM, TypeORM.
- **Infrastructure**: Cloudflare D1 (Database), KV (Storage), R2 (Buckets).

## 📂 Key Context Links
- **Agent Rules**: [AGENTS.md](AGENTS.md) (Entry point for AI).
- **Knowledge Base**: [rules/node/SKILL.md](rules/node/SKILL.md) (Skill index).
- **Visual Map**: [STRUCTURE.md](STRUCTURE.md) (Project layout).
- **Reference Code**: [examples/](examples/) (Hono, Express, Cloudflare demos).

## 📜 Development Guidelines (TL;DR)
1. **Modules over Folders**: Group by feature (Service, Repository, Controller, DTO) in a single module directory.
2. **Path Aliasing**: Use `@apps` for clean imports from the application root.
3. **Strict Versioning**: Node.js 20+ only.
4. **Safety First**: SQL injection prevention via ORMs/Zod; no destructive actions without approval.
5. **Auto-Documentation**: Mandatory JSDoc for all exported functions/classes.

## 🚀 Current Project Status
- [x] Initialized Skill Knowledge Base (`/rules`).
- [x] Implemented Hono Node.js Demo.
- [x] Implemented Hono Cloudflare Demo.
- [x] Implemented Express Demo.
- [x] Established Root Documentation Suite.
- [ ] Next: Refining Multi-Tenancy patterns and DTO standards.

---
*Last Updated: 2026-05-15*
