#!/usr/bin/env node
/**
 * Mirrors the canonical skills under .agents/ into the flat skills
 * directories that other coding agents discover: Claude Code, Gemini CLI,
 * and Codex. Cursor and OpenCode read .claude/skills/ for compatibility,
 * so they are covered by the same mirror.
 *
 * All agents discover skills flat (one level: <dir>/<skill-name>/SKILL.md),
 * while this collection organizes canonical skills by category. This script
 * closes that gap without symlinks, which are unreliable on Windows and in
 * git checkouts.
 *
 * Usage:
 *   node scripts/sync-agent-skills.mjs           regenerate all mirrors
 *   node scripts/sync-agent-skills.mjs --check   exit 1 if mirrors are stale
 *
 * The target directories are fully owned by this script: it wipes and
 * rebuilds them on every run. Do not add skills to a mirror directly -
 * edit the canonical skill under .agents/ and re-run.
 */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { basename, dirname, join, relative } from "node:path";

const SOURCE = ".agents";

const TARGETS = [
  { agent: "Claude Code", dir: ".claude/skills" },
  { agent: "Gemini CLI", dir: ".gemini/skills" },
  { agent: "Codex", dir: ".codex/skills" },
];

const NOTICE = (agent) => `# Generated directory - do not edit

Every skill in this directory is a generated mirror of the canonical
skills under \`.agents/\` in the repository root, provided so ${agent}
discovers them without configuration.

Do not add or edit skills here: this directory is wiped and rebuilt by
\`scripts/sync-agent-skills.mjs\` on every run.

To make a change: edit the canonical skill under \`.agents/\`, run
\`node scripts/sync-agent-skills.mjs\`, and commit the result.
`;

function walk(dir, out = []) {
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
      walk(full, out);
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      out.push(full);
    }
  }
  return out;
}

function findSkills() {
  return walk(SOURCE).map((file) => {
    const text = readFileSync(file, "utf8");
    const m = text.match(/^name:\s*(.+)$/m);
    return {
      name: m ? m[1].trim() : basename(dirname(file)),
      dir: dirname(file),
    };
  });
}

function listFiles(dir, prefix = "") {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, rel));
    else if (entry.isFile()) out.push({ rel, full });
  }
  return out;
}

const hash = (buf) => createHash("sha256").update(buf).digest("hex");

const check = process.argv.includes("--check");
const skills = findSkills();
if (skills.length === 0) {
  console.error(`No skills found under ${SOURCE}`);
  process.exit(1);
}

let failures = 0;

for (const target of TARGETS) {
  const expected = new Map(); // relpath -> sha256
  for (const skill of skills) {
    for (const f of listFiles(skill.dir)) {
      expected.set(`${skill.name}/${f.rel}`, hash(readFileSync(f.full)));
    }
  }

  if (check) {
    const actual = new Map(
      listFiles(target.dir)
        .filter((f) => f.rel !== "GENERATED.md")
        .map((f) => [f.rel, hash(readFileSync(f.full))])
    );
    const problems = [];
    for (const [rel, sha] of expected) {
      if (!actual.has(rel)) problems.push(`missing: ${rel}`);
      else if (actual.get(rel) !== sha) problems.push(`stale:   ${rel}`);
    }
    for (const rel of actual.keys()) {
      if (!expected.has(rel)) problems.push(`extra:   ${rel}`);
    }
    if (problems.length > 0) {
      failures += problems.length;
      console.error(`${target.dir} (${target.agent}) is out of sync:`);
      for (const p of problems) console.error(`  ${p}`);
    } else {
      console.log(`${target.dir}: ${skills.length} skills in sync (${target.agent})`);
    }
    continue;
  }

  rmSync(target.dir, { recursive: true, force: true });
  mkdirSync(target.dir, { recursive: true });
  writeFileSync(join(target.dir, "GENERATED.md"), NOTICE(target.agent));
  for (const skill of skills) {
    cpSync(skill.dir, join(target.dir, skill.name), { recursive: true });
  }
  console.log(`${target.dir}: mirrored ${skills.length} skills (${target.agent})`);
}

if (!check) {
  console.log(
    `\nMirrors regenerated for ${TARGETS.map((t) => t.agent).join(", ")}. ` +
      `Cursor and OpenCode read .claude/skills/ for compatibility.`
  );
}

process.exit(failures > 0 ? 1 : 0);
