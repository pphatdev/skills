---
name: implementation
description: Load this skill when the user asks to implement a feature or change only, from an approved plan or a concrete request - no design phase, no test authoring, no documentation writing. Composes run, coding-standards, security-standards, and debug.
user-invocable: true
---

# Implementation

Category: Development (Engineering) - Orchestration

## Purpose

Turn an approved plan or concrete request into working code - and stop
there. This skill routes to the development-phase skills; it does not
design, author test suites, or write documentation.

## Request validation (do this first)

Before any work, verify the request is valid. A valid request:

1. States what to implement concretely - a plan, a spec, or a clear
   description of the change. "Make it better" is not implementable.
2. Has a defined target - the files, module, or feature to change, or a
   target that can be found by reading the codebase.
3. Contains no unresolved design decisions. If the how is genuinely
   open, the request is not ready for implementation.

If any check fails, stop and return an error message to the user naming
exactly what is missing or invalid. If design work is needed first, say
so and point at the `design` skill (or `full` for complete tasks).

## When a composed skill is missing

If a skill this one needs is not available - the load fails or it is
absent from the session's skill list - do not improvise or continue
without it. Ask the user to install the skill, then retry, for example:

    npx skills add <owner>/agent-workflows-engineering --skill <name> -a <agent> -y

or copy the skill folder into the agent's skills directory (see the
README's Installation section), and reload the session.

## Workflow

1. **Read before editing.** Load `coding-standards` and read the target
   files, their callers, and their tests end to end. Confirm language
   and framework from the code, not from the request's phrasing.
2. **Execute the change.** Load `run` to orchestrate the steps with
   progress reporting. Keep the diff minimal - change only what the
   request requires.
3. **Guard the sensitive paths.** Load `security-standards` when the
   change touches authentication, authorization, input handling,
   secrets, permissions, dependencies, or anything exposed to untrusted
   input.
4. **Verify the change runs.** Execute the code and read the output -
   never claim working without observing a run. If a defect appears,
   load `debug` and fix the root cause minimally.
5. **Report.** What changed and why, how it was verified, and any edge
   cases or open questions. Explicitly note that test authoring and
   documentation were out of scope.

## Output

- Working code with a minimal diff, verified by an observed run, plus an
  honest report.

## Anti-patterns

- Authoring test suites or documentation - those are the `test`,
  `documentation`, and `full` skills' scope; verifying by running is in
  scope, writing the tests is not.
- Expanding the diff beyond the request - unasked refactors make the
  change unreviewable.

## Escalate when

- The change requires a blast-radius action (migration, deploy, publish,
  destructive operation) - get explicit approval first.
- The code contradicts the plan's assumptions - surface the conflict
  before implementing around it.
