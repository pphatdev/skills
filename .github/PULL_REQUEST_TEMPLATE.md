## What does this change?

<!-- One or two sentences: the problem and the fix or feature. -->

## Which skills or scripts are affected?

<!-- e.g. .agents/skills/development/debug/SKILL.md, scripts/sync-agent-skills.mjs -->

## Checklist

- [ ] Canonical skills edited under `.agents/` only - mirrors (`.claude/`, `.gemini/`, `.codex/`) are generated, never edited by hand
- [ ] `node scripts/validate-skills.ts` passes with 0 errors
- [ ] `node scripts/sync-agent-skills.mjs` run and the regenerated mirrors are included in this PR
- [ ] `node scripts/sync-agent-skills.mjs --check` passes
- [ ] No reserved or duplicate skill names introduced (`vibe`, `worktree`, `skill-creator`, `create-plugin`, `code-review`, `find-skills` are reserved)
- [ ] Frontmatter descriptions contain no `': '` (breaks strict YAML parsers)
- [ ] Commits follow the conventional-commit style used in this repo (`feat:`, `fix:`, `docs:`, `chore:`)
