# Skill: Data Transfer Objects (DTO)

## Context
Use this skill when defining structures for data moving between different layers of the application (e.g., from the client to the controller, or from the service to the client). DTOs ensure that the API contract is explicit and independent of the database schema.

## Core Guidelines

### 1. Input DTOs (Request Validation)
- **Schema Validation**: Every input DTO **must** have a corresponding validation schema (e.g., Zod).
- **Versioning**: If the API version changes, ensure the DTO reflects the correct fields for that version.
- **Optionality**: Use partial DTOs (e.g., `UpdateArticleDto`) where fields are optional compared to creation.

### 2. Output DTOs (Response Mapping)
- **Data Selection**: Only return the fields necessary for the client. Never return sensitive data (e.g., hashed passwords, internal IDs).
- **Transformation**: Transform complex database objects into flat, client-friendly structures in the service or a specialized mapper.

### 3. Naming & Organization
- **Standard Suffixes**: Use `Dto` for inputs (e.g., `CreateUserDto`) and `Response` for outputs (e.g., `UserResponse`).
- **Location**: Store DTOs within the module folder: `[module]/[module].dto.ts`.

## References
- Validation Patterns: [../node/hono_patterns.md](../node/hono_patterns.md)
- Data Safety: [../../agent/data_safety.md](../../agent/data_safety.md)
