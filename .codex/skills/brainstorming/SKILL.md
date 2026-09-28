---
name: brainstorming
description: Load this skill when the task needs idea generation and exploration - feature ideation, solution options, or concept work - before any direction is chosen. Also load when a design decision has more than one viable path and the trade-offs are not obvious.
user-invocable: true
metadata:
  internal: true
---

# Brainstorming

Category: Design (Product) - Ideation

## Purpose

Explore the solution space before committing to a direction, so the chosen
direction is a decision rather than a default.

## Preconditions

Do not start without a written problem statement covering: the problem, the
constraints (technical, timeline, scope), the invariants that must hold, and
the non-goals. If any are missing, produce them first or ask for them.

## Workflow

1. **Frame.** Restate the problem in one sentence. List constraints and
   non-goals explicitly. Name the success criterion that will judge any
   option.
2. **Diverge.** Produce at least three candidates that differ in kind (not
   variations of one idea). Useful axes: build vs. buy vs. defer; change the
   data model vs. add a layer; simple now vs. general later. Do not evaluate
   while generating.
3. **Evaluate.** Score every option against the same criteria: effort,
   risk, reversibility (cheap to undo?), blast radius (what else must
   change?), and fit with the constraints. Reject options by stating which
   constraint they violate.
4. **Converge.** Recommend one option with an honest trade-off statement:
   what you give up, and what future fact would change the recommendation.

## Output

- Options table: option / how it works / effort / risk / reversibility.
- A recommendation with trade-offs and its kill criteria.
- Open questions that block a final decision, if any.

## Anti-patterns

- A "brainstorm" with one pre-chosen answer - skip the theater and decide.
- Unlimited exploration. Timebox it; a good-enough option today beats a
  perfect one next quarter.
- Relaxing a constraint silently to make an option fit. If constraints
  eliminate every option, report the conflict to the user.

## Escalate when

- The options require information you do not have (load the `research`
  skill, or ask).
- The decision is irreversible or affects systems you do not own.
