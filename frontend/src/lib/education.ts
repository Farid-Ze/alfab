import type { Locale } from "@/lib/i18n";

import articlesEn from "@/content/education/articles.en.json";
import articlesId from "@/content/education/articles.id.json";
import eventsEn from "@/content/education/events.en.json";
import eventsId from "@/content/education/events.id.json";

export type EducationEvent = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // yyyy-MM-dd
  city: string;
  audience: string[];
  cta_label: string;
  body: string[];
};

export type EducationArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // yyyy-MM-dd
  body: string[];
};

export function listEvents(locale: Locale): EducationEvent[] {
  return (locale === "id" ? eventsId : eventsEn) as EducationEvent[];
}

export function listArticles(locale: Locale): EducationArticle[] {
  return (locale === "id" ? articlesId : articlesEn) as EducationArticle[];
}

export function getEventBySlug(locale: Locale, slug: string): EducationEvent | null {
  return listEvents(locale).find((e) => e.slug === slug) ?? null;
}

export function getArticleBySlug(locale: Locale, slug: string): EducationArticle | null {
  return listArticles(locale).find((a) => a.slug === slug) ?? null;
}

export function allEventSlugs(): string[] {
  return [...(eventsEn as EducationEvent[]), ...(eventsId as EducationEvent[])].map((e) => e.slug);
}

export function allArticleSlugs(): string[] {
  return [...(articlesEn as EducationArticle[]), ...(articlesId as EducationArticle[])].map((a) => a.slug);
}
