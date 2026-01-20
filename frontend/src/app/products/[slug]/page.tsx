import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

// Product Data
const products: Record<string, {
    name: string;
    brand: string;
    category: string;
    description: string;
    features: string[];
    image: string;
    relatedSlugs: string[];
}> = {
    'glowmaster-permanent-color': {
        name: 'GlowMaster Permanent Color Series',
        brand: 'GlowMaster Color',
        category: 'Hair Color',
        description: 'Professional permanent hair color with 100% grey coverage. Available in 60+ shades for unlimited creative possibilities. Formulated with advanced technology for vibrant, long-lasting results.',
        features: [
            'Level: Professional Only',
            '100% Gray Coverage',
            'Developer: 10/20/30/40 vol',
            '60+ Shade Options',
            'Low Ammonia Formula',
            'PPD-Free Options Available',
        ],
        image: '/images/products/hair-color.png',
        relatedSlugs: ['glowmaster-bleach-powder', 'salonlux-keratin-system'],
    },
    'glowmaster-bleach-powder': {
        name: 'GlowMaster Blue Bleach Powder',
        brand: 'GlowMaster Color',
        category: 'Hair Color',
        description: 'Dust-free professional bleaching powder with up to 9 levels of lift. Blue-violet anti-yellow pigments for clean, bright results.',
        features: [
            'Up to 9 Levels of Lift',
            'Dust-Free Formula',
            'Blue-Violet Pigments',
            'Protective Polymers',
            'Rapid Processing Time',
        ],
        image: '/images/products/bleach-powder.png',
        relatedSlugs: ['glowmaster-permanent-color', 'salonlux-keratin-system'],
    },
    'salonlux-keratin-system': {
        name: 'SalonLux Keratin Treatment System',
        brand: 'SalonLux Treatment',
        category: 'Hair Treatment',
        description: 'Professional keratin smoothing treatment for frizz control and hair repair. Formaldehyde-free formula safe for all hair types.',
        features: [
            'Formaldehyde-Free',
            'Smooths Frizz 90%',
            'Lasts 3-6 Months',
            'Safe for Colored Hair',
            'Includes Aftercare Kit',
        ],
        image: '/images/products/keratin.png',
        relatedSlugs: ['salonlux-botox-treatment', 'glowmaster-permanent-color'],
    },
    'salonlux-botox-treatment': {
        name: 'SalonLux Hair Botox Treatment',
        brand: 'SalonLux Treatment',
        category: 'Hair Treatment',
        description: 'Deep conditioning treatment that fills gaps in hair fiber. Restores elasticity and shine without formaldehyde.',
        features: [
            'No Formaldehyde',
            'Deep Fiber Repair',
            'Restores Elasticity',
            'Intense Shine',
            'All Hair Types',
        ],
        image: '/images/products/botox.png',
        relatedSlugs: ['salonlux-keratin-system', 'glowmaster-permanent-color'],
    },
    'barber-elite-classic-pomade': {
        name: 'BarberElite Classic Pomade',
        brand: 'BarberElite',
        category: 'Styling Products',
        description: 'Water-based pomade with strong hold and high shine. Easy wash-out formula perfect for classic and modern styles.',
        features: [
            'Strong Hold',
            'High Shine Finish',
            'Water-Based',
            'Easy Wash-Out',
            'Light Scent',
        ],
        image: '/images/products/pomade.png',
        relatedSlugs: ['barber-elite-matte-clay', 'stylepro-ionic-dryer'],
    },
    'barber-elite-matte-clay': {
        name: 'BarberElite Matte Clay',
        brand: 'BarberElite',
        category: 'Styling Products',
        description: 'Strong hold styling clay with natural matte finish for textured, modern styles. Reworkable throughout the day.',
        features: [
            'Strong Hold',
            'Matte Finish',
            'Reworkable',
            'Adds Texture',
            'Long-lasting',
        ],
        image: '/images/products/matte-clay.png',
        relatedSlugs: ['barber-elite-classic-pomade', 'stylepro-ionic-dryer'],
    },
    'stylepro-ionic-dryer': {
        name: 'StylePro Ionic Professional Hair Dryer',
        brand: 'StylePro Tools',
        category: 'Tools & Equipment',
        description: '2200W professional hair dryer with ionic technology for faster drying and reduced frizz. Lightweight design for all-day use.',
        features: [
            '2200W Motor',
            'Ionic Technology',
            'Multiple Heat Settings',
            'Lightweight Design',
            '2.5m Cord Length',
            '2 Year Warranty',
        ],
        image: '/images/products/hair-dryer.png',
        relatedSlugs: ['stylepro-titanium-iron', 'salonlux-keratin-system'],
    },
    'stylepro-titanium-iron': {
        name: 'StylePro Titanium Flat Iron',
        brand: 'StylePro Tools',
        category: 'Tools & Equipment',
        description: 'Professional flat iron with titanium plates. Adjustable temperature 150-230°C for all hair types and styles.',
        features: [
            'Titanium Plates',
            '150-230°C Range',
            'Fast Heat-Up',
            'Digital Display',
            'Auto Shut-Off',
            '3 Year Warranty',
        ],
        image: '/images/products/flat-iron.png',
        relatedSlugs: ['stylepro-ionic-dryer', 'salonlux-keratin-system'],
    },
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = products[slug];
    if (!product) {
        return { title: 'Product Not Found' };
    }
    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = products[slug];

    if (!product) {
        return (
            <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-serif text-4xl italic mb-4">Product Not Found</h1>
                    <Link href="/products" className="text-[#A67B5B] hover:underline">
                        ← Back to Collection
                    </Link>
                </div>
            </div>
        );
    }

    const relatedProducts = product.relatedSlugs
        .map((s) => ({ slug: s, ...products[s] }))
        .filter((p) => p.name);

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">

            {/* Breadcrumb */}
            <section className="pt-28 pb-8 px-6 md:px-12">
                <div className="container mx-auto">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/60 hover:text-[#A67B5B] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Collection
                    </Link>
                </div>
            </section>

            {/* Product Detail */}
            <section className="pb-24 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Image */}
                        <div className="relative aspect-square bg-[#EBE9E4] overflow-hidden group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A67B5B] mb-4 block font-bold">
                                {product.category}
                            </span>

                            <h1 className="text-4xl md:text-5xl font-serif italic leading-tight mb-6">
                                {product.name}
                            </h1>

                            <p className="text-sm text-[#1A1A1A]/60 mb-2 uppercase tracking-widest">
                                by {product.brand}
                            </p>

                            <div className="w-16 h-px bg-[#A67B5B] my-8" />

                            <p className="text-[#1A1A1A]/80 leading-relaxed mb-8 text-lg">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="mb-10">
                                <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4">
                                    Specifications
                                </h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm">
                                            <span className="w-2 h-2 bg-[#A67B5B]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <a
                                href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-[#1A1A1A] text-[#F9F8F6] py-5 px-10 uppercase tracking-widest text-xs font-bold hover:bg-[#A67B5B] transition-colors"
                            >
                                <MessageCircle size={18} />
                                Request Quote via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-white border-t border-[#1A1A1A]/10">
                    <div className="container mx-auto">
                        <h2 className="font-serif text-3xl italic mb-12">Related Products</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProducts.map((rp) => (
                                <Link
                                    key={rp.slug}
                                    href={`/products/${rp.slug}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-[4/3] bg-[#EBE9E4] overflow-hidden mb-4">
                                        <Image
                                            src={rp.image}
                                            alt={rp.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-[#A67B5B] block mb-1">
                                        {rp.category}
                                    </span>
                                    <h3 className="font-serif text-lg group-hover:italic transition-all">
                                        {rp.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
