---
name: formatting-init
description: Load this skill when setting up a project's formatting preferences for the first time, or when the user asks to initialize or re-run formatting setup - it asks about tab size, indentation style, line endings, languages, and comment style, then writes the answers into .editorconfig.
user-invocable: true
---

# Formatting Init

Category: Rules (Development)

## Purpose

Turn the user's formatting preferences into machine-readable config in
one pass. The output of this skill is what `code-formatting` treats as
its highest precedence source - so init runs once per project, and the
answers stop being opinions and become rules.

## Workflow

1. **Read before asking.** Check for an existing `.editorconfig`,
   formatter config, or `AGENTS.md` style section. Existing explicit
   settings are confirmed, not re-asked; init only fills the gaps.
2. **Ask one question at a time** and wait for each answer before the
   next. Never send a batch of questions in one message.
3. **Offer a default with every question** so the user can answer in
   one word. Defaults come from the `code-formatting` skill.
4. **Write the config** (see Output) the moment the answers are
   complete.
5. **Report what was written**, where, and what each setting changes
   about future formatting runs.

## Questions

Ask in this order, skipping any the existing config already answers:

1. **Indent style** - spaces or tabs? (default: spaces)
2. **Tab size** - how wide is one indent level? (default: 4; the
   `code-formatting` default when the repo is silent)
3. **Line endings** - `lf` or `crlf`? (default: `lf`; on a Windows-only
   team, confirm rather than default)
4. **Final newline** - insert a trailing newline at EOF? (default: yes)
5. **Languages in the project** - which file types need per-language
   overrides (e.g. YAML at 2 spaces, Python at 4, JSON at 2)?
6. **Comment blocks** - use the standard comment pattern from
   `code-formatting`, and does the team want the `@author` tag in
   every block or is authorship left to version control?
   (default: pattern on, `@author` optional)
7. **Formatter** - is there a repo formatter to run
   (`prettier`, `black`, `gofmt`, ...) or should formatting stay
   editor/enforcement-based only? (default: whatever exists; none is
   created unasked)

## Output

Write the answers to `.editorconfig` at the project root - the file
every editor and the `code-formatting` skill already respect. Shape:

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{yml,yaml,json}]
indent_size = 2

[*.py]
indent_size = 4
```

- Include only what was asked or defaulted; commented-out settings are
  noise.
- Comment-block and formatter answers do not belong in `.editorconfig`
  - record them in the project's `AGENTS.md` style section (or create
  one) so both agents and humans read the same rules.
- If a repo formatter already exists (`prettier`, etc.), its config is
  the real source of truth: `.editorconfig` must not contradict it.

## Anti-patterns

- Asking several questions in one message, or asking without defaults.
- Writing settings the user never confirmed or that contradict an
  existing formatter config.
- Creating a formatter config (`prettierrc`, `pyproject.toml` tooling)
  when the user only asked about style preferences.
- Re-running init and silently changing settings that were already
  explicit - init proposes, the user confirms.

## Escalation

- An existing config contradicts the user's fresh answer: surface the
  conflict and let the user pick which one changes.
- The project has no directory yet (greenfield): ask where the root
  is; default to the current working directory.
- The team uses generator-owned files (build output, vendored code):
  add them to a ignore/exclude list rather than formatting them.
