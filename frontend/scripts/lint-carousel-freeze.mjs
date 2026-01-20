#!/usr/bin/env node
/**
 * Editorial Carousel Design Freeze Lint (Comprehensive)
 *
 * Validates EditorialCarouselSection follows expert-level frontend practices:
 * - CSS-first card widths (no JS calculations)
 * - Responsive aspect ratios
 * - Refined scroll indicators (pill-shaped dots)
 * - Intelligent positioning using CSS variables
 * - No redundant/conflicting patterns
 *
 * Scans: EditorialCarouselSection.tsx, ScrollIndicators.tsx, globals.css
 * 
 * Run: npm run lint:carousel-freeze
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());

// ============================================================
// Core Files
// ============================================================
const CORE_FILES = {
    carousel: path.join(ROOT, "src/components/home/EditorialCarouselSection.tsx"),
    globals: path.join(ROOT, "src/app/globals.css"),
    scrollIndicators: path.join(ROOT, "src/components/ui/ScrollIndicators.tsx"),
};

function rel(p) {
    return path.relative(ROOT, p).replaceAll("\\", "/");
}

// ============================================================
// CSS Rules
// ============================================================
const CSS_RULES = [
    { name: "carousel-card class with clamp()", file: "globals", pattern: /\.carousel-card\s*\{[^}]*width:\s*clamp\(/ },
    { name: "Section overlap variable", file: "globals", pattern: /--section-overlap:\s*clamp\(/ },
    { name: "Desktop section overlap (10rem)", file: "globals", pattern: /@media.*min-width:\s*1024px.*--section-overlap:\s*10rem/s },
    { name: "Card padding variable", file: "globals", pattern: /--card-padding:\s*clamp\(/ },
];

// ============================================================
// Component Rules
// ============================================================
const COMPONENT_RULES = [
    { name: "Uses carousel-card CSS class", file: "carousel", pattern: /carousel-card/ },
    { name: "Uses data-carousel-card attribute", file: "carousel", pattern: /data-carousel-card/ },
    { name: "Responsive hero aspect ratio", file: "carousel", pattern: /aspect-\[1\.6\/1\].*lg:aspect-\[2\.5\/1\]/ },
    { name: "Dots positioned above overlap zone", file: "carousel", pattern: /bottom-\[calc\(var\(--section-overlap\)/ },
    { name: "Static arrow positioning (top-1/4)", file: "carousel", pattern: /topClassName.*top-1\/4/ },
    { name: "Uses useCarousel hook", file: "carousel", pattern: /useCarousel/ },
    { name: "Uses ScrollDots or ScrollProgressBar", file: "carousel", pattern: /ScrollDots|ScrollProgressBar/ },
];

// ============================================================
// ScrollIndicators Rules
// ============================================================
const INDICATOR_RULES = [
    { name: "Dots use rounded-full (pill shape)", file: "scrollIndicators", pattern: /rounded-full/ },
    { name: "Active dot expands (w-6)", file: "scrollIndicators", pattern: /isActive.*w-6/ },
    { name: "Inactive dot is circular (w-1.5)", file: "scrollIndicators", pattern: /w-1\.5/ },
    { name: "Smooth transition on dots", file: "scrollIndicators", pattern: /transition-all.*duration-300/ },
];

// ============================================================
// Banned Patterns
// ============================================================
const BANNED_PATTERNS = [
    { name: "JS getCardWidth function", file: "carousel", pattern: /getCardWidth\s*=\s*useCallback/, reason: "Use CSS-first approach" },
    { name: "cardWidth state variable", file: "carousel", pattern: /useState.*cardWidth|cardWidth.*useState/, reason: "Card widths should be CSS-controlled" },
    { name: "Inline width style on ProductCard", file: "carousel", pattern: /style=\{\{[^}]*width:\s*cardWidth/, reason: "Use .carousel-card CSS class" },
    { name: "productCardWidth constant", file: "carousel", pattern: /productCardWidth:\s*\d+/, reason: "Card widths are CSS-controlled" },
    { name: "Square dot indicators", file: "scrollIndicators", pattern: /h-2\.5\s+w-2\.5.*rounded-none/, reason: "Use pill-shaped indicators" },
    { name: "Ring on dot indicators", file: "scrollIndicators", pattern: /ring-1.*ring-indicator/, reason: "Refined dots don't use rings" },
];

// ============================================================
// Redundancy Patterns
// ============================================================
const REDUNDANCY_PATTERNS = [
    { name: "Multiple carousel hooks", file: "carousel", pattern: /useCarousel[^;]*;[^]*useCarousel/, reason: "Should use single carousel hook" },
    { name: "Duplicate scroll event listeners", file: "carousel", pattern: /addEventListener\(["']scroll["'][^;]*;[^]*addEventListener\(["']scroll["']/, reason: "Single scroll listener is sufficient" },
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

    // Check all required patterns
    const allRules = [...CSS_RULES, ...COMPONENT_RULES, ...INDICATOR_RULES];
    for (const rule of allRules) {
        const content = contents[rule.file];
        if (!content) continue;
        stats.rulesChecked++;
        if (!rule.pattern.test(content)) {
            errors.push(`❌ [${rule.file}] Missing: ${rule.name}`);
        }
    }

    // Check banned patterns
    for (const banned of BANNED_PATTERNS) {
        const content = contents[banned.file];
        if (!content) continue;
        if (banned.pattern.test(content)) {
            errors.push(`❌ [${banned.file}] BANNED: ${banned.name}`);
            errors.push(`   → ${banned.reason}`);
        }
    }

    // Check redundancy patterns
    for (const r of REDUNDANCY_PATTERNS) {
        const content = contents[r.file];
        if (!content) continue;
        if (r.pattern.test(content)) {
            redundancies.push({ file: r.file, rule: r.name, reason: r.reason });
        }
    }

    // Report
    console.log("\n🎠 Editorial Carousel Design Freeze Lint (Comprehensive)\n");
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
        console.log("\n✅ All checks passed! Carousel follows expert practices.\n");
        return 0;
    }

    console.log(`\n❌ ${errors.length} issue(s) found:\n`);
    errors.forEach((e) => console.log(`   ${e}`));
    console.log("\n");
    return 1;
}

process.exit(lint());
