import { PILLARS } from "@/lib/mock-data";
import { type Locale, t } from "@/lib/i18n";
import { FlaskConical, GraduationCap, Handshake } from "lucide-react";

interface PillarsProps {
    locale: Locale;
}

const ICONS = {
    flask: FlaskConical,
    "graduation-cap": GraduationCap,
    handshake: Handshake,
};

export function Pillars({ locale }: PillarsProps) {
    const translations = t(locale);

    return (
        <section className="section">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-800 mb-12">
                    {translations.home.pillars.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {PILLARS.map((pillar) => {
                        const Icon = ICONS[pillar.icon as keyof typeof ICONS];

                        return (
                            <div key={pillar.id} className="card p-8 text-center group hover:border-primary-200 transition-colors">
                                <div className="w-16 h-16 mx-auto mb-6 bg-secondary-100 rounded-full flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
                                    {Icon && <Icon className="w-8 h-8 text-secondary-600" />}
                                </div>
                                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                                    {pillar.title[locale]}
                                </h3>
                                <p className="text-neutral-600">
                                    {pillar.description[locale]}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
