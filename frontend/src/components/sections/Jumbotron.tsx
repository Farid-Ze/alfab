'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Jumbotron() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = Math.max(1 - scrollY / 500, 0);

    return (
        <section className="jumbotron relative" style={{ opacity }}>
            {/* Luxury Salon Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/salon-poster.jpg"
                    alt="Luxury Salon Interior"
                    fill
                    className="object-cover"
                    style={{ filter: 'brightness(0.6)' }}
                    priority
                    quality={100}
                />
            </div>

            {/* Overlay */}
            <div className="jumbotron-overlay" />

            {/* Content */}
            <div className="jumbotron-content">
                <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight luxury-typography">
                    Transform Your Salon
                    <span className="block text-gold-foil mt-2">With Premium Solutions</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
                    Professional products, expert education, and strategic partnership
                    for salon excellence across Indonesia
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="#products"
                        className="btn btn-secondary btn-magnetic text-lg px-10 py-4 hover-glow"
                    >
                        Explore Catalog
                    </Link>
                    <Link
                        href="#partnership"
                        className="btn btn-outline border-white/50 text-white hover:bg-white hover:text-[var(--color-primary)] text-lg px-10 py-4 glass-premium"
                    >
                        Become Partner
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator mt-16 opacity-60">
                    <span className="text-sm block mb-2">Scroll to explore</span>
                    <svg
                        className="w-6 h-6 mx-auto animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
