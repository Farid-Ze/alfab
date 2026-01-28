import fs from "node:fs/promises";
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
    summary: z.string().min(10),
    benefits: z.array(z.string()),
    howToUse: z.string(),
});

const CatalogSchema = z.array(ProductSchema);

async function validate() {
    const filePath = path.resolve(process.cwd(), "src/content/products.json");
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

        console.log(`✅ Success: ${json.length} products validated against schema.`);

    } catch (error) {
        console.error("❌ Fatal Error:", error.message);
        process.exit(1);
    }
}

validate();
