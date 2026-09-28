---
name: e2e
description: Load this skill when the user asks for end-to-end tests only - verifying complete user journeys through the real stack. Composes end-to-end-testing. For unit or integration test writing use the test skill instead; for complete tasks use the full skill.
user-invocable: true
---

# E2E

Category: Testing (Quality Assurance) - Orchestration

## Purpose

Write and run end-to-end tests for a request - and stop there. This
skill routes to `end-to-end-testing` for the deep guidance; it does not
design, implement, or write lower-level tests.

## Request validation (do this first)

Before any work, verify the request is valid. A valid request:

1. Names the user journey to verify - a concrete flow through the real
   stack, not a single function or contract.
2. Has an existing, working feature to test. If the feature is not
   implemented, end-to-end tests cannot exist yet - return that as the
   error instead of writing tests against a broken path.
3. Has a real stack that can be exercised - the journey must be
   reachable in this environment, or the gap must be stated up front.

If any check fails, stop and return an error message to the user naming
exactly what is missing or invalid. Do not write placeholder or
permanently-skipped tests to get past a blocker.

If the request asks for unit or integration tests, the `test` skill owns
it. If it asks for a complete task including e2e, the `full` skill owns
it.

## When a composed skill is missing

If a skill this one needs is not available - the load fails or it is
absent from the session's skill list - do not improvise or continue
without it. Ask the user to install the skill, then retry, for example:

    npx skills add <owner>/agent-workflows-engineering --skill <name> -a <agent> -y

or copy the skill folder into the agent's skills directory (see the
README's Installation section), and reload the session.

## Workflow

1. **Load `end-to-end-testing`** and follow its journey-selection,
   determinism, wait-strategy, and flakiness guidance fully - it is the
   authority for this level.
2. **Select only the critical journeys** - the ones whose failure costs
   the user. End-to-end is the most expensive level; a request earns at
   most a handful of these tests.
3. **Make every run deterministic** - per-run data, condition-based
   waits, no shared state, independent journeys.
4. **Run them and read the output.** Never claim a pass that was not
   observed. A flaky test is a defect to fix, not a race to re-run.
5. **Report honestly** - journeys covered, results observed, and the
   gaps: what only unit or integration tests can cover.

## Output

- End-to-end tests for the named journeys, with observed results and a
  coverage report including what is not covered and why.

## Anti-patterns

- Padding the suite with journeys unit tests already cover - push those
  down a level and say so.
- Fixed sleeps instead of condition waits - a flake scheduled in advance.
- Asserting pixels or intermediates instead of the outcome the user came
  for.

## Escalate when

- The real stack is not reachable in this environment - state exactly
  what is missing before writing any test.
- A journey cannot be made deterministic - report it as a system defect
  per the flakiness protocol, never quarantine silently.
