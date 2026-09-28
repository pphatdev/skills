#!/usr/bin/env node
/**
 * Validates every SKILL.md in the collection.
 *
 * Usage:   node scripts/validate-skills.mjs [root]
 *          root defaults to .agents (relative to the repo root)
 * Exit:    0 = all skills valid, 1 = validation errors found
 *
 * Checks: frontmatter present and closed, name matches the slug regex and
 * the directory name, description present and within length, no unknown
 * frontmatter keys, no reserved (built-in) skill names, no duplicate names
 * across the collection.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, basename, dirname, relative } from "node:path";

const root = process.argv[2] ?? ".agents";
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const RESERVED = new Set([
  "vibe",
  "worktree",
  "skill-creator",
  "create-plugin",
  "code-review",
  "find-skills",
]);
const KNOWN_KEYS = new Set([
  "name",
  "description",
  "user-invocable",
  "allowed-tools",
  "license",
  "compatibility",
  "metadata",
]);

const errors = [];
const warnings = [];
const seenNames = new Map(); // name -> file

function findSkillFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      out.push(...findSkillFiles(full));
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      out.push(full);
    }
  }
  return out;
}

function parseFrontmatter(text, file) {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== "---") {
    errors.push(`${file}: missing frontmatter (must start with '---')`);
    return {};
  }
  const end = lines.indexOf("---", 1);
  if (end === -1) {
    errors.push(`${file}: unclosed frontmatter (missing closing '---')`);
    return {};
  }
  const fm = {};
  for (const line of lines.slice(1, end)) {
    const sep = line.indexOf(":");
    if (sep === -1 || sep === 0) continue;
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
      (value.startsWith("'") && value.endsWith("'") && value.length > 1)
    ) {
      value = value.slice(1, -1);
    }
    fm[key] = value;
  }
  return fm;
}

const files = findSkillFiles(root);
if (files.length === 0) {
  errors.push(`${root}: no SKILL.md files found - is the root correct?`);
}

for (const file of files) {
  const rel = relative(process.cwd(), file);

  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch (err) {
    errors.push(`${rel}: unreadable (${err.message})`);
    continue;
  }

  const fm = parseFrontmatter(text, rel);

  // Name checks
  const name = fm["name"];
  if (!name) {
    errors.push(`${rel}: missing required frontmatter key 'name'`);
  } else {
    if (name.length < 1 || name.length > 64) {
      errors.push(`${rel}: name must be 1-64 chars (got ${name.length})`);
    }
    if (!NAME_RE.test(name)) {
      errors.push(
        `${rel}: name '${name}' must match ^[a-z0-9]+(-[a-z0-9]+)*$ (lowercase, digits, hyphens)`
      );
    }
    const dirName = basename(dirname(file));
    if (name !== dirName) {
      errors.push(`${rel}: frontmatter name '${name}' != directory '${dirName}'`);
    }
    if (RESERVED.has(name)) {
      errors.push(`${rel}: name '${name}' collides with a built-in Vibe skill - it would be silently skipped`);
    }
    if (seenNames.has(name)) {
      errors.push(
        `${rel}: duplicate name '${name}' (also defined in ${seenNames.get(name)})`
      );
    } else {
      seenNames.set(name, rel);
    }
  }

  // Description checks
  const description = fm["description"];
  if (!description) {
    errors.push(`${rel}: missing required frontmatter key 'description'`);
  } else {
    if (description.length > 1024) {
      errors.push(
        `${rel}: description must be 1-1024 chars (got ${description.length})`
      );
    }
    // Unquoted YAML scalars cannot contain ': ' - strict parsers (e.g. the
    // skills.sh CLI) reject the whole skill. House style is to rephrase.
    if (description.includes(": ")) {
      errors.push(
        `${rel}: description contains ': ' - invalid in unquoted YAML; strict parsers reject it (rephrase or quote the value)`
      );
    }
  }

  // user-invocable
  const invocable = fm["user-invocable"];
  if (invocable !== undefined && invocable !== "true" && invocable !== "false") {
    errors.push(`${rel}: 'user-invocable' must be true or false (got '${invocable}')`);
  }

  // Unknown keys
  for (const key of Object.keys(fm)) {
    if (!KNOWN_KEYS.has(key)) {
      warnings.push(`${rel}: unknown frontmatter key '${key}' (ignored by Vibe)`);
    }
  }

  // Body sanity
  const bodyStart = text.split(/\r?\n/).indexOf("---", 1);
  const body = text.split(/\r?\n/).slice(bodyStart + 1).join("\n").trim();
  if (body.length === 0) {
    warnings.push(`${rel}: empty body - the skill has no instructions`);
  }
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);

console.log(
  `\n${files.length} skills checked: ${errors.length} errors, ${warnings.length} warnings`
);

process.exit(errors.length > 0 ? 1 : 0);
