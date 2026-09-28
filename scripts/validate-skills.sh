#!/bin/sh
#
# Validates every SKILL.md in the collection.
#
# Usage:   sh scripts/validate-skills.sh [root]
#          root defaults to .agents (relative to the repo root)
# Exit:    0 = all skills valid, 1 = validation errors found
#
# POSIX sh + awk only - no Node, no build step, no dependencies.
#
# Checks: frontmatter present and closed, name matches the slug regex and
# the directory name, description present and within length, no unknown
# frontmatter keys, no reserved (built-in) skill names, no duplicate names
# across the collection.

set -u

root=${1:-.agents}

files=$(find "$root" -type d \( -name .git -o -name node_modules \) -prune \
  -o -type f -name SKILL.md -print 2>/dev/null | sort)

if [ -z "$files" ]; then
  echo "ERROR ${root}: no SKILL.md files found - is the root correct?"
  echo ""
  echo "0 skills checked: 1 errors, 0 warnings"
  exit 1
fi

# Paths are repo slugs with no spaces, so word splitting is safe here.
# sq carries a single quote into awk (kept out of the program text so the
# program can live in one single-quoted block).
# shellcheck disable=SC2086
awk -v sq="'" '
BEGIN {
  n = split("vibe worktree skill-creator create-plugin code-review find-skills", t, " ")
  for (i = 1; i <= n; i++) RESERVED[t[i]] = 1
  n = split("name description user-invocable allowed-tools license compatibility metadata", t, " ")
  for (i = 1; i <= n; i++) KNOWN[t[i]] = 1
  ne = 0; nw = 0; nf = 0
}

function trim(s) {
  sub(/^[ \t]+/, "", s)
  sub(/[ \t]+$/, "", s)
  return s
}

function emit_err(m) { E[++ne] = m }
function emit_warn(m) { W[++nw] = m }

function init() {
  fname = FILENAME
  infm = 0; badstart = 0; hasbody = 0; hasinvoc = 0; skip = 0
  name = ""; desc = ""; invoc = ""
  nkeys = 0
}

function finish() {
  if (badstart) {
    emit_err(fname ": missing frontmatter (must start with " sq "---" sq ")")
    emit_err(fname ": missing required frontmatter key " sq "name" sq)
    emit_err(fname ": missing required frontmatter key " sq "description" sq)
    return
  }
  if (infm != 2) {
    emit_err(fname ": unclosed frontmatter (missing closing " sq "---" sq ")")
    emit_err(fname ": missing required frontmatter key " sq "name" sq)
    emit_err(fname ": missing required frontmatter key " sq "description" sq)
    return
  }

  # Name checks
  if (name == "") {
    emit_err(fname ": missing required frontmatter key " sq "name" sq)
  } else {
    l = length(name)
    if (l < 1 || l > 64)
      emit_err(fname ": name must be 1-64 chars (got " l ")")
    if (name !~ /^[a-z0-9]+(-[a-z0-9]+)*$/)
      emit_err(fname ": name " sq name sq " must match ^[a-z0-9]+(-[a-z0-9]+)*$ (lowercase, digits, hyphens)")
    dir = fname
    sub(/\/[^\/]*$/, "", dir)
    sub(/.*\//, "", dir)
    if (dir == fname) dir = "."
    if (name != dir)
      emit_err(fname ": frontmatter name " sq name sq " != directory " sq dir sq)
    if (name in RESERVED)
      emit_err(fname ": name " sq name sq " collides with a built-in Vibe skill - it would be silently skipped")
    if (name in SEEN)
      emit_err(fname ": duplicate name " sq name sq " (also defined in " SEEN[name] ")")
    else
      SEEN[name] = fname
  }

  # Description checks
  if (desc == "") {
    emit_err(fname ": missing required frontmatter key " sq "description" sq)
  } else {
    if (length(desc) > 1024)
      emit_err(fname ": description must be 1-1024 chars (got " length(desc) ")")
    # Unquoted YAML scalars cannot contain ": " - strict parsers (e.g. the
    # skills.sh CLI) reject the whole skill. House style is to rephrase.
    if (index(desc, ": ") != 0)
      emit_err(fname ": description contains " sq ": " sq " - invalid in unquoted YAML; strict parsers reject it (rephrase or quote the value)")
  }

  # user-invocable
  if (hasinvoc && invoc != "true" && invoc != "false")
    emit_err(fname ": " sq "user-invocable" sq " must be true or false (got " sq invoc sq ")")

  # Unknown keys
  for (i = 1; i <= nkeys; i++)
    if (!(KEYS[i] in KNOWN))
      emit_warn(fname ": unknown frontmatter key " sq KEYS[i] sq " (ignored by Vibe)")

  # Body sanity
  if (!hasbody)
    emit_warn(fname ": empty body - the skill has no instructions")
}

{
  if (FNR == 1) {
    if (NR > 1) finish()
    init()
    nf++
  }
  if (skip) next
  # The body is ~all the bytes of a file, and only its first non-blank
  # line matters - per-line work stops right there. Test the raw record
  # (\r kept in the blank set so CRLF-only bodies still count as empty)
  # instead of copying and CR-stripping every line.
  if (infm == 2) {
    if (!hasbody && $0 ~ /[^ \t\r]/) hasbody = 1
    if (hasbody) skip = 1
    next
  }
  line = $0
  sub(/\r$/, "", line)
  if (FNR == 1) {
    if (line == "---") infm = 1
    else { badstart = 1; skip = 1 }
    next
  }
  if (infm == 1) {
    if (line == "---") { infm = 2; next }
    sep = index(line, ":")
    if (sep <= 1) next
    key = trim(substr(line, 1, sep - 1))
    val = trim(substr(line, sep + 1))
    if (length(val) > 1 && ((substr(val, 1, 1) == sq && substr(val, length(val), 1) == sq) ||
        (substr(val, 1, 1) == "\"" && substr(val, length(val), 1) == "\"")))
      val = substr(val, 2, length(val) - 2)
    KEYS[++nkeys] = key
    if (key == "name") name = val
    else if (key == "description") desc = val
    else if (key == "user-invocable") { invoc = val; hasinvoc = 1 }
    next
  }
}

END {
  if (nf > 0) finish()
  for (i = 1; i <= nw; i++) print "WARN  " W[i]
  for (i = 1; i <= ne; i++) print "ERROR " E[i]
  print ""
  print nf " skills checked: " ne " errors, " nw " warnings"
  exit (ne > 0)
}
' $files
