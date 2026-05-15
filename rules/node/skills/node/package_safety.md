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
- **Transitive Vulnerabilities**: If a vulnerability exists in a sub-dependency (transitive dependency), use the `overrides` section in `package.json` to force a secure version without waiting for the parent package to update.
- **Audit Fix Caution**: Avoid using `npm audit fix --force` as it may perform destructive major version upgrades. Prefer manual updates or specific `overrides` for precision.
- **Legacy Peer Deps**: Avoid using `--legacy-peer-deps` unless the conflict is thoroughly understood and documented.

### 3. Dependency Selection
- **Popularity & Maintenance**: Prefer packages that are actively maintained and have a strong community reputation.
- **Minimalism**: Do not add dependencies for functionality that can be easily implemented with native Node.js/Web APIs.
- **Deprecation Check**: Never use packages that are officially deprecated.

### 4. Compatibility
- **Peer Dependencies**: Ensure all peer dependencies are satisfied. Do not ignore peer dependency warnings as they often indicate architectural mismatches (e.g., Hono v3 vs v4).
- **Node.js Compatibility**: Verify that new packages are compatible with the supported Node.js versions (20, 22, 24).

## Troubleshooting
- **ERESOLVE Errors**: If `npm install` fails with `ERESOLVE`, investigate the version mismatch instead of forcing the installation. Often, an upgrade to a major version of a core library (like Hono) is required.
- **Audit Failures**: If a vulnerability is found in a sub-dependency, use `overrides` (npm) to force a safer version. Example:
  ```json
  "overrides": {
    "esbuild": "^0.25.0"
  }
  ```
- **Major Upgrades**: When an audit fix requires a major version upgrade (e.g., Vite 5 to 8), verify breaking changes and Node.js compatibility (e.g., Vite 8 requires Node.js 20.19+ or 22.12+) before proceeding.
