#!/usr/bin/env node
/**
 * find-unused-src-files.mjs
 *
 * Heuristic unused-file auditor for frontend/src.
 *
 * - Builds a lightweight import graph from static import specifiers.
 * - Treats Next.js App Router filesystem routes as entrypoints.
 * - Treats special Next entry files (middleware, instrumentation) as entrypoints.
 *
 * NOTE: This is intentionally conservative:
 * - Only resolves relative imports and @/* alias imports.
 * - Does not attempt to resolve dynamic runtime strings.
 * - Will NOT auto-delete; it prints a report.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.resolve(ROOT, "src");

const EXTENSIONS = [".ts", ".tsx", ".mts", ".js", ".jsx"]; // allow allowJs projects

function listFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
}

function rel(p) {
  return path.relative(ROOT, p).replaceAll("\\", "/");
}

function isSourceFile(p) {
  return EXTENSIONS.some((ext) => p.endsWith(ext));
}

function isRouteEntrypoint(p) {
  const r = rel(p);
  if (!r.startsWith("src/")) return false;
  if (r === "src/middleware.ts" || r === "src/instrumentation.ts") return true;

  // Next.js app router conventions
  if (r.startsWith("src/app/")) {
    const base = path.posix.basename(r);
    return (
      base === "page.tsx" ||
      base === "page.ts" ||
      base === "layout.tsx" ||
      base === "layout.ts" ||
      base === "loading.tsx" ||
      base === "loading.ts" ||
      base === "error.tsx" ||
      base === "error.ts" ||
      base === "global-error.tsx" ||
      base === "global-error.ts" ||
      base === "not-found.tsx" ||
      base === "not-found.ts" ||
      base === "route.ts" ||
      base === "route.js" ||
      base === "template.tsx" ||
      base === "template.ts" ||
      base === "default.tsx" ||
      base === "default.ts" ||
      base.endsWith("-image.tsx") ||
      base.endsWith("-image.ts") ||
      base === "robots.ts" ||
      base === "sitemap.ts" ||
      base === "manifest.ts" ||
      base === "favicon.ico"
    );
  }

  return false;
}

function tryResolveModule(fromFile, spec) {
  // Only resolve local/alias imports
  let target;
  if (spec.startsWith("@/")) {
    target = path.resolve(SRC, spec.slice(2));
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    target = path.resolve(path.dirname(fromFile), spec);
  } else {
    return null;
  }

  // If spec already includes extension
  if (EXTENSIONS.some((ext) => target.endsWith(ext))) {
    return fs.existsSync(target) ? target : null;
  }

  // Try as file with extensions
  for (const ext of EXTENSIONS) {
    const p = target + ext;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }

  // Try as folder index
  for (const ext of EXTENSIONS) {
    const p = path.join(target, "index" + ext);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }

  return null;
}

function extractImportSpecifiers(src) {
  const specs = [];

  // import ... from "x";
  for (const m of src.matchAll(/\bfrom\s+["']([^"']+)["']/g)) {
    specs.push(m[1]);
  }

  // import("x")
  for (const m of src.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g)) {
    specs.push(m[1]);
  }

  // require("x")
  for (const m of src.matchAll(/\brequire\(\s*["']([^"']+)["']\s*\)/g)) {
    specs.push(m[1]);
  }

  return specs;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`[unused-src] src/ not found at ${SRC}`);
    process.exit(1);
  }

  const allFiles = listFiles(SRC).filter(isSourceFile);
  const fileSet = new Set(allFiles.map((p) => path.normalize(p)));

  const referenced = new Set();
  const entrypoints = new Set(allFiles.filter(isRouteEntrypoint));

  for (const file of allFiles) {
    const raw = fs.readFileSync(file, "utf8");
    const specs = extractImportSpecifiers(raw);
    for (const spec of specs) {
      const resolved = tryResolveModule(file, spec);
      if (resolved && fileSet.has(path.normalize(resolved))) {
        referenced.add(path.normalize(resolved));
      }
    }
  }

  // Mark entrypoints as used
  for (const p of entrypoints) referenced.add(path.normalize(p));

  const unused = allFiles
    .filter((p) => !referenced.has(path.normalize(p)))
    .map((p) => rel(p))
    .sort();

  console.log("\n🧹 Unused src file audit (heuristic)\n");
  console.log(`Files scanned: ${allFiles.length}`);
  console.log(`Entrypoints:   ${entrypoints.size}`);
  console.log(`Referenced:    ${referenced.size}`);
  console.log(`Potentially unused: ${unused.length}\n`);

  if (unused.length === 0) {
    console.log("✅ No potentially-unused files found.\n");
    return;
  }

  for (const p of unused) {
    console.log(`- ${p}`);
  }

  console.log("\nNOTE: This report is conservative and may include false positives for files used via runtime strings.");
}

main();
