---
name: code-formatting
description: Load this skill when formatting code or enforcing consistent style - running the project formatter, handling lint/format check failures, or deciding whether a reformat belongs in the diff. Load before any bulk reformat or style-only change.
user-invocable: true
---

# Code Formatting

Category: Rules (Development)

## Purpose

Produce code that matches the project's formatting rules without burying
real changes in style noise. The formatter is a tool to run, not a style to
argue with - and reformatting is a change like any other, judged by its
blast radius.

## Precedence

1. The project's formatter and lint config (`.editorconfig`, `prettier`,
   `black`, `gofmt`, `rustfmt`, formatters wired into lint-staged, etc.).
2. The existing style of the file when no formatter exists.
3. This skill's defaults, where the repo is silent.

## Workflow

1. **Discover before formatting.** Look for the project's formatter
   config and any format/lint scripts in `package.json`, `Makefile`,
   `pyproject.toml`, or CI. Never run a formatter the repo does not use.
2. **Check the scope.** Format only files the task touched, unless the
   user explicitly asked for a repo-wide reformat.
3. **Run the formatter** through the repo's own entry point
   (`npm run format`, `make fmt`, the editor-on-save config) so the
   result matches what every other contributor produces.
4. **Read the diff.** Confirm the format-only diff contains no semantic
   change - imports untouched, logic untouched, only whitespace, quotes,
   line breaks, and ordering the tool applies.
5. **Verify nothing broke.** If the repo has lint or tests, run them
   after a bulk reformat; a large diff can expose latent issues.
6. **Report honestly.** State what was formatted, what tool ran, and
   whether the diff is style-only or mixed with functional change.

## Standards

- **Separate format-only commits.** A repo-wide reformat is its own
  commit (often `style: apply <formatter>`), never mixed with feature
  work - otherwise `git blame` and review both suffer.
- **Indentation is 4 spaces per tab level by default.** When the repo is
  silent, use 4; never mix tabs and spaces in one file. The size is
  customizable - any explicit setting in the formatter config,
  `.editorconfig`, or the file's neighborhood wins over this default.
- **Match line endings and final newline** the file already uses unless
  the formatter config says otherwise.
- **Generated and vendored files are off-limits** unless the repo says
  otherwise; formatting them is noise, not hygiene.
- **A failing format check in CI is fixed by running the formatter and
  committing the result**, not by editing the config to accept the drift.

## Comment standards

Public declarations carry a standard block comment, applied when the
repo is silent about comment style (existing repo conventions win):

- **Functions, constants, and classes** get an `@author` /
  `@description` / `@param` / `@returns` block; class methods get
  their own block. Omit tags that do not apply - a zero-arg constant
  has no `@param` or `@returns`.
- **Business logic** (algorithms, rules, non-obvious flows) gets a
  `@purpose` / `@context` / `@inputs` / `@outputs` block explaining
  the what and why at a glance.
- **Inline comments explain why, not what** - a comment narrating the
  next line is noise; the code already says that.
- Blocks are written once and kept true: when the declaration changes,
  the block changes in the same diff. Stale annotations are worse than
  none.
- No commented-out code in the diff - the version history keeps old
  versions.

Blocks follow the language's doc-comment syntax: the fields are the
same everywhere, the syntax is whatever the language's tooling reads -
JSDoc, Javadoc, PHPDoc, Doxygen, C# XML, rustdoc, godoc, Python
docstrings, YARD, and a line-comment fallback for languages without
block comments. Full placeholder templates per language: see
`comment-templates.md` in this skill directory.

## Anti-patterns

- Running `prettier`/`black` on a repo that uses a different formatter,
  producing a diff nobody asked for and no CI accepts.
- "Fixing" style by hand when a one-command formatter exists - hand
  formatting drifts from what every other contributor generates.
- Reformatting a file merely because it was read, not changed.
- Turning a reformat into an opportunity to rename, reorder functions,
  or delete "ugly" code.

## Escalation

- No formatter exists and the repo has no style config: load
  `formatting-init` to ask the user for their preferences (tab size,
  indent style, line endings, comment style) and write them to
  `.editorconfig` - or match the prevailing style of neighboring files
  and say so.
- The formatter and the lint rules conflict: treat the repo's CI as
  the source of truth and surface the conflict to the user instead of
  picking a side.
- The reformat would touch files outside the task's scope (shared
  modules, other packages): propose it and let the user decide.
