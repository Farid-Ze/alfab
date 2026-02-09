import { type Locale, t, getTranslation } from "@/lib/i18n";
import { topBarData } from "./header";

interface TopBarProps {
    locale: Locale;
}

export function TopBar({ locale }: TopBarProps) {
    const translations = t(locale);

    const promoText = getTranslation(
        translations as Record<string, unknown>,
        topBarData.promoKey
    );

    return (
        <div
            className="topbar hidden lg:block w-full"
            role="complementary"
            aria-label={translations.nav?.announcements || "Announcements"}
        >
            <div className="flex items-center justify-center h-full px-4">
                <p className="text-xs tracking-wide">{promoText}</p>
            </div>
        </div>
    );
}
