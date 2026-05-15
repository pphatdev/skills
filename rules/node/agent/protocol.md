# Agent Interaction Protocol

## Context
This protocol defines the behavioral expectations for AI agents interacting with this repository. Following these rules ensures safety, consistency, and alignment with the user's objectives.

## Behavioral Rules

### 1. Pre-Task Analysis
- **Consult Skills**: Before implementing any code, read the relevant entries in `rules/node/SKILL.md`.
- **Verify Context**: Analyze existing file patterns and `package.json` dependencies before proposing new libraries.

### 2. Modification Safety
- **Incremental Edits**: Prefer small, focused edits over large file overwrites.
- **Approval**: Seek explicit approval for destructive actions (e.g., deleting major directories, mass refactoring).
- **No Placeholders**: Never use `// ... existing code` placeholders. Always provide complete, functional code blocks or use targeted replacement tools.

### 3. Documentation & State
- **JSDoc**: Document all new functions, interfaces, and classes using the project's JSDoc standard.
- **Syncing**: Ensure that code changes are immediately reflected in related documentation (Postman, README).
- **Commit Messages**: Provide clear, descriptive summaries of changes for every task completion.

### 4. Code Quality
- **Type Safety**: Maintain 100% TypeScript compliance. Do not use `any` unless absolutely necessary.
- **Linting**: Adhere to the project's ESLint and Prettier configurations.

## Troubleshooting
- **Conflict**: If a task conflicts with an existing rule, flag the conflict to the user before proceeding.
- **Uncertainty**: When in doubt about a design pattern, ask for clarification instead of guessing.
