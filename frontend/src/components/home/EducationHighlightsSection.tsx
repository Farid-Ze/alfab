import Image from "next/image";
import AppLink from "@/components/ui/AppLink";
import { REF_CARD, REF_LIST, refListCardClassName } from "@/lib/referenceCards";
import type { EducationArticle, EducationEvent } from "@/lib/education";

export default function EducationHighlightsSection({
  localeBase,
  articles,
  events,
  leftLabel,
  rightLabel,
  readMoreLabel,
}: {
  localeBase: string;
  articles: (EducationArticle & { readTime?: number })[];
  events: EducationEvent[];
  leftLabel?: string;
  rightLabel?: string;
  readMoreLabel?: string;
}) {
  const articleItems = (articles ?? []).slice(0, 2);
  const eventItems = (events ?? []).slice(0, 2);
  const resolvedLeftLabel = leftLabel ?? "Articles";
  const resolvedRightLabel = rightLabel ?? "Events";

  const interleaved: Array<
    | { kind: "article"; slug: string; title: string; excerpt: string; date?: string }
    | { kind: "event"; slug: string; title: string; excerpt: string; date?: string; brand?: string; type: string; city: string; cta?: string }
  > = [];

  for (let i = 0; i < Math.max(articleItems.length, eventItems.length); i += 1) {
    const a = articleItems[i];
    if (a) interleaved.push({ kind: "article", slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.date });
    const e = eventItems[i];
    if (e)
      interleaved.push({
        kind: "event",
        slug: e.slug,
        title: e.title,
        excerpt: e.excerpt,
        date: e.date,
        brand: e.brand,
        type: e.type,
        city: e.city,
        cta: e.cta_label,
      });
  }

  return (
    <div className={REF_LIST.wrap}>
      {interleaved.map((item) => {
        const isArticle = item.kind === "article";
        const href = isArticle
          ? `${localeBase}/education/articles/${item.slug}`
          : `${localeBase}/education/events/${item.slug}`;

        const logoText = isArticle ? "AB" : item.city;
        const labelTag = isArticle ? resolvedLeftLabel : resolvedRightLabel;
        const actionText = isArticle ? (readMoreLabel ?? "Read more") : item.cta ?? (readMoreLabel ?? "Read more");

        const tags = isArticle
          ? [labelTag, item.date].filter(Boolean)
          : [labelTag, `#${item.type}`, item.brand, item.date].filter(Boolean);

        return (
          <AppLink key={`${item.kind}-${item.slug}`} href={href} underline="none" className={refListCardClassName()}>
            <div className={REF_CARD.mediaWrap}>
              <Image
                src="/images/education/training-placeholder.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={REF_CARD.mediaImg}
              />
            </div>

            <div className="flex items-start justify-start lg:justify-center lg:pt-1">
              <div className={REF_CARD.logoWrap} aria-hidden="true">
                <span className={REF_CARD.logoText}>{logoText}</span>
              </div>
            </div>

            <div>
              <h3 className={REF_CARD.title}>{item.title}</h3>
              <p className={REF_CARD.body}>{item.excerpt}</p>

              <div className={REF_CARD.metaRow}>
                {tags.map((t) => (
                  <span key={String(t)} className={REF_CARD.tag}>
                    {t}
                  </span>
                ))}
              </div>

              <div className={REF_CARD.actionRow}>
                <span className={REF_CARD.actionDot} aria-hidden="true" />
                <span className={REF_CARD.actionText}>{actionText}</span>
              </div>
            </div>
          </AppLink>
        );
      })}
    </div>
  );
}
