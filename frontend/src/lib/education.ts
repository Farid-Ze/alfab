import type { Locale } from "@/lib/i18n";
import type { EducationEvent, EducationArticle } from "@/lib/types";
import { logger } from "@/lib/logger";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type { EducationEvent, EducationArticle };

// JSON fallback imports
import articlesEn from "@/content/education/articles.en.json";
import articlesId from "@/content/education/articles.id.json";
import eventsEn from "@/content/education/events.en.json";
import eventsId from "@/content/education/events.id.json";

// Cache for Supabase data
let _supabaseEvents: Record<Locale, EducationEvent[] | null> = { en: null, id: null };
let _supabaseArticles: Record<Locale, EducationArticle[] | null> = { en: null, id: null };

/**
 * Fetch events from Supabase (if configured)
 */
async function fetchEventsFromSupabase(locale: Locale): Promise<EducationEvent[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase()
      .from("events")
      .select("*")
      .eq("locale", locale)
      .order("event_date", { ascending: false });

    if (error) {
      logger.error("[Education] Supabase events fetch error", { error, locale });
      return null;
    }

    if (!data || data.length === 0) return null;

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      brand: row.brand || "",
      type: row.event_type || "training",
      excerpt: row.excerpt || "",
      date: row.event_date || "",
      city: row.city || "",
      audience: row.audience || [],
      cta_label: row.cta_label,
      body: row.body || [],
    }));
  } catch (err) {
    logger.error("[Education] Supabase connection error", { error: err });
    return null;
  }
}

/**
 * Fetch articles from Supabase (if configured)
 */
async function fetchArticlesFromSupabase(locale: Locale): Promise<EducationArticle[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase()
      .from("articles")
      .select("*")
      .eq("locale", locale)
      .order("date", { ascending: false });

    if (error) {
      logger.error("[Education] Supabase articles fetch error", { error, locale });
      return null;
    }

    if (!data || data.length === 0) return null;

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt || "",
      date: row.date || "",
      body: row.body || [],
    }));
  } catch (err) {
    logger.error("[Education] Supabase connection error", { error: err });
    return null;
  }
}

// JSON fallback functions
function getEventsFromJSON(locale: Locale): EducationEvent[] {
  return (locale === "id" ? eventsId : eventsEn) as EducationEvent[];
}

function getArticlesFromJSON(locale: Locale): EducationArticle[] {
  return (locale === "id" ? articlesId : articlesEn) as EducationArticle[];
}

/**
 * List events (synchronous - JSON only, for backward compatibility)
 */
export function listEvents(locale: Locale): EducationEvent[] {
  return getEventsFromJSON(locale);
}

/**
 * List events (async - tries Supabase first, falls back to JSON)
 */
export async function listEventsAsync(locale: Locale): Promise<EducationEvent[]> {
  if (_supabaseEvents[locale]) return _supabaseEvents[locale]!;

  const supabaseEvents = await fetchEventsFromSupabase(locale);
  if (supabaseEvents && supabaseEvents.length > 0) {
    _supabaseEvents[locale] = supabaseEvents;
    return supabaseEvents;
  }

  return getEventsFromJSON(locale);
}

/**
 * List articles (synchronous - JSON only, for backward compatibility)
 */
export function listArticles(locale: Locale): EducationArticle[] {
  return getArticlesFromJSON(locale);
}

/**
 * List articles (async - tries Supabase first, falls back to JSON)
 */
export async function listArticlesAsync(locale: Locale): Promise<EducationArticle[]> {
  if (_supabaseArticles[locale]) return _supabaseArticles[locale]!;

  const supabaseArticles = await fetchArticlesFromSupabase(locale);
  if (supabaseArticles && supabaseArticles.length > 0) {
    _supabaseArticles[locale] = supabaseArticles;
    return supabaseArticles;
  }

  return getArticlesFromJSON(locale);
}

/**
 * Get event by slug (synchronous - JSON only)
 */
export function getEventBySlug(locale: Locale, slug: string): EducationEvent | null {
  return listEvents(locale).find((e) => e.slug === slug) ?? null;
}

/**
 * Get event by slug (async - tries Supabase first)
 */
export async function getEventBySlugAsync(locale: Locale, slug: string): Promise<EducationEvent | null> {
  const events = await listEventsAsync(locale);
  return events.find((e) => e.slug === slug) ?? null;
}

/**
 * Calculate read time for article content
 */
export function calculateReadTime(content: string[]): number {
  const text = content.join(" ");
  if (!text.trim()) return 0;
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

/**
 * Get article by slug (synchronous - JSON only)
 */
export function getArticleBySlug(locale: Locale, slug: string): (EducationArticle & { readTime: number }) | null {
  const article = listArticles(locale).find((a) => a.slug === slug);
  if (!article) return null;

  return {
    ...article,
    readTime: calculateReadTime(article.body)
  };
}

/**
 * Get article by slug (async - tries Supabase first)
 */
export async function getArticleBySlugAsync(locale: Locale, slug: string): Promise<(EducationArticle & { readTime: number }) | null> {
  const articles = await listArticlesAsync(locale);
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;

  return {
    ...article,
    readTime: calculateReadTime(article.body)
  };
}
