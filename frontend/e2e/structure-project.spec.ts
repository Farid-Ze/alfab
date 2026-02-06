import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * Fundamentals E2E Tests
 * 
 * Verify fundamental utilities, hooks, components, and types
 * exist as per project architecture.
 */

const ROOT = path.resolve(__dirname, "..");

function fileExists(relativePath: string): boolean {
    return fs.existsSync(path.join(ROOT, relativePath));
}

test.describe("Fundamentals - Types", () => {
    test("types/index.ts exists", () => {
        expect(fileExists("src/types/index.ts")).toBe(true);
    });

    test("types/api.ts exists", () => {
        expect(fileExists("src/types/api.ts")).toBe(true);
    });

    test("types/components.ts exists", () => {
        expect(fileExists("src/types/components.ts")).toBe(true);
    });

    test("types/i18n.ts exists", () => {
        expect(fileExists("src/types/i18n.ts")).toBe(true);
    });
});

test.describe("Fundamentals - Lib Utilities", () => {
    test("lib/index.ts barrel export exists", () => {
        expect(fileExists("src/lib/index.ts")).toBe(true);
    });

    test("lib/animations.ts exists", () => {
        expect(fileExists("src/lib/animations.ts")).toBe(true);
    });

    test("lib/constants.ts exists", () => {
        expect(fileExists("src/lib/constants.ts")).toBe(true);
    });

    test("lib/schemas.ts exists", () => {
        expect(fileExists("src/lib/schemas.ts")).toBe(true);
    });

    test("lib/api.ts exists", () => {
        expect(fileExists("src/lib/api.ts")).toBe(true);
    });

    test("lib/image.ts exists", () => {
        expect(fileExists("src/lib/image.ts")).toBe(true);
    });
});

test.describe("Fundamentals - Hooks", () => {
    test("hooks/index.ts barrel export exists", () => {
        expect(fileExists("src/hooks/index.ts")).toBe(true);
    });

    test("hooks/useMediaQuery.ts exists", () => {
        expect(fileExists("src/hooks/useMediaQuery.ts")).toBe(true);
    });

    test("hooks/useScrollPosition.ts exists", () => {
        expect(fileExists("src/hooks/useScrollPosition.ts")).toBe(true);
    });

    test("hooks/useLocalStorage.ts exists", () => {
        expect(fileExists("src/hooks/useLocalStorage.ts")).toBe(true);
    });

    test("hooks/useIntersectionObserver.ts exists", () => {
        expect(fileExists("src/hooks/useIntersectionObserver.ts")).toBe(true);
    });
});

test.describe("Fundamentals - UI Components", () => {
    test("components/ui/index.ts barrel export exists", () => {
        expect(fileExists("src/components/ui/index.ts")).toBe(true);
    });

    test("components/ui/Container.tsx exists", () => {
        expect(fileExists("src/components/ui/Container.tsx")).toBe(true);
    });

    test("components/ui/Section.tsx exists", () => {
        expect(fileExists("src/components/ui/Section.tsx")).toBe(true);
    });

    test("components/ui/Button.tsx exists", () => {
        expect(fileExists("src/components/ui/Button.tsx")).toBe(true);
    });

    test("components/ui/Link.tsx exists", () => {
        expect(fileExists("src/components/ui/Link.tsx")).toBe(true);
    });

    test("components/ui/WhatsAppCTA.tsx exists", () => {
        expect(fileExists("src/components/ui/WhatsAppCTA.tsx")).toBe(true);
    });

    test("components/ui/Shimmer.tsx exists", () => {
        expect(fileExists("src/components/ui/Shimmer.tsx")).toBe(true);
    });
});

test.describe("Fundamentals - Site Components", () => {
    test("components/site/index.ts barrel export exists", () => {
        expect(fileExists("src/components/site/index.ts")).toBe(true);
    });

    test("components/site/SiteHeader.tsx exists", () => {
        expect(fileExists("src/components/site/SiteHeader.tsx")).toBe(true);
    });

    test("components/site/SiteFooter.tsx exists", () => {
        expect(fileExists("src/components/site/SiteFooter.tsx")).toBe(true);
    });
});

test.describe("Fundamentals - SEO & Analytics Components", () => {
    test("components/seo/JsonLd.tsx exists", () => {
        expect(fileExists("src/components/seo/JsonLd.tsx")).toBe(true);
    });

    test("components/analytics/WebVitals.tsx exists", () => {
        expect(fileExists("src/components/analytics/WebVitals.tsx")).toBe(true);
    });
});

test.describe("Fundamentals - Providers", () => {
    test("providers/index.tsx exists", () => {
        expect(fileExists("src/providers/index.tsx")).toBe(true);
    });
});

test.describe("Fundamentals - Styles", () => {
    test("styles/tokens.css exists", () => {
        expect(fileExists("src/styles/tokens.css")).toBe(true);
    });
});
