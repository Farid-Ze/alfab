"use client";

import Card from "@/components/ui/Card";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

function IconProducts(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEducation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPartnership(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const icons = [IconProducts, IconEducation, IconPartnership];

export default function Pillars() {
  const { locale } = useLocale();
  const copy = t(locale);

  const pillars = [copy.pillars.products, copy.pillars.education, copy.pillars.partnership];

  return (
    <section className="grid gap-5 md:grid-cols-3 md:gap-6">
      {pillars.map((x, i) => {
        const Icon = icons[i];
        return (
          <Card key={x.title} variant="bordered" className="group p-6 hover:border-muted-strong transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-subtle group-hover:bg-foreground/10 transition-colors">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="type-body-strong text-foreground">{x.title}</h2>
                <p className="type-body">{x.body}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
