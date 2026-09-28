---
name: integration-testing
description: Load this skill when verifying that components work together - contracts, module boundaries, data flow across seams, and interactions with real dependencies.
user-invocable: true
metadata:
  internal: true
---

# Integration Testing

Category: Testing (Quality Assurance) - Verification

## Purpose

Verify the seams: that components honor their contracts when connected, and
that data survives crossing boundaries between them.

## What to test at this level

1. **Contracts.** Every interface between two modules you own: request and
   response shapes, serialization round-trips, error codes and their
   meanings. If a contract is published (API, schema, event), test against
   the published form, not against whatever the current code happens to
   emit.
2. **Boundaries with infrastructure.** Database queries against a real
   engine (in-memory variants or containers - never a hand-rolled fake for
   the query layer), cache behavior, message queues, file I/O.
3. **Data flow.** Data written by one component and read by another:
   migrations applied, migrations rolled forward from realistic old state,
   defaults, null handling, timezone and encoding survival.

## Standards

- **Real dependencies where feasible.** Fake only what is slow, costly, or
  truly external (third-party APIs). A hand-written fake of your own query
  layer validates the fake, not the SQL.
- **Isolated state.** Each test creates its own data and cleans up after
  itself. No test may depend on data another test left behind; the suite
  must pass in any order and in parallel where the runner supports it.
- **Assert observable outcomes.** Status codes, persisted state, emitted
  events - not the number of times an internal method was called.
- **Boundary conditions per seam:** empty payload, malformed payload,
  unauthorized caller, timeout, and partial failure where the protocol
  allows it.

## Anti-patterns

- An "integration test" that mocks every dependency - that is a unit test
  wearing a costume.
- One giant fixture shared by unrelated tests: a change for one test
  silently changes ten others.
- Testing internal call order between your own components - that couples
  the suite to the implementation and breaks every refactor.

## Review gate

If a seam-breaking change (new field required, renamed event, changed
status code) does not fail at least one integration test, the integration
suite has a hole at that seam.
