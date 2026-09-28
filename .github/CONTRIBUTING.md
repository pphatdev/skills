# Contributing

Thanks for contributing. The conventions below keep the collection
loadable in every supported agent; the README covers the background.

## Adding or changing a skill

1. Edit the canonical skill under `.agents/` only - there are no
   mirrors or generated copies anywhere in the repo.
2. Follow the house format: unquoted frontmatter with `name` and
   `description`, directory name equal to `name`, a body structured as
   purpose, workflow, standards or output, anti-patterns, escalation.
3. Frontmatter values must not contain `': '` - unquoted YAML scalars
   with a colon-space break strict parsers and the skill gets skipped
   by skills.sh and any strict consumer.
4. Validate and commit:

   ```bash
   node scripts/validate-skills.ts
   ```

5. CI runs validation plus a skills.sh discovery smoke test.

## Commits and PRs

- Conventional-commit subjects: `feat:`, `fix:`, `docs:`, `chore:`,
  with a scope where it helps (`feat(skills):`, `feat(tooling):`).
- One feature per commit; the body explains the why, not the what.
- The PR template checklist is the review gate - CI enforces most of it.

## Reporting problems

Open an issue with the template that fits - a bug report for anything
wrong in a skill or script, a skill request for a new capability. Include
the agent you were using; skills behave slightly differently across
agents and that context shortcuts the diagnosis.
