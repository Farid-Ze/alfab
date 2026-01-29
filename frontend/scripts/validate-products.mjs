import fs from "node:fs/promises";
import { existsSync } from "node:fs"; // Fix for sync check
import path from "node:path";
import { z } from "zod";

// TOGAF Data Domain: Product Schema Definition
// Must match src/lib/types.ts
const ProductSchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    brand: z.string(),
    audience: z.array(z.enum(["SALON", "BARBER"])),
    functions: z.array(z.string()),
    // Taxonomy Normalization (Task 53)
    categories: z.array(z.enum([
        "shampoo",
        "styling",
        "treatment",
        "color",
        "grooming"
    ])).optional(),
    image: z.object({
        url: z.string(), // Local paths allowed
        alt: z.string().min(5),
        caption: z.string().optional()
    }),
    summary: z.string().min(10),
    benefits: z.array(z.string()),
    howToUse: z.string(),
});

const CatalogSchema = z.array(ProductSchema);

async function validate() {
    const filePath = path.resolve(process.cwd(), "src/content/data/products.json");
    console.log(`🔍 Validating Data Architecture: ${filePath}`);

    try {
        const raw = await fs.readFile(filePath, "utf-8");
        const json = JSON.parse(raw);

        const result = CatalogSchema.safeParse(json);

        if (!result.success) {
            console.error("\n❌ TOGAF Data Integrity Check Failed:");
            result.error.errors.forEach((err) => {
                console.error(`   - Path: [${err.path.join(" > ")}] : ${err.message}`);
            });
            process.exit(1);
        }

        // COBIT: Data Integrity Check (Phase 5.1)
        // Verify local asset existence
        console.log("🔍 Verifying Asset Integrity...");
        let assetErrors = 0;

        result.data.forEach((product) => {
            const imgUrl = product.image.url;
            if (imgUrl.startsWith("/")) {
                // Remove query params if any
                const cleanPath = imgUrl.split('?')[0];
                const publicPath = path.join(process.cwd(), "public", cleanPath);

                // Allow SVG/JPG/PNG
                if (!existsSync(publicPath)) {
                    console.error(`❌ Broken Asset Link: Product '${product.slug}' references '${cleanPath}' which does not exist.`);
                    assetErrors++;
                }
            }
        });

        if (assetErrors > 0) {
            console.error(`\n❌ Validation Failed: ${assetErrors} broken asset links found.`);
            process.exit(1);
        }

        console.log(`✅ Success: ${json.length} products validated against schema.`);

    } catch (error) {
        console.error("❌ Fatal Error:", error.message);
        process.exit(1);
    }
}

validate();
