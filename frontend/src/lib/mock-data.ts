export interface Brand {
    id: string;
    name: string;
    origin: string;
    logo: string; // Path to logo
    description: {
        en: string;
        id: string;
    };
}

export interface Pillar {
    id: string;
    title: {
        en: string;
        id: string;
    };
    description: {
        en: string;
        id: string;
    };
    icon: string;
}

export interface Stat {
    id: string;
    value: string;
    label: {
        en: string;
        id: string;
    };
}

export const BRANDS: Brand[] = [
    {
        id: "alfaparf",
        name: "Alfaparf Milano Professional",
        origin: "Italy",
        logo: "/images/brands/alfaparf.png",
        description: {
            en: "#1 Italian Brand in the Hair Industry Worldwide.",
            id: "Merek Italia #1 di Industri Rambut Dunia.",
        },
    },
    {
        id: "farmavita",
        name: "Farmavita",
        origin: "Italy",
        logo: "/images/brands/farmavita.png",
        description: {
            en: "Advanced cosmetic research for hair health.",
            id: "Riset kosmetik canggih untuk kesehatan rambut.",
        },
    },
    {
        id: "montibello",
        name: "Montibello",
        origin: "Spain",
        logo: "/images/brands/montibello.png",
        description: {
            en: "Barcelona-based beauty exclusively for professionals.",
            id: "Kecantikan berbasis Barcelona khusus untuk profesional.",
        },
    },
    {
        id: "gamma-plus",
        name: "Gamma+ Professional",
        origin: "Italy",
        logo: "/images/brands/gamma-plus.png",
        description: {
            en: "High-tech tools for barbers and hairstylists.",
            id: "Alat berteknologi tinggi untuk barber dan penata rambut.",
        },
    },
];

export const PILLARS: Pillar[] = [
    {
        id: "products",
        title: { en: "World-Class Products", id: "Produk Kelas Dunia" },
        description: {
            en: "Curated selection from Italy & Spain for Salon and Barber professionals.",
            id: "Pilihan terkurasi dari Italia & Spanyol untuk profesional Salon dan Barber.",
        },
        icon: "flask",
    },
    {
        id: "education",
        title: { en: "Continuous Education", id: "Edukasi Berkelanjutan" },
        description: {
            en: "Workshops, seminars, and technical training to elevate your craft.",
            id: "Workshop, seminar, dan pelatihan teknis untuk meningkatkan keahlian Anda.",
        },
        icon: "graduation-cap",
    },
    {
        id: "partnership",
        title: { en: "Strategic Partnership", id: "Kemitraan Strategis" },
        description: {
            en: "Business support and growth strategies for long-term success.",
            id: "Dukungan bisnis dan strategi pertumbuhan untuk kesuksesan jangka panjang.",
        },
        icon: "handshake",
    },
];

export const STATS: Stat[] = [
    {
        id: "experience",
        value: "18+",
        label: { en: "Years Experience", id: "Tahun Pengalaman" },
    },
    {
        id: "brands",
        value: "4",
        label: { en: "Global Brands", id: "Merek Global" },
    },
    {
        id: "partners",
        value: "1000+",
        label: { en: "Salon & Barber Partners", id: "Mitra Salon & Barber" },
    },
    {
        id: "cities",
        value: "30+",
        label: { en: "Cities Covered", id: "Kota Terjangkau" },
    },
];

export const HERO_CONTENT = {
    headline: {
        en: "Connecting Global Hair Innovation to Indonesia’s Salon & Barber Professionals",
        id: "Menghubungkan Inovasi Rambut Global dengan Profesional Salon & Barber Indonesia",
    },
    subheadline: {
        en: "Exclusive importer and distributor of leading Italian and Spanish professional haircare brands, serving Indonesia’s salon & barber industry for over 18 years.",
        id: "Importir dan distributor eksklusif merek perawatan rambut profesional terkemuka dari Italia dan Spanyol, melayani industri salon & barber Indonesia selama lebih dari 18 tahun.",
    },
};
