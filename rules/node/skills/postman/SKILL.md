# Skill: Postman Documentation & Testing

## Context
Use this skill to maintain synchronized API documentation and automated testing collections in Postman. This ensures that every feature change is immediately reflected in the project's collection at `doc/collections/`.

## Core Guidelines

### 1. Synchronization
- **Mandatory**: Every new feature or update **must** include a corresponding Postman collection update.
- **Location**: Store exports in `doc/collections/`.

### 2. Automation & Scripts
- **Token Management**: Login/Refresh routes must automatically capture and set `token` and `refreshToken` variables.
- **CRUD Capture**: POST requests should extract the new resource ID/Slug and update collection variables for subsequent GET/PATCH/DELETE actions.

### 3. Documentation
- **Descriptions**: All requests, query params, and path variables must be documented.
- **Examples**: Include saved response examples (e.g., 200 OK) for every request.

## References
- Full Rules: [postman_rules.md](postman_rules.md)
