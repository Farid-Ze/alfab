"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import WhatsAppLink from "@/components/site/WhatsAppLink";
import { t } from "@/lib/i18n";

// =============================================================================
// Icons
// =============================================================================

function IconInstagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconFacebook({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconTikTok({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function IconYouTube({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconX({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconGlobe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM4.332 8.027a6.012 6.012 0 0 1 1.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 0 1 9 7.5V8a2 2 0 0 0 2 2h1.5a.5.5 0 0 0 .5-.5V8a1 1 0 0 1 1-1h.092a6.023 6.023 0 0 1-.357 4H11.5a.5.5 0 0 0-.5.5v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2V11a2 2 0 0 0-2-2H4.332ZM14.5 13.5a.5.5 0 0 0-.5-.5h-.5a1 1 0 0 1-1-1v-.5a2 2 0 0 0 2-2h.5a.5.5 0 0 0 .5-.5 6.016 6.016 0 0 1-1.5 4.5Z" clipRule="evenodd" />
    </svg>
  );
}

function IconChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

function IconArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  );
}

// =============================================================================
// SiteFooter Component - Enterprise Style
// =============================================================================

export default function SiteFooter() {
  const { locale, setLocale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;
  const contactEmail = process.env.NEXT_PUBLIC_FALLBACK_EMAIL ?? "hello@alfabeauty.co.id";
  const [langOpen, setLangOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return locale === "id" ? "Email wajib diisi" : "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return locale === "id" ? "Format email tidak valid" : "Invalid email format";
    }
    return "";
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) {
      // TODO: Handle subscription
      console.log("Subscribe:", email);
      setEmail("");
      setEmailTouched(false);
    }
  };

  const footerLinkClass = "inline-block text-[13px] text-white/70 hover:text-white transition-colors py-1.5 -ml-1 pl-1 pr-2";
  const labelClass = "text-[11px] font-medium uppercase tracking-wider text-white/40 mb-3";

  return (
    <footer className="bg-[#111111] text-white" aria-label="Footer">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[120rem] px-4 pt-12 pb-8 sm:px-6 lg:px-10 lg:pt-14 lg:pb-10">
        <div className="grid gap-10 lg:gap-20 lg:grid-cols-12">

          {/* ============ LEFT COLUMN (Subscribe + Office) ============ */}
          <div className="lg:col-span-5 space-y-8">
            {/* Subscribe Section */}
            <div>
              <p className={labelClass}>
                {locale === "id" ? "Berlangganan" : "Subscribe"}
              </p>
              <p className="text-[13px] text-white/60 mb-4">
                {locale === "id"
                  ? "Dapatkan update terbaru tentang produk dan tren kecantikan profesional."
                  : "Stay up to date with the latest products and professional beauty trends."}
              </p>
              <form onSubmit={handleEmailSubmit}>
                <div className={`flex items-center border-b pb-2 transition-colors ${emailTouched && emailError ? "border-red-500" : "border-white/30"}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailTouched) setEmailError(validateEmail(e.target.value));
                    }}
                    onBlur={() => {
                      setEmailTouched(false);
                      setEmailError("");
                    }}
                    placeholder={locale === "id" ? "Alamat Email" : "Email Address"}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                    aria-label="Email Address"
                    aria-invalid={emailTouched && !!emailError}
                  />
                  <button
                    type="submit"
                    className="text-white/70 hover:text-white transition-colors ml-4"
                    aria-label="Subscribe"
                  >
                    <IconArrowRight className="h-5 w-5" />
                  </button>
                </div>
                {emailTouched && emailError && (
                  <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
              </form>
            </div>

            {/* Office Section */}
            <div>
              <p className={labelClass}>
                {locale === "id" ? "Kantor" : "Office"}
              </p>
              <div className="space-y-1 text-[13px] text-white/70">
                <p>Jakarta, Indonesia</p>
                <p>{locale === "id" ? "Senin - Jumat 09:00 - 18:00" : "Mon - Fri 09:00 - 18:00"}</p>
                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  <a href={`mailto:${contactEmail}`} className="inline-block text-white/70 hover:text-white transition-colors py-1">{contactEmail}</a>
                  <span className="text-white/30">|</span>
                  <WhatsAppLink className="inline-block text-white/70 hover:text-white transition-colors py-1">+62 812 xxxx xxxx</WhatsAppLink>
                </div>
              </div>
            </div>
          </div>

          {/* ============ RIGHT COLUMN (Links Grid) ============ */}
          <div className="lg:col-span-7 lg:pl-8">
            {/* Navigation Columns - 4 columns grid */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {/* Help */}
              <nav aria-label="Help">
                <p className={labelClass}>{locale === "id" ? "Bantuan" : "Help"}</p>
                <ul className="space-y-2">
                  <li><AppLink href={`${base}/contact`} className={footerLinkClass}>{tx.nav.contact}</AppLink></li>
                  <li><AppLink href={`${base}/about`} className={footerLinkClass}>{tx.nav.about}</AppLink></li>
                </ul>
              </nav>

              {/* Explore */}
              <nav aria-label="Explore">
                <p className={labelClass}>{locale === "id" ? "Jelajahi" : "Explore"}</p>
                <ul className="space-y-2">
                  <li><AppLink href={`${base}/products`} className={footerLinkClass}>{tx.nav.products}</AppLink></li>
                  <li><AppLink href={`${base}/education`} className={footerLinkClass}>{tx.nav.education}</AppLink></li>
                  <li><AppLink href={`${base}/partnership`} className={footerLinkClass}>{tx.nav.partnership}</AppLink></li>
                </ul>
              </nav>

              {/* Partnership */}
              <nav aria-label="Partnership">
                <p className={labelClass}>{locale === "id" ? "Kemitraan" : "Partnership"}</p>
                <ul className="space-y-2">
                  <li><AppLink href={`${base}/partnership/become-partner`} className={footerLinkClass}>{tx.cta.becomePartner}</AppLink></li>
                  <li><WhatsAppLink className={footerLinkClass}>{tx.cta.whatsappConsult}</WhatsAppLink></li>
                </ul>
              </nav>

              {/* Language + Social */}
              <div className="space-y-6">
                {/* Language Selector - Minimal */}
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors"
                  >
                    <IconGlobe className="h-4 w-4" />
                    <span>{locale === "id" ? "Indonesia" : "English"}</span>
                    <IconChevronDown className={`h-4 w-4 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                  </button>
                  {langOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-10 min-w-[120px]">
                      <button
                        onClick={() => { setLocale("en"); setLangOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${locale === "en" ? "bg-gray-50 font-medium text-black" : "text-gray-700"}`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => { setLocale("id"); setLangOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${locale === "id" ? "bg-gray-50 font-medium text-black" : "text-gray-700"}`}
                      >
                        Indonesia
                      </button>
                    </div>
                  )}
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <a href="https://x.com/alfabeauty" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="X"><IconX className="h-4 w-4" /></a>
                  <a href="https://instagram.com/alfabeauty" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram"><IconInstagram className="h-4 w-4" /></a>
                  <a href="https://facebook.com/alfabeauty" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Facebook"><IconFacebook className="h-4 w-4" /></a>
                  <a href="https://youtube.com/@alfabeauty" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="YouTube"><IconYouTube className="h-4 w-4" /></a>
                  <a href="https://tiktok.com/@alfabeauty" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="TikTok"><IconTikTok className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - CK Style */}
      <div>
        <div className="mx-auto max-w-[120rem] px-4 pb-6 sm:px-6 lg:px-10 space-y-3">
          {/* Brand Name */}
          <p className="text-lg font-semibold tracking-tight text-white">Alfa Beauty</p>

          {/* Legal Links + Copyright Row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/50">
            <AppLink href={`${base}/privacy`} className="hover:text-white transition-colors">{tx.legal.privacyTitle}</AppLink>
            <span className="text-white/30">|</span>
            <AppLink href={`${base}/terms`} className="hover:text-white transition-colors">{tx.legal.termsTitle}</AppLink>
            <span className="text-white/30">|</span>
            <span>© {new Date().getFullYear()} PT Alfa Beauty Cosmetica. {tx.footer.copyrightSuffix}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
            </svg>
            <span>Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
