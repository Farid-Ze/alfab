#!/usr/bin/env node
/**
 * Hero Section Design Freeze Lint (Comprehensive)
 * 
 * Validates HomeHero matches the frozen CK-style design specification:
 * - Video background with proper fallback
 * - Gradient overlays for text readability
 * - Bottom-left content positioning
 * - type-hero-* typography tokens
 * - TextLink CTAs with onDark prop
 * - No redundant patterns
 *
 * Scans: HomeHero.tsx, TextLink.tsx, globals.css
 * 
 * Run: npm run lint:hero-freeze
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());

// ============================================================
// Core Files
// ============================================================
const CORE_FILES = {
    hero: path.join(ROOT, "src/components/home/HomeHero.tsx"),
    textLink: path.join(ROOT, "src/components/ui/TextLink.tsx"),
    globals: path.join(ROOT, "src/app/globals.css"),
};

function rel(p) {
    return path.relative(ROOT, p).replaceAll("\\", "/");
}

// ============================================================
// Hero Required Patterns
// ============================================================
const HERO_RULES = [
    { name: "Hero section with aria-label", pattern: /aria-label.*Hero/ },
    { name: "Responsive height (h-[70vh] mobile)", pattern: /h-\[70vh\]/ },
    { name: "Responsive aspect (sm:aspect-[16/9])", pattern: /sm:.*aspect-\[16\/9\]/ },
    { name: "Max height constraint (85vh)", pattern: /max-h-\[85vh\]/ },
    { name: "Video with autoplay/muted/loop", pattern: /<video[^>]*autoPlay[^>]*muted[^>]*loop/s },
    { name: "Right-to-left gradient overlay", pattern: /bg-gradient-to-r.*from-foreground\/(80|70)/ },
    { name: "Bottom-to-top gradient overlay", pattern: /bg-gradient-to-t.*from-foreground\/(30|40)/ },
    { name: "Bottom positioning (items-end)", pattern: /items-end.*pb-12/ },
    { name: "Content max-width (120rem)", pattern: /max-w-\[120rem\]/ },
    { name: "type-hero-kicker typography", pattern: /type-hero-kicker.*ui-hero-on-media/ },
    { name: "type-hero headline", pattern: /type-hero\s+ui-hero-on-media|type-hero.*ui-hero-on-media/ },
    { name: "type-hero-body description", pattern: /type-hero-body.*ui-hero-on-media-muted/ },
    { name: "type-hero-note supporting text", pattern: /type-hero-note.*ui-hero-on-media-subtle/ },
    { name: "TextLink with onDark", pattern: /TextLink[^>]*onDark/ },
];

// ============================================================
// TextLink Required Patterns
// ============================================================
const TEXTLINK_RULES = [
    { name: "Uses ui-cta-text class", file: "textLink", pattern: /ui-cta-text/ },
    { name: "Supports onDark prop", file: "textLink", pattern: /onDark/ },
    { name: "Uses ui-hero-on-media for dark mode", file: "textLink", pattern: /ui-hero-on-media/ },
];

// ============================================================
// CSS Token Rules
// ============================================================
const CSS_RULES = [
    { name: "type-hero class defined", file: "globals", pattern: /\.type-hero\s*\{/ },
    { name: "type-hero-kicker class defined", file: "globals", pattern: /\.type-hero-kicker\s*\{/ },
    { name: "type-hero-body class defined", file: "globals", pattern: /\.type-hero-body\s*\{/ },
    { name: "ui-hero-on-media class defined", file: "globals", pattern: /\.ui-hero-on-media\s*\{/ },
    { name: "ui-cta-text class defined", file: "globals", pattern: /\.ui-cta-text\s*\{/ },
];

// ============================================================
// Banned Patterns
// ============================================================
const BANNED_PATTERNS = [
    { name: "Text shadow", pattern: /ui-text-shadow|text-shadow/, reason: "CK minimalism prohibits text shadows" },
    { name: "Heavy shadows on CTAs", pattern: /shadow-lg|shadow-xl|shadow-2xl/, reason: "CK minimalism prohibits heavy shadows" },
    { name: "TrustBar component", pattern: /<TrustBar|TrustItem/, reason: "TrustBar removed from Hero" },
    { name: "ButtonLink in Hero", pattern: /<ButtonLink[^/]*\/?>|ButtonLink\s*href/, reason: "Use TextLink, not ButtonLink" },
    { name: "IconArrowRight in CTAs", pattern: /IconArrowRight/, reason: "Hero CTAs don't use arrow icons" },
    { name: "Old type-h1 (use type-hero)", pattern: /type-h1.*ui-hero-on-media/, reason: "Use type-hero class" },
    { name: "Old type-kicker (use type-hero-kicker)", pattern: /type-kicker\s+ui-hero/, reason: "Use type-hero-kicker class" },
    { name: "Center alignment", pattern: /items-center[^}]*ui-hero-on-media/, reason: "Use bottom-left positioning" },
];

// ============================================================
// Redundancy Patterns
// ============================================================
const REDUNDANCY_PATTERNS = [
    { name: "Multiple gradient overlays of same type", pattern: /bg-gradient-to-r[^"]*bg-gradient-to-r/, reason: "Single gradient per direction" },
    { name: "Duplicate type-hero tokens", pattern: /type-hero-kicker[^"]*type-hero-kicker|type-hero-body[^"]*type-hero-body/, reason: "Remove duplicate type tokens" },
    { name: "Multiple TextLink CTAs with same href", pattern: /<TextLink[^>]*href="([^"]+)"[^>]*>[^<]*<\/TextLink>[^]*<TextLink[^>]*href="\1"/, reason: "Avoid duplicate CTA links" },
];

// ============================================================
// Main
// ============================================================
function lint() {
    const errors = [];
    const redundancies = [];
    const contents = {};
    const stats = { rulesChecked: 0 };

    // Read files
    for (const [key, filePath] of Object.entries(CORE_FILES)) {
        if (!fs.existsSync(filePath)) {
            errors.push(`❌ File not found: ${rel(filePath)}`);
            continue;
        }
        contents[key] = fs.readFileSync(filePath, "utf-8");
    }

    // Check hero rules
    const heroContent = contents.hero;
    if (heroContent) {
        for (const rule of HERO_RULES) {
            stats.rulesChecked++;
            if (!rule.pattern.test(heroContent)) {
                errors.push(`❌ [hero] Missing: ${rule.name}`);
            }
        }

        // Check banned patterns in hero
        for (const banned of BANNED_PATTERNS) {
            if (banned.pattern.test(heroContent)) {
                errors.push(`❌ [hero] BANNED: ${banned.name}`);
                errors.push(`   → ${banned.reason}`);
            }
        }

        // Check redundancy in hero
        for (const r of REDUNDANCY_PATTERNS) {
            if (r.pattern.test(heroContent)) {
                redundancies.push({ file: "hero", rule: r.name, reason: r.reason });
            }
        }
    }

    // Check TextLink rules
    for (const rule of TEXTLINK_RULES) {
        const content = contents[rule.file];
        if (!content) continue;
        stats.rulesChecked++;
        if (!rule.pattern.test(content)) {
            errors.push(`❌ [${rule.file}] Missing: ${rule.name}`);
        }
    }

    // Check CSS rules
    for (const rule of CSS_RULES) {
        const content = contents[rule.file];
        if (!content) continue;
        stats.rulesChecked++;
        if (!rule.pattern.test(content)) {
            errors.push(`❌ [${rule.file}] Missing: ${rule.name}`);
        }
    }

    // Report
    console.log("\n🎬 Hero Section Design Freeze Lint (Comprehensive)\n");
    console.log("━".repeat(55));

    console.log("\n📊 Scan Statistics:");
    console.log(`   Rules checked:     ${stats.rulesChecked}`);

    console.log("\n📁 Core Files:");
    for (const [key, filePath] of Object.entries(CORE_FILES)) {
        const exists = contents[key] ? "✓" : "✗";
        console.log(`   ${exists} ${key}: ${rel(filePath)}`);
    }

    if (redundancies.length > 0) {
        console.log(`\n⚠️  ${redundancies.length} redundancy warning(s):`);
        for (const r of redundancies) {
            console.log(`   - [${r.file}] ${r.rule}`);
            console.log(`     ${r.reason}`);
        }
    }

    if (errors.length === 0) {
        console.log("\n✅ All checks passed! Hero matches CK design freeze.\n");
        return 0;
    }

    console.log(`\n❌ ${errors.length} issue(s) found:\n`);
    errors.forEach((e) => console.log(`   ${e}`));
    console.log("\n");
    return 1;
}

process.exit(lint());
