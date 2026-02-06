import type { Product } from "@/lib/types";

// Mock data for products based on the redesign context (Ineo-Sense style)
const PRODUCTS: Product[] = [
    {
        slug: "scalp-therapy-shampoo",
        name: "Scalp Therapy Shampoo",
        brand: "BioPharma",
        audience: ["SALON"],
        functions: ["Cleaning", "Treatment"],
        categories: ["Hair Care", "Treatment"],
        summary: "Deep cleansing shampoo for sensitive scalps.",
        benefits: ["Soothes irritation", "Removes buildup"],
        howToUse: "Apply to wet hair, massage gently, rinse thoroughly.",
        image: { url: "/images/products/scalp-shampoo.jpg" },
    },
    {
        slug: "styling-matte-clay",
        name: "Matte Clay Paste",
        brand: "Groomsmen",
        audience: ["BARBER"],
        functions: ["Styling"],
        categories: ["Styling"],
        summary: "Strong hold with a natural matte finish.",
        benefits: ["All-day hold", "Water soluble"],
        howToUse: "Rub small amount between palms, apply to dry hair.",
        image: { url: "/images/products/matte-clay.jpg" },
    },
    {
        slug: "color-radiance-mask",
        name: "Color Radiance Mask",
        brand: "Vivace",
        audience: ["SALON"],
        functions: ["Color Protection"],
        categories: ["Hair Care", "Mask"],
        summary: "protects and prolongs hair color vibrancy.",
        benefits: ["UV protection", "Deep hydration"],
        howToUse: "Apply to towel-dried hair, leave for 5 mins, rinse.",
        image: { url: "/images/products/color-mask.jpg" },
    }
];

export function listProducts(locale: string = "en"): Product[] {
    // In a real app, this might fetch from CMS or DB and filter by locale
    return PRODUCTS;
}

export function getProductBySlug(slug: string, locale: string = "en"): Product | undefined {
    return PRODUCTS.find((p) => p.slug === slug);
}
