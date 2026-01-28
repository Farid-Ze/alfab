"use client";

import TextLink from "@/components/ui/TextLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getHeroContent } from "@/content/homepage";

/**
 * HeroContent - Text overlay content
 * Positioned absolutely over video/image background
 */
export default function HeroContent() {
    const { locale } = useLocale();
    const base = `/${locale}`;
    const content = getHeroContent(locale);

    return (
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-24">
            <div className="w-full container-2xl px-4 sm:px-6 lg:px-10 mx-auto max-w-[120rem]">
                <div className="max-w-sm sm:max-w-lg lg:max-w-xl space-y-4 sm:space-y-5">
                    {/* Kicker */}
                    <p className="type-hero-kicker ui-hero-on-media-strong animate-fade-in">
                        {content.kicker}
                    </p>

                    {/* Headline - uses dedicated hero typography for larger sizing */}
                    <h1 className="type-hero ui-hero-on-media animate-fade-in-delay-1">
                        {content.headline}
                    </h1>

                    {/* Description */}
                    <p className="type-hero-body ui-hero-on-media-muted max-w-md animate-fade-in-delay-2">
                        {content.description}
                    </p>

                    {/* CK-style CTAs - Editorial underlined text links (no buttons) */}
                    <div className="pt-2 sm:pt-3 space-y-3">
                        <div className="flex flex-row gap-6 items-center">
                            {/* PRIMARY CTA - Become Partner */}
                            <TextLink
                                href={`${base}/partnership/become-partner`}
                                onDark
                            >
                                {content.ctaSecondary}
                            </TextLink>

                            {/* SECONDARY - Explore Brands */}
                            <TextLink
                                href={`${base}/products`}
                                onDark
                            >
                                {content.ctaPrimary}
                            </TextLink>
                        </div>

                        <p className="type-hero-note ui-hero-on-media-subtle max-w-md">
                            {content.note}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
