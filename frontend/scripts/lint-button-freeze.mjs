#!/usr/bin/env node
/**
 * Button & CTA Design Freeze Lint (Comprehensive)
 *
 * Validates that button/CTA styling matches CK (Calvin Klein) design system
 * across the ENTIRE codebase.
 * 
 * Scans:
 * - All .tsx files in src/ for button/CTA usage
 * - globals.css for CSS token definitions
 * 
 * Design Freeze Rules:
 * - Primary: solid black, NO border, white text
 * - Secondary: transparent bg, black border, inverts on hover
 * - Sharp corners (ui-radius-none)
 * - Hero: uses TextLink (editorial), not ButtonLink
 * - No shadows, no gradients on buttons
 *
 * Run: npm run lint:button-freeze
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

// ============================================================
// Key Component Files (must exist)
// ============================================================
const CORE_FILES = {
    globals: path.join(ROOT, "src/app/globals.css"),
    button: path.join(ROOT, "src/components/ui/Button.tsx"),
    buttonLink: path.join(ROOT, "src/components/ui/ButtonLink.tsx"),
    textLink: path.join(ROOT, "src/components/ui/TextLink.tsx"),
    homeHero: path.join(ROOT, "src/components/home/HomeHero.tsx"),
};

// ============================================================
// File Discovery
// ============================================================
function listFiles(dir) {
    const out = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) out.push(...listFiles(p));
        else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
    }
    return out;
}

function rel(p) {
    return path.relative(ROOT, p).replaceAll("\\", "/");
}

// ============================================================
// CSS Token Rules (globals.css)
// ============================================================
const CSS_RULES = [
    {
        name: "Sharp corners utility (ui-radius-none)",
        pattern: /\.ui-radius-none\s*\{\s*border-radius:\s*0;?\s*\}/,
    },
    {
        name: "Primary button: transparent border",
        pattern: /\.ui-btn-primary\s*\{[^}]*border-color:\s*transparent/,
    },
    {
        name: "Primary button: solid background",
        pattern: /\.ui-btn-primary\s*\{[^}]*background-color:\s*var\(--foreground\)/,
    },
    {
        name: "Secondary button: transparent background",
        pattern: /\.ui-btn-secondary\s*\{[^}]*background-color:\s*transparent/,
    },
    {
        name: "Secondary button: visible border",
        pattern: /\.ui-btn-secondary\s*\{[^}]*border-color:\s*var\(--foreground\)/,
    },
    {
        name: "Secondary hover: inverts to solid",
        pattern: /\.ui-btn-secondary:hover[^{]*\{[^}]*background-color:\s*var\(--foreground\)/,
    },
    {
        name: "Text CTA (ui-cta-text) with underline",
        pattern: /\.ui-cta-text\s*\{[^}]*text-decoration:\s*underline/,
    },
    {
        name: "Focus ring utility (ui-focus-ring)",
        pattern: /\.ui-focus-ring/,
    },
];

// ============================================================
// Component Rules
// ============================================================
const COMPONENT_RULES = {
    button: [
        { name: "Uses sharp corners (ui-radius-none)", pattern: /ui-radius-none/ },
        { name: "Has primary variant", pattern: /primary:\s*["']ui-btn-primary["']/ },
        { name: "Has secondary variant", pattern: /secondary:\s*["']ui-btn-secondary["']/ },
        { name: "Uses focus ring", pattern: /ui-focus-ring/ },
    ],
    textLink: [
        { name: "Uses ui-cta-text", pattern: /ui-cta-text/ },
        { name: "Uses ui-focus-ring", pattern: /ui-focus-ring/ },
        { name: "Has onDark prop", pattern: /onDark/ },
        { name: "Uses ui-hero-on-media", pattern: /ui-hero-on-media/ },
    ],
    homeHero: [
        { name: "Uses TextLink component", pattern: /import\s+TextLink\s+from/ },
        { name: "TextLink has onDark prop", pattern: /<TextLink[^>]*onDark/ },
    ],
};

// ============================================================
// Banned Patterns (codebase-wide)
// ============================================================
const BANNED_GLOBAL = [
    {
        name: "Raw button element without component",
        pattern: /<button\s+(?!.*(?:type=["']submit["']|type=["']button["']|type=["']reset["']))[^>]*className/,
        reason: "Use Button component instead of raw <button> with className",
        severity: "warning",
    },
];

const BANNED_BY_FILE = {
    button: [
        { name: "Rounded corners (use ui-radius-none)", pattern: /ui-radius-tight/, reason: "CK uses sharp corners" },
        { name: "Scale on active", pattern: /active:scale-\[0\.9[0-9]\]/, reason: "CK doesn't use press scale" },
        { name: "Shadows", pattern: /shadow-lg|shadow-xl|shadow-2xl/, reason: "CK minimalism: no shadows" },
        { name: "Gradients", pattern: /bg-gradient-to/, reason: "CK uses solid colors" },
    ],
    homeHero: [
        { name: "ButtonLink import", pattern: /import\s+ButtonLink\s+from/, reason: "Hero uses TextLink, not ButtonLink" },
        { name: "ButtonLink element", pattern: /<ButtonLink/, reason: "Hero uses TextLink, not ButtonLink" },
        { name: "Arrow icons", pattern: /IconArrowRight/, reason: "Hero CTAs don't use arrows" },
    ],
    globals: [
        { name: "Primary button visible border", pattern: /\.ui-btn-primary\s*\{[^}]*border-color:\s*var\(--foreground\)[^}]*\}/, reason: "Primary has no visible border" },
    ],
};

// ============================================================
// Files that SHOULD have buttons (sanity check)
// ============================================================
const FILES_EXPECTED_TO_USE_BUTTONS = [
    "src/components/lead/LeadForm.tsx",
    "src/components/contact/ContactContent.tsx",
    "src/components/site/CTASection.tsx",
];

// ============================================================
// Linting Logic
// ============================================================
function lint() {
    const errors = [];
    const warnings = [];
    const stats = { filesScanned: 0, buttonUsages: 0, textLinkUsages: 0 };

    // Read core files
    const contents = {};
    for (const [key, filePath] of Object.entries(CORE_FILES)) {
        if (!fs.existsSync(filePath)) {
            if (key === "buttonLink") continue; // Optional
            errors.push(`❌ Core file not found: ${rel(filePath)}`);
            continue;
        }
        contents[key] = fs.readFileSync(filePath, "utf-8");
    }

    // Check CSS rules
    const cssContent = contents.globals;
    if (cssContent) {
        for (const rule of CSS_RULES) {
            if (!rule.pattern.test(cssContent)) {
                errors.push(`❌ [globals.css] Missing: ${rule.name}`);
            }
        }
    }

    // Check component rules
    for (const [fileKey, rules] of Object.entries(COMPONENT_RULES)) {
        const content = contents[fileKey];
        if (!content) continue;
        for (const rule of rules) {
            if (!rule.pattern.test(content)) {
                errors.push(`❌ [${fileKey}] Missing: ${rule.name}`);
            }
        }
    }

    // Check banned patterns in core files
    for (const [fileKey, bans] of Object.entries(BANNED_BY_FILE)) {
        const content = contents[fileKey];
        if (!content) continue;
        for (const ban of bans) {
            if (ban.pattern.test(content)) {
                errors.push(`❌ [${fileKey}] Banned: ${ban.name}`);
                errors.push(`   → ${ban.reason}`);
            }
        }
    }

    // Scan all .tsx files for button usage patterns
    const allFiles = listFiles(SRC);
    for (const file of allFiles) {
        const content = fs.readFileSync(file, "utf-8");
        stats.filesScanned++;

        // Count usages
        if (/import.*Button/.test(content) || /<Button/.test(content)) stats.buttonUsages++;
        if (/import.*TextLink/.test(content) || /<TextLink/.test(content)) stats.textLinkUsages++;

        // Check global banned patterns
        for (const ban of BANNED_GLOBAL) {
            if (ban.pattern.test(content)) {
                if (ban.severity === "warning") {
                    warnings.push(`⚠️  [${rel(file)}] ${ban.name}`);
                } else {
                    errors.push(`❌ [${rel(file)}] ${ban.name}`);
                    errors.push(`   → ${ban.reason}`);
                }
            }
        }
    }

    // Sanity check: expected files should use Button/ButtonLink
    for (const expectedFile of FILES_EXPECTED_TO_USE_BUTTONS) {
        const fullPath = path.join(ROOT, expectedFile);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, "utf-8");
            if (!/import.*Button|<Button|<ButtonLink/.test(content)) {
                warnings.push(`⚠️  [${expectedFile}] Expected to use Button/ButtonLink but doesn't`);
            }
        }
    }

    // Report
    console.log("\n🎨 Button & CTA Design Freeze Lint (Comprehensive)\n");
    console.log("━".repeat(55));

    console.log("\n📊 Scan Statistics:");
    console.log(`   Files scanned:    ${stats.filesScanned}`);
    console.log(`   Button usages:    ${stats.buttonUsages}`);
    console.log(`   TextLink usages:  ${stats.textLinkUsages}`);

    console.log("\n📁 Core Files:");
    for (const [key, filePath] of Object.entries(CORE_FILES)) {
        const exists = contents[key] ? "✓" : "✗";
        console.log(`   ${exists} ${key}: ${rel(filePath)}`);
    }

    if (warnings.length > 0) {
        console.log(`\n⚠️  ${warnings.length} warning(s):`);
        warnings.slice(0, 5).forEach(w => console.log(`   ${w}`));
        if (warnings.length > 5) console.log(`   ... and ${warnings.length - 5} more`);
    }

    if (errors.length === 0) {
        console.log("\n✅ All checks passed! Button & CTA design matches CK freeze.\n");
        return 0;
    }

    console.log(`\n❌ ${errors.length} error(s) found:\n`);
    errors.forEach((e) => console.log(`   ${e}`));
    console.log("\n");
    return 1;
}

process.exit(lint());
