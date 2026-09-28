# agent-workflows-engineering

A curated collection of skills for agent workflows, following the open
[Agent Skills](https://agentskills.io) `SKILL.md` format. The same 21
skills live in one place - the cross-agent standard `.agents/skills/`
directory (plus `.agents/agents/` for role skills) - and load natively
in Mistral Vibe, Gemini CLI, Codex, Cursor, and OpenCode - see
[Multi-agent support](#multi-agent-support) for how each agent is
bridged.

## Structure

```
.
├── .agents/                 canonical skills - edit here
│   ├── skills/              workflow skills: how to do a thing (flat, one level)
│   │   ├── brainstorming/   design: brainstorming, research, planning
│   │   ├── debug/           development: run, debug, test
│   │   └── ...              one directory per skill, 15 in total
│   └── agents/              role skills: who does it
│       ├── agent-start/     startup contract for every session
│       ├── design/          design-agent
│       ├── development/     development-agent
│       ├── testing/         testing-agent
│       ├── documentation/   documentation-agent
│       └── rules/          governance-agent
├── .vibe/config.toml        Vibe skill_paths wiring
├── .github/
│   ├── workflows/skills.yml     CI: validate, discovery
│   ├── CONTRIBUTING.md         how to add a skill
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── ISSUE_TEMPLATE/          bug report, skill request
│   └── CODEOWNERS
├── scripts/
│   └── validate-skills.ts     frontmatter and name validation (CI-ready)
└── README.md
```

Canonical skills live only under `.agents/`; the only other dotted
directory is configuration (`.vibe/`). There are no mirrors or generated
copies - the flat layout under `.agents/skills/` is what every scanner
reads directly.

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

1. Create `.agents/skills/<skill-name>/SKILL.md` with valid frontmatter.
2. Validate: `node scripts/validate-skills.ts` - must exit 0.
3. Reload in your session with `/reload` (Vibe) or start a new session
   (other agents).

## Validation

```bash
node scripts/validate-skills.ts              # checks .agents/
node scripts/validate-skills.ts DIR           # checks another root
```

Exit code 0 means every skill passes: name slug and directory match,
description length and YAML-safe values, no unknown frontmatter keys, no
reserved or duplicate names. All of this runs in CI - see [CI](#ci).

## Multi-agent support

Every agent discovers skills flat (`<dir>/<skill-name>/SKILL.md`, one
level), and that is exactly the layout under `.agents/skills/`. Each
supported agent is bridged accordingly:

| Agent | Discovery path | How it is provided |
|---|---|---|
| Mistral Vibe | `skill_paths` in `.vibe/config.toml` | committed config, points at `.agents/skills/` and the role-skill categories |
| Gemini CLI | `.agents/skills/` | native (run `/trust` first) |
| Cursor | `.agents/skills/` | native |
| OpenCode | `.agents/skills/` | native |
| Codex | `.agents/skills/` | native scan (undocumented depth) |
| Claude Code | `.claude/skills/` | not discovered in this repo - install via skills.sh or copy manually |

The collection previously mirrored `.agents/` into `.claude/skills/`,
`.gemini/skills/`, and `.codex/skills/` generated directories. Those
mirrors were removed in favor of the flat canonical layout: one source
of truth, no generated output, no sync script. The trade-off is
documented above - Claude Code does not read `.agents/`, so it needs a
one-time install (see [Installation](#installation)) instead of native
discovery.

The six role skills stay under `.agents/agents/<category>/<name>/`
because Vibe's `skill_paths` config reaches them directly; flat scanners
do not scan `.agents/agents/`, so they are not duplicated there.

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
  natively: the CLI walks its discovery containers, and the flat
  `<skill-name>/SKILL.md` layout matches what it scans for.
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
| validate | PR + push | `validate-skills.ts` - frontmatter, names, duplicates |
| discovery | PR + push | `npx skills add . --list` - the skills.sh CLI must find the collection with no parse errors |

## Installation

Three ways to get the skills, depending on where you start.

### 1. Working inside this repository - zero install

Every agent discovers the skills automatically:

| Agent | Setup |
|---|---|
| Gemini CLI | run `/trust` once - reads `.agents/skills/` |
| Cursor, OpenCode | none - they read `.agents/skills/` on session start |
| Codex | none - it scans `.agents/skills/` |
| Mistral Vibe | trust the folder when prompted, then `/reload` - `skill_paths` is already wired |
| Claude Code | not auto-discovered - use option 2 or 3 below to install into `.claude/skills/` |

### 2. Into another project - via skills.sh (recommended)

```bash
npx skills add <owner>/agent-workflows-engineering --list     # preview
npx skills add <owner>/agent-workflows-engineering            # interactive: pick skills and agents
npx skills add <owner>/agent-workflows-engineering --all      # all skills, all detected agents
npx skills add <owner>/agent-workflows-engineering --skill debug --skill planning -a claude-code -y
npx skills add <owner>/agent-workflows-engineering -g         # global (~) instead of project
```

The CLI detects your installed agents and installs into each one's
skills directory. Add `--copy` where symlinks are unreliable (for
example Windows without developer mode). A local checkout works the
same way, before any GitHub push:

```bash
npx skills add /path/to/agent-workflows-engineering --list
```

The 15 workflow skills install this way; the six role skills are not
discoverable by the CLI - see
[skills.sh support](#skillssh-support-npx-skills).

### 3. Manual - no tooling

Each skill is a self-contained folder; copy it into your agent's
skills directory:

```
.agents/skills/<skill-name>/  ->  <agent-skills-dir>/<skill-name>/
```

| Agent | Skills directory |
|---|---|
| Claude Code | `.claude/skills/` (project) or `~/.claude/skills/` (global) |
| Gemini CLI | `.gemini/skills/` or `~/.gemini/skills/` |
| Cursor | `.cursor/skills/` (also reads `.claude/skills/`) |
| Codex | `.codex/skills/` or `~/.codex/skills/` |
| OpenCode | `.agents/skills/` (also reads `.claude/skills/`) |
| Mistral Vibe | `.agents/skills/`, `.vibe/skills/`, or `skill_paths` in config |

For Vibe in another project, copy the `skill_paths` entries from this
repo's `.vibe/config.toml` into your project's config, adjusting the
paths - relative entries resolve from the directory where Vibe runs.

### Maintenance after install

```bash
npx skills update          # pull the latest versions
npx skills list            # see what is installed
npx skills remove <name>   # uninstall
```
