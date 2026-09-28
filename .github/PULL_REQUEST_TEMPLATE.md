## What does this change?

<!-- One or two sentences: the problem and the fix or feature. -->

## Which skills or scripts are affected?

<!-- e.g. .agents/skills/debug/SKILL.md, scripts/validate-skills.ts -->

## Checklist

- [ ] Skills edited under `.agents/` only
- [ ] `node scripts/validate-skills.ts` passes with 0 errors
- [ ] No reserved or duplicate skill names introduced (`vibe`, `worktree`, `skill-creator`, `create-plugin`, `code-review`, `find-skills` are reserved)
- [ ] Frontmatter descriptions contain no `': '` (breaks strict YAML parsers)
- [ ] Commits follow the conventional-commit style used in this repo (`feat:`, `fix:`, `docs:`, `chore:`)
