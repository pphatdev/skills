---
name: run
description: Load this skill when executing a defined task or workflow end to end - orchestrating steps, tools, and progress reporting until the acceptance criterion is met and verified.
user-invocable: true
metadata:
  internal: true
---

# Run

Category: Development (Engineering) - Orchestration

## Purpose

Execute a task end to end with visible, current progress and evidence at the
end - not just a claim of completion.

## Workflow

1. **State the contract.** Before the first action: restate the task in one
   or two sentences and name its acceptance criterion. If the task has a
   plan, follow it; do not improvise a better one mid-flight without saying
   so.
2. **Track with a todo list.** Multi-step work gets a todo list immediately,
   kept current: mark each item completed as it finishes and the next one
   in progress. Never batch status updates to the end - the list is the
   user's window into the work.
3. **Execute in order.**
   - Read before acting: never edit a file you have not read.
   - Make independent calls concurrently (allSettled semantics - gather
     all results, including failures); sequence only what depends on
     prior output.
   - Prefer steps that are idempotent and reversible.
   - Every command gets a timeout. Never leave servers, watchers, or
     long-running processes behind - stop them or hand the command to the
     user.
4. **Handle failures deliberately.** On error: read the actual error, name
   the cause, and choose - fix forward, retry once with the fix, or stop
   and report. Two failures of the same approach means the approach is
   wrong; change strategy or ask one concrete question.
5. **Report on completion.** What changed and why, what was verified and
   how (with the observed output), what remains, and assumptions you relied
   on but did not validate.

## Definition of done

- Acceptance criterion met and demonstrated with real output.
- Todo list accurate at the end - no stale pending items.
- Side-effecting steps (push, deploy, migration) done only with the
  authorization the user actually gave.

## Anti-patterns

- Announcing completion without execution evidence in hand.
- Hiding or softening a failure ("mostly worked").
- Running steps out of order because they were easier, when later steps
  depend on earlier ones.
