import { createClient } from "@sanity/client";
import fs from "node:fs/promises";
import path from "node:path";

async function loadEnvFromExample() {
  const envPath = path.resolve(process.cwd(), ".env.example");
  try {
    const raw = await fs.readFile(envPath, "utf8");
    raw.split(/\r?\n/).forEach((line) => {
      if (!line || line.startsWith("#")) return;
      const idx = line.indexOf("=");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (!process.env[key] && key) {
        process.env[key] = value;
      }
    });
  } catch {
    // Ignore if .env.example is missing
  }
}

await loadEnvFromExample();

const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION ?? process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing SANITY_PROJECT_ID/NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_DATASET/NEXT_PUBLIC_SANITY_DATASET.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true,
});

const root = path.resolve(process.cwd(), "src", "content");
const productsPath = path.join(root, "data", "products.json");
const homepagePath = path.join(root, "data", "homepage.json");
const eventsIdPath = path.join(root, "education", "events.id.json");
const eventsEnPath = path.join(root, "education", "events.en.json");
const articlesIdPath = path.join(root, "education", "articles.id.json");
const articlesEnPath = path.join(root, "education", "articles.en.json");

async function writeJson(filePath, data) {
  const serialized = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, serialized + "\n", "utf8");
}

async function fetchProducts() {
  const query = `*[_type == "product"]{
    "slug": slug.current,
    name,
    brand,
    audience,
    functions,
    categories,
    summary,
    benefits,
    howToUse,
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "caption": image.caption
    }
  } | order(name asc)`;

  return client.fetch(query);
}

async function fetchEvents(locale) {
  const query = `*[_type == "educationEvent" && locale == $locale]{
    "slug": slug.current,
    title,
    brand,
    type,
    excerpt,
    date,
    city,
    audience,
    cta_label,
    body
  } | order(date desc)`;

  return client.fetch(query, { locale });
}

async function fetchArticles(locale) {
  const query = `*[_type == "educationArticle" && locale == $locale]{
    "slug": slug.current,
    title,
    excerpt,
    date,
    body
  } | order(date desc)`;

  return client.fetch(query, { locale });
}

async function fetchHomepage() {
  const query = `*[_type == "homepageConfig"][0]{
    categoryLabels
  }`;

  return client.fetch(query);
}

async function sync() {
  try {
    const [products, eventsId, eventsEn, articlesId, articlesEn, homepage] = await Promise.all([
      fetchProducts(),
      fetchEvents("id"),
      fetchEvents("en"),
      fetchArticles("id"),
      fetchArticles("en"),
      fetchHomepage(),
    ]);

    if (Array.isArray(products) && products.length > 0) {
      await writeJson(productsPath, products);
      console.log(`✔ products.json updated (${products.length} items)`);
    } else {
      console.warn("⚠ No products returned; products.json not updated.");
    }

    if (homepage?.categoryLabels) {
      const normalize = (items = []) =>
        Array.isArray(items)
          ? items.reduce((acc, item) => {
              if (item?.key && item?.value) acc[item.key] = item.value;
              return acc;
            }, {})
          : items;

      const categoryLabels = {
        en: normalize(homepage.categoryLabels.en),
        id: normalize(homepage.categoryLabels.id),
      };

      const hasLabels = Object.keys(categoryLabels.en || {}).length > 0 || Object.keys(categoryLabels.id || {}).length > 0;

      if (hasLabels) {
        await writeJson(homepagePath, { categoryLabels });
        console.log("✔ homepage.json updated");
      } else {
        console.warn("⚠ homepage config empty; homepage.json not updated.");
      }
    } else {
      console.warn("⚠ homepage config missing; homepage.json not updated.");
    }

    if (Array.isArray(eventsId) && eventsId.length > 0) {
      await writeJson(eventsIdPath, eventsId);
      console.log(`✔ events.id.json updated (${eventsId.length} items)`);
    } else {
      console.warn("⚠ No events (id) returned; events.id.json not updated.");
    }

    if (Array.isArray(eventsEn) && eventsEn.length > 0) {
      await writeJson(eventsEnPath, eventsEn);
      console.log(`✔ events.en.json updated (${eventsEn.length} items)`);
    } else {
      console.warn("⚠ No events (en) returned; events.en.json not updated.");
    }

    if (Array.isArray(articlesId) && articlesId.length > 0) {
      await writeJson(articlesIdPath, articlesId);
      console.log(`✔ articles.id.json updated (${articlesId.length} items)`);
    } else {
      console.warn("⚠ No articles (id) returned; articles.id.json not updated.");
    }

    if (Array.isArray(articlesEn) && articlesEn.length > 0) {
      await writeJson(articlesEnPath, articlesEn);
      console.log(`✔ articles.en.json updated (${articlesEn.length} items)`);
    } else {
      console.warn("⚠ No articles (en) returned; articles.en.json not updated.");
    }
  } catch (error) {
    console.error("❌ Failed to sync Sanity content", error);
    process.exit(1);
  }
}

sync();
