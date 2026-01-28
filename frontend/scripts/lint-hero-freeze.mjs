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
// ============================================================
// Core Files
// ============================================================
const CORE_FILES = {
    hero: path.join(ROOT, "src/components/home/HomeHero.tsx"),
    heroContent: path.join(ROOT, "src/components/home/HeroContent.tsx"), // New Split
    heroVideo: path.join(ROOT, "src/components/home/HeroVideo.tsx"),     // New Split
    textLink: path.join(ROOT, "src/components/ui/TextLink.tsx"),
    globals: path.join(ROOT, "src/app/globals.css"),
};

function rel(p) {
    return path.relative(ROOT, p).replaceAll("\\", "/");
}

// ============================================================
// Hero Required Patterns
// ============================================================
// Logic split between Parent, Video, and Content
const HERO_RULES = [
    { name: "Hero section with aria-label", file: "hero", pattern: /aria-label.*Hero/ },
    { name: "Responsive height (h-[70vh] mobile)", file: "hero", pattern: /h-\[70vh\]/ },
    { name: "Responsive aspect (sm:aspect-[16/9])", file: "hero", pattern: /sm:.*aspect-\[16\/9\]/ },
    { name: "Max height constraint (85vh)", file: "hero", pattern: /max-h-\[85vh\]/ },

    // Video Component logic
    { name: "Video with autoplay/muted/loop", file: "heroVideo", pattern: /<video[^>]*autoPlay[^>]*muted[^>]*loop/s },

    // Parent logic (Gradients are in HomeHero.tsx)
    { name: "Right-to-left gradient overlay", file: "hero", pattern: /bg-gradient-to-r.*from-foreground\/(80|70)/ },
    { name: "Bottom-to-top gradient overlay", file: "hero", pattern: /bg-gradient-to-t.*from-foreground\/(30|40)/ },

    // Content Component logic
    { name: "Bottom positioning (items-end)", file: "heroContent", pattern: /items-end.*pb-12/ },
    { name: "Content max-width (120rem)", file: "heroContent", pattern: /max-w-\[120rem\]/ },
    { name: "type-hero-kicker typography", file: "heroContent", pattern: /type-hero-kicker.*ui-hero-on-media/ },
    { name: "type-hero headline", file: "heroContent", pattern: /type-hero\s+ui-hero-on-media|type-hero.*ui-hero-on-media/ },
    { name: "type-hero-body description", file: "heroContent", pattern: /type-hero-body.*ui-hero-on-media-muted/ },
    { name: "type-hero-note supporting text", file: "heroContent", pattern: /type-hero-note.*ui-hero-on-media-subtle/ },
    { name: "TextLink with onDark", file: "heroContent", pattern: /TextLink[^>]*onDark/ },
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
    // Updated loop to check specific file per rule
    for (const rule of HERO_RULES) {
        // Fallback to 'hero' if file not specified (legacy rules)
        const targetFile = rule.file || "hero";
        const content = contents[targetFile];

        if (content) {
            stats.rulesChecked++;
            if (!rule.pattern.test(content)) {
                errors.push(`❌ [${targetFile}] Missing: ${rule.name}`);
            }
        }
    }

    // Check banned patterns (Scan ALL Hero files)
    const heroFiles = ["hero", "heroContent", "heroVideo"];
    for (const key of heroFiles) {
        const content = contents[key];
        if (!content) continue;

        for (const banned of BANNED_PATTERNS) {
            if (banned.pattern.test(content)) {
                errors.push(`❌ [${key}] BANNED: ${banned.name}`);
                errors.push(`   → ${banned.reason}`);
            }
        }

        // Check redundancy
        for (const r of REDUNDANCY_PATTERNS) {
            if (r.pattern.test(content)) {
                redundancies.push({ file: key, rule: r.name, reason: r.reason });
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
