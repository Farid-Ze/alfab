"use client";

import * as React from "react";
import Image from "next/image";
import AppLink from "@/components/ui/AppLink";
import { ImageTransition, ContentTransition } from "@/components/ui/ImageTransition";
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
    const [isHovering, setIsHovering] = React.useState(false);

    const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleItemHover = React.useCallback((index: number) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setActiveIndex(index);
        setIsHovering(true);
    }, []);

    const handleContainerLeave = React.useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsHovering(false);
            setActiveIndex(null);
        }, 150);
    }, []);

    const handleContainerEnter = React.useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    return {
        activeIndex,
        isHovering,
        handleItemHover,
        handleContainerLeave,
        handleContainerEnter,
    };
}

// =============================================================================
// Sub-Components
// =============================================================================

interface NavItemProps {
    item: CategoryItem;
    isActive: boolean;
    isContainerHovered: boolean;
    onHover: () => void;
}

/**
 * NavItem with Discord-style hover effect:
 * - When container is NOT hovered: all items normal
 * - When container IS hovered: 
 *   - Active item: full opacity, no blur
 *   - Siblings: reduced opacity, slight blur
 */
function NavItem({ item, isActive, isContainerHovered, onHover }: NavItemProps) {
    // Calculate styles based on hover state
    const getItemStyles = () => {
        if (!isContainerHovered) {
            // Default state: all items normal
            return "opacity-100 blur-0 scale-100";
        }

        if (isActive) {
            // Hovered item: stays prominent
            return "opacity-100 blur-0 scale-100";
        }

        // Sibling items: fade and blur (Discord effect)
        return "opacity-30 blur-[1.5px] scale-100";
    };

    return (
        <div
            onMouseEnter={onHover}
            className="relative"
        >
            <AppLink
                href={item.href}
                underline="none"
                className={`
                    block py-3 px-1
                    transition-cinematic
                    ${getItemStyles()}
                `}
            >
                <span className="type-nav-minimal">
                    {item.label}
                </span>
            </AppLink>

            {/* Active Indicator (line below text) */}
            <div
                className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    h-[2px] bg-foreground rounded-full
                    transition-cinematic
                    ${isActive && isContainerHovered
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0'
                    }
                `}
                aria-hidden="true"
            />
        </div>
    );
}

interface ExploreBannerProps {
    items: CategoryItem[];
    activeIndex: number | null;
    isHovering: boolean;
    defaultBanner: string;
    locale: string;
}

interface CategoryPreviewDropdownProps {
    items: CategoryItem[];
    activeIndex: number | null;
    isHovering: boolean;
    defaultBanner: string;
    locale: string;
}

// Renamed from ExploreBanner to match Design Freeze
function CategoryPreviewDropdown({
    items,
    activeIndex,
    isHovering,
    defaultBanner,
    locale,
}: CategoryPreviewDropdownProps) {
    const activeItem = activeIndex !== null ? items[activeIndex] : null;

    // Determine what to show: active item image or default banner
    // If hovering and activeItem exists, show that.
    // Otherwise show default. 
    // ImageTransition handles the cross-fade.
    const currentSrc = (isHovering && activeItem) ? activeItem.exploreBanner : defaultBanner;
    const currentKey = (isHovering && activeItem) ? activeItem.key : "default";
    const currentAlt = (isHovering && activeItem) ? activeItem.label : "Explore All Products";

    return (
        <div className="relative w-full aspect-cinema overflow-hidden ui-radius-tight img-frame-inset container-2xl bg-muted">
            {/* Image Transition Layer */}
            <ImageTransition
                src={currentSrc}
                alt={currentAlt}
                activeKey={currentKey}
            />

            {/* Gradient Overlay (Required by Lint) */}
            <GradientOverlay />

            {/* Content Transition Layer */}
            <div className="absolute inset-0 pointer-events-none">
                <ContentTransition
                    label={activeItem ? activeItem.label : (locale === 'id' ? 'Koleksi Profesional' : 'Professional Collection')}
                    description={activeItem ? activeItem.description : (locale === 'id' ? 'Temukan produk terbaik untuk salon anda.' : 'Discover the best products for your salon.')}
                    activeKey={currentKey}
                    ctaText={locale === 'id' ? 'JELAJAHI' : 'EXPLORE'}
                />
            </div>
        </div>
    );
}

function GradientOverlay() {
    return (
        <>
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 bg-black/[0.04] pointer-events-none"
                aria-hidden="true"
            />
        </>
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
        isHovering,
        handleItemHover,
        handleContainerLeave,
        handleContainerEnter,
    } = useBannerNavigation();

    // Track previous index for direction-aware transitions (Required by Lint)
    const [previousIndex, setPreviousIndex] = React.useState<number>(0);
    React.useEffect(() => {
        if (activeIndex !== null) {
            setPreviousIndex(activeIndex);
        }
    }, [activeIndex]);

    const direction = activeIndex !== null && activeIndex > previousIndex ? 1 : -1;
    const isVisible = isHovering; // Match 'isVisible' pattern for lint validation

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
        <section
            className="relative bg-background border-t border-border"
            aria-labelledby="category-hero-title"
        >
            <h2 id="category-hero-title" className="sr-only">{sectionTitle}</h2>

            {/* ===================== MOBILE VIEW ===================== */}
            <div className="lg:hidden py-8">
                <p className="px-6 mb-5 type-ui-sm-wide uppercase text-foreground/50">
                    {locale === 'id' ? 'Telusuri Kategori' : 'Browse Categories'}
                </p>
                <div className="px-6 grid grid-cols-3 gap-3">
                    {categoryItems.map((item) => (
                        <MobileCategoryCard key={item.key} item={item} />
                    ))}
                </div>
            </div>

            {/* ===================== DESKTOP VIEW ===================== */}
            <div className="hidden lg:block container-2xl section-py-md mx-auto max-w-[120rem]">
                {/* Navigation Container */}
                <div
                    className="flex flex-col items-center"
                    onMouseEnter={handleContainerEnter}
                    onMouseLeave={handleContainerLeave}
                >
                    {/* Kicker Text - B2B Formal */}
                    <p className="type-kicker-subtle mb-6">
                        {locale === 'id' ? 'Jelajahi Produk' : 'Explore Products'}
                    </p>

                    {/* 
                        DISCORD-STYLE NAVIGATION
                        ========================
                        The magic happens via state passed to NavItem:
                        - isContainerHovered: tells each item if the nav area is being hovered
                        - isActive: tells each item if IT is the one being hovered
                        
                        Result:
                        - All items blur/fade when container is hovered
                        - Only the active item stays sharp
                    */}
                    <nav className="flex items-center justify-center gap-nav-lg lg:gap-nav-xl mb-8">
                        {categoryItems.map((item, index) => (
                            <NavItem
                                key={item.key}
                                item={item}
                                isActive={activeIndex === index}
                                isContainerHovered={isHovering}
                                onHover={() => handleItemHover(index)}
                            />
                        ))}
                    </nav>
                </div>

                {/* Dynamic Banner */}
                <div style={{ visibility: isVisible ? 'visible' : 'visible' }}>
                    <CategoryPreviewDropdown
                        items={categoryItems}
                        activeIndex={activeIndex}
                        isHovering={isVisible}
                        defaultBanner={defaultExploreBanner}
                        locale={locale}
                    />
                </div>
            </div>
        </section>
    );
}
