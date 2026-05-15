# Skill: Package Safety and Dependency Security

## Context
Use this skill when adding, updating, or auditing dependencies in the project. Ensuring package safety prevents supply chain attacks, security vulnerabilities, and breaking changes.

## Package Safety Rules

### 1. Versioning and Pinning
- **Stable Versions**: Use only stable versions of packages. Avoid `beta`, `rc`, `alpha`, or `canary` releases unless explicitly required for testing.
- **Lock Files**: Always commit `package-lock.json`. This ensures consistent builds across all environments.
- **Safe Ranges**: Use `^` (caret) for general dependencies but consider `~` (tilde) or fixed versions for critical infrastructure packages.

### 2. Vulnerability Management
- **Audit**: Every dependency change **must** be followed by `npm audit`.
- **Critical Fixes**: All "High" and "Critical" vulnerabilities must be addressed before merging changes.
- **Legacy Peer Deps**: Avoid using `--force` or `--legacy-peer-deps` unless the conflict is thoroughly understood and documented.

### 3. Dependency Selection
- **Popularity & Maintenance**: Prefer packages that are actively maintained and have a strong community reputation.
- **Minimalism**: Do not add dependencies for functionality that can be easily implemented with native Node.js/Web APIs.
- **Deprecation Check**: Never use packages that are officially deprecated.

### 4. Compatibility
- **Peer Dependencies**: Ensure all peer dependencies are satisfied. Do not ignore peer dependency warnings as they often indicate architectural mismatches (e.g., Hono v3 vs v4).
- **Node.js Compatibility**: Verify that new packages are compatible with the supported Node.js versions (20, 22, 24).

## Troubleshooting
- **ERESOLVE Errors**: If `npm install` fails with `ERESOLVE`, investigate the version mismatch instead of forcing the installation. Often, an upgrade to a major version of a core library (like Hono) is required.
- **Audit Failures**: If a vulnerability is found in a sub-dependency, use `overrides` (npm) or `resolutions` (yarn) as a last resort to force a safer version.
