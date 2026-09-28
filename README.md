# agent-workflows-engineering

A curated collection of skills for agent workflows, following the open
[Agent Skills](https://agentskills.io) `SKILL.md` format. The same 21
skills load natively in Mistral Vibe, Claude Code, Gemini CLI, Codex,
Cursor, and OpenCode - see [Multi-agent support](#multi-agent-support)
for how each agent is bridged.

## Structure

```
.
├── .agents/                 canonical skills - edit here
│   ├── skills/              workflow skills: how to do a thing
│   │   ├── design/          brainstorming, research, planning
│   │   ├── development/     run, debug, test
│   │   ├── testing/         unit-testing, integration-testing, end-to-end-testing
│   │   ├── documentation/   user-documentation, technical-documentation, api-documentation
│   │   └── rules/           coding-standards, security-standards, performance-standards
│   └── agents/              role skills: who does it
│       ├── agent-start/     startup contract for every session
│       ├── design/          design-agent
│       ├── development/     development-agent
│       ├── testing/         testing-agent
│       ├── documentation/   documentation-agent
│       └── rules/           governance-agent
├── .claude/skills/          generated mirror (Claude Code; Cursor and OpenCode read it too)
├── .gemini/skills/          generated mirror (Gemini CLI)
├── .codex/skills/           generated mirror (Codex)
├── .vibe/config.toml        Vibe skill_paths wiring
├── scripts/
│   ├── validate-skills.mjs     frontmatter and name validation (CI-ready)
│   └── sync-agent-skills.mjs   regenerates the mirrors (--check for CI)
└── README.md
```

Canonical skills live only under `.agents/`; the other dotted
directories are configuration (`.vibe/`) or generated output
(`.claude/`, `.gemini/`, `.codex/`) - never edited by hand.

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
5. Sync the agent mirrors: `node scripts/sync-agent-skills.mjs` - and
   commit the regenerated output.
6. Reload in your session with `/reload` (Vibe) or start a new session
   (other agents).

## Validation

```bash
node scripts/validate-skills.mjs              # checks .agents/
node scripts/validate-skills.mjs DIR           # checks another root
node scripts/sync-agent-skills.mjs --check     # mirrors must match source
```

Exit code 0 means every skill passes: name slug and directory match,
description length and YAML-safe values, no unknown frontmatter keys, no
reserved or duplicate names, and the agent mirrors are current. All of
this runs in CI - see [CI](#ci).

## Multi-agent support

Every agent discovers skills flat (`<dir>/<skill-name>/SKILL.md`, one
level), while this collection organizes canonical skills by category.
Each supported agent is bridged accordingly:

| Agent | Discovery path | How it is provided |
|---|---|---|
| Mistral Vibe | `skill_paths` in `.vibe/config.toml` | committed config, points at category dirs |
| Claude Code | `.claude/skills/` | generated mirror |
| Gemini CLI | `.gemini/skills/` | generated mirror (run `/trust` first) |
| Codex | `.codex/skills/` | generated mirror |
| Cursor | reads `.claude/skills/` | via Claude Code compatibility |
| OpenCode | reads `.claude/skills/` | via Claude Code compatibility |

Mirrors are generated, not edited: `scripts/sync-agent-skills.mjs` wipes
and rebuilds them from the canonical tree under `.agents/`, and
`--check` fails if they drift. Symlinks were considered and rejected:
they are unreliable in Windows git checkouts, and Claude Code is the only
agent documented to follow them.

### Why not `.agents/skills/` alone?

`.agents/skills/` is the cross-agent standard directory, so it is fair to
ask why the skills are mirrored at all. Two reasons:

1. **Claude Code does not read `.agents/`** - it only discovers skills in
   `.claude/skills/` (plus personal, plugin, and enterprise locations).
   At least one generated adapter is unavoidable for Claude Code support.
2. **The canonical tree is nested, every scanner is flat.** The agents
   that do read `.agents/skills/` scan it one level deep
   (`skills/*/SKILL.md`): Cursor, OpenCode, and Gemini all check for
   `design/SKILL.md` and stop there. This collection keeps skills at
   `.agents/skills/<category>/<skill>/SKILL.md` - two levels - so the
   standard directory is invisible to those scanners as-is. Vibe is the
   exception: its `skill_paths` config accepts arbitrary directories,
   which is how `.vibe/config.toml` bridges the categories without
   copies.

The alternative - flattening the canonical tree to
`.agents/skills/<skill-name>/` - would make Cursor, OpenCode, Gemini,
and Vibe work natively with no mirrors, leaving one mirror for Claude
Code only. It was not chosen because it costs the category grouping this
collection is organized around. If that trade becomes worth making, the
restructure is: flatten `.agents/skills/`, reduce the sync targets to
`.claude/skills/`, and update the validator and Vibe config.

Known caveat: Codex also scans `.agents/skills/` in repositories with
undocumented depth. If it scans recursively, Codex sees each skill twice
(same name and content - harmless, but noisy). If that happens, remove
`.codex/skills/` from the sync targets and rely on Codex's native scan.

### skills.sh support (`npx skills`)

The [skills.sh](https://skills.sh) CLI installs skills from a GitHub
repository into any of its supported agents:

```bash
npx skills add <owner>/agent-workflows-engineering --list      # list first
npx skills add <owner>/agent-workflows-engineering             # interactive
npx skills add <owner>/agent-workflows-engineering --skill debug -a claude-code -y
```

How this repo supports it:

- The canonical workflow skills under `.agents/skills/` are discovered
  natively: the CLI walks its discovery containers up to three levels
  deep, which covers the category layout.
- Generated mirrors are marked `metadata.internal: true` - the CLI's
  documented mechanism for hiding skills from discovery. Without it,
  every skill would be listed twice, because `.claude/skills/` is also
  a discovery container. Verified against the real CLI: 15 skills
  listed, no duplicates, no warnings.
- Frontmatter values must not contain `': '`: unquoted YAML scalars
  with a colon-space break strict parsers (the CLI skips such skills
  entirely). The validator rejects them.
- Publishing is pushing to GitHub - this repo has no remote yet. Once
  users install from it, the collection appears on the skills.sh
  leaderboard automatically via anonymous install telemetry.

Known scope: the six role skills under `.agents/agents/` are not
discoverable by the CLI, because `.agents/agents/` is not one of its
discovery containers - only the 15 workflow skills install via
skills.sh. To publish the role skills too, they would move under
`.agents/skills/agents/<name>/SKILL.md`.

## CI

`.github/workflows/skills.yml` runs on every pull request and push:

| Job | When | What it does |
|---|---|---|
| validate | PR + push | `validate-skills.mjs` - frontmatter, names, duplicates |
| check-mirrors | PR | `sync-agent-skills.mjs --check` - fails the PR if mirrors drifted; run the sync locally and push |
| discovery | PR + push | `npx skills add . --list` - the skills.sh CLI must find the collection with no parse errors |
| sync | push only | regenerates the mirrors and auto-commits any drift as `skills-sync[bot]` |

The sync job is the CD half: even if a change lands without running the
sync locally, the mirrors are regenerated and pushed automatically with
a `[skip ci]` commit.

## Using the collection in a project

Vibe discovers skills flat (`<dir>/<skill-name>/SKILL.md`, one level), so
this repo ships `.vibe/config.toml` listing every category directory in
`skill_paths`. Two ways to consume it:

- **This repo as the project**: trust the folder when prompted (Vibe only
  loads project-local `.vibe/config.toml` from trusted folders), then run
  `/reload`. The generated mirrors make the skills available in Claude
  Code, Gemini CLI, Codex, Cursor, and OpenCode with no setup.
- **Another project**: copy the `skill_paths` entries from this repo's
  `.vibe/config.toml` into your project's (adjusting the paths), or run
  `node scripts/sync-agent-skills.mjs` from a checkout of this repo and
  point your agent at the generated mirror directory of your choice.

Relative `skill_paths` entries resolve from the working directory where
Vibe runs.
