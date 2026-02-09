/**
 * Navigation Data - Menu structure for header & footer
 *
 * Centralized data for navigation items, mega menu content,
 * top bar announcements, and footer sections.
 */

export interface NavLink {
    labelKey: string;
    href: string;
}

export interface MegaMenuColumn {
    titleKey: string;
    links: NavLink[];
}

export interface MegaMenuFeatured {
    image: string;
    titleKey: string;
    ctaKey: string;
    href: string;
}

export interface NavItem {
    id: string;
    labelKey: string;
    href?: string;
    megaMenu?: {
        columns: MegaMenuColumn[];
        featured?: MegaMenuFeatured;
    };
}

export interface FooterSection {
    id: string;
    titleKey: string;
    links: NavLink[];
}

export interface TopBarData {
    promoKey: string;
}

/**
 * Top bar announcement data
 */
export const topBarData: TopBarData = {
    promoKey: "topbar.promo",
};

/**
 * Main navigation items
 * Uses translation keys for i18n support
 */
export const navigationItems: NavItem[] = [
    {
        id: "products",
        labelKey: "nav.products",
        href: "/products",
        megaMenu: {
            columns: [
                {
                    titleKey: "nav.categories",
                    links: [
                        { labelKey: "products.category1", href: "/products?category=1" },
                        { labelKey: "products.category2", href: "/products?category=2" },
                        { labelKey: "products.category3", href: "/products?category=3" },
                        { labelKey: "products.category4", href: "/products?category=4" },
                        { labelKey: "products.category5", href: "/products?category=5" },
                    ],
                },
                {
                    titleKey: "nav.brands",
                    links: [
                        { labelKey: "brands.alfaparf", href: "/products?brand=alfaparf" },
                        { labelKey: "brands.farmavita", href: "/products?brand=farmavita" },
                        { labelKey: "brands.montibello", href: "/products?brand=montibello" },
                        { labelKey: "brands.gamma", href: "/products?brand=gamma" },
                    ],
                },
                {
                    titleKey: "nav.services",
                    links: [
                        { labelKey: "services.coloring", href: "/products?service=coloring" },
                        { labelKey: "services.treatment", href: "/products?service=treatment" },
                        { labelKey: "services.styling", href: "/products?service=styling" },
                    ],
                },
            ],
            featured: {
                image: "/images/mega-menu-featured.jpg",
                titleKey: "products.megaFeatured",
                ctaKey: "nav.explore",
                href: "/products",
            },
        },
    },
    {
        id: "education",
        labelKey: "nav.education",
        href: "/education",
    },
    {
        id: "partnership",
        labelKey: "nav.partnership",
        href: "/partnership",
    },
    {
        id: "about",
        labelKey: "nav.about",
        href: "/about",
    },
];

/**
 * Social media links (rendered in footer)
 */
export const socialLinks = [
    {
        id: "shopee",
        label: "Shopee",
        href: "https://shopee.co.id/alfabeauty",
        icon: "shopee",
    },
    {
        id: "instagram",
        label: "Instagram",
        href: "https://instagram.com",
        icon: "instagram",
    },
    {
        id: "facebook",
        label: "Facebook",
        href: "https://facebook.com",
        icon: "facebook",
    },
];

/**
 * Footer navigation sections
 */
export const footerSections: FooterSection[] = [
    {
        id: "products",
        titleKey: "footer.sections.products",
        links: [
            { labelKey: "products.category1", href: "/products?category=1" },
            { labelKey: "products.category2", href: "/products?category=2" },
            { labelKey: "products.category3", href: "/products?category=3" },
            { labelKey: "products.category4", href: "/products?category=4" },
            { labelKey: "products.category5", href: "/products?category=5" },
        ],
    },
    {
        id: "company",
        titleKey: "footer.sections.company",
        links: [
            { labelKey: "nav.about", href: "/about" },
            { labelKey: "nav.education", href: "/education" },
            { labelKey: "nav.partnership", href: "/partnership" },
            { labelKey: "nav.contact", href: "/contact" },
        ],
    },
    {
        id: "support",
        titleKey: "footer.sections.support",
        links: [
            { labelKey: "footer.faq", href: "/faq" },
            { labelKey: "footer.shipping", href: "/shipping" },
            { labelKey: "footer.returns", href: "/returns" },
        ],
    },
    {
        id: "legal",
        titleKey: "footer.sections.legal",
        links: [
            { labelKey: "footer.privacy", href: "/privacy" },
            { labelKey: "footer.terms", href: "/terms" },
            { labelKey: "footer.accessibility", href: "/accessibility" },
            { labelKey: "footer.cookies", href: "/cookies" },
        ],
    },
];
