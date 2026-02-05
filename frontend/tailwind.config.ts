import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration
 * 
 * Next.js 16 Best Practices:
 * - Extended theme with custom ineo-sense color palette
 * - Custom utilities for gradients and borders
 */
const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: false, // B2B light-only theme
    theme: {
        extend: {
            // ineo-sense color palette
            colors: {
                ineo: {
                    mint: "#9BE8E2",
                    "mint-light": "#E6F9F7",
                    teal: "#4DBEB5",
                    "teal-dark": "#2D9E95",
                    navy: "#0A1F44", // Dark navy for titles
                },
            },
            // Custom font sizes for hero
            fontSize: {
                "hero": ["clamp(3rem, 8vw, 5.5rem)", { lineHeight: "1.05", fontWeight: "700" }],
                "section": ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "1.2", fontWeight: "600" }],
            },
            // Border widths
            borderWidth: {
                "3": "3px",
            },
            // Min heights for cards
            minHeight: {
                "card": "280px",
                "card-sm": "200px",
            },
            // Spacing
            spacing: {
                "section": "100px",
                "section-sm": "60px",
            },
            // Z-index layers
            zIndex: {
                "loading": "100",
                "skip": "200",
            },
        },
    },
    plugins: [],
};

export default config;
