<!-- BEGIN:AGENTS -->
# Agent Instructions

AI Agents working on this project **must** adhere to the guidelines and patterns defined in this repository. Failure to follow these rules may result in rejection of changes or architectural regression.

## 1. Behavioral & Interaction Protocol
- **MANDATORY**: Read and follow the [Agent Interaction Protocol](agent/protocol.md) before starting any task.
- **Safety**: Never perform destructive actions (deletion, mass refactoring) without explicit user approval.
- **Modularity**: Strictly follow the feature-encapsulated structure defined in [Modular Hono Structure](skills/structure/modular_hono.md).

## 2. Technical Operational Rules
You must follow all standards defined in the `agent/` directory:
- [Data Safety & Security](agent/data_safety.md) - Input validation, SQL safety, and sensitive data handling.
- [Documentation Standards](agent/comments.md) - Mandatory JSDoc and internal documentation patterns.
- [Testing Procedures](agent/testing.md) - Integration and feature testing protocols using Vitest.
- [Version Management](agent/version.md) - Simultaneous updates for package.json, README, and SECURITY.md.

## 3. Technology-Specific Skills
Apply the following specialized patterns based on the task domain:
- **Node.js**: [Node.js Best Practices](skills/node/node_practices.md), [Node Versioning](skills/node/node_versions.md), [Package Safety](skills/node/package_safety.md), [Hono Patterns](skills/node/hono_patterns.md), and [DTO Standards](skills/dto/SKILL.md).
- **Cloudflare**: [Cloudflare Workers Development](skills/cloudflare/cloudflare_workers.md) (D1, KV, R2).
- **Database**: [Multi-Tenancy Isolation](skills/database/multi_tenancy.md) and [ORM Patterns (Drizzle/TypeORM)](skills/orm/SKILL.md).
- **Testing**: [Hono/Express Testing Patterns](skills/testing/SKILL.md) and [Vitest Integration](agent/testing.md).
- **Postman**: [Postman Collection Standards](skills/postman/postman_rules.md) for mandatory API documentation sync.

## 4. General Compliance
- **Skill Index**: Consult the full [SKILL.md](SKILL.md) for high-level summaries of all available rules.
- **Pathing**: Use `@apps` for imports from the main source root.
- **Validation**: Ensure all API entry points use Zod validators as defined in [Data Safety](agent/data_safety.md).

<!-- END:AGENTS -->