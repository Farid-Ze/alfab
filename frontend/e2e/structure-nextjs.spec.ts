import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * Mandatory Files E2E Tests
 * 
 * These tests ensure that critical Next.js 16 files
 * always exist in the project structure.
 * 
 * Run with: npm run test:e2e
 */

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

// Helper to check file existence
function fileExists(relativePath: string): boolean {
    return fs.existsSync(path.join(ROOT, relativePath));
}

test.describe("Mandatory Files - App Router", () => {
    test("root layout exists", () => {
        expect(fileExists("src/app/layout.tsx")).toBe(true);
    });

    test("locale layout exists", () => {
        expect(fileExists("src/app/[locale]/layout.tsx")).toBe(true);
    });

    test("homepage exists", () => {
        expect(fileExists("src/app/[locale]/page.tsx")).toBe(true);
    });

    test("error boundary exists", () => {
        expect(fileExists("src/app/[locale]/error.tsx")).toBe(true);
    });

    test("not-found page exists", () => {
        expect(fileExists("src/app/[locale]/not-found.tsx")).toBe(true);
    });

    test("loading state exists", () => {
        expect(fileExists("src/app/[locale]/loading.tsx")).toBe(true);
    });

    test("global-error handler exists", () => {
        expect(fileExists("src/app/global-error.tsx")).toBe(true);
    });

    test("globals.css exists", () => {
        expect(fileExists("src/app/globals.css")).toBe(true);
    });
});

test.describe("Mandatory Files - SEO", () => {
    test("sitemap.ts exists", () => {
        expect(fileExists("src/app/sitemap.ts")).toBe(true);
    });

    test("robots.ts exists", () => {
        expect(fileExists("src/app/robots.ts")).toBe(true);
    });
});

test.describe("Mandatory Files - API Routes", () => {
    test("health endpoint exists", () => {
        expect(fileExists("src/app/api/health/route.ts")).toBe(true);
    });
});

test.describe("Mandatory Files - Infrastructure", () => {
    test("middleware.ts exists", () => {
        expect(fileExists("src/middleware.ts")).toBe(true);
    });

    test("instrumentation.ts exists", () => {
        expect(fileExists("src/instrumentation.ts")).toBe(true);
    });
});

test.describe("Mandatory Files - Lib Utilities", () => {
    test("env.ts exists", () => {
        expect(fileExists("src/lib/env.ts")).toBe(true);
    });

    test("config.ts exists", () => {
        expect(fileExists("src/lib/config.ts")).toBe(true);
    });

    test("i18n.ts exists", () => {
        expect(fileExists("src/lib/i18n.ts")).toBe(true);
    });

    test("utils.ts exists", () => {
        expect(fileExists("src/lib/utils.ts")).toBe(true);
    });

    test("logger.ts exists", () => {
        expect(fileExists("src/lib/logger.ts")).toBe(true);
    });
});

test.describe("Mandatory Files - Configuration", () => {
    test("next.config.ts exists", () => {
        expect(fileExists("next.config.ts")).toBe(true);
    });

    test("tsconfig.json exists", () => {
        expect(fileExists("tsconfig.json")).toBe(true);
    });

    test("package.json exists", () => {
        expect(fileExists("package.json")).toBe(true);
    });

    test("vercel.json exists", () => {
        expect(fileExists("vercel.json")).toBe(true);
    });
});

test.describe("Mandatory Files - i18n Messages", () => {
    test("en.json exists", () => {
        expect(fileExists("messages/en.json")).toBe(true);
    });

    test("id.json exists", () => {
        expect(fileExists("messages/id.json")).toBe(true);
    });
});
