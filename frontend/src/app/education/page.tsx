import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Education & Training',
    description: 'Professional training programs and certifications for salons and barbershops.',
};

const featuredEvents = [
    {
        id: '1',
        title: 'GlowMaster Color Masterclass 2026',
        description: 'Intensive 2-day color certification program. Learn advanced color theory, correction techniques, and creative coloring.',
        date: 'February 15-16, 2026',
        location: 'Jakarta Training Center',
        type: 'Certification',
        image: '/images/education/color-class.jpg',
    },
    {
        id: '2',
        title: 'SalonLux Keratin Workshop',
        description: 'Hands-on workshop mastering keratin smoothing techniques. Proper application, troubleshooting, and aftercare.',
        date: 'January 28, 2026',
        location: 'Surabaya Beauty Academy',
        type: 'Workshop',
        image: '/images/education/keratin-workshop.jpg',
    },
    {
        id: '3',
        title: 'BarberElite Fade Masterclass',
        description: 'Master the art of fade haircuts. From skin fades to mid fades, techniques used by top barbers.',
        date: 'February 22, 2026',
        location: 'Bandung Barber Academy',
        type: 'Training',
        image: '/images/education/barber-class.jpg',
    },
];

const upcomingEvents = [
    {
        id: '4',
        title: 'AlfaPro 2026 Product Launch Event',
        description: 'Be the first to discover AlfaPro\'s new product line.',
        date: 'March 10, 2026',
        location: 'Jakarta Convention Center',
        type: 'Product Launch',
    },
    {
        id: '5',
        title: 'Basic Coloring for Beginners',
        description: 'Entry-level training for aspiring colorists.',
        date: 'February 8, 2026',
        location: 'Online (Zoom)',
        type: 'Training',
    },
    {
        id: '6',
        title: 'Advanced Cutting Techniques',
        description: 'Precision cutting for modern styles.',
        date: 'March 15, 2026',
        location: 'Jakarta Training Center',
        type: 'Workshop',
    },
];

export default function EducationPage() {
    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">

            {/* Hero Section */}
            <section className="relative bg-[#1A1A1A] text-[#F9F8F6] py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#A67B5B] rounded-full blur-[150px]" />
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/20 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#A67B5B] mb-6 block">
                        Professional Development
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif italic leading-tight mb-8">
                        Master Your<br />Craft.
                    </h1>
                    <p className="text-[#F9F8F6]/70 max-w-xl text-lg leading-relaxed">
                        Elevate your professional skills with our training programs and certifications.
                        Learn from industry experts and stay ahead of the curve.
                    </p>
                </div>
            </section>

            {/* Featured Programs */}
            <section className="py-24 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="flex justify-between items-end mb-16 border-b border-[#1A1A1A]/10 pb-6">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A67B5B] mb-4 block">
                                Highlighted
                            </span>
                            <h2 className="text-4xl font-serif italic">Featured Programs</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredEvents.map((event) => (
                            <div key={event.id} className="group">
                                {/* Image */}
                                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1A1A1A] to-[#A67B5B] mb-6 overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-6xl opacity-20">📚</span>
                                    </div>
                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#A67B5B] text-white text-[10px] uppercase tracking-widest font-bold px-3 py-2">
                                            {event.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="font-serif text-xl mb-3 group-hover:italic transition-all">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-2">
                                    {event.description}
                                </p>

                                <div className="flex flex-col gap-2 text-sm text-[#1A1A1A]/60 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-[#A67B5B]" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-[#A67B5B]" />
                                        {event.location}
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20mendaftar%20${encodeURIComponent(event.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#A67B5B] transition-colors"
                                >
                                    Register via WhatsApp
                                    <ArrowRight size={12} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-24 px-6 md:px-12 bg-[#EBE9E4]">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-serif italic mb-12">Upcoming Events</h2>

                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-[#A67B5B]/10 text-[#A67B5B] text-[10px] uppercase tracking-widest font-bold px-3 py-1">
                                            {event.type}
                                        </span>
                                    </div>
                                    <h3 className="font-serif text-xl mb-1">{event.title}</h3>
                                    <p className="text-sm text-[#1A1A1A]/60">{event.description}</p>
                                </div>

                                <div className="flex flex-col md:items-end gap-1 text-sm text-[#1A1A1A]/60">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} />
                                        {event.location}
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20mendaftar%20${encodeURIComponent(event.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="md:ml-8 inline-flex items-center justify-center bg-[#1A1A1A] text-[#F9F8F6] py-3 px-6 uppercase tracking-widest text-[10px] font-bold hover:bg-[#A67B5B] transition-colors"
                                >
                                    Register
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Training CTA */}
            <section className="py-24 px-6 md:px-12 bg-[#A67B5B]">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">
                        Need Custom Training?
                    </h2>
                    <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
                        We offer tailored training programs for your salon or barbershop team.
                        Contact us to discuss your specific needs.
                    </p>
                    <a
                        href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20training%20custom%20untuk%20tim%20saya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] py-4 px-10 uppercase tracking-widest text-xs font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
}
