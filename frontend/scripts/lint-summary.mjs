#!/usr/bin/env node
/**
 * Lint Summary (Comprehensive Dashboard)
 *
 * Aggregates results from all lint scripts into a single summary:
 * - Typography violations
 * - Token violations
 * - Link violations
 * - Button/CTA violations
 *
 * Provides a "health score" for the codebase.
 * 
 * Run: npm run lint:summary
 * Output JSON: npm run lint:summary -- --out=lint-report.json
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "src");

// ============================================================
// Allowlists (consistent with individual lint scripts)
// ============================================================
const LINK_ALLOWLIST = new Set([
  path.resolve(process.cwd(), "src/components/ui/AppLink.tsx"),
  path.resolve(process.cwd(), "src/components/ui/ButtonLink.tsx"),
]);

const TYPOGRAPHY_ALLOWLIST = new Set([
  "src/app/globals.css",
]);

const TOKEN_ALLOWLIST = new Set([
  "src/app/globals.css",
]);

// ============================================================
// Patterns (same as individual lint scripts)
// ============================================================
const TYPOGRAPHY_PATTERNS = [
  { name: "Tailwind text size", re: /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/g },
  { name: "Tailwind font weight", re: /\bfont-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/g },
  { name: "Tailwind tracking", re: /\btracking-(tighter|tight|normal|wide|wider|widest)\b/g },
  { name: "Tailwind leading", re: /\bleading-(none|tight|snug|normal|relaxed|loose|\d+)\b/g },
];

const TOKEN_PATTERNS = [
  { name: "Neutral palette", re: /\b(?:text|bg|border|ring|stroke|fill)-(?:zinc|gray|slate|neutral|stone)-\d{2,3}\b/g },
  { name: "Hard-coded bg-white", re: /\bbg-white\b/g },
  { name: "Bracket hex color", re: /\b(?:text|bg|border|ring|stroke|fill)-\[#[0-9a-fA-F]{3,8}\]/g },
];

const LINK_PATTERN = /from\s+["']next\/link["']/g;

// ============================================================
// File Discovery
// ============================================================
function listFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p));
    else if (p.endsWith(".ts") || p.endsWith(".tsx")) out.push(p);
  }
  return out;
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

// ============================================================
// Main
// ============================================================
function lint() {
  const files = listFiles(ROOT);

  const stats = {
    totalFiles: files.length,
    safeFiles: 0,
    unsafeFiles: 0,
    violations: {
      typography: 0,
      tokens: 0,
      links: 0,
    },
  };

  const unsafeFilesList = [];

  for (const file of files) {
    const relPath = rel(file);
    const raw = fs.readFileSync(file, "utf8");

    const violations = {
      typography: { count: 0, byRule: {} },
      tokens: { count: 0, byRule: {} },
      links: { count: 0, byRule: {} },
    };

    // Check typography (if not allowlisted)
    if (!TYPOGRAPHY_ALLOWLIST.has(relPath)) {
      violations.typography = findMatches(raw, TYPOGRAPHY_PATTERNS);
    }

    // Check tokens (if not allowlisted)
    if (!TOKEN_ALLOWLIST.has(relPath)) {
      violations.tokens = findMatches(raw, TOKEN_PATTERNS);
    }

    // Check links (if not allowlisted)
    if (!LINK_ALLOWLIST.has(file)) {
      LINK_PATTERN.lastIndex = 0;
      if (LINK_PATTERN.test(raw)) {
        violations.links.count = 1;
        violations.links.byRule["Direct next/link import"] = 1;
      }
    }

    const totalViolations =
      violations.typography.count +
      violations.tokens.count +
      violations.links.count;

    if (totalViolations === 0) {
      stats.safeFiles++;
    } else {
      stats.unsafeFiles++;
      stats.violations.typography += violations.typography.count;
      stats.violations.tokens += violations.tokens.count;
      stats.violations.links += violations.links.count;

      unsafeFilesList.push({
        file: relPath,
        total: totalViolations,
        typography: violations.typography.count,
        tokens: violations.tokens.count,
        links: violations.links.count,
      });
    }
  }

  // Calculate health score
  const healthScore = stats.totalFiles === 0
    ? 100
    : Math.round((stats.safeFiles / stats.totalFiles) * 100);

  const summary = {
    totalFiles: stats.totalFiles,
    safeFiles: stats.safeFiles,
    unsafeFiles: stats.unsafeFiles,
    healthScore,
    violations: stats.violations,
    unsafeFilesList: unsafeFilesList.slice(0, 20), // Limit output
  };

  // Output to file if requested
  const outPath = getOutPath();
  if (outPath) {
    const resolved = path.resolve(process.cwd(), outPath);
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    fs.writeFileSync(resolved, JSON.stringify(summary, null, 2));
    console.log(`\n📄 Report saved to: ${outPath}`);
  }

  // Report
  console.log("\n📊 Lint Summary Dashboard (Comprehensive)\n");
  console.log("━".repeat(55));

  console.log("\n🏥 Codebase Health:");
  console.log(`   Health Score:      ${healthScore}% ${getHealthEmoji(healthScore)}`);
  console.log(`   Total Files:       ${stats.totalFiles}`);
  console.log(`   Safe Files:        ${stats.safeFiles}`);
  console.log(`   Unsafe Files:      ${stats.unsafeFiles}`);

  console.log("\n📋 Violation Breakdown:");
  console.log(`   Typography:        ${stats.violations.typography}`);
  console.log(`   Tokens:            ${stats.violations.tokens}`);
  console.log(`   Links:             ${stats.violations.links}`);
  const totalViolations = stats.violations.typography + stats.violations.tokens + stats.violations.links;
  console.log(`   ──────────────────`);
  console.log(`   Total:             ${totalViolations}`);

  if (unsafeFilesList.length > 0) {
    console.log("\n⚠️  Top Unsafe Files:");
    for (const f of unsafeFilesList.slice(0, 10)) {
      const breakdown = [];
      if (f.typography > 0) breakdown.push(`typo:${f.typography}`);
      if (f.tokens > 0) breakdown.push(`tok:${f.tokens}`);
      if (f.links > 0) breakdown.push(`link:${f.links}`);
      console.log(`   - ${f.file} (${breakdown.join(", ")})`);
    }
    if (unsafeFilesList.length > 10) {
      console.log(`   ... and ${unsafeFilesList.length - 10} more`);
    }
  }

  console.log("");

  if (stats.unsafeFiles > 0) {
    process.exitCode = 1;
  }
}

function getHealthEmoji(score) {
  if (score >= 95) return "🟢";
  if (score >= 80) return "🟡";
  if (score >= 60) return "🟠";
  return "🔴";
}

function getOutPath() {
  const args = process.argv.slice(2);
  const flagIndex = args.findIndex((arg) => arg === "--out" || arg.startsWith("--out="));
  if (flagIndex === -1) return null;
  const raw = args[flagIndex];
  if (raw.startsWith("--out=")) return raw.slice("--out=".length);
  return args[flagIndex + 1] ?? null;
}

lint();
