/**
 * Image Utilities
 * 
 * Helper functions for image optimization and placeholders.
 */

/**
 * Generate a base64 blur placeholder for images
 * This provides a low-quality placeholder during loading
 */
export function generateBlurPlaceholder(
    width: number = 10,
    height: number = 10,
    color: string = "#f3f4f6"
): string {
    // Create minimal SVG blur placeholder
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${color}"/>
        </svg>
    `.trim();

    const base64 = Buffer.from(svg).toString("base64");
    return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Generate shimmer placeholder for skeleton loading
 */
export function generateShimmer(
    w: number = 700,
    h: number = 400
): string {
    const shimmer = `
        <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#f3f4f6">
                        <animate attributeName="offset" values="-2; 1" dur="1.5s" repeatCount="indefinite"/>
                    </stop>
                    <stop offset="50%" stop-color="#e5e7eb">
                        <animate attributeName="offset" values="-1; 2" dur="1.5s" repeatCount="indefinite"/>
                    </stop>
                    <stop offset="100%" stop-color="#f3f4f6">
                        <animate attributeName="offset" values="0; 3" dur="1.5s" repeatCount="indefinite"/>
                    </stop>
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#shimmer)"/>
        </svg>
    `.trim();

    const base64 = Buffer.from(shimmer).toString("base64");
    return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Common blur data URLs for different use cases
 */
export const blurPlaceholders = {
    // Neutral gray for general images
    default: generateBlurPlaceholder(10, 10, "#f3f4f6"),
    // Light for bright images
    light: generateBlurPlaceholder(10, 10, "#fafafa"),
    // Dark for dark images
    dark: generateBlurPlaceholder(10, 10, "#374151"),
    // Primary color tint
    primary: generateBlurPlaceholder(10, 10, "#1e3a5f"),
    // Secondary color tint
    secondary: generateBlurPlaceholder(10, 10, "#d4af37"),
} as const;

/**
 * Get aspect ratio dimensions
 */
export function getAspectRatioDimensions(
    aspectRatio: "16:9" | "4:3" | "1:1" | "3:2",
    width: number
): { width: number; height: number } {
    const ratios = {
        "16:9": 9 / 16,
        "4:3": 3 / 4,
        "1:1": 1,
        "3:2": 2 / 3,
    };

    return {
        width,
        height: Math.round(width * ratios[aspectRatio]),
    };
}
