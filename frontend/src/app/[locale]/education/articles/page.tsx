import type { Metadata } from "next";

import StaggerReveal from "@/components/ui/StaggerReveal";
import AppLink from "@/components/ui/AppLink";
import Page from "@/components/layout/Page";
import Container from "@/components/layout/Container";
import { listArticles, calculateReadTime } from "@/lib/education";
import { formatDate, normalizeLocale, t } from "@/lib/i18n";

/**
 * Education Articles Listing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  return {
    title: tx.education.hub.sections.articles,
    description: tx.seo.educationDescription,
    alternates: {
      canonical: `/${resolved}/education/articles`,
      languages: {
        en: "/en/education/articles",
        id: "/id/education/articles",
      },
    },
  };
}

export default async function EducationArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  const articles = listArticles(resolved).map((article) => ({
    ...article,
    readTime: calculateReadTime(article.body),
  }));

  return (
    <Page>
      <Container>
        <StaggerReveal delay={0.1} className="mb-12">
          <p className="type-kicker text-muted mb-4">{tx.education.hub.kicker}</p>
          <h1 className="type-h1 text-foreground mb-4">{tx.education.hub.sections.articles}</h1>
          <p className="type-body text-foreground-muted max-w-2xl">
            {tx.education.hub.heroBody}
          </p>
        </StaggerReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <AppLink
              key={article.slug}
              href={`/${resolved}/education/articles/${article.slug}`}
              className="group"
            >
              <div
                className="aspect-video rounded-2xl bg-gradient-to-br from-subtle to-subtle-hover mb-4 overflow-hidden shadow-elegant-box"
              >
                <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform-elegant">
                  <span className="type-ui-sm text-muted">{tx.education.hub.imageAlt}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 type-data text-muted mb-2">
                <span>{formatDate(article.date, resolved)}</span>
                <span>•</span>
                <span>{article.readTime} {tx.education.hub.labels.readTime}</span>
              </div>

              <h2 className="type-h3 text-foreground group-hover:text-foreground-muted transition-colors mb-2">
                {article.title}
              </h2>

              <p className="type-body text-muted line-clamp-2">
                {article.excerpt}
              </p>
            </AppLink>
          ))}
        </div>
      </Container>
    </Page>
  );
}
