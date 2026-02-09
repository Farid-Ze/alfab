import { STATS } from "@/lib/mock-data";
import { type Locale } from "@/lib/i18n";

interface StatsProps {
    locale: Locale;
}

export function Stats({ locale }: StatsProps) {
    return (
        <section className="py-20 bg-primary-900 text-white">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((stat) => (
                        <div key={stat.id} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-primary-200 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-primary-200 font-medium text-sm md:text-base">
                                {stat.label[locale]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
