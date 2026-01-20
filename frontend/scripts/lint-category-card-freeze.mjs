#!/usr/bin/env node
/**
 * Category Preview Design Freeze Lint
 * 
 * Validates the HeroImageStrip dropdown preview design:
 * - Framer Motion transitions (ImageTransition, ContentTransition)
 * - Direction-aware animations
 * - Glass morphism container
 * - Gradient overlay for text readability
 * 
 * Updated: 2026-01-19 for dropdown preview design
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const COMPONENT_PATH = resolve("src/components/home/HeroImageStrip.tsx");
const TRANSITION_PATH = resolve("src/components/ui/ImageTransition.tsx");

// ============================================================
// Required Patterns (must exist)
// ============================================================
const REQUIRED_PATTERNS = [
    {
        name: "ImageTransition component import",
        file: "component",
        pattern: /import.*ImageTransition.*from/,
        reason: "Uses Framer Motion ImageTransition for smooth image swaps",
    },
    {
        name: "ContentTransition component import",
        file: "component",
        pattern: /import.*ContentTransition.*from/,
        reason: "Uses Framer Motion ContentTransition for text animations",
    },
    {
        name: "CategoryPreviewDropdown component",
        file: "component",
        pattern: /function\s+CategoryPreviewDropdown/,
        reason: "Uses dropdown preview pattern for category hover",
    },
    {
        name: "GradientOverlay component",
        file: "component",
        pattern: /function\s+GradientOverlay/,
        reason: "Uses gradient overlay for text readability on images",
    },
    {
        name: "Direction-aware transitions (previousIndex)",
        file: "component",
        pattern: /previousIndex/,
        reason: "Tracks previous index for direction-aware slide animations",
    },
    {
        name: "Debounced close for smooth UX",
        file: "component",
        pattern: /closeTimeoutRef|debounce.*close/i,
        reason: "Uses debounced close to prevent flicker",
    },
    {
        name: "Visibility control for dropdown",
        file: "component",
        pattern: /isVisible.*visibility|visibility.*isVisible/,
        reason: "Controls dropdown visibility to prevent ghost hover zones",
    },
];

// ============================================================
// ImageTransition.tsx Rules
// ============================================================
const TRANSITION_RULES = [
    {
        name: "Framer Motion AnimatePresence",
        file: "transition",
        pattern: /AnimatePresence/,
        reason: "Uses AnimatePresence for enter/exit animations",
    },
    {
        name: "Motion div for animation",
        file: "transition",
        pattern: /motion\.div/,
        reason: "Uses motion.div for animated elements",
    },
    {
        name: "Spring or fast transition",
        file: "transition",
        pattern: /spring|duration.*0\.[0-2]/,
        reason: "Uses fast transitions (< 200ms) or spring physics",
    },
];

// ============================================================
// Banned Patterns (must NOT exist in new design)
// ============================================================
const BANNED_PATTERNS = [
    {
        name: "Old CrossFadeImage usage",
        file: "component",
        pattern: /<CrossFadeImage[^>]*isActive/,
        reason: "CrossFadeImage is replaced by ImageTransition with Framer Motion",
    },
    {
        name: "Old PreviewContent usage",
        file: "component",
        pattern: /<PreviewContent[^>]*isActive/,
        reason: "PreviewContent is replaced by ContentTransition with Framer Motion",
    },
];

// ============================================================
// Runner
// ============================================================
function main() {
    console.log("\n🎴 Category Preview Design Freeze Lint\n");
    console.log("━".repeat(50));

    const errors = [];

    // Load files
    const files = {
        component: existsSync(COMPONENT_PATH) ? readFileSync(COMPONENT_PATH, "utf-8") : null,
        transition: existsSync(TRANSITION_PATH) ? readFileSync(TRANSITION_PATH, "utf-8") : null,
    };

    if (!files.component) {
        errors.push("❌ HeroImageStrip.tsx not found");
    }
    if (!files.transition) {
        errors.push("❌ ImageTransition.tsx not found");
    }

    // Check required patterns
    for (const rule of [...REQUIRED_PATTERNS, ...TRANSITION_RULES]) {
        const content = files[rule.file];
        if (!content) continue;

        if (!rule.pattern.test(content)) {
            errors.push(`❌ Missing: ${rule.name}`);
            errors.push(`   Reason: ${rule.reason}`);
        }
    }

    // Check banned patterns
    for (const rule of BANNED_PATTERNS) {
        const content = files[rule.file];
        if (!content) continue;

        if (rule.pattern.test(content)) {
            errors.push(`❌ Found banned pattern: ${rule.name}`);
            errors.push(`   Reason: ${rule.reason}`);
        }
    }

    // Results
    console.log("");
    if (errors.length === 0) {
        console.log("✅ All checks passed! Category preview follows frozen design.\n");
        process.exit(0);
    } else {
        for (const e of errors) console.log(e);
        console.log(`\n❌ ${Math.ceil(errors.length / 2)} issue(s) found.\n`);
        process.exit(1);
    }
}

main();
