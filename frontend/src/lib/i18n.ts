export type Locale = "en" | "id";

export function normalizeLocale(input: string | null | undefined): Locale {
  const v = (input ?? "").toLowerCase();
  if (v.startsWith("id")) return "id";
  return "en";
}

const dict = {
  en: {
    nav: {
      products: "Products",
      education: "Education",
      partnership: "Partnership",
      about: "About",
      contact: "Contact",
    },
    cta: {
      becomePartner: "Become Partner",
      whatsappConsult: "WhatsApp Consult",
      exploreProducts: "Explore Products",
      emailInstead: "Email us instead",
    },
    home: {
      hero: {
        kicker: "Professional B2B Beauty Distribution",
        title: "Products, education, and technical support for salons & barbershops.",
        lede:
          "PT Alfa Beauty is a professional beauty distribution company dedicated to providing products, education, and technical support for salons and barbershops in Indonesia.",
        points: [
          "Positioning: who we are, our 3 pillars (Products, Education, Partnership), and the strength of a curated portfolio.",
          "Discovery: an easy-to-navigate product catalog for salons and barbershops (no public pricing).",
          "Conversion: a fast path to WhatsApp consultation + Become Partner lead capture.",
        ],
        note: "No public pricing. For consultation and product recommendations, contact us via WhatsApp.",
      },
    },
    about: {
      title: "About",
      body:
        "PT Alfa Beauty is a professional beauty distribution company dedicated to providing products, education, and technical support for salons and barbershops in Indonesia. We represent carefully selected international brands and work as a strategic partner to professionals, ensuring every product we distribute delivers consistent performance and is supported by proper technical knowledge.",
    },
    contact: {
      title: "Contact",
      body:
        "For consultation, product recommendations, and partnership inquiries, reach us via WhatsApp.",
      email: "Email",
    },
    pillars: {
      products: {
        title: "Products",
        body: "Curated professional brands — designed to support consistent performance in real-world use.",
      },
      education: {
        title: "Education",
        body: "Training and technical knowledge to help your team apply products correctly.",
      },
      partnership: {
        title: "Partnership",
        body: "A strategic partner for salons and barbershops — no retail gimmicks, no public pricing.",
      },
    },
    partnership: {
      title: "Partnership",
      lede:
        "We work as a strategic partner for salons and barbershops: curated products, education, and technical support. B2B-first, professional, no retail gimmicks.",
      cards: {
        curated: {
          title: "Curated portfolio",
          body: "Access carefully selected brands supported by real-world technical knowledge.",
        },
        education: {
          title: "Education & support",
          body: "Training, product knowledge, and support to help your team deliver consistent results.",
        },
        b2b: {
          title: "B2B-first",
          body: "Designed for professionals — B2B-first, no retail gimmicks, no public pricing.",
        },
      },
      readyBlock: {
        title: "Ready to become a partner?",
        body:
          "Submit your details and we’ll follow up. Your lead is stored durably before we confirm success.",
      },
    },
    becomePartner: {
      title: "Become a Partner",
      lede: "Tell us a bit about your business. Our team will follow up within 24 hours.",
      next: {
        title: "What happens next",
        items: [
          "We review your details and reach out via WhatsApp/phone/email.",
          "We recommend suitable products and training options.",
          "No public pricing — consultation happens via WhatsApp.",
        ],
      },
    },
    products: {
      title: "Products",
      lede:
        "Curated products for salons and barbershops. No public pricing — contact us via WhatsApp for consultation and recommendations.",
      highlights: {
        title: "Featured products",
        lede: "A quick look at our curated portfolio.",
        viewAll: "View all",
      },
      filters: {
        title: "Filters",
        clear: "Clear",
        groups: {
          brand: "Brand",
          audience: "Audience",
          function: "Function",
        },
        audience: {
          salon: "Salon",
          barber: "Barbershop",
        },
        empty: {
          title: "No results",
          body: "Try clearing filters, or contact us on WhatsApp for recommendations.",
        },
      },
    },
    sections: {
      consultCta: {
        title: "Need help choosing products?",
        body: "Message us on WhatsApp for consultation, product recommendations, and ordering.",
      },
    },
    legal: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms",
    },
    education: {
      hub: {
        title: "Education & Events",
        lede:
          "Concise, technical, and relevant for salon & barbershop professionals. Paket A does not include ticketing—registration happens via WhatsApp.",
        sections: {
          events: "Events",
          articles: "Articles",
        },
        labels: {
          audience: "Audience",
        },
        actions: {
          viewDetails: "View details",
          read: "Read",
        },
        trainingNote: "Want training for your team? Message us on WhatsApp and tell us your city and needs.",
      },
      common: {
        backToEducation: "Back",
      },
      event: {
        notFound: {
          title: "Event not found",
          body: "We couldn’t find that event. Please return to Education.",
        },
        note: "Note: Schedules may change. Confirm availability via WhatsApp.",
      },
      article: {
        notFound: {
          title: "Article not found",
          body: "We couldn’t find that article. Please return to Education.",
        },
        footer: "Need guidance for a specific product? Send your questions via WhatsApp.",
      },
    },
    productDetail: {
      notFound: {
        body: "Product not found.",
        back: "Back to Products",
      },
      sections: {
        keyBenefits: "Key benefits",
        howToUse: "How to use",
        recommendedFor: "Recommended for",
      },
      labels: {
        audience: "Audience",
        functions: "Functions",
      },
      consult: {
        title: "Consult & request recommendations",
        body: "No public pricing. Message us on WhatsApp for suitability, usage guidance, and ordering.",
        prefill: "Hi Alfa Beauty, I’d like to consult about {{product}}.",
      },
    },
    leadForm: {
      fields: {
        businessName: "Business name",
        contactName: "Contact name",
        emailOptional: "Email (optional)",
        whatsAppNumber: "WhatsApp number",
        city: "City",
        salonType: "Salon type",
        salonTypePlaceholder: "Select…",
        messageOptional: "Message (optional)",
      },
      salonTypes: {
        salon: "Salon",
        barber: "Barbershop",
        bridal: "Bridal",
        unisex: "Unisex",
        other: "Other",
      },
      additionalDetails: {
        summary: "Additional details (optional)",
        chairCount: "Chair count",
        chairCountPlaceholder: "e.g. 6",
        specialization: "Specialization",
        specializationPlaceholder: "e.g. coloring, keratin",
        currentBrandsUsed: "Current brands used",
        monthlySpendRange: "Monthly spend range",
        monthlySpendRangePlaceholder: "optional",
      },
      honeypot: {
        companyLabel: "Company",
      },
      consent: "I consent to be contacted for partnership follow-up.",
      actions: {
        submit: "Submit",
        submitting: "Submitting…",
      },
      success: {
        title: "Thank you — we received your details.",
        body: "Our team will follow up. You can also message us on WhatsApp for faster consultation.",
        ref: "Reference",
      },
      errors: {
        network: "Network error. Please try again.",
        rateLimited: "Too many requests. Please try again in a moment.",
        submitFailed: "Submission failed. Please try again.",
      },
    },
    system: {
      notFound: {
        title: "Page not found",
        body: "The page you’re looking for doesn’t exist. Please use the navigation or go back home.",
        backHome: "Back to Home",
      },
      error: {
        title: "Something went wrong",
        body: "Please try again. If this keeps happening, contact us via WhatsApp.",
        actions: {
          tryAgain: "Try again",
          goHome: "Go home",
        },
        ref: "Ref",
      },
    },
    footer: {
      explore: "Explore",
      legal: "Legal",
      blurb: "Professional beauty distribution for salons and barbershops in Indonesia.",
      copyrightSuffix: "All rights reserved.",
    },
  },
  id: {
    nav: {
      products: "Produk",
      education: "Edukasi",
      partnership: "Kemitraan",
      about: "Tentang",
      contact: "Kontak",
    },
    cta: {
      becomePartner: "Jadi Partner",
      whatsappConsult: "Konsultasi WhatsApp",
      exploreProducts: "Lihat Produk",
      emailInstead: "Atau email kami",
    },
    home: {
      hero: {
        kicker: "Distribusi Kosmetik B2B Profesional",
        title: "Produk, edukasi, dan dukungan teknis untuk salon & barbershop.",
        lede:
          "PT Alfa Beauty adalah perusahaan distribusi kecantikan profesional yang menyediakan produk, edukasi, dan dukungan teknis untuk salon dan barbershop di Indonesia.",
        points: [
          "Positioning: memperjelas siapa Alfa Beauty, 3 pilar (Products, Education, Partnership), dan keunggulan kurasi brand.",
          "Discovery: katalog produk yang mudah dinavigasi untuk salon/barbershop (tanpa harga publik).",
          "Conversion: jalur cepat ke WhatsApp untuk konsultasi + Become Partner (lead capture) dengan profil dasar.",
        ],
        note: "Tanpa harga publik. Untuk konsultasi dan rekomendasi produk, hubungi kami via WhatsApp.",
      },
    },
    about: {
      title: "Tentang",
      body:
        "PT Alfa Beauty adalah perusahaan distribusi kecantikan profesional yang menyediakan produk, edukasi, dan dukungan teknis untuk salon dan barbershop di Indonesia. Kami menghadirkan brand internasional terkurasi dan menjadi partner strategis bagi para profesional, memastikan setiap produk yang kami distribusikan konsisten performanya serta didukung pengetahuan teknis yang tepat.",
    },
    contact: {
      title: "Kontak",
      body:
        "Untuk konsultasi, rekomendasi produk, dan pertanyaan kemitraan, hubungi kami via WhatsApp.",
      email: "Email",
    },
    pillars: {
      products: {
        title: "Produk",
        body: "Brand profesional terkurasi — mendukung performa konsisten di penggunaan nyata.",
      },
      education: {
        title: "Edukasi",
        body: "Training dan pengetahuan teknis agar tim Anda menerapkan produk dengan tepat.",
      },
      partnership: {
        title: "Kemitraan",
        body: "Partner strategis untuk salon dan barbershop — tanpa gimmick retail, tanpa harga publik.",
      },
    },
    partnership: {
      title: "Kemitraan",
      lede:
        "Kami bekerja sebagai partner strategis untuk salon dan barbershop: produk terkurasi, edukasi, dan dukungan teknis. B2B-first, profesional, tanpa gimmick retail.",
      cards: {
        curated: {
          title: "Portofolio terkurasi",
          body: "Akses brand terpilih yang didukung pengetahuan teknis dan pengalaman penggunaan nyata.",
        },
        education: {
          title: "Edukasi & dukungan",
          body: "Training, product knowledge, dan dukungan untuk membantu tim Anda memberi hasil konsisten.",
        },
        b2b: {
          title: "B2B-first",
          body: "Dirancang untuk profesional — B2B-first, tanpa gimmick retail, tanpa harga publik.",
        },
      },
      readyBlock: {
        title: "Siap jadi partner?",
        body:
          "Kirim detail Anda dan tim kami akan follow up. Lead disimpan secara durable sebelum kami mengonfirmasi sukses.",
      },
    },
    becomePartner: {
      title: "Jadi Partner",
      lede: "Ceritakan singkat tentang bisnis Anda. Tim kami akan follow up dalam 24 jam.",
      next: {
        title: "Langkah berikutnya",
        items: [
          "Kami review data Anda lalu menghubungi via WhatsApp/telepon/email.",
          "Kami rekomendasikan produk dan opsi training yang sesuai.",
          "Tanpa harga publik — konsultasi dilakukan via WhatsApp.",
        ],
      },
    },
    products: {
      title: "Produk",
      lede:
        "Produk terkurasi untuk salon dan barbershop. Tanpa harga publik — hubungi kami via WhatsApp untuk konsultasi dan rekomendasi.",
      highlights: {
        title: "Produk pilihan",
        lede: "Sekilas portofolio produk terkurasi kami.",
        viewAll: "Lihat semua",
      },
      filters: {
        title: "Filter",
        clear: "Reset",
        groups: {
          brand: "Brand",
          audience: "Target",
          function: "Fungsi",
        },
        audience: {
          salon: "Salon",
          barber: "Barbershop",
        },
        empty: {
          title: "Tidak ada hasil",
          body: "Coba reset filter, atau hubungi kami via WhatsApp untuk rekomendasi.",
        },
      },
    },
    sections: {
      consultCta: {
        title: "Butuh bantuan memilih produk?",
        body: "Chat kami via WhatsApp untuk konsultasi, rekomendasi produk, dan pemesanan.",
      },
    },
    legal: {
      privacyTitle: "Kebijakan Privasi",
      termsTitle: "Syarat & Ketentuan",
    },
    education: {
      hub: {
        title: "Edukasi & Event",
        lede:
          "Ringkas, teknis, dan relevan untuk profesional salon & barbershop. Tidak ada sistem tiket di Paket A—registrasi via WhatsApp.",
        sections: {
          events: "Event",
          articles: "Artikel",
        },
        labels: {
          audience: "Audiens",
        },
        actions: {
          viewDetails: "Lihat detail",
          read: "Baca",
        },
        trainingNote: "Ingin sesi training untuk tim Anda? Hubungi kami via WhatsApp dan sebutkan kota + kebutuhan Anda.",
      },
      common: {
        backToEducation: "Kembali",
      },
      event: {
        notFound: {
          title: "Event tidak ditemukan",
          body: "Kami tidak menemukan event tersebut. Silakan kembali ke halaman Edukasi.",
        },
        note: "Catatan: Jadwal dapat berubah. Konfirmasi via WhatsApp untuk slot dan ketersediaan.",
      },
      article: {
        notFound: {
          title: "Artikel tidak ditemukan",
          body: "Kami tidak menemukan artikel tersebut. Silakan kembali ke halaman Edukasi.",
        },
        footer: "Butuh panduan untuk produk tertentu? Kirim pertanyaan Anda via WhatsApp.",
      },
    },
    productDetail: {
      notFound: {
        body: "Produk tidak ditemukan.",
        back: "Kembali ke Produk",
      },
      sections: {
        keyBenefits: "Manfaat utama",
        howToUse: "Cara pakai",
        recommendedFor: "Rekomendasi",
      },
      labels: {
        audience: "Audiens",
        functions: "Fungsi",
      },
      consult: {
        title: "Konsultasi & minta rekomendasi",
        body: "Tanpa harga publik. Chat kami via WhatsApp untuk kecocokan, panduan pemakaian, dan pemesanan.",
        prefill: "Halo Alfa Beauty, saya ingin konsultasi tentang {{product}}.",
      },
    },
    leadForm: {
      fields: {
        businessName: "Nama bisnis",
        contactName: "Nama kontak",
        emailOptional: "Email (opsional)",
        whatsAppNumber: "Nomor WhatsApp",
        city: "Kota",
        salonType: "Tipe bisnis",
        salonTypePlaceholder: "Pilih…",
        messageOptional: "Pesan (opsional)",
      },
      salonTypes: {
        salon: "Salon",
        barber: "Barbershop",
        bridal: "Bridal",
        unisex: "Unisex",
        other: "Lainnya",
      },
      additionalDetails: {
        summary: "Detail tambahan (opsional)",
        chairCount: "Jumlah kursi",
        chairCountPlaceholder: "contoh: 6",
        specialization: "Spesialisasi",
        specializationPlaceholder: "contoh: coloring, keratin",
        currentBrandsUsed: "Brand yang dipakai saat ini",
        monthlySpendRange: "Perkiraan belanja per bulan",
        monthlySpendRangePlaceholder: "opsional",
      },
      honeypot: {
        companyLabel: "Company",
      },
      consent: "Saya setuju untuk dihubungi untuk tindak lanjut kemitraan.",
      actions: {
        submit: "Kirim",
        submitting: "Mengirim…",
      },
      success: {
        title: "Terima kasih — data Anda sudah kami terima.",
        body: "Tim kami akan follow up. Anda juga bisa chat via WhatsApp untuk konsultasi lebih cepat.",
        ref: "Referensi",
      },
      errors: {
        network: "Koneksi bermasalah. Silakan coba lagi.",
        rateLimited: "Terlalu banyak permintaan. Silakan coba lagi sebentar lagi.",
        submitFailed: "Pengiriman gagal. Silakan coba lagi.",
      },
    },
    system: {
      notFound: {
        title: "Halaman tidak ditemukan",
        body: "Halaman yang Anda cari tidak tersedia. Gunakan navigasi atau kembali ke beranda.",
        backHome: "Kembali ke Beranda",
      },
      error: {
        title: "Terjadi kendala",
        body: "Silakan coba lagi. Jika masih terjadi, hubungi kami via WhatsApp.",
        actions: {
          tryAgain: "Coba lagi",
          goHome: "Ke beranda",
        },
        ref: "Ref",
      },
    },
    footer: {
      explore: "Jelajahi",
      legal: "Legal",
      blurb: "Distribusi kecantikan profesional untuk salon dan barbershop di Indonesia.",
      copyrightSuffix: "Hak cipta dilindungi.",
    },
  },
} as const;

export function t(locale: Locale) {
  return dict[locale];
}
