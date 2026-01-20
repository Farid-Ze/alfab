"use client";

import * as React from "react";
import Image from "next/image";
import AppLink from "@/components/ui/AppLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { categories, getCategoryLabel, getCategoryDescription, getCategoryStripTitle } from "@/content/homepage";
import { ImageTransition, ContentTransition } from "@/components/ui/ImageTransition";

// =============================================================================
// Types
// =============================================================================

interface CategoryItem {
    key: string;
    image: string;
    label: string;
    description: string;
    href: string;
}

interface HighlightPosition {
    left: number;
    width: number;
}

// =============================================================================
// Custom Hook: useNavigationHighlight
// =============================================================================

function useNavigationHighlight(containerRef: React.RefObject<HTMLDivElement | null>) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [previousIndex, setPreviousIndex] = React.useState<number | null>(null);
    const [highlightPos, setHighlightPos] = React.useState<HighlightPosition>({ left: 0, width: 0 });
    const [dropdownLeft, setDropdownLeft] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);

    const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const calculatePositions = React.useCallback((index: number) => {
        const container = containerRef.current;
        const item = itemRefs.current[index];
        if (!container || !item) return;

        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const relativeLeft = itemRect.left - containerRect.left;

        setHighlightPos({
            left: relativeLeft,
            width: itemRect.width,
        });
        setDropdownLeft(relativeLeft + itemRect.width / 2);
    }, [containerRef]);

    const handleItemHover = React.useCallback((index: number) => {
        // Cancel any pending close
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        // Track previous for direction calculation
        setPreviousIndex(activeIndex);
        setActiveIndex(index);
        setIsVisible(true);
        calculatePositions(index);

        // Smart auto-scroll: if user hasn't scrolled much, scroll to show dropdown
        if (typeof window !== 'undefined') {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const container = containerRef.current;

            if (container && scrollY < viewportHeight * 0.3) {
                // User is near top - auto-scroll to show dropdown
                const containerRect = container.getBoundingClientRect();
                const dropdownHeight = 400; // Approximate dropdown height
                const targetBottom = containerRect.bottom + dropdownHeight + 32; // 32px padding

                if (targetBottom > viewportHeight) {
                    const scrollAmount = targetBottom - viewportHeight;
                    window.scrollTo({
                        top: scrollY + scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }, [calculatePositions, containerRef]);

    const handleContainerLeave = React.useCallback(() => {
        // Debounced close to allow time to move to dropdown
        closeTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setActiveIndex(null);
        }, 100);
    }, []);

    const handleDropdownEnter = React.useCallback(() => {
        // Cancel pending close and keep visible
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsVisible(true);
    }, []);

    const registerItemRef = React.useCallback((index: number, el: HTMLDivElement | null) => {
        itemRefs.current[index] = el;
    }, []);

    return {
        activeIndex,
        previousIndex,
        highlightPos,
        dropdownLeft,
        isVisible,
        handleItemHover,
        handleContainerLeave,
        handleDropdownEnter,
        registerItemRef,
    };
}

// =============================================================================
// Sub-Components
// =============================================================================

interface SlidingHighlightProps {
    position: HighlightPosition;
    isVisible: boolean;
}

function SlidingHighlight({ position, isVisible }: SlidingHighlightProps) {
    return (
        <div
            className="absolute -bottom-3 h-px bg-foreground pointer-events-none 
                       transition-all duration-300 ease-out"
            style={{
                left: position.left,
                width: position.width,
                opacity: isVisible ? 1 : 0,
            }}
            aria-hidden="true"
        />
    );
}

interface CategoryLinkItemProps {
    item: CategoryItem;
    isActive: boolean;
    onHover: () => void;
    registerRef: (el: HTMLDivElement | null) => void;
}

function CategoryLinkItem({ item, isActive, onHover, registerRef }: CategoryLinkItemProps) {
    return (
        <div ref={registerRef} onMouseEnter={onHover}>
            <AppLink
                href={item.href}
                underline="none"
                className="flex items-center gap-2 py-2 group"
            >
                <span className={`type-body transition-colors duration-200
                    ${isActive
                        ? 'text-foreground'
                        : 'text-foreground/50 hover:text-foreground'
                    }`}>
                    {item.label}
                </span>

                <ArrowIcon isActive={isActive} />
            </AppLink>
        </div>
    );
}

interface ArrowIconProps {
    isActive: boolean;
}

function ArrowIcon({ isActive }: ArrowIconProps) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-all duration-200
                ${isActive
                    ? 'text-foreground opacity-100 translate-x-0'
                    : 'text-foreground/30 opacity-0 -translate-x-1'}`}
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
        </svg>
    );
}

interface CategoryPreviewDropdownProps {
    items: CategoryItem[];
    activeIndex: number | null;
    previousIndex: number | null;
    leftPosition: number;
    isVisible: boolean;
    locale: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

function CategoryPreviewDropdown({
    items,
    activeIndex,
    previousIndex,
    leftPosition,
    isVisible,
    locale,
    onMouseEnter,
    onMouseLeave,
}: CategoryPreviewDropdownProps) {
    const activeItem = activeIndex !== null ? items[activeIndex] : null;

    // Don't render anything if no active item to prevent ghost hover zones
    if (!isVisible && activeIndex === null) {
        return null;
    }

    // Calculate direction based on index change (1 = right, -1 = left)
    const direction = previousIndex !== null && activeIndex !== null
        ? (activeIndex > previousIndex ? 1 : -1)
        : 1;

    return (
        <div
            className="absolute top-full pt-4 z-50
                       transition-all duration-150 ease-out"
            style={{
                left: leftPosition,
                opacity: isVisible ? 1 : 0,
                transform: `translateX(-50%) translateY(${isVisible ? '0' : '8px'})`,
                pointerEvents: isVisible ? 'auto' : 'none',
                visibility: isVisible ? 'visible' : 'hidden',
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <AppLink
                href={activeItem?.href ?? '#'}
                underline="none"
                className="block group"
            >
                {/* Glass morphism container with backdrop blur */}
                <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] overflow-hidden
                               rounded-lg ring-1 ring-white/10 shadow-2xl
                               backdrop-blur-sm">
                    {/* Enterprise Image Transition with blur + slide + scale */}
                    {activeItem && (
                        <ImageTransition
                            src={activeItem.image}
                            alt={activeItem.label}
                            activeKey={activeItem.key}
                            direction={direction}
                        />
                    )}

                    <GradientOverlay />

                    {/* Enterprise Content Transition with stagger */}
                    {activeItem && (
                        <ContentTransition
                            label={activeItem.label}
                            description={activeItem.description}
                            activeKey={activeItem.key}
                            ctaText="Explore"
                        />
                    )}
                </div>
            </AppLink>
        </div>
    );
}

interface CrossFadeImageProps {
    src: string;
    alt: string;
    isActive: boolean;
}

function CrossFadeImage({ src, alt, isActive }: CrossFadeImageProps) {
    return (
        <div className={`absolute inset-0 transition-opacity duration-300
            ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes="300px"
                className="object-cover"
            />
        </div>
    );
}

function GradientOverlay() {
    return (
        <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            aria-hidden="true"
        />
    );
}

interface PreviewContentProps {
    label: string;
    description: string;
    isActive: boolean;
    locale: string;
}

function PreviewContent({ label, description, isActive, locale }: PreviewContentProps) {
    return (
        <div className={`absolute inset-x-0 bottom-0 p-5 sm:p-6 transition-opacity duration-300
            ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-white type-body-strong mb-2">
                {label}
            </h3>
            <p className="text-white/60 type-body mb-4">
                {description}
            </p>
            <span className="inline-flex items-center gap-2 text-white/80 type-data uppercase">
                {locale === "id" ? "Jelajahi" : "Explore"}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </span>
        </div>
    );
}

// =============================================================================
// Mobile Category Card (Touch-friendly with visible image)
// Quality by Design: 44px minimum touch target, clear visual hierarchy
// =============================================================================

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
            {/* Image thumbnail - consistent aspect ratio */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 40vw, 120px"
                    className="object-cover transition-transform duration-300 
                              group-hover:scale-105 group-active:scale-[0.98]"
                />
            </div>

            {/* Label - min 44px touch target height */}
            <div className="pt-3 pb-1 min-h-[44px] flex items-start justify-center">
                <p className="type-data text-foreground text-center">
                    {item.label}
                </p>
            </div>
        </AppLink>
    );
}

// =============================================================================
// Desktop Category Card (Professional Reveal)
// Text inside card, image 20% opacity → 100% on hover, seamless with hero
// =============================================================================

interface DesktopCategoryCardProps {
    item: CategoryItem;
}

function DesktopCategoryCard({ item }: DesktopCategoryCardProps) {
    return (
        <AppLink
            href={item.href}
            underline="none"
            className="block group"
        >
            {/* Card container - dark bg to blend with hero, image subtle hint */}
            <div className="relative aspect-[4/5] overflow-hidden bg-foreground">
                {/* Image - 20% opacity default, full on hover */}
                <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="200px"
                    className="object-cover transition-all duration-500 ease-out
                              opacity-20 scale-105
                              group-hover:opacity-100 group-hover:scale-100"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
                               transition-opacity duration-300"
                    aria-hidden="true" />

                {/* Category text - inside card, centered, professional typography */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <p className="text-white text-center font-light tracking-wide text-sm sm:text-base uppercase
                                  transition-all duration-300
                                  group-hover:opacity-0 group-hover:translate-y-2">
                        {item.label}
                    </p>
                </div>

                {/* Hover state: Show "Explore" CTA */}
                <div className="absolute inset-x-0 bottom-0 p-4
                               opacity-0 translate-y-2
                               transition-all duration-300
                               group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-white text-center font-light tracking-wide text-sm uppercase">
                        {item.label}
                    </p>
                </div>
            </div>
        </AppLink>
    );
}

// =============================================================================
// Main Component
// =============================================================================

export default function HeroImageStrip() {
    const { locale } = useLocale();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const sectionTitle = getCategoryStripTitle(locale);

    const {
        activeIndex,
        highlightPos,
        dropdownLeft,
        isVisible,
        handleItemHover,
        handleContainerLeave,
        handleDropdownEnter,
        registerItemRef,
        previousIndex,
    } = useNavigationHighlight(containerRef);

    // Transform categories to include computed properties
    const categoryItems: CategoryItem[] = React.useMemo(() =>
        categories.map(cat => ({
            key: cat.key,
            image: cat.image,
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
                    {/* Section title for mobile */}
                    <p className="px-4 sm:px-6 mb-5 type-data uppercase text-foreground/50">
                        {locale === 'id' ? 'Telusuri Kategori' : 'Browse Categories'}
                    </p>

                    {/* Grid container - 3 columns mobile, wraps to 6 on tablet */}
                    <div className="px-4 sm:px-6">
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                            {categoryItems.map((item) => (
                                <MobileCategoryCard key={item.key} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop: CK-Style Category Cards - Clean Professional */}
            <div className="hidden lg:block bg-foreground">
                {/* Clean container - no borders, seamless with hero */}
                <div className="mx-auto max-w-[120rem] px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
                    {/* Grid of category cards */}
                    <div className="grid grid-cols-6 gap-4 lg:gap-5">
                        {categoryItems.map((item) => (
                            <DesktopCategoryCard key={item.key} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

