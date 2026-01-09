# AI Workflow — Productivity (Paket A)

> **DEPRECATED:** Konten AI workflow Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §17).
# AI WORKFLOW PRODUCTIVITY (PAKET A — WEBSITE)
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026  
**Scope:** Paket A only (professional B2B website).  
**References:** `docs-paket-a/blueprint.md`, `docs-paket-a/fsd-idd.md`, `docs-paket-a/uat.md`, `docs-paket-a/governance.md`, `docs-paket-a/SLI_SLO.md`, `docs-paket-a/wbs.md`.

---

## 0) Orientasi baru: correctness & conversion, bukan “cepat jadi”

Kondisi saat ini: *team not mature with AI workflow, AI often produces placeholder/skeleton/MVP-looking artifacts.*

Untuk Paket A, failure yang paling mahal bukan “kode error”, tapi:
- CTA WhatsApp rusak (conversion drop)
- form lead gagal (pipeline bisnis putus)
- SEO basics keliru (discoverability drop)
- UI terlihat tidak profesional (positioning fail)

Jadi objective function:

$$
\textbf{maximize } P(\text{UAT-A PASS} \wedge \text{Lead Path Healthy} \wedge \text{Professional UX})
$$

---

## 1) Model probabilitas ketepatan (gate-based)

Let $p_0$ = peluang sebuah perubahan “salah” sebelum dicek (bug, edge case miss, SEO miss, broken CTA).

Jika ada $k$ gates, dan gate $i$ mendeteksi kesalahan dengan probabilitas $d_i$:

$$
P(\text{Wrong after gates}) = p_0 \times \prod_{i=1}^{k} (1-d_i)
$$

**Intinya:** AI menaikkan throughput, tetapi juga bisa menaikkan $p_0$ bila outputnya placeholder. Maka kita menang dengan menaikkan $k$ dan $d_i$ (lebih banyak check yang kuat).

---

## 2) Task classes untuk Paket A (A/B/C versi website)

- **Class A — Conversion & Ops-critical**
  - Become Partner form, anti-spam, **lead API (Option B) + persistence + admin export**, analytics event integrity, error logging, monitoring.
  - Failure = lead hilang.

- **Class B — SEO / Performance / UX correctness**
  - metadata, sitemap/robots, image optimization, responsive/accessibility, content schema.

- **Class C — UI composition / content wiring**
  - layout sections, basic components, static pages, content listing.

Rule: jika menyentuh **lead path** atau **instrumentation** → minimal A.

---

## 3) No-placeholder policy (wajib)

Output AI dianggap FAIL jika:
- ada TODO/stub untuk jalur lead/CTA ("nanti diisi")
- form submit tidak benar-benar mengirim (hanya console.log)
- analytics event hanya placeholder (event name belum fix / tidak terkirim)
- SEO basics belum ada (title/meta, sitemap, robots)

Jika data klien belum ada, gunakan placeholder konten **tetapi jalur fungsional harus real** (CTA dan form bekerja).

---

## 4) Prompt packet (template wajib)

Untuk setiap task Paket A, berikan prompt packet ini:

- **Goal**: halaman/fitur apa yang diselesaikan
- **Doc refs**: BP-A / FSD-A / UAT-A / GOV-A / SLI-A
- **Acceptance criteria**: UAT-A yang harus PASS
- **Invariants**:
  - tidak ada harga publik
  - CTA WhatsApp selalu tersedia
  - lead submit harus punya success state + error state
- **Failure modes**:
  - webhook down / timeout
  - user spam/bot
  - device tidak bisa buka WA deep link
- **Analytics events**: event names + properties
- **Test plan**: minimal Playwright untuk UAT-A critical (WA CTA, form)

---

## 5) Workflow yang memaksimalkan ketepatan (urutannya wajib)

1) **Spec-first**: minta AI tulis acceptance criteria + edge cases dulu (mengacu UAT-A).
2) **Counterexamples**: minta 10 cara feature bisa gagal + test/mitigasi.
3) **Diff-limited implementation**: ubah file minimal; jangan refactor besar tanpa alasan.
4) **Red-team review**: AI harus mengasumsikan solusinya salah dan mencari 5 failure paling mungkin.

---

## 6) Merge gates (DoD untuk Paket A)

PR mergeable hanya jika:
- UAT-A terkait punya checklist di PR description
- CTA WhatsApp:
  - deep link benar
  - ada fallback copy number atau contact text
- Lead form:
  - validasi client-side jelas
  - ada anti-spam minimum (honeypot + throttle)
  - submit berhasil/ gagal punya UI state
  - Option B (Lead API):
    - ada server-side validation
    - lead persisted (durable) sebelum dianggap sukses
    - ada mekanisme export/inbox yang access-controlled
- SEO basics:
  - title/meta per page
  - sitemap.xml & robots.txt tersedia
- Observability minimum:
  - error logging untuk lead submit failures
  - metrics sederhana: lead submit success rate (event)

---

## 7) Stop-loss rule (kalau AI bikin rework)

Jika dalam 2 minggu:
- bug reopening naik
- UAT-A regressions sering
- form/CTA incident terjadi

Maka:
- batasi AI untuk Class A (gunakan AI hanya untuk checklist/review)
- perketat gates (Playwright smoke untuk WA CTA + form)
- stabilkan sebelum tambah fitur baru
