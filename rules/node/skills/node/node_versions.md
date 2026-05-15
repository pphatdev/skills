# Skill: Node.js Runtime Versioning

## Context
Use this skill to ensure the application runs on a supported and stable Node.js environment. This prevents compatibility issues with modern features and security vulnerabilities.

## Node.js Version Rules

### 1. Supported Versions
The project officially supports only the following Node.js versions:
- **Node.js 20** (Active LTS)
- **Node.js 22** (Current LTS/Active)
- **Node.js 24** (Next Major/LTS)
- **Stable Versions**: Always prefer the latest stable LTS (Long Term Support) release for production environments.

### 2. Version Enforcement
- **Engines Field**: Every `package.json` in the project **must** specify the supported versions in the `engines` field:
  ```json
  "engines": {
    "node": ">=20.0.0"
  }
  ```
- **CI/CD**: Build pipelines must be configured to use one of the supported versions (defaulting to 20 or 22).

### 3. Best Practices
- **Feature Usage**: Do not use Node.js features that are only available in experimental or non-LTS versions.
- **Security**: Regularly update the minor/patch version of the Node.js runtime to include security fixes.
- **Compatibility**: When using Cloudflare Workers with `nodejs_compat`, ensure the features used are compatible with the Worker runtime's Node.js support.

## Troubleshooting
- **Version Mismatch**: If a package requires a newer version of Node.js than supported, reconsider the dependency or propose an upgrade to the supported versions list.
- **Runtime Errors**: If you encounter `SyntaxError` or `ReferenceError` related to modern JS features, verify that the runtime environment is running a supported version (>=20).
