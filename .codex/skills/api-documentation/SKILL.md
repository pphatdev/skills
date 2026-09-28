---
name: api-documentation
description: Load this skill when documenting an API - endpoints, parameters, schemas, examples, error catalogs, auth, versioning, and deprecation policy.
user-invocable: true
metadata:
  internal: true
---

# API Documentation

Category: Documentation (Content)

## Purpose

Document the API contract completely enough that a consumer can integrate
without reading the implementation or asking the author.

## Per-endpoint contract

Every endpoint documents, without exception:

1. **Purpose** - one sentence: what it does and when to use it.
2. **Method and path**, with path parameters typed.
3. **Authentication** - which scheme, which scopes/roles apply, and what
   happens without them.
4. **Rate limits and quotas**, if any.
5. **Parameters** - name, type, required/default, constraints (format,
   range, max length), and a realistic example value.
6. **Request and response schemas** - field-by-field, with types, and one
   complete example request and response per content type.
7. **Error catalog** - every error code the endpoint can return: what
   triggered it and how the client should remediate. The error section is
   as important as the success section; most integration pain lives here.

## Collection-level standards

- **Consistency.** Same conventions everywhere: pagination, filtering,
  error envelope, timestamp format, casing. Consumers should learn the API
  once, not per endpoint.
- **Machine-readable source of truth.** Where the stack allows, generate
  the reference from an OpenAPI/GraphQL schema (or generate the schema
  from code) - hand-maintained reference docs drift. Prose guides layer on
  top of the generated reference; they do not duplicate it.
- **Examples are contracts.** Every example must be runnable as written -
  valid, complete, and copy-paste-able. An example that fails teaches the
  consumer the API is broken.
- **Versioning and deprecation.** State the versioning scheme, what counts
  as a breaking change, the deprecation notice period, and the changelog
  location. Deprecations appear in the changelog and on the affected
  endpoints, with the removal date and the replacement.

## Anti-patterns

- Documenting only the happy path.
- "See the code for details" as a substitute for the contract.
- Response schemas that omit fields the endpoint actually returns -
  consumers build on the documented shape and break on the real one.

## Review gate

A consumer with only the docs (no source access, no author contact) can
make their first successful call and correctly handle a validation error.
