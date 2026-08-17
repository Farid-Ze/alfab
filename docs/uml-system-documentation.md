# DOKUMENTASI PERANCANGAN SISTEM BERBASIS AKADEMIS & UML (UNIFIED MODELING LANGUAGE)

## Sistem Platform B2B & Lead Capture: PT Alfa Beauty Cosmetica (Next.js 16 App Router)

---

### Identitas Dokumen & Deklarasi Metodologi Audit Fisik

- **Nama Sistem:** Sistem Web B2B & Lead Capture PT Alfa Beauty Cosmetica
- **Subjek Kajian:** Rekayasa Perangkat Lunak, Spesifikasi Kebutuhan, & Pemodelan Berorientasi Objek (UML 2.5) Berdasarkan Kode Fisik Workspace
- **Target Workspace:** `frontend/` (Next.js 16.x, React 19, TypeScript, TailwindCSS v4, App Router)
- **Domain Target:** `alfabeautycosmetica.com`
- **Metodologi Pengumpulan Data:**
  1. **Inspeksi Arsitektur Workspace:** Audit file manifes (`package.json`, `tsconfig.json`, `next.config.ts`, `vercel.json`).
  2. **Audit Rute Fisik App Router:** Inventarisasi seluruh file rute `src/app/[locale]/` dan route handler API `src/app/api/`.
  3. **Ekstraksi Skema Kontrak & Validasi:** Penelusuran skema Zod `src/lib/schemas.ts` dan definisi tipe `src/types/`.
  4. **Audit Komposisi Komponen UI:** Pemetaan hirarki komponen `src/components/` (ui, site, home, analytics, seo).
  5. **Evaluasi Pipeline Keamanan & Pengujian:** Audit middleware internasionalisasi, konfigurasi rate limiter/CSP, pengujian Jest (`src/lib/__tests__/`), dan Playwright E2E (`e2e/`).
- **Standar Referensi:** IEEE Std 830, ISO/IEC/IEEE 29148:2018, OMG Unified Modeling Language (UML) v2.5.1, OWASP ASVS v5.0.0, STRIDE Threat Model

---

## DAFTAR ISI

1. [BAB I: PENDAHULUAN & BUKTI FORENSIK SISTEM](#bab-i-pendahuluan--bukti-forensik-sistem)
   - 1.1 Profil Entitas Bisnis & Lingkungan Operasional
   - 1.2 Matriks Bukti Forensik Empiris (Audit Kode Fisik Workspace `frontend/`)
   - 1.3 Inventarisasi Sitemap Fisik (Halaman Fisik App Router `[locale]`)
   - 1.4 Kamus Taksonomi Fisik Terverifikasi (Kategori Produk & Metadata)
   - 1.5 Inventarisasi Eksekusi Skrip Klien (Komposisi Bundle, Dependencies, & Libraries)
   - 1.6 Ruang Lingkup Sistem (System Scope)
   - 1.7 Identifikasi & Karakteristik Aktor Sistem
2. [BAB II: ANALISIS KEBUTUHAN SISTEM](#bab-ii-analisis-kebutuhan-sistem)
   - 2.1 Kebutuhan Fungsional Terverifikasi (Functional Requirements - FR)
   - 2.2 Kebutuhan Non-Fungsional, Telemetri Performa, & Pola Cache (NFR)
3. [BAB III: PEMODELAN UML (UNIFIED MODELING LANGUAGE 2.5)](#bab-iii-pemodelan-uml-unified-modeling-language-25)
   - 3.1 Use Case Diagram & Spesifikasi Naratif Use Case
   - 3.2 Activity Diagram (Diagram Aktivitas)
     - 3.2.1 Alur Interaksi Eksplorasi Produk & CTA WhatsApp
     - 3.2.2 Pipeline Validasi & Pengiriman Formulir Kemitraan (Lead Capture)
   - 3.3 Class Diagram (Diagram Kelas Arsitektur Objek TypeScript & Komponen React)
   - 3.4 Sequence Diagram (Diagram Sekuensial Interaksi Sistem)
     - 3.4.1 Interaksi Eksplorasi Produk & Pengalihan Komunikasi WhatsApp
     - 3.4.2 Interaksi Validasi Zod & Submisi Formulir Kemitraan
   - 3.5 State Machine Diagram (Diagram Mesin Status Pesanan, Formulir, & Sesi)
     - 3.5.1 Siklus Hidup Status Formulir Lead Capture
     - 3.5.2 Siklus Hidup Status Sesi Multi-Bahasa (i18n Statechart)
   - 3.6 Component Diagram (Diagram Komponen Arsitektur Modular Next.js)
   - 3.7 Deployment Diagram (Diagram Penerapan Infrastruktur Vercel Serverless Edge & CDN)
4. [BAB IV: PERANCANGAN BASIS DATA & SKEMA MYSQL / POSTGRESQL (SUPABASE PATTERN)](#bab-iv-perancangan-basis-data--skema-mysql--postgresql-supabase-pattern)
   - 4.1 Pola Penyimpanan Data Relasional & Type-Safe Schema
   - 4.2 Entity Relationship Diagram (ERD Basis Data PostgreSQL / Supabase)
   - 4.3 Kamus Data Fisik (Physical Data Dictionary) Tabel Kunci
5. [BAB V: EVALUASI KEPATUHAN KEAMANAN (SECURITY, OWASP ASVS & STRIDE)](#bab-v-evaluasi-kepatuhan-keamanan-security-owasp-asvs--stride)
   - 5.1 Matriks Kepatuhan OWASP ASVS v5.0.0
   - 5.2 Pemodelan Ancaman Berbasis STRIDE

---

## BAB I: PENDAHULUAN & BUKTI FORENSIK SISTEM

### 1.1 Profil Entitas Bisnis & Lingkungan Operasional

*(Bagian ini memuat profil PT Alfa Beauty Cosmetica, model operasional B2B manufaktur kosmetik dan kemasan, integrasi kanal komunikasi WhatsApp resmi, serta target pasar domestik dan ekspor)*

### 1.2 Matriks Bukti Forensik Empiris (Audit Kode Fisik Workspace `frontend/`)

*(Bagian ini memuat tabel parameter arsitektur fisik: Framework Next.js 16.x, React 19, TypeScript 5, TailwindCSS v4, Zod, Jest, Playwright, Vercel Serverless Edge, dan metadata konfigurasi)*

### 1.3 Inventarisasi Sitemap Fisik (Halaman Fisik App Router `[locale]`)

*(Bagian ini memuat daftar rute fisik terdaftar pada `src/app/[locale]/`: Home `/`, Products `/products`, Partnership `/partnership`, Education `/education`, About `/about`, Contact `/contact`, Privacy `/privacy`, Terms `/terms`, serta API `/api/health`)*

### 1.4 Kamus Taksonomi Fisik Terverifikasi (Kategori Produk & Metadata)

*(Bagian ini memuat taksonomi fisik kategori produk kemasan & kosmetik, jenis formula maklon, serta spesifikasi material)*

### 1.5 Inventarisasi Eksekusi Skrip Klien (Komposisi Bundle, Dependencies, & Libraries)

*(Bagian ini memuat daftar pustaka dependency pihak ketiga pada `package.json`, runtime hooks, modul analytics GA4/GTM, dan optimasi bundle)*

### 1.6 Ruang Lingkup Sistem (System Scope)

*(Bagian ini memuat ruang lingkup modul katalog, formulir kemitraan/lead capture, navigasi multi-bahasa i18n, SEO metadata dinamis, dan integrasi WhatsApp)*

### 1.7 Identifikasi & Karakteristik Aktor Sistem

*(Bagian ini memuat tabel aktor: Calon Mitra B2B / Klien Brand Owner, Pengunjung Publik, Tim Konsultan WhatsApp CS, dan Administrator Sistem)*

---

## BAB II: ANALISIS KEBUTUHAN SISTEM

### 2.1 Kebutuhan Fungsional Terverifikasi (Functional Requirements - FR)

*(Bagian ini menyajikan tabel kebutuhan fungsional berstandar IEEE Std 830 mencakup navigasi multi-bahasa, katalog produk, kalkulasi spesifikasi, form capture, dan routing API)*

### 2.2 Kebutuhan Non-Fungsional, Telemetri Performa, & Pola Cache (NFR)

*(Bagian ini memuat kebutuhan performa Core Web Vitals (LCP < 2.5s, CLS < 0.1, FID/INP < 200ms), Edge Caching ISR/SSG, keamanan input Zod, dan responsivitas TailwindCSS)*

---

## BAB III: PEMODELAN UML (UNIFIED MODELING LANGUAGE 2.5)

### 3.1 Use Case Diagram & Spesifikasi Naratif Use Case

*(Bagian ini memuat diagram Use Case Mermaid untuk seluruh aktor dan use case utama sistem Alfa Beauty, disertai spesifikasi narasi use case terstruktur)*

### 3.2 Activity Diagram (Diagram Aktivitas)

#### 3.2.1 Alur Interaksi Eksplorasi Produk & CTA WhatsApp

*(Bagian ini memuat diagram aktivitas Mermaid untuk alur penelusuran katalog hingga pengalihan chat WhatsApp pre-filled message)*

#### 3.2.2 Pipeline Validasi & Pengiriman Formulir Kemitraan (Lead Capture)

*(Bagian ini memuat diagram aktivitas Mermaid untuk alur pengisian form, validasi skema Zod klien, honeypot spam protection, dan submisi lead)*

### 3.3 Class Diagram (Diagram Kelas Arsitektur Objek TypeScript & Komponen React)

*(Bagian ini memodelkan struktur kelas, tipe, dan antarmuka TypeScript pada `src/types/` dan `src/lib/` seperti `SiteConfig`, `ProductItem`, `LeadPayload`, `LocaleContext`)*

### 3.4 Sequence Diagram (Diagram Sekuensial Interaksi Sistem)

#### 3.4.1 Interaksi Eksplorasi Produk & Pengalihan Komunikasi WhatsApp

*(Bagian ini memodelkan urutan pesan antara Client Browser, Next.js App Router, Component Tree, dan WhatsApp Web API)*

#### 3.4.2 Interaksi Validasi Zod & Submisi Formulir Kemitraan

*(Bagian ini memodelkan urutan interaksi validasi Zod, Server Action / API Route, penyimpanan Supabase, dan respons feedback)*

### 3.5 State Machine Diagram (Diagram Mesin Status Pesanan, Formulir, & Sesi)

#### 3.5.1 Siklus Hidup Status Formulir Lead Capture

*(Bagian ini memodelkan transisi state form: idle, validating, submitting, success, error, spam_detected)*

#### 3.5.2 Siklus Hidup Status Sesi Multi-Bahasa (i18n Statechart)

*(Bagian ini memodelkan alur deteksi bahasa: default locale 'id', cookie preference, router push locale 'en', re-render UI)*

### 3.6 Component Diagram (Diagram Komponen Arsitektur Modular Next.js)

*(Bagian ini memodelkan arsitektur modular komponen: Next.js App Router, UI Library `components/ui/`, Site Components `components/site/`, Home Modules `components/home/`, dan Utility Layer `src/lib/`)*

### 3.7 Deployment Diagram (Diagram Penerapan Infrastruktur Vercel Serverless Edge & CDN)

*(Bagian ini memodelkan topologi deployment: Client Device -> Anycast DNS -> Vercel Edge Network / CDN -> Serverless Edge Runtime -> Supabase PostgreSQL DB -> External WhatsApp Gateway)*

---

## BAB IV: PERANCANGAN BASIS DATA & SKEMA MYSQL / POSTGRESQL (SUPABASE PATTERN)

### 4.1 Pola Penyimpanan Data Relasional & Type-Safe Schema

*(Bagian ini menjelaskan struktur data type-safe yang terintegrasi dengan TypeScript interfaces dan database relasional PostgreSQL/Supabase)*

### 4.2 Entity Relationship Diagram (ERD Basis Data PostgreSQL / Supabase)

*(Bagian ini memuat diagram ERD Mermaid untuk entitas Leads, Products, Categories, Inquiries, Audit Logs, dan System Settings)*

### 4.3 Kamus Data Fisik (Physical Data Dictionary) Tabel Kunci

*(Bagian ini memuat kamus data kolom, tipe data, indeks, nullability, dan relasi foreign key dari setiap tabel)*

---

## BAB V: EVALUASI KEPATUHAN KEAMANAN (SECURITY, OWASP ASVS & STRIDE)

### 5.1 Matriks Kepatuhan OWASP ASVS v5.0.0

*(Bagian ini menyajikan tabel audit kepatuhan OWASP ASVS v5.0.0 Level 1 & 2 pada arsitektur Next.js 16)*

### 5.2 Pemodelan Ancaman Berbasis STRIDE (STRIDE Threat Model)

*(Bagian ini menyajikan analisis matriks STRIDE untuk sistem Alfa Beauty: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, dan Elevation of Privilege)*
