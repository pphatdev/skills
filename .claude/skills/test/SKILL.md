---
name: test
description: Load this skill when verifying that code works - deriving test cases from acceptance criteria, choosing the right test level, running the tests, and reporting results honestly, including what is not covered.
user-invocable: true
---

# Test

Category: Development (Engineering) - Verification

## Purpose

Prove behavior with tests derived from the requirements, and report what
the proof actually covers - and what it does not.

## Workflow

1. **Derive cases from the acceptance criterion.** For each criterion: the
   happy path, the boundary values (empty, zero, one, max, off-by-one), the
   error paths (invalid, unauthorized, missing, malformed), and the
   interactions with adjacent behavior. Tests derived from the
   implementation only prove the implementation agrees with itself.
2. **Choose the cheapest sufficient level:**

   | Behavior to verify | Level |
   |---|---|
   | Pure logic, one unit of behavior | Unit |
   | Contract between two components | Integration |
   | Complete user journey, real stack | End-to-end |

   Keep the pyramid shape: many unit, fewer integration, few end-to-end.
   When in doubt, drop one level lower - the lower level is faster and
   pinpoints failures better.
3. **Write the test first where practical.** For a bug fix, the failing
   test comes before the fix. For new behavior, a test that expresses the
   acceptance criterion is a executable specification.
4. **Run and read the output.** Never claim a pass you did not observe. A
   green checkmark you did not read is not a result. Check stderr as well
   as stdout; exit codes as well as logs.
5. **Report honestly.** Pass, fail, and what is not covered. Coverage is a
   lens for finding untested behavior, not a goal to inflate. State
   explicitly which acceptance criteria have no test.

## Standards

- A test verifies one behavior; its name states that behavior.
- Tests are deterministic: no sleep-based waits, no random without a seed,
  no order dependence.
- Assert on observable outcomes, not internal call sequences - tests
  coupled to "how" break on every refactor.

## Anti-patterns

- Deleting, skipping, or weakening a test to get a green run - a red test
  is information; destroying it destroys the information.
- Asserting against mock call orders (verifies the mock, not the code).
- Treating a passing suite as proof of the absence of bugs - it is proof of
  the presence of the tested behaviors only.
