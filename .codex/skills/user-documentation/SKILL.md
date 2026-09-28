---
name: user-documentation
description: Load this skill when writing documentation for end users - guides, how-tos, onboarding, and task-oriented help content. Also load when reviewing existing user-facing docs for accuracy or structure.
user-invocable: true
metadata:
  internal: true
---

# User Documentation

Category: Documentation (Content)

## Purpose

Help end users accomplish a task with the product - written from their
goal, not from the product's feature list.

## Before writing

Define, in writing: who the reader is, what they are trying to accomplish,
and what they can be assumed to already know. Every structural decision
follows from these three answers. If you cannot name the reader's task, you
are writing a feature tour, not documentation.

## Structure per procedure

1. **Goal.** One sentence: what the user will have achieved at the end.
2. **Prerequisites.** Access, versions, data - only what genuinely blocks
   the task.
3. **Steps.** Numbered, one action per step, each with the expected
   observable result ("you should now see X"). Users diagnose themselves by
   comparing their screen to the expected result.
4. **Verification.** How the user confirms success.
5. **Troubleshooting.** The two or three most common failure points and
   their fixes - sourced from real support volume where available.

## Standards

- **Plain language.** Define every term the reader cannot be assumed to
  know, on first use. No internal jargon, no codenames, no future tense for
  shipped features.
- **Validated by execution.** Every procedure is performed against the real
  product before publishing. Documentation that references a button that
  no longer exists is worse than no documentation - it teaches users the
  product is unreliable.
- **Copy-paste-able examples.** Real values in examples, correctly
  formatted, runnable as written.
- **Versioned.** State which product version the doc targets. Flag
  version-specific steps.

## Anti-patterns

- Organizing by feature instead of by task (users have goals, not feature
  itineraries).
- Screenshots of text that will rot with the next UI change - use text plus
  one current screenshot only where visual orientation genuinely helps.
- Documenting workarounds as if they were the intended flow.

## Maintenance rule

When the product changes a documented flow, the doc changes in the same
change - stale user docs are treated as a bug.
