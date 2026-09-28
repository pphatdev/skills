---
name: agent-start
description: Load this skill at the beginning of any new task, session, or conversation, before other work. Defines the standard startup contract - orient, establish the instruction baseline, confirm the goal, plan, and start with a definition of done.
user-invocable: true
---

# Agent Start

The startup contract for every session. Run it before any task work; other
skills are loaded on top of this baseline. Goal: understand where you are,
understand what applies, understand what is being asked - then act.

## Phase 1 - Orient

1. **Confirm location.** Working directory, project name, branch or
   revision if a repo. If it is not the expected project, stop and say so.
2. **Map the structure.** List the repository layout (skip `node_modules`,
   `.git`, build output). Identify language, framework, package manager,
   and test runner from actual files - never from the task's phrasing.
   "Update the API" means nothing until you know it is Express, FastAPI,
   or gRPC.
3. **Read the instruction baseline.** Every `AGENTS.md` on the path from
   the task directory to the repo root; closer files win on conflict.
   Record the constraints that affect the task (test commands, style
   rules, forbidden areas). If none exist, note it - do not invent rules.
4. **Find the verification path.** Entry point, config, test setup: how
   this project runs and how changes are proven. If you cannot say how you
   would verify a change here, you are not ready to make one.
5. **Inventory the tool surface.** Know which tools and connectors are
   available before planning; a plan that assumes unavailable tools fails
   at step one.

Read with a budget: what the task touches, its callers, its tests, the
instruction files. Not the entire repository - orientation is not
tourism.

## Phase 2 - Confirm the request

1. **Restate the task** in one or two sentences with its acceptance
   criterion. If you cannot, the request is not ready - resolve the
   ambiguity before continuing.
2. **Read the named surface end to end** before any edit: the file(s) the
   task names or implies, their callers, and the tests that exercise them.
   Skipping this is how implementations fail to integrate.
3. **Check assumptions against reality** with the tools available; ask the
   user one concrete question only when the answer materially changes the
   result and cannot be discovered.

## Phase 3 - Plan

1. **State intent.** What you understood the task to require and what you
   intend to do - one to three sentences, or a numbered plan for
   multi-step work. Let the user see the interpretation before it costs
   anything.
2. **Track.** Multi-step work gets a todo list immediately, kept current:
   each item completed as it finishes, the next marked in progress. The
   list is never batched at the end.
3. **Flag blast radius up front.** Steps that push, deploy, migrate,
   publish, or delete get named in the plan with their blast radius - so
   approval happens before, not after.

## Phase 4 - Start work

1. Begin with the smallest change that produces a verifiable result.
2. Signal phase transitions briefly ("Codebase read. Starting on the auth
   update.") - not a narration of every action.
3. Verify against the acceptance criterion by executing something real:
   run the tests, run the code, read the output. A change is done when
   the criterion is met and observed - never when the edit lands.
4. Close by reporting: what changed and why, what was verified and how,
   what remains, and assumptions relied on but not validated.

## Failure mode

If orientation reveals the task is not actionable - wrong repo, missing
file, contradictory instructions, unavailable tools - stop and report:
what succeeded, what failed, what the user must provide. Guessing through
a blocker converts a small problem into a wrong implementation.
