'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Filter, X } from 'lucide-react';

// Scroll Reveal Hook
function useScrollReveal(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [threshold]);

    return { ref, isVisible };
}

// Product Data
const products = [
    {
        id: '1',
        slug: 'glowmaster-permanent-color',
        name: 'GlowMaster Permanent Color',
        brand: 'GlowMaster Color',
        brandSlug: 'glowmaster',
        category: 'Hair Color',
        categorySlug: 'hair-color',
        audience: 'BOTH',
        image: '/images/products/hair-color.png',
        description: 'Professional permanent hair color with 100% grey coverage.',
    },
    {
        id: '2',
        slug: 'glowmaster-bleach-powder',
        name: 'Blue Bleach Powder',
        brand: 'GlowMaster Color',
        brandSlug: 'glowmaster',
        category: 'Hair Color',
        categorySlug: 'hair-color',
        audience: 'SALON',
        image: '/images/products/bleach-powder.png',
        description: 'Dust-free professional bleaching powder.',
    },
    {
        id: '3',
        slug: 'salonlux-keratin-system',
        name: 'Keratin Treatment System',
        brand: 'SalonLux Treatment',
        brandSlug: 'salonlux',
        category: 'Hair Treatment',
        categorySlug: 'hair-treatment',
        audience: 'SALON',
        image: '/images/products/keratin.png',
        description: 'Professional keratin smoothing treatment.',
    },
    {
        id: '4',
        slug: 'salonlux-botox-treatment',
        name: 'Hair Botox Treatment',
        brand: 'SalonLux Treatment',
        brandSlug: 'salonlux',
        category: 'Hair Treatment',
        categorySlug: 'hair-treatment',
        audience: 'BOTH',
        image: '/images/products/botox.png',
        description: 'Deep conditioning treatment for damaged hair.',
    },
    {
        id: '5',
        slug: 'barber-elite-classic-pomade',
        name: 'Classic Pomade',
        brand: 'BarberElite',
        brandSlug: 'barber-elite',
        category: 'Styling Products',
        categorySlug: 'styling',
        audience: 'BARBER',
        image: '/images/products/pomade.png',
        description: 'Water-based pomade with strong hold.',
    },
    {
        id: '6',
        slug: 'barber-elite-matte-clay',
        name: 'Matte Clay',
        brand: 'BarberElite',
        brandSlug: 'barber-elite',
        category: 'Styling Products',
        categorySlug: 'styling',
        audience: 'BARBER',
        image: '/images/products/matte-clay.png',
        description: 'Strong hold styling clay with matte finish.',
    },
    {
        id: '7',
        slug: 'stylepro-ionic-dryer',
        name: 'Ionic Pro Dryer',
        brand: 'StylePro Tools',
        brandSlug: 'stylepro',
        category: 'Tools & Equipment',
        categorySlug: 'tools-equipment',
        audience: 'BOTH',
        image: '/images/products/hair-dryer.png',
        description: '2200W professional hair dryer with ionic technology.',
    },
    {
        id: '8',
        slug: 'stylepro-titanium-iron',
        name: 'Titanium Flat Iron',
        brand: 'StylePro Tools',
        brandSlug: 'stylepro',
        category: 'Tools & Equipment',
        categorySlug: 'tools-equipment',
        audience: 'SALON',
        image: '/images/products/flat-iron.png',
        description: 'Professional flat iron with titanium plates.',
    },
];

const brands = [
    { name: 'All Brands', slug: '' },
    { name: 'GlowMaster Color', slug: 'glowmaster' },
    { name: 'SalonLux Treatment', slug: 'salonlux' },
    { name: 'BarberElite', slug: 'barber-elite' },
    { name: 'StylePro Tools', slug: 'stylepro' },
];

const categories = [
    { name: 'All Categories', slug: '' },
    { name: 'Hair Color', slug: 'hair-color' },
    { name: 'Hair Treatment', slug: 'hair-treatment' },
    { name: 'Styling Products', slug: 'styling' },
    { name: 'Tools & Equipment', slug: 'tools-equipment' },
];

// Lookbook Product Card
interface ProductCardProps {
    number: string;
    product: typeof products[0];
    index: number;
}

function ProductCard({ number, product, index }: ProductCardProps) {
    const { ref, isVisible } = useScrollReveal();

    return (
        <Link
            href={`/products/${product.slug}`}
            ref={ref}
            className={`group cursor-pointer block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-[#E5E5E5]">
                <div className="absolute inset-0 bg-[#A67B5B]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-6 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <div className="w-12 h-12 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#1A1A1A] shadow-xl hover:bg-[#1A1A1A] hover:text-[#F9F8F6] transition-colors">
                        <ArrowUpRight size={20} />
                    </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="font-mono text-xs font-bold text-[#1A1A1A] bg-[#F9F8F6]/80 backdrop-blur-sm px-2 py-1">
                        NO. {number}
                    </span>
                </div>

                {/* Audience Badge */}
                {product.audience !== 'BOTH' && (
                    <div className="absolute top-4 right-4 z-20">
                        <span className={`text-xs font-bold px-3 py-1 ${product.audience === 'SALON'
                                ? 'bg-pink-500 text-white'
                                : 'bg-blue-500 text-white'
                            }`}>
                            {product.audience}
                        </span>
                    </div>
                )}
            </div>

            {/* Text Content */}
            <div className="border-t border-[#1A1A1A]/10 pt-4">
                <span className="text-[10px] uppercase tracking-widest text-[#A67B5B] mb-2 block font-bold">
                    {product.category}
                </span>
                <h3 className="font-serif text-xl text-[#1A1A1A] mb-1 group-hover:italic transition-all duration-300">
                    {product.name}
                </h3>
                <p className="text-sm text-[#1A1A1A]/60 font-sans">
                    {product.brand}
                </p>
            </div>
        </Link>
    );
}

export default function ProductsPage() {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAudience, setSelectedAudience] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter products
    const filteredProducts = products.filter((product) => {
        if (selectedBrand && product.brandSlug !== selectedBrand) return false;
        if (selectedCategory && product.categorySlug !== selectedCategory) return false;
        if (selectedAudience && product.audience !== selectedAudience && product.audience !== 'BOTH') return false;
        return true;
    });

    const resetFilters = () => {
        setSelectedBrand('');
        setSelectedCategory('');
        setSelectedAudience('');
    };

    const hasActiveFilters = selectedBrand || selectedCategory || selectedAudience;

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-12 border-b border-[#1A1A1A]/10">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A67B5B] mb-4 block">
                                Seasonal Edit
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif">The Collection</h1>
                        </div>
                        <p className="text-[#1A1A1A]/60 max-w-md mt-6 md:mt-0 text-sm leading-relaxed">
                            Curated selection of professional beauty products for elite salons and barbershops.
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Filter Sidebar - Desktop */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="sticky top-32">
                                <div className="flex justify-between items-center mb-8 border-b border-[#1A1A1A]/10 pb-4">
                                    <h2 className="font-serif text-xl italic">Filters</h2>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={resetFilters}
                                            className="text-xs uppercase tracking-widest text-[#A67B5B] hover:underline"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>

                                {/* Brand Filter */}
                                <div className="mb-8">
                                    <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">
                                        Brand
                                    </label>
                                    <select
                                        value={selectedBrand}
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm outline-none focus:border-[#A67B5B] transition-colors"
                                    >
                                        {brands.map((brand) => (
                                            <option key={brand.slug} value={brand.slug}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-8">
                                    <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">
                                        Category
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm outline-none focus:border-[#A67B5B] transition-colors"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.slug} value={cat.slug}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Audience Filter */}
                                <div className="mb-8">
                                    <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">
                                        Audience
                                    </label>
                                    <div className="space-y-3">
                                        {['', 'SALON', 'BARBER'].map((aud) => (
                                            <button
                                                key={aud}
                                                onClick={() => setSelectedAudience(aud)}
                                                className={`block w-full text-left py-2 text-sm transition-colors ${selectedAudience === aud
                                                        ? 'text-[#A67B5B] font-bold'
                                                        : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                                                    }`}
                                            >
                                                {aud || 'All'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Partnership CTA */}
                                <div className="pt-8 border-t border-[#1A1A1A]/10">
                                    <p className="text-sm text-[#1A1A1A]/60 mb-4">
                                        Interested in our products?
                                    </p>
                                    <Link
                                        href="/partnership"
                                        className="block w-full bg-[#1A1A1A] text-[#F9F8F6] py-4 text-center uppercase tracking-widest text-xs font-bold hover:bg-[#A67B5B] transition-colors"
                                    >
                                        Become Partner
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="lg:hidden flex items-center gap-2 text-sm uppercase tracking-widest font-bold mb-4"
                        >
                            <Filter size={16} />
                            Filters {hasActiveFilters && `(${[selectedBrand, selectedCategory, selectedAudience].filter(Boolean).length})`}
                        </button>

                        {/* Mobile Filter Overlay */}
                        {showFilters && (
                            <div className="lg:hidden fixed inset-0 bg-[#F9F8F6] z-50 p-6 overflow-y-auto">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="font-serif text-2xl italic">Filters</h2>
                                    <button onClick={() => setShowFilters(false)}>
                                        <X size={24} />
                                    </button>
                                </div>
                                {/* Same filters as desktop */}
                                <div className="space-y-8">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">Brand</label>
                                        <select
                                            value={selectedBrand}
                                            onChange={(e) => setSelectedBrand(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm outline-none"
                                        >
                                            {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">Category</label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm outline-none"
                                        >
                                            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-8 flex gap-4">
                                    <button onClick={resetFilters} className="flex-1 border border-[#1A1A1A] py-4 uppercase tracking-widest text-xs font-bold">
                                        Reset
                                    </button>
                                    <button onClick={() => setShowFilters(false)} className="flex-1 bg-[#1A1A1A] text-white py-4 uppercase tracking-widest text-xs font-bold">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Product Grid */}
                        <div className="flex-1">
                            {/* Results Count */}
                            <div className="flex justify-between items-center mb-12 border-b border-[#1A1A1A]/10 pb-4">
                                <p className="text-sm text-[#1A1A1A]/60">
                                    Showing <span className="font-bold text-[#1A1A1A]">{filteredProducts.length}</span> products
                                </p>
                            </div>

                            {/* Products */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                                    {filteredProducts.map((product, index) => (
                                        <div key={product.id} className={index % 3 === 1 ? 'xl:mt-16' : ''}>
                                            <ProductCard
                                                number={String(index + 1).padStart(2, '0')}
                                                product={product}
                                                index={index}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-24">
                                    <h3 className="font-serif text-2xl italic mb-4">No products found</h3>
                                    <p className="text-[#1A1A1A]/60 mb-8">Try adjusting your filters.</p>
                                    <button
                                        onClick={resetFilters}
                                        className="bg-[#1A1A1A] text-[#F9F8F6] px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#A67B5B] transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
