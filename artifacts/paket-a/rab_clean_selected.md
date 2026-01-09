# RAB — Paket A (Option B Lead API)
## PT. Alfa Beauty Cosmetica

**Status:** DRAFT (single scenario)  
**Date:** 2026-01-10  
**Scenario selected:** Hybrid PaaS — **Scenario M (Medium)**
**Primary domain:** **alfabeautycosmetica.com**

---

## CapEx (delivery)

| Item | Basis | Subtotal (IDR) | Evidence |
|---|---|---:|---|
| Delivery Best | Tier-based envelope | ~13.017.000 | approval rate card + tier mapping |
| Delivery Likely | Tier-based (T1/T2/T3) | 15.112.500 | approval rate card + tier mapping |
| Delivery Worst (baseline) | Tier-based envelope | ~19.071.000 | approval rate card + tier mapping |
| Contingency | % × baseline | ___ | approval |

---

## OpEx (bulanan) — Scenario M (Medium)

**Kurs:** `usd_to_idr = 16851.60` (IDR/USD)

**Parameter Scenario M:**
- `vercel_seats = 2`
- `upstash_usd = 10`
- `sentry_usd = 26`

| Item | Opsi | Biaya (USD/mo) | Kurs (IDR/USD) | Biaya (IDR/mo) | Evidence |
|---|---|---:|---:|---:|---|
| Website hosting | Vercel Pro | `20 * 2` | 16851.60 | 674.064 | vercel pricing link + seat count |
| Database | Supabase Free (**selected**) | `0` | 16851.60 | 0 | https://supabase.com/pricing (Free plan; paused after 1 week inactivity; no automatic backups) |
| Rate limiting | Upstash | `10` | 16851.60 | 168.516 | upstash pricing link + plan |
| Error logging | Sentry | `26` | 16851.60 | 438.142 | sentry pricing link + plan |
| Domain/DNS/Privacy | **alfabeautycosmetica.com** (+ defensive/redirect `alfabeautycosmetica.co`) | `(15.99 + 9.98 + 0.20) / 12` | 16851.60 | 36.751 | `artifacts/paket-a/evidence-pack/01-signoff/domain_email_quote_2026-01-10.md` |
| Email | Google Workspace Business Starter (Yearly, 1 account) | `42.00 / 12` | 16851.60 | 58.981 | `artifacts/paket-a/evidence-pack/01-signoff/domain_email_quote_2026-01-10.md` |

**Subtotal OpEx (tanpa Domain/DNS/Email): Rp1.280.722 / bulan**

**Domain/DNS/Email (Year-1, annual):** $68.17 \times 16851.60 \approx$ **Rp1.148.774 / tahun** (monthly equivalent: **Rp95.732 / bulan**)

**Total OpEx (dengan Domain/DNS/Email): Rp1.376.454 / bulan**

---

## OpEx (tahunan)

| Item | Biaya (IDR/year) | Evidence |
|---|---:|---|
| Total OpEx tahun 1 (tanpa Domain/DNS/Email) | 12 × 1.280.722 = **15.368.664** | breakdown + kurs + invoice/vendor billing |
| Domain/DNS/Email (Year-1 total) | **1.148.774** | `artifacts/paket-a/evidence-pack/01-signoff/domain_email_quote_2026-01-10.md` |
| Total OpEx tahun 1 (dengan Domain/DNS/Email) | **16.517.438** | total + evidence di atas |

---

## Maintenance retainer (post-launch)

| Item | Terms |
|---|---|
| Jam kerja (work window) | 15:00–24:00 WIB, Senin–Jumat |
| Weekend | Tidak termasuk |
| Emergency override | Tidak ada |
| Billing | Mingguan (in arrears), ada minimum commitment bulanan |

| Paket | Kuota | Estimasi biaya / bulan (IDR) |
|---:|---:|---:|
| S | 4 MD | 1.400.000 |
| M (recommended) | 8 MD | 2.800.000 |
| L | 12 MD | 4.200.000 |
