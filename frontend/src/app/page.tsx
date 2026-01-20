'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// --- UTILITY HOOK: Scroll Reveal ---
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

// --- EDITORIAL BUTTON ---
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'link';
  href?: string;
}

function EditorialButton({ children, className = '', variant = 'primary', href }: ButtonProps) {
  const baseStyles = "uppercase tracking-[0.15em] text-xs font-bold py-4 transition-all duration-500 flex items-center gap-2 group relative overflow-hidden";

  const variants = {
    primary: "bg-[#1A1A1A] text-[#F9F8F6] px-8 hover:bg-[#A67B5B] hover:pl-10",
    outline: "border border-[#1A1A1A] text-[#1A1A1A] px-8 hover:bg-[#1A1A1A] hover:text-[#F9F8F6]",
    link: "text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:border-[#A67B5B] hover:text-[#A67B5B] px-0"
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {variant === 'link' && <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
}

// --- LOOKBOOK ITEM (Product Card) ---
interface LookbookItemProps {
  number: string;
  title: string;
  category: string;
  image: string;
  href?: string;
}

function LookbookItem({ number, title, category, image, href = '#' }: LookbookItemProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Link
      href={href}
      ref={ref}
      className={`group cursor-pointer block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-[#E5E5E5]">
        <div className="absolute inset-0 bg-[#A67B5B]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        <Image
          src={image}
          alt={title}
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
      </div>

      {/* Text Content */}
      <div className="flex justify-between items-start border-t border-[#1A1A1A]/10 pt-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#A67B5B] mb-2 block font-bold">{category}</span>
          <h3 className="font-serif text-2xl text-[#1A1A1A] mb-1 group-hover:italic transition-all duration-300">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

// --- PRODUCT DATA (Real products from products page) ---
const products = [
  {
    number: '01',
    category: 'Hair Color',
    title: 'Alfaparf Milano',
    image: '/images/products/hair-color.png',
    href: '/products?category=hair-color'
  },
  {
    number: '02',
    category: 'Treatment',
    title: 'Keratin System',
    image: '/images/products/keratin.png',
    href: '/products?category=hair-treatment'
  },
  {
    number: '03',
    category: 'Styling',
    title: 'Premium Pomade',
    image: '/images/products/pomade.png',
    href: '/products?category=styling'
  },
  {
    number: '04',
    category: 'Tools',
    title: 'Pro Equipment',
    image: '/images/products/hair-dryer.png',
    href: '/products?category=tools-equipment'
  },
];

// --- BRAND PARTNERS (Real partners) ---
const brandPartners = [
  { name: 'Alfaparf Milano', href: 'https://www.alfaparfmilanopro.com/int-en' },
  { name: 'Montibello', href: 'https://hair.montibello.com/' },
  { name: 'Farmavita', href: 'https://farmavita.hair/' },
  { name: 'Gamma Plus', href: 'https://gammaplusna.com/' },
];

// --- UPCOMING EVENTS (Real events from education page) ---
const upcomingEvents = [
  {
    title: 'GlowMaster Color Masterclass 2026',
    date: 'February 2026',
    location: 'Jakarta Training Center',
    type: 'Certification',
  },
  {
    title: 'SalonLux Keratin Workshop',
    date: 'January 2026',
    location: 'Surabaya',
    type: 'Workshop',
  },
  {
    title: 'BarberElite Fade Masterclass',
    date: 'February 2026',
    location: 'Bandung',
    type: 'Training',
  },
];

// --- MAIN PAGE ---
export default function HomePage() {
  const heroReveal = useScrollReveal(0);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] overflow-x-hidden selection:bg-[#A67B5B] selection:text-white">

      {/* 1. JUMBOTRON HERO */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/salon-poster.jpg"
            alt="Luxury Salon"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F8F6]/90 via-[#F9F8F6]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
          <div
            ref={heroReveal.ref}
            className={`max-w-4xl ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}
          >

            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-[#1A1A1A]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A67B5B]">The Professional Standard</span>
            </div>

            <h2 className="text-6xl md:text-8xl font-serif leading-[0.85] mb-10 text-[#1A1A1A] mix-blend-multiply">
              Salon <br />
              <span className="italic font-light ml-16 md:ml-32 block text-[#4A4A4A]">Avant</span>
              Garde.
            </h2>

            <div className="flex flex-col md:flex-row items-start gap-12 max-w-2xl ml-2 md:ml-12 border-l-2 border-[#A67B5B] pl-8">
              <p className="font-sans text-xl font-light text-[#1A1A1A]/80 leading-relaxed">
                Redefining the supply chain for Indonesia&apos;s elite salons. <br />
                <span className="font-normal text-[#1A1A1A]">Strictly Professional. Pure Exclusivity.</span>
              </p>
            </div>

            <div className="mt-12 ml-2 md:ml-20 flex flex-wrap gap-6">
              <EditorialButton variant="primary" href="/products">View 2026 Catalog</EditorialButton>
              <EditorialButton variant="link" href="/partnership">Request Access</EditorialButton>
            </div>

          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute bottom-12 right-12 hidden md:block animate-spin" style={{ animationDuration: '20s' }}>
          <div className="w-32 h-32 border border-[#1A1A1A]/20 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 border border-[#A67B5B]/40 rounded-full" />
          </div>
        </div>
      </header>

      {/* 2. BRAND PARTNERS */}
      <section className="py-16 border-b border-[#1A1A1A]/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brandPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A]/40 hover:text-[#A67B5B] transition-colors font-serif text-xl md:text-2xl italic"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE PHILOSOPHY */}
      <section className="py-24 px-6 md:px-12 border-b border-[#1A1A1A]/10 bg-[#F9F8F6]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-[#1A1A1A]/10 pb-6">
            <h3 className="font-serif text-4xl italic text-[#1A1A1A]">The Philosophy</h3>
            <span className="font-mono text-xs text-[#A67B5B] uppercase mt-4 md:mt-0">[ 001 — ORIGIN ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 font-sans text-[#1A1A1A]/80 leading-loose text-sm text-justify">
            <div>
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] text-[#1A1A1A]">
                Founded on the belief that professional hairdressers deserve a partner, not just a vendor. We strip away the complexities of traditional distribution to offer a seamless, direct-to-salon experience.
              </p>
            </div>
            <div>
              <p>
                Our portfolio is strictly curated. We reject 90% of brands to ensure that what ends up on your shelf is nothing short of world-class excellence. Performance is our only metric of success.
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p>
                Beyond products, we deliver knowledge. Our education arm ensures your team masters every molecule of the formula.
              </p>
              <div className="mt-8">
                <EditorialButton variant="link" href="/about">About The Founders</EditorialButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED COLLECTION */}
      <section className="py-32 px-6 md:px-12 bg-white relative">
        <div className="container mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#1A1A1A]/10 pb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#A67B5B] mb-4 block">Seasonal Edit</span>
              <h2 className="text-5xl font-serif">The Collection</h2>
            </div>
            <div className="hidden md:block pb-2">
              <Link href="/products" className="text-xs font-bold uppercase tracking-widest hover:text-[#A67B5B] transition-colors">
                View All Products →
              </Link>
            </div>
          </div>

          {/* Product Grid - Staggered */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {products.map((product, index) => (
              <div key={product.number} className={index % 2 === 1 ? 'lg:mt-24' : ''}>
                <LookbookItem {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDUCATION PREVIEW */}
      <section className="py-24 bg-[#1A1A1A] text-[#F9F8F6]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: Content */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A67B5B] mb-6 block">Education & Training</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                Master Your Craft
              </h2>
              <p className="font-sans text-[#F9F8F6]/70 mb-8 leading-relaxed text-lg">
                Join our professional training programs and certifications.
                Learn from industry experts and elevate your salon excellence.
              </p>
              <EditorialButton variant="outline" href="/education" className="!text-[#F9F8F6] !border-[#F9F8F6] hover:!bg-[#F9F8F6] hover:!text-[#1A1A1A]">
                View All Programs
              </EditorialButton>
            </div>

            {/* Right: Upcoming Events */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-6 text-[#A67B5B] uppercase tracking-widest text-[10px]">Upcoming Events</h3>
              {upcomingEvents.map((event) => (
                <Link
                  key={event.title}
                  href="/education"
                  className="block bg-white/5 backdrop-blur rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[#F9F8F6] mb-2 text-lg">{event.title}</h4>
                      <p className="text-[#F9F8F6]/60 text-sm">{event.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#A67B5B] text-sm font-bold block">{event.date}</span>
                      <span className="text-xs text-[#F9F8F6]/50 mt-1 uppercase tracking-wider">{event.type}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL SECTION */}
      <section className="py-32 bg-[#EBE9E4] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 relative">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/images/salon-interior.jpg"
                  alt="Salon Interior"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out grayscale hover:grayscale-0"
                />
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#F9F8F6]/90 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <span className="font-serif italic text-2xl pr-1">Play</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-[#1A1A1A]/20 -z-10 hidden md:block" />
            </div>

            <div className="lg:col-span-5 pl-0 md:pl-12">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A67B5B] mb-6 block">The Vision</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                &ldquo;We don&apos;t just distribute products. We engineer the salon experience.&rdquo;
              </h2>
              <p className="font-sans text-[#1A1A1A]/70 mb-8 leading-relaxed text-lg">
                Our logistics network is designed for one thing: ensuring your backbar never runs dry.
                Coupled with world-class education, we are the invisible engine behind your salon&apos;s success.
              </p>
              <EditorialButton variant="link" href="/about">Read The Manifesto</EditorialButton>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PARTNERSHIP CTA */}
      <section className="py-24 bg-[#A67B5B]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Ready to Partner?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
            Join our exclusive network of professional salons and barbershops.
            Access premium products, training, and dedicated support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/partnership"
              className="bg-white text-[#1A1A1A] px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#1A1A1A] hover:text-white transition-all"
            >
              Apply Now
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20partnership"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-[#1A1A1A] transition-all"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
