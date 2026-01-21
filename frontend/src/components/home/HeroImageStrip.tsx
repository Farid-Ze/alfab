"use client";

import * as React from "react";
import Image from "next/image";
import AppLink from "@/components/ui/AppLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { categories, getCategoryLabel, getCategoryDescription, getCategoryStripTitle, defaultExploreBanner } from "@/content/homepage";

// =============================================================================
// Types
// =============================================================================

interface CategoryItem {
    key: string;
    image: string;
    exploreBanner: string;
    label: string;
    description: string;
    href: string;
}

// =============================================================================
// Custom Hook: useBannerNavigation
// =============================================================================

function useBannerNavigation() {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleItemHover = React.useCallback((index: number) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setActiveIndex(index);
        setIsVisible(true);
    }, []);

    const handleContainerLeave = React.useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setActiveIndex(null);
        }, 100);
    }, []);

    const handleBannerEnter = React.useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsVisible(true);
    }, []);

    return {
        activeIndex,
        isVisible,
        handleItemHover,
        handleContainerLeave,
        handleBannerEnter,
    };
}

// =============================================================================
// Sub-Components
// =============================================================================

interface VerticalNavLinkProps {
    item: CategoryItem;
    isActive: boolean;
    onHover: () => void;
}

function VerticalNavLink({ item, isActive, onHover }: VerticalNavLinkProps) {
    return (
        <div onMouseEnter={onHover}>
            <AppLink
                href={item.href}
                underline="none"
                className="group flex items-center gap-3 py-2"
                aria-current={isActive ? 'true' : undefined}
            >
                <span className={`type-heading-sm transition-colors duration-200
                    ${isActive
                        ? 'text-foreground font-medium'
                        : 'text-foreground/40 hover:text-foreground'
                    }`}>
                    {item.label}
                </span>

                {/* Connecting line that appears on hover */}
                <div className={`h-px flex-1 max-w-[4rem] transition-all duration-300 ease-out
                    ${isActive
                        ? 'bg-foreground/30 opacity-100 scale-x-100'
                        : 'bg-transparent opacity-0 scale-x-0'
                    }`}
                    style={{ transformOrigin: 'left' }}
                    aria-hidden="true"
                />
            </AppLink>
        </div>
    );
}

interface ExploreBannerProps {
    items: CategoryItem[];
    activeIndex: number | null;
    isVisible: boolean;
    defaultBanner: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

function ExploreBanner({
    items,
    activeIndex,
    isVisible,
    defaultBanner,
    onMouseEnter,
    onMouseLeave,
}: ExploreBannerProps) {
    const activeItem = activeIndex !== null ? items[activeIndex] : null;

    return (
        <div
            className="relative flex-1 aspect-[16/10] overflow-hidden ui-radius-tight bg-subtle"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Default banner (always rendered as base layer) */}
            <Image
                src={defaultBanner}
                alt="Explore All Products"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className={`object-cover transition-opacity duration-500 ease-out
                    ${isVisible && activeItem ? 'opacity-0' : 'opacity-100'}`}
                priority
            />

            {/* Category-specific banners (crossfade on hover) */}
            {items.map((item, index) => (
                <Image
                    key={item.key}
                    src={item.exploreBanner}
                    alt={item.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className={`object-cover transition-opacity duration-500 ease-out
                        ${isVisible && activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}

            {/* Subtle gradient overlay for depth */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-background/5 to-transparent pointer-events-none"
                aria-hidden="true"
            />

            {/* Context Label (bottom-left) */}
            <div className="absolute bottom-6 left-8 z-10">
                <p className="text-white backdrop-blur-md bg-black/10 px-3 py-1.5 rounded text-sm font-medium tracking-wide">
                    {isVisible && activeItem ? activeItem.label : (useLocale().locale === 'id' ? 'Semua Kategori' : 'All Categories')}
                </p>
            </div>
        </div>
    );
}

interface MobileCategoryCardProps {
    item: CategoryItem;
}

function MobileCategoryCard({ item }: MobileCategoryCardProps) {
    return (
        <AppLink
            href={item.href}
            underline="none"
            className="block group"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted ui-radius-tight">
                <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 40vw, 120px"
                    className="object-cover transition-transform duration-300 
                              group-hover:scale-105 group-active:scale-[0.98]"
                />
            </div>
            <div className="pt-3 pb-1 min-h-[44px] flex items-start justify-center">
                <p className="type-data text-foreground text-center">
                    {item.label}
                </p>
            </div>
        </AppLink>
    );
}

// =============================================================================
// Main Component
// =============================================================================

export default function HeroImageStrip() {
    const { locale } = useLocale();
    const sectionTitle = getCategoryStripTitle(locale);

    const {
        activeIndex,
        isVisible,
        handleItemHover,
        handleContainerLeave,
        handleBannerEnter,
    } = useBannerNavigation();

    // Transform categories to include computed properties
    const categoryItems: CategoryItem[] = React.useMemo(() =>
        categories.map(cat => ({
            key: cat.key,
            image: cat.image,
            exploreBanner: cat.exploreBanner,
            label: getCategoryLabel(locale, cat.key),
            description: getCategoryDescription(locale, cat.key),
            href: `/${locale}/products?category=${cat.key}`,
        })), [locale]
    );

    return (
        <section className="relative bg-background" aria-labelledby="category-hero-title">
            <h2 id="category-hero-title" className="sr-only">{sectionTitle}</h2>

            {/* Mobile: Grid layout with visible thumbnails */}
            <div className="lg:hidden border-y border-border">
                <div className="py-6 sm:py-8">
                    <p className="px-4 sm:px-6 mb-5 type-data uppercase text-foreground/50 tracking-wider">
                        {locale === 'id' ? 'Telusuri Kategori' : 'Browse Categories'}
                    </p>
                    <div className="px-4 sm:px-6">
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                            {categoryItems.map((item) => (
                                <MobileCategoryCard key={item.key} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop: Vertical navigation with dynamic banner */}
            <div className="hidden lg:block border-y border-border">
                <div className="mx-auto max-w-[120rem] px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
                    <div
                        className="flex gap-10 lg:gap-20"
                        onMouseLeave={handleContainerLeave}
                    >
                        {/* Left: Vertical text navigation */}
                        <div className="w-48 lg:w-64 flex-shrink-0 flex flex-col justify-center">
                            <p className="type-data uppercase text-foreground/50 mb-8 tracking-wider">
                                {locale === 'id' ? 'Jelajahi Produk' : 'Explore Products'}
                            </p>
                            <nav className="flex flex-col gap-2">
                                {categoryItems.map((item, index) => (
                                    <VerticalNavLink
                                        key={item.key}
                                        item={item}
                                        isActive={activeIndex === index}
                                        onHover={() => handleItemHover(index)}
                                    />
                                ))}
                            </nav>
                        </div>

                        {/* Right: Dynamic banner image */}
                        <ExploreBanner
                            items={categoryItems}
                            activeIndex={activeIndex}
                            isVisible={isVisible}
                            defaultBanner={defaultExploreBanner}
                            onMouseEnter={handleBannerEnter}
                            onMouseLeave={handleContainerLeave}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
