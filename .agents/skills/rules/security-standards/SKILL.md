---
name: security-standards
description: Load this skill when touching security-sensitive code - authentication, authorization, input handling, secrets, permissions, dependencies, or anything exposed to untrusted input.
user-invocable: true
---

# Security Standards

Category: Rules (Governance)

## Purpose

Hold security-sensitive code to the project's security bar: validate at
boundaries, deny by default, and never make secrecy depend on luck.

## The rules

1. **Trust boundaries.** All external input - HTTP bodies and headers,
   query params, file uploads, environment values, messages from other
   services - is validated and normalized at the boundary, before use.
   Internal code may then assume clean data; that assumption is only
   honest if the boundary actually enforced it.
2. **Authentication and authorization.** Checked at every entry point, not
   at one gateway the team must remember to route through. Deny by
   default; least privilege on every scope, role, and token (read-only
   when read is enough, shortest lifetime that works). Authorization
   checks are per-resource, not per-route: the user may access *their*
   record, not *the* record.
3. **Secrets.** Read from environment or secret manager; never hardcoded,
   never committed, never logged (including in debug output and error
   reports), never echoed into URLs. If a secret may have leaked, rotation
   is part of the fix, not an optional follow-up.
4. **Injection.** Parameterized queries for SQL, safe APIs for shell
   execution, output encoding per context for HTML, no `eval` of external
   data, no deserialization of untrusted payloads into live objects.
5. **Failure mode.** Fail closed. An error path must never leave a
   request half-authorized or a door open "temporarily".
6. **Dependencies.** Pinned versions, audit output reviewed (e.g. `npm
   audit`, `pip-audit`), advisories treated as blocking until patched or
   explicitly justified in writing with a mitigation.
7. **Logging.** Log events and identifiers, not payloads: no credentials,
   tokens, PII, or card data in logs. Logs are an attack surface too.

## Violation report format

When auditing: severity (critical/high/medium/low), location
(`path:line`), the concrete risk, the remediation, and the evidence. No
fixes without authorization - audit first, report, then fix on approval.

## Escalate immediately

- Suspected secret in version history (rotation + history cleanup).
- Auth bypass of any depth, even "just in dev".
- Untrusted input reaching an interpreter of any kind.
