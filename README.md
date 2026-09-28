# agent-workflows-engineering

A curated collection of skills for agent workflows, authored for the
[Mistral Vibe](https://docs.mistral.ai/vibe/code/overview) CLI (and any
agent that reads the Agent Skills `SKILL.md` format).

## Structure

```
.agents/
├── skills/                  workflow skills: how to do a thing
│   ├── design/              brainstorming, research, planning
│   ├── development/         run, debug, test
│   ├── testing/             unit-testing, integration-testing, end-to-end-testing
│   ├── documentation/       user-documentation, technical-documentation, api-documentation
│   └── rules/               coding-standards, security-standards, performance-standards
└── agents/                  agent role skills: who does it
    ├── agent-start/         startup contract for every session
    ├── design/design-agent/
    ├── development/development-agent/
    ├── testing/testing-agent/
    ├── documentation/documentation-agent/
    └── rules/governance-agent/
```

Workflow skills define *how* to do a kind of work (debug, plan, test). Role
skills define *how an agent operates* in a domain and compose the workflow
skills for that domain.

## Skill format

Each skill is one directory containing a `SKILL.md` with YAML frontmatter:

```markdown
---
name: my-skill
description: Load this skill when ... (routing text the model sees first)
user-invocable: true
---

# My Skill

Instructions, workflow, standards, anti-patterns, escalation criteria.
```

Conventions this repo enforces:

- Names are lowercase kebab-case, `^[a-z0-9]+(-[a-z0-9]+)*$`, 1-64 chars,
  and the directory name must equal the frontmatter `name`.
- Never reuse a built-in Vibe skill name (`vibe`, `worktree`,
  `skill-creator`, `create-plugin`, `code-review`, `find-skills`) - the
  collision is silently skipped at load time.
- `description` is 1-1024 chars and states *when to load* - it is the only
  text the model sees before selecting the skill.
- Body follows the house template: purpose, workflow, output or standards,
  anti-patterns, escalation criteria.
- Support files live in the same directory, referenced by relative path.

## Adding a skill

1. Pick the category directory (or create one only when a real task demands
   it - do not add categories speculatively).
2. Create `<category>/<skill-name>/SKILL.md` with valid frontmatter.
3. If the category is new, add it to `skill_paths` in `.vibe/config.toml`.
4. Validate: `node scripts/validate-skills.mjs` - must exit 0.
5. Reload in your session with `/reload`.

## Validation

```bash
node scripts/validate-skills.mjs        # checks .agents/
node scripts/validate-skills.mjs DIR    # checks another root
```

Exit code 0 means every skill passes: name slug and directory match,
description length, no unknown frontmatter keys, no reserved or duplicate
names. Wire it into CI as a blocking step.

## Using the collection in a project

Vibe discovers skills flat (`<dir>/<skill-name>/SKILL.md`, one level), so
this repo ships `.vibe/config.toml` listing every category directory in
`skill_paths`. Two ways to consume it:

- **This repo as the project**: trust the folder when prompted (Vibe only
  loads project-local `.vibe/config.toml` from trusted folders), then run
  `/reload`.
- **Another project**: copy the `skill_paths` entries from this repo's
  `.vibe/config.toml` into your project's (adjusting the paths), or
  copy/symlink the skill directories into your project's
  `.agents/skills/`.

Relative `skill_paths` entries resolve from the working directory where
Vibe runs.
