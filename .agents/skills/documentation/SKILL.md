---
name: documentation
description: Load this skill when the user asks for documentation only - guides, how-tos, technical docs, or API reference for existing behavior. Composes user-documentation, technical-documentation, and api-documentation. Do not load it when code changes or tests are also requested; the full skill owns complete tasks.
user-invocable: true
---

# Documentation

Category: Documentation (Content) - Orchestration

## Purpose

Write the documentation a request asks for - and nothing else. This skill
routes to the documentation-phase skills by audience; it does not change
code or author tests.

## Request validation (do this first)

Before any work, verify the request is valid. A valid request:

1. Names a concrete subject to document - a feature, module, workflow, or
   API that exists (or is specified precisely enough to document).
2. Implies an audience - end users, engineers, or API consumers - or the
   audience can be inferred unambiguously from the subject.
3. Asks for documentation only - no code changes, no tests.

If any check fails, stop and return an error message to the user naming
exactly what is missing or invalid. If the subject does not exist yet,
say so - documenting fiction is worse than no docs.

If the request also asks for design, implementation, or tests, it is a
complete task - the `full` skill owns it, not this one.

## When a composed skill is missing

If a skill this one needs is not available - the load fails or it is
absent from the session's skill list - do not improvise or continue
without it. Ask the user to install the skill, then retry, for example:

    npx skills add <owner>/agent-workflows-engineering --skill <name> -a <agent> -y

or copy the skill folder into the agent's skills directory (see the
README's Installation section), and reload the session.

## Workflow

1. **Route by audience:**
   - End users doing tasks - load `user-documentation`.
   - Engineers building on or maintaining the system - load
     `technical-documentation`.
   - Consumers of an interface (endpoints, schemas, events) - load
     `api-documentation`.
   Mixed-audience requests compose more than one.
2. **Verify against reality.** Read the code or behavior the docs
   describe before writing; every procedure in the docs must be one that
   works as written. Unverifiable claims are flagged, not asserted.
3. **Write in the loaded skill's format** - task-oriented for users,
   rationale-inclusive for engineers, schema-complete for APIs.
4. **Report.** What was written, where, which audience it serves, and any
   behavior that could not be verified from the code.

## Output

- Documentation whose subject, audience, and procedures are validated,
  plus a report of unverifiable claims.

## Anti-patterns

- Documenting intended behavior that the code does not implement - docs
  synced with code, or marked as unverified.
- One document for every audience at once - each audience gets its own
  entry point.
- Writing code to "fix" what the docs describe - out of scope; report the
  mismatch instead.

## Escalate when

- The subject's behavior cannot be determined from code or access -
  state the gap to the user rather than inventing semantics.
