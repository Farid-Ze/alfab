# Estimation Ranges — Paket A (MD)

> **DEPRECATED:** Konten estimation envelope Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §12.2).
# Estimation Ranges — Paket A (MD)
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026

Dokumen ini menambahkan range (best/likely/worst) di atas total “likely” pada `work_breakdown_complete.md`.

> Konsistensi metodologi (anti-bias): Paket A memakai **MD aktual per task** (kolom Effort memang MD).
> Ini berbeda dengan beberapa dokumen Paket B yang memakai "Base Effort" lalu dikalibrasi menjadi MD.

---

## Baseline (likely)

Baseline diambil dari penjumlahan tabel detail: **40.25 MD**.

Breakdown by task class (dari tabel):
- Class A: **12.75 MD** (critical path / reliability / backend/security)
- Class B: **19.75 MD** (quality/SEO/perf/ops + integration-ish)
- Class C: **7.75 MD** (straightforward UI/content implementation)

## Range model

Range dihitung dengan multiplier per class:

| Class | Best multiplier | Likely | Worst multiplier | Rationale |
|---:|---:|---:|---:|---|
| A | 0.95× | 1.00× | 1.35× | Jalur kritikal: rework & integration sering muncul di akhir |
| B | 0.90× | 1.00× | 1.25× | Banyak “paper cuts”: SEO/perf/a11y/ops, devtools + evidence |
| C | 0.90× | 1.00× | 1.15× | UI biasanya stabil, tapi bisa kena rework minor |

> Catatan: Range ini **sudah mengasumsikan** ada polish wave (A5-04) di baseline. Worst-case biasanya terjadi bila konten/asset terlambat, scope acceptance mengembang, atau hosting constraint memaksa redesign deployment/persistence.

## Results (total)

$$\text{Best} = 12.75\times0.95 + 19.75\times0.90 + 7.75\times0.90 \approx 36.86\ \text{MD}$$

$$\text{Likely} = 40.25\ \text{MD}$$

$$\text{Worst} = 12.75\times1.35 + 19.75\times1.25 + 7.75\times1.15 \approx 50.81\ \text{MD}$$

Rounded:
- **Best:** ~**36.9 MD**
- **Likely:** **40.25 MD**
- **Worst:** ~**50.8 MD**

## Maximal planning cap (anti-underestimate)

Jika tujuanmu adalah **tidak mulai implementasi sebelum fondasi kuat** dan menghindari underestimation Paket A, gunakan angka "cap" untuk planning/budget (P95-ish):

$$\text{Maximal} = \text{Worst} \times 1.15 \approx 50.81\times1.15 \approx 58.43\ \text{MD}$$

Rounded:
- **Maximal planning cap:** ~**58.5 MD**

Apa yang biasanya termakan di area ini:
- 1–2 siklus rework dari review stakeholder (copy, IA, CTA)
- friction hosting/deploy (staging/prod), headers/CSP tuning
- hardening lead pipeline (rate limit tuning, reject logging, export access)
- evidence pack (UAT evidence, validator screenshots, monitoring snapshots)

## Practical interpretation

- Best ≈ P25: tim & konten ready, minim rework.
- Likely ≈ P50: normal friction.
- Worst ≈ P80–P90: integration/ops friction + rework di akhir.

---

**Source of truth:** tetap tabel detail pada `docs-paket-a/dev/work_breakdown_complete.md`. Range ini hanya “envelope” untuk planning dan risk management.
