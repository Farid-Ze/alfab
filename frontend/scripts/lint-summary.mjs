import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "src");

const FILE_EXTS = new Set([".ts", ".tsx"]);

const LINK_ALLOWLIST = new Set([
  path.resolve(process.cwd(), "src/components/ui/AppLink.tsx"),
  path.resolve(process.cwd(), "src/components/ui/ButtonLink.tsx"),
]);

const TYPOGRAPHY_PATTERNS = [
  {
    name: "Tailwind text size (use type-* tokens)",
    re: /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b|text-\[/g,
  },
  {
    name: "Tailwind font weight (use type-*-strong/type-strong)",
    re: /\bfont-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/g,
  },
  {
    name: "Tailwind tracking (use type-* tokens)",
    re: /\btracking-(tighter|tight|normal|wide|wider|widest)\b/g,
  },
  {
    name: "Tailwind leading (use type-* tokens)",
    re: /\bleading-(none|tight|snug|normal|relaxed|loose|\d+)\b|leading-\[/g,
  },
];

const TOKEN_PATTERNS = [
  {
    name: "Neutral palette utilities (use design tokens)",
    re: /\b(?:text|bg|border|ring|stroke|fill)-(?:zinc|gray|slate|neutral|stone)-\d{2,3}\b/g,
  },
  {
    name: "Neutral palette utilities with opacity (use design tokens)",
    re: /\b(?:text|bg|border|ring|stroke|fill)-(?:zinc|gray|slate|neutral|stone)-\d{2,3}\/\d{1,3}\b/g,
  },
  {
    name: "Neutral palette utilities in gradients (use design tokens)",
    re: /\b(?:from|via|to)-(?:zinc|gray|slate|neutral|stone)-\d{2,3}(?:\/\d{1,3})?\b/g,
  },
  {
    name: "Hard-coded white surfaces (use bg-background/bg-panel/bg-subtle)",
    re: /\b(?:bg|border)-white\b|\bbg-white\b/g,
  },
  {
    name: "Hard-coded bracket colors (use tokens / CSS variables)",
    re: /\b(?:text|bg|border|ring|stroke|fill)-\[(?:#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\()\b/g,
  },
];

const importNextLinkRe = /from\s+["']next\/link["']/g;

function listFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out;
}

function isSourceFile(p) {
  return FILE_EXTS.has(path.extname(p));
}

function rel(p) {
  return path.relative(process.cwd(), p).replaceAll("\\", "/");
}

function findMatches(raw, patterns) {
  let count = 0;
  const byRule = {};

  for (const { name, re } of patterns) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(raw)) !== null) {
      count += 1;
      byRule[name] = (byRule[name] ?? 0) + 1;
      if (match.index === re.lastIndex) re.lastIndex++;
    }
  }

  return { count, byRule };
}

const files = listFiles(ROOT).filter(isSourceFile);

let safeCount = 0;
let unsafeCount = 0;
const unsafeFiles = [];

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const violations = {
    typography: findMatches(raw, TYPOGRAPHY_PATTERNS),
    tokens: findMatches(raw, TOKEN_PATTERNS),
    links: { count: 0, byRule: {} },
  };

  if (!LINK_ALLOWLIST.has(file) && importNextLinkRe.test(raw)) {
    violations.links.count = 1;
    violations.links.byRule["Direct next/link import (use AppLink/ButtonLink)"] = 1;
  }

  const totalViolations =
    violations.typography.count + violations.tokens.count + violations.links.count;

  if (totalViolations === 0) {
    safeCount += 1;
  } else {
    unsafeCount += 1;
    unsafeFiles.push({
      file: rel(file),
      total: totalViolations,
      rules: {
        ...violations.typography.byRule,
        ...violations.tokens.byRule,
        ...violations.links.byRule,
      },
    });
  }
}

const total = safeCount + unsafeCount;
const safePct = total === 0 ? 100 : Math.round((safeCount / total) * 100);
const summary = {
  total,
  safe: safeCount,
  unsafe: unsafeCount,
  safeRatioPercent: safePct,
  unsafeFiles,
};

function getOutPath() {
  const args = process.argv.slice(2);
  const flagIndex = args.findIndex((arg) => arg === "--out" || arg.startsWith("--out="));
  if (flagIndex === -1) return null;
  const raw = args[flagIndex];
  if (raw.startsWith("--out=")) return raw.slice("--out=".length);
  return args[flagIndex + 1] ?? null;
}

const outPath = getOutPath();
if (outPath) {
  const resolved = path.resolve(process.cwd(), outPath);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, JSON.stringify(summary, null, 2));
}

console.log("\nCodefile safety summary (typography + tokens + link usage)\n");
console.log(`Total files: ${summary.total}`);
console.log(`Safe files: ${summary.safe}`);
console.log(`Unsafe files: ${summary.unsafe}`);
console.log(`Safe ratio: ${summary.safeRatioPercent}%\n`);

if (unsafeFiles.length > 0) {
  console.log("Unsafe files (violations by rule):");
  for (const f of unsafeFiles) {
    console.log(`- ${f.file} (${f.total})`);
    for (const [rule, count] of Object.entries(f.rules)) {
      console.log(`  - ${rule}: ${count}`);
    }
  }
  process.exitCode = 1;
} else {
  console.log("All files are safe per lint rules.");
}
