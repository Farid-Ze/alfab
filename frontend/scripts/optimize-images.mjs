import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Script to optimize large PNG assets in public/images
 * Target: Reduce file size > 500KB while maintaining quality.
 * Run: node scripts/optimize-images.mjs
 */

const IMAGES_DIR = path.resolve(process.cwd(), 'public/images');
const MAX_SIZE_BYTES = 500 * 1024; // 500KB threshold

async function optimizeImages(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            await optimizeImages(fullPath);
            continue;
        }

        if (!item.name.endsWith('.png') && !item.name.endsWith('.jpg')) continue;

        const stats = fs.statSync(fullPath);
        if (stats.size > MAX_SIZE_BYTES) {
            console.log(`Optimization Candidate: ${item.name} (${(stats.size / 1024).toFixed(0)}KB)`);

            try {
                const buffer = fs.readFileSync(fullPath);
                let optimizedBuffer;

                if (item.name.endsWith('.png')) {
                    optimizedBuffer = await sharp(buffer)
                        .png({ quality: 80, compressionLevel: 9 })
                        .toBuffer();
                } else {
                    optimizedBuffer = await sharp(buffer)
                        .jpeg({ quality: 80, mozjpeg: true })
                        .toBuffer();
                }

                if (optimizedBuffer.length < stats.size) {
                    fs.writeFileSync(fullPath, optimizedBuffer);
                    const newStats = fs.statSync(fullPath);
                    console.log(`✅ Optimized: ${item.name} -> ${(newStats.size / 1024).toFixed(0)}KB (Saved: ${((stats.size - newStats.size) / 1024).toFixed(0)}KB)`);
                } else {
                    console.log(`⏩ Skipped: ${item.name} (Optimization didn't reduce size based on constraints)`);
                }
            } catch (err) {
                console.error(`❌ Error optimizing ${item.name}:`, err.message);
            }
        }
    }
}

console.log('🖼️  Starting Image Optimization Scan...');
await optimizeImages(IMAGES_DIR);
console.log('✨  Scan Complete.');
