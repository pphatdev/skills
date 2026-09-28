---
name: research
description: Load this skill when the task requires gathering and verifying information - codebase investigation, external research, dependency evaluation, or fact-finding before design or planning work.
user-invocable: true
---

# Research

Category: Design (Product) - Information Gathering

## Purpose

Answer defined questions with verified evidence, in a form that can support
a decision.

## Workflow

1. **Define the questions.** Write down what you need to know and why - which
   decision each answer feeds. Research without a question list becomes
   trivia collection. Stop when the questions are answered.
2. **Map the sources.** For each question, identify the primary source before
   looking anywhere else:
   - How the code behaves -> the code and its tests, not blog posts.
   - How a library behaves -> its source, its official docs, its tests.
   - How the system behaves at runtime -> run it and observe.
   - External facts -> authoritative sources; cross-check anything
     load-bearing with a second, independent source.
3. **Gather with pointers.** Record every claim with a locator: `path:line`
   for code, URL for web, command + output for runtime observation. A claim
   without a locator is a hypothesis, not a finding.
4. **Verify.** Cross-check claims that a decision depends on. Label each
   finding as **fact** (observed, locatable), **inference** (your conclusion
   from facts), or **speculation** (unverified).
5. **Synthesize.** Answer each question directly, then note what remains
   unknown and whether the unknown blocks the decision.

## Output

- One answer per question, with evidence pointers.
- Confidence labels on every load-bearing claim.
- A list of open questions and whether they block the decision.

## Anti-patterns

- Answering from memory when the source is one read away - AI recall of API
  details is a hypothesis until checked against the actual source.
- Deep-diving into tangents that no question depends on.
- Presenting secondary sources (tutorials, forums) as ground truth for
  behavior that a primary source can settle.

## Escalate when

- A primary source is inaccessible or ambiguous - say so instead of
  guessing.
- Findings contradict the task's assumptions; surface the conflict before
  any work builds on them.
