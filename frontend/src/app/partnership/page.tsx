'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

const partnerBenefits = [
    {
        title: 'Exclusive Products',
        description: 'Access our curated selection of premium professional beauty products.',
        icon: '📦',
    },
    {
        title: 'Competitive Pricing',
        description: 'Special partner pricing and volume discounts for your business.',
        icon: '💰',
    },
    {
        title: 'Technical Support',
        description: 'Dedicated support team to help with product selection and usage.',
        icon: '🛠️',
    },
    {
        title: 'Training & Education',
        description: 'Access to exclusive training programs and certifications.',
        icon: '📚',
    },
    {
        title: 'Priority Delivery',
        description: 'Fast and reliable delivery to keep your business stocked.',
        icon: '🚚',
    },
    {
        title: 'Marketing Support',
        description: 'Co-marketing materials and promotional support.',
        icon: '📣',
    },
];

const salonTypes = [
    { value: '', label: 'Select type...' },
    { value: 'SALON', label: 'Salon' },
    { value: 'BARBER', label: 'Barbershop' },
    { value: 'BRIDAL', label: 'Bridal Studio' },
    { value: 'UNISEX', label: 'Unisex Salon' },
    { value: 'OTHER', label: 'Other' },
];

interface FormData {
    business_name: string;
    contact_name: string;
    phone_whatsapp: string;
    city: string;
    salon_type: string;
    chair_count: string;
    specialization: string;
    consent: boolean;
    website: string; // Honeypot
}

interface FormErrors {
    [key: string]: string;
}

export default function PartnershipPage() {
    const [formData, setFormData] = useState<FormData>({
        business_name: '',
        contact_name: '',
        phone_whatsapp: '',
        city: '',
        salon_type: '',
        chair_count: '',
        specialization: '',
        consent: false,
        website: '', // Honeypot - should remain empty
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.business_name.trim()) {
            newErrors.business_name = 'Business name is required';
        }
        if (!formData.contact_name.trim()) {
            newErrors.contact_name = 'Contact name is required';
        }
        if (!formData.phone_whatsapp.trim()) {
            newErrors.phone_whatsapp = 'WhatsApp number is required';
        } else if (!/^(\+62|62|08)[0-9]{8,12}$/.test(formData.phone_whatsapp.replace(/[\s\-]/g, ''))) {
            newErrors.phone_whatsapp = 'Please enter a valid Indonesian phone number';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.salon_type) {
            newErrors.salon_type = 'Please select your business type';
        }
        if (!formData.consent) {
            newErrors.consent = 'You must agree to be contacted';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // In production, submit to API
            // const response = await fetch('/api/public/partner-leads', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData),
            // });

            // Simulate API call for demo
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSuccess(true);
        } catch (error) {
            setErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section className="section">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                        <p className="text-gray-600 mb-8">
                            We have received your partnership application. Our team will contact you via WhatsApp within 1-2 business days.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/6281234567890?text=Halo,%20saya%20baru%20saja%20mengisi%20form%20partnership"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat Now
                            </a>
                            <Link href="/products" className="btn btn-outline">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Header */}
            <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-white">Become Our Partner</h1>
                    <p className="text-gray-200 max-w-2xl">
                        Join our network of professional salons and barbershops. Get access to premium products,
                        exclusive pricing, and dedicated support.
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="section bg-[var(--background-alt)]">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">Partner Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {partnerBenefits.map((benefit) => (
                            <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-sm">
                                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Form */}
            <section className="section">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Apply for Partnership</h2>
                            <p className="text-gray-600">
                                Fill out the form below and our team will contact you to discuss partnership opportunities.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="card p-8">
                            {/* Honeypot - Hidden field */}
                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Business Name */}
                                <div className="form-group md:col-span-2">
                                    <label htmlFor="business_name" className="form-label">
                                        Business Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="business_name"
                                        name="business_name"
                                        value={formData.business_name}
                                        onChange={handleChange}
                                        className={`form-input ${errors.business_name ? 'error' : ''}`}
                                        placeholder="Your salon or barbershop name"
                                    />
                                    {errors.business_name && <p className="form-error">{errors.business_name}</p>}
                                </div>

                                {/* Contact Name */}
                                <div className="form-group">
                                    <label htmlFor="contact_name" className="form-label">
                                        Contact Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="contact_name"
                                        name="contact_name"
                                        value={formData.contact_name}
                                        onChange={handleChange}
                                        className={`form-input ${errors.contact_name ? 'error' : ''}`}
                                        placeholder="Your name"
                                    />
                                    {errors.contact_name && <p className="form-error">{errors.contact_name}</p>}
                                </div>

                                {/* Phone WhatsApp */}
                                <div className="form-group">
                                    <label htmlFor="phone_whatsapp" className="form-label">
                                        WhatsApp Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone_whatsapp"
                                        name="phone_whatsapp"
                                        value={formData.phone_whatsapp}
                                        onChange={handleChange}
                                        className={`form-input ${errors.phone_whatsapp ? 'error' : ''}`}
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    {errors.phone_whatsapp && <p className="form-error">{errors.phone_whatsapp}</p>}
                                </div>

                                {/* City */}
                                <div className="form-group">
                                    <label htmlFor="city" className="form-label">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`form-input ${errors.city ? 'error' : ''}`}
                                        placeholder="Your city"
                                    />
                                    {errors.city && <p className="form-error">{errors.city}</p>}
                                </div>

                                {/* Salon Type */}
                                <div className="form-group">
                                    <label htmlFor="salon_type" className="form-label">
                                        Business Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="salon_type"
                                        name="salon_type"
                                        value={formData.salon_type}
                                        onChange={handleChange}
                                        className={`form-input form-select ${errors.salon_type ? 'error' : ''}`}
                                    >
                                        {salonTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.salon_type && <p className="form-error">{errors.salon_type}</p>}
                                </div>

                                {/* Chair Count */}
                                <div className="form-group">
                                    <label htmlFor="chair_count" className="form-label">
                                        Number of Chairs (optional)
                                    </label>
                                    <input
                                        type="number"
                                        id="chair_count"
                                        name="chair_count"
                                        value={formData.chair_count}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="e.g. 5"
                                        min="1"
                                        max="100"
                                    />
                                </div>

                                {/* Specialization */}
                                <div className="form-group md:col-span-2">
                                    <label htmlFor="specialization" className="form-label">
                                        Specialization (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="specialization"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="e.g. Hair coloring, Keratin treatments, Barbering"
                                    />
                                </div>
                            </div>

                            {/* Consent */}
                            <div className="form-group mt-6">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to be contacted by Alfa Beauty regarding partnership opportunities.
                                        I understand my data will be used for business communication only.
                                        <Link href="/privacy" className="text-[var(--color-secondary)] hover:underline"> Privacy Policy</Link>
                                    </span>
                                </label>
                                {errors.consent && <p className="form-error mt-2">{errors.consent}</p>}
                            </div>

                            {/* Submit Error */}
                            {errors.submit && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6">
                                    {errors.submit}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary w-full mt-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </form>

                        {/* Alternative Contact */}
                        <div className="text-center mt-8">
                            <p className="text-gray-600 mb-4">
                                Prefer to talk directly? Contact us via WhatsApp
                            </p>
                            <a
                                href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20partnership"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
