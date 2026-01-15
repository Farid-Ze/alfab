"use client";

import { getArticleBySlug } from "@/lib/education";
import { t } from "@/lib/i18n";

import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";

function IconChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
  );
}

function IconDocument(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EducationArticleDetailClient({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;
  const article = slug ? getArticleBySlug(locale, slug) : null;

  if (!article) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="h-16 w-16 rounded-full bg-subtle flex items-center justify-center">
          <IconDocument className="h-8 w-8 text-muted" />
        </div>
        <div className="space-y-2">
          <h1 className="type-h3">{tx.education.article.notFound.title}</h1>
          <p className="type-body text-muted max-w-md">{tx.education.article.notFound.body}</p>
        </div>
        <AppLink 
          href={`${base}/education`}
          className="inline-flex items-center gap-2 type-body-strong text-foreground hover:underline"
        >
          ← {tx.education.common.backToEducation}
        </AppLink>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 type-data text-muted">
        <AppLink 
          href={`${base}/education`}
          className="hover:text-foreground transition-colors"
        >
          {tx.nav.education}
        </AppLink>
        <IconChevronRight className="h-4 w-4" />
        <span className="text-foreground truncate">{article.title}</span>
      </nav>

      {/* Article Content */}
      <article className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <header className="space-y-4">
            <p className="type-kicker">{article.date}</p>
            <h1 className="type-h1">{article.title}</h1>
            <p className="type-body text-muted-strong">{article.excerpt}</p>
          </header>

          <div className="space-y-6 border-t border-border pt-8">
            {article.body.map((p, idx) => (
              <p key={idx} className="type-body text-muted-strong">
                {p}
              </p>
            ))}
          </div>

          <footer className="border-t border-border pt-6">
            <p className="type-data text-muted">{tx.education.article.footer}</p>
          </footer>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card className="p-6 space-y-4 sticky top-24">
            <h2 className="type-h3">{tx.education.hub.sections.articles}</h2>
            <p className="type-body text-muted-strong">
              Explore more educational content from our beauty experts.
            </p>
            <ButtonLink href={`${base}/education`} variant="secondary" size="sm">
              {tx.education.common.backToEducation}
            </ButtonLink>
          </Card>
        </aside>
      </article>
    </div>
  );
}
