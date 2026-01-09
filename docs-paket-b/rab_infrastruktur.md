# RAB INFRASTRUKTUR CLOUD: PT. ALFA BEAUTY COSMETICA
**Version:** 1.1 (Managed DB Mandate)
**Date:** January 07, 2026
**Prepared by:** CIO Advisory

---

## 1. EXECUTIVE SUMMARY

Dokumen ini menyajikan **Rencana Anggaran Biaya (RAB) Infrastruktur Cloud** dengan pendekatan **Cost-Conscious** untuk PT. Alfa Beauty Cosmetica. Berbeda dengan hipotesis awal ($100/bulan tanpa perhatian khusus), analisis ini menemukan **celah penghematan signifikan** melalui strategi **Hybrid Provider**.

**Kesimpulan Utama:**
- **Provider Lokal Indonesia** (IDCloudHost, Biznet Gio) **5-10x lebih murah** dari hyperscaler (GCP, AWS).
- Untuk skala proyek ini (Low Volume B2B), **VPS Managed** lebih cost-effective daripada **Serverless**.
- **Total Proyeksi Bulanan:** Rp 350.000 - 750.000/bulan (vs $100 asumsi awal).

---

## 2. PERBANDINGAN PROVIDER

### A. Compute (Application Server)

| Provider | Produk | Spesifikasi | Harga/Bulan | Catatan |
| :--- | :--- | :--- | :--- | :--- |
| **Biznet Gio** | NEO Lite XS | 1 vCPU, 1GB RAM, 60GB SSD | **Rp 59.000** | Promo tahunan. Lokal. |
| **IDCloudHost** | Cloud VPS | 1 vCPU, 2GB RAM, 50GB NVMe | **Rp 87.000** | Lokal. NVMe lebih cepat. |
| **IDCloudHost** | VPS eXtreme | 2 vCPU, 4GB RAM, 80GB NVMe | **Rp 149.000** | AMD EPYC, High IOPS. |
| DigitalOcean | Droplet Basic | 1 vCPU, 1GB RAM, 25GB SSD | $4 (~Rp 64k) | Singapore DC. +11% PPN. |
| UpCloud | Developer | 1 vCPU, 1GB RAM, 10GB | €3 (~Rp 52k) | Singapore DC. |
| GCP Cloud Run | min-instances=1 | 1 vCPU, 512MB | ~$30-50 (~Rp 500k) | Per-second billing. Overkill. |
| AWS Fargate | On-demand | 0.25 vCPU, 512MB | ~$20-40 (~Rp 350k) | Jakarta DC available. |

**Rekomendasi CIO:** Gunakan **IDCloudHost VPS eXtreme (Rp 149.000)** atau **Biznet Gio NEO Lite (Rp 59.000)**. Cukup untuk 500-1.000 tx/hari.

---

### B. Database (PostgreSQL/MySQL)

| Provider | Produk | Spesifikasi | Harga/Bulan | Catatan |
| :--- | :--- | :--- | :--- | :--- |
| **Self-Managed (VPS)** | PostgreSQL on VPS | Same VM as App | **Rp 0** (included) | Backup manual. |
| **IDCloudHost** | Managed DB (Optional) | 1 vCPU, 2GB, 20GB SSD | **~Rp 150.000** | Estimasi. |
| DigitalOcean | Managed DB | 1 vCPU, 1GB, 10GB | $15 (~Rp 240k) | Singapore. |
| GCP Cloud SQL | PostgreSQL Basic | 1 vCPU, 3.75GB | **~$30 (~Rp 500k)** | Managed. |
| GCP Cloud SQL | HA Standard | 4 vCPU, 15GB | ~$280 (~Rp 4.5jt) | Overkill untuk proyek ini. |

**Rekomendasi CIO:** Untuk MVP, gunakan **Self-Managed PostgreSQL di VPS** (hemat 100%). Upgrade ke Managed DB hanya jika tim operasi tidak mampu maintenance.

---

### C. Cache (Redis)

| Provider | Produk | Spesifikasi | Harga/Bulan | Catatan |
| :--- | :--- | :--- | :--- | :--- |
| **Self-Managed** | Redis on VPS | Same VM or separate | **Rp 0** (included) | Single-instance. |
| **Redis Cloud Flex** | Shared | 1GB RAM+SSD | **$5 (~Rp 80k)** | 99.99% uptime. Managed. |
| Redis Cloud Essentials | Managed | 256MB RAM | $18 (~Rp 290k) | Faster. |
| GCP Memorystore | Basic 1GB | 1GB | ~$36 (~Rp 580k) | Managed. |

**Rekomendasi CIO:** Gunakan **Redis Cloud Flex ($5/bulan)** untuk katalog. Terkelola, murah, dan 99.99% uptime.

---

### D. CDN & Static Assets

| Provider | Produk | Harga/Bulan | Catatan |
| :--- | :--- | :--- | :--- |
| **Cloudflare** | Free Tier | **Rp 0** | CDN, DDoS Protection, SSL gratis. |
| Bunny CDN | Pay-as-you-go | ~$1 (~Rp 16k) | Murah untuk Asia. |
| GCP Cloud CDN | Per GB | Bervariasi | Tidak perlu untuk skala ini. |

**Rekomendasi CIO:** Gunakan **Cloudflare Free** untuk CDN dan SSL.

---

## 3. SKENARIO RAB

### Skenario A: Ultra-Hemat (Bootstrap Mode)

**Profil:** Startup/UMKM, tim kecil, toleransi maintenance tinggi.

| Komponen | Provider | Harga/Bulan |
| :--- | :--- | :--- |
| App Server (VPS) | Biznet Gio NEO Lite | Rp 59.000 |
| Database | Self-Managed PostgreSQL | Rp 0 |
| Cache | Self-Managed Redis | Rp 0 |
| CDN & SSL | Cloudflare Free | Rp 0 |
| Domain | .co.id (Annual, amortized) | ~Rp 25.000 |
| **TOTAL** | | **Rp 84.000/bulan** |

**Trade-off:** Backup manual, tidak ada HA, perlu DevOps skill in-house.

---

### Skenario B: Seimbang (Recommended)

**Profil:** B2B serius, perlu reliability, tim kecil dengan keterbatasan DevOps.

| Komponen | Provider | Harga/Bulan |
| :--- | :--- | :--- |
| App Server (VPS) | IDCloudHost VPS eXtreme | Rp 149.000 |
| **Database (MANDATORY)** | **IDCloudHost Managed DB** | **Rp 150.000** |
| Cache | Redis Cloud Flex | Rp 80.000 (~$5) |
| CDN & SSL | Cloudflare Free | Rp 0 |
| Backup Storage | IDCloudHost Object Storage | ~Rp 50.000 |
| Domain | .co.id (Annual, amortized) | ~Rp 25.000 |
| **TOTAL** | | **Rp 454.000/bulan** |

Self-Managed PostgreSQL tidak digunakan untuk Production. Managed Database wajib untuk keamanan data.

---

### Skenario C: Enterprise-Lite (Scalable)

**Profil:** Antisipasi pertumbuhan cepat, perlu HA, mampu bayar premium.

| Komponen | Provider | Harga/Bulan |
| :--- | :--- | :--- |
| App Server | DigitalOcean Droplet 2GB | Rp 192.000 (~$12) |
| Database | DigitalOcean Managed DB | Rp 240.000 (~$15) |
| Cache | Redis Cloud Flex | Rp 80.000 (~$5) |
| CDN & SSL | Cloudflare Free | Rp 0 |
| Backup Storage | DigitalOcean Spaces | ~Rp 80.000 |
| Domain | .co.id (Annual, amortized) | ~Rp 25.000 |
| PPN Indonesia (11%) | | ~Rp 56.000 |
| **TOTAL** | | **Rp 673.000/bulan** |

**Benefit:** Fully Managed, Singapore latency bagus untuk Indonesia, scalable.

---

## 4. PERBANDINGAN SKENARIO

| Metrik | Ultra-Hemat | Seimbang | Enterprise-Lite |
| :--- | :--- | :--- | :--- |
| **Biaya/Bulan** | Rp 84k | **Rp 304k** | Rp 673k |
| **Biaya/Tahun** | Rp 1.0jt | **Rp 3.6jt** | Rp 8.1jt |
| **Managed Services** | 0% | 50% (Redis) | 100% |
| **DevOps Skill Required** | Tinggi | Sedang | Rendah |
| **Uptime SLA** | Best-effort | 99.99% (Redis) | 99.99%+ |
| **Skalabilitas** | Rendah | Sedang | Tinggi |

**Rekomendasi CIO:** Gunakan **Skenario B (Seimbang)** dengan biaya **Rp 304.000/bulan**.

---

## 5. STRATEGI PENGHEMATAN (CIO INSIGHT)

| Strategi | Penghematan | Implementasi |
| :--- | :--- | :--- |
| **Pilih Provider Lokal** | 50-80% vs GCP/AWS | IDCloudHost, Biznet Gio |
| **Self-Managed DB** | 100% (vs Managed) | PostgreSQL di VPS yang sama |
| **Redis Cloud Flex** | 80% vs Memorystore | $5/mo managed Redis |
| **Cloudflare Free** | 100% | CDN, SSL, DDoS gratis |
| **Annual Billing** | 10-25% discount | Bayar tahunan untuk VPS |
| **Promo Hunting** | 30-50% | Pantau Black Friday, Anniversary |

---

## 6. KOREKSI DOKUMEN DEVOPS

Pernyataan di DevOps §5.3 yang berbunyi:

> *"Paradigm: Jangan terobsesi pada 'Cloud Cost Optimization' untuk proyek ini. Tagihan cloud diproyeksi < $100/bulan."*

**Direvisi menjadi:**

> *"**Paradigm:** Cost Optimization adalah prioritas kedua setelah Reliability. Dengan strategi Hybrid Provider (VPS Lokal + Managed Redis), biaya infrastruktur dapat ditekan hingga **Rp 300.000/bulan** (~$19) tanpa mengorbankan performa. Prioritaskan penghematan untuk re-investasi ke Observability & Alerting."*

---

## 7. LAMPIRAN: DETAIL HARGA PROVIDER

### A. IDCloudHost (idcloudhost.com)
- VPS Standard: Rp 50.000 - 500.000/bulan
- VPS eXtreme (NVMe): Rp 149.000+
- Lokasi: Jakarta, Indonesia

### B. Biznet Gio Cloud (biznetgio.com)
- NEO Lite: Rp 50.000 - 500.000/bulan
- NEO Lite Pro (NVMe): Rp 100.000+
- Lokasi: Jakarta, Indonesia

### C. Redis Cloud (redis.com)
- Flex: $5/bulan (1GB RAM+SSD)
- Essentials: $18/bulan
- Pro: $200/bulan+

### D. DigitalOcean (digitalocean.com)
- Droplets: $4-$48+/bulan
- Managed DB: $15+/bulan
- Lokasi: Singapore (SGP1)
- PPN Indonesia: 11%

---

**Disiapkan oleh:**
Chief Information Officer (CIO) Advisory
