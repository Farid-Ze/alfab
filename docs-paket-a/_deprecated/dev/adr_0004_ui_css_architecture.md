# ADR-0004 — UI/CSS Architecture

> **DEPRECATED:** Ringkasan ADR Paket A sudah digabung ke `docs-paket-a/paket-a.md` (lihat §13).
# ADR-0004 — UI system, CSS strategy, and frontend architecture (Paket A)

**Status:** Proposed  
**Date:** January 09, 2026  
**Scope:** Paket A (Website)

---

## Context
User meminta standar “agency-grade”: UI/UX detail, CSS rapih, maintainable, dan tidak mengorbankan Core Web Vitals.

Tanpa keputusan eksplisit, proyek web sering gagal karena:
- styling jadi ad-hoc (inconsistent spacing/typography),
- komponen tidak punya aturan (duplikasi, sulit refactor),
- performa turun karena CSS/JS bloat,
- regression karena tidak ada visual/interaction discipline.

---

## Decision
### 1) Design system minimal (token-first)
- Semua styling harus merujuk pada **design tokens**:
  - color
  - typography (size/line-height/weight)
  - spacing scale
  - radius
  - shadow/elevation

**Implementation rule:** tokens diekspose sebagai CSS variables (mis. `--color-...`, `--space-...`) agar mudah theming dan audit.

### 2) CSS strategy
- Default: **utility-first** (mis. Tailwind) untuk konsistensi, kecepatan, dan mengurangi CSS drift.
- Pengecualian terbatas: CSS Modules untuk kasus kompleks (mis. component dengan stateful styling yang terlalu verbose di utility).

**Rules:**
- tidak ada inline style kecuali untuk nilai yang benar-benar dinamis,
- tidak ada CSS-in-JS runtime yang menambah overhead render di Paket A.

### 3) Component & folder architecture (Next.js)
- Struktur komponen dibagi:
  - `components/ui/` (primitive/reusable)
  - `components/sections/` (komponen page-level seperti hero, pillars, CTA blocks)
  - `components/forms/` (form lead + validation UI)

- Page routes jelas dan tidak mengulang struktur:
  - Home
  - Products overview
  - Product detail
  - Education/Events
  - Partnership

### 4) Accessibility baseline baked-in
- Komponen input/form harus punya label jelas, error state bukan hanya warna, fokus terlihat.
- CTA utama (WhatsApp + Become Partner) harus konsisten dan keyboard-accessible.

Tambahan (WCAG 2.2 AA — fokus untuk risiko UI website modern):
- **Focus not obscured**: indikator fokus tidak boleh tertutup sticky header/CTA (mis. sticky WhatsApp) pada breakpoint utama.
- **Target size minimum**: target interaktif utama cukup besar untuk di-tap di mobile, atau memenuhi pengecualian yang valid.
- **Dragging alternatives**: jika ada interaksi drag (carousel), harus ada kontrol alternatif (button/arrow) yang setara.

### 5) Performance guardrails
- Font: gunakan mekanisme framework (mis. `next/font`) untuk menghindari FOIT/FOUT liar.
- Image: gunakan optimisasi image bawaan (mis. `next/image`) + ukuran eksplisit untuk menekan CLS.

---

## Consequences
- Perlu task eksplisit untuk:
  - membuat tokens + baseline typography/spacing,
  - setup styling tool + linting rules,
  - “UI polish wave” terpisah dari implementasi halaman (agar tidak diam-diam menghabiskan effort).

- Audit checklist harus menambahkan verifikasi:
  - konsistensi tokens,
  - focus states,
  - responsive details,
  - tidak ada CSS bloat yang tidak terpakai.

---

## Notes
Keputusan ini sengaja “minimal namun tegas”: cukup kuat untuk menjaga kualitas, tanpa menambah scope ke design system enterprise.

---

## References
- Next.js docs (CSS and best practices): https://nextjs.org/docs
- web.dev Web Vitals (guardrails agar styling tidak merusak LCP/CLS): https://web.dev/articles/vitals
- W3C WCAG 2.2 (Success Criteria seperti Focus Not Obscured / Target Size / Dragging Movements): https://www.w3.org/TR/WCAG22/
