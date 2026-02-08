/**
 * Navigation Data - Menu structure for header
 * 
 * Centralized data for navigation items and mega menu content
 */

export interface NavLink {
    labelKey: string;
    href: string;
}

export interface MegaMenuColumn {
    titleKey: string;
    links: NavLink[];
}

export interface NavItem {
    id: string;
    labelKey: string;
    href?: string;
    megaMenu?: {
        columns: MegaMenuColumn[];
        promoImage?: string;
        promoTitle?: string;
        promoLink?: string;
    };
}

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
            promoTitle: "Discover Our Products",
            promoLink: "/products",
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
 * Social media links for top bar
 */
export const socialLinks = [
    {
        id: "shopee",
        label: "Shopee",
        href: "https://shopee.co.id",
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
