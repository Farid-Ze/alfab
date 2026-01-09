# ADR-0003 — Stack Versioning Policy

> **DEPRECATED:** Ringkasan ADR Paket A sudah digabung ke `docs-paket-a/paket-a.md` (lihat §13).
# ADR-0003 — Tech stack & versioning policy (2025–2026)

**Status:** Proposed  
**Date:** January 09, 2026  
**Scope:** Paket A (Website) + Option B Lead API

---

## Context
Paket A mendefinisikan “selesai” sebagai production-ready. Untuk menjaga stabilitas, keamanan, dan reproducibility, kita perlu kebijakan versi yang eksplisit (bukan "nanti ikut aja"):
- runtime yang dipakai untuk build/deploy harus berada pada lifecycle support vendor,
- dependencies harus di-lock (lockfile) agar build reproducible,
- upgrade cadence jelas (security vs feature),
- dokumentasi harus tetap benar walaupun repo implementasi berada di workspace terpisah.

---

## Decision
### 1) Node.js runtime (Frontend build/runtime)
- **Node.js untuk production harus berada pada Active LTS atau Maintenance LTS.**
- **Target default (Jan 2026): Node.js 24.x (Active LTS)**.
- Jika ada constraint lingkungan, **fallback yang masih acceptable: Node.js 22.x (Maintenance LTS)**.

**Rationale:** Node.js policy menegaskan aplikasi production sebaiknya menggunakan Active LTS atau Maintenance LTS (bukan Current/odd releases).

### 2) Next.js framework
- **Target default: Next.js 16.x (Active LTS)**.
- Kebijakan Next.js:
  - major yang terbaru berada pada **Active LTS** sampai major berikutnya rilis,
  - major sebelumnya berada pada **Maintenance LTS** (2 tahun sejak rilis awal), dengan perubahan terbatas pada bug fix kritikal + security.

### 3) React
- **Mengikuti kompatibilitas Next.js.**
- Catatan: pada Next.js **App Router**, Next.js dapat menggunakan **React canary** yang sudah mengandung perubahan stabil React 19 serta fitur yang divalidasi di framework.

**Policy:**
- kita **tidak memaksakan** versi React di luar kompatibilitas Next.js,
- versi React yang digunakan harus tercermin di lockfile dan tercatat di release note.

### 4) TypeScript
- **TypeScript di-lock sebagai devDependency + lockfile**.
- Referensi menyebut "latest version" saat ini (Jan 2026) berada pada **TypeScript 5.9**.

### 5) Go runtime (Backend service, jika ADR-0001 memilih dedicated backend)
- Ikuti kebijakan Go: **setiap major Go didukung sampai ada dua major yang lebih baru**.
- **Target default (Jan 2026): Go 1.25.x** (karena masih dalam window support dan menerima security patch).

---

## Operational policy (how we keep this healthy)
- **Lockfile wajib** (npm/pnpm/yarn). CI harus fail bila lockfile berubah tanpa alasan.
- **Patch/security updates:** apply secepatnya (SLA internal: ≤ 7 hari sejak disclosure/patch tersedia, jika relevan).
- **Routine dependency maintenance:** 1x per bulan (atau per sprint) untuk minor updates yang low-risk.
- **Major upgrades (Next.js / Node / Go):** diperlakukan sebagai change project, dengan:
  - testing gate (smoke + UAT subset),
  - rollback plan,
  - update dokumen (SoW/WBS/DoD bila acceptance berubah).

---

## Consequences
- Kita perlu menambahkan item audit “Supported runtime versions” dan memastikan dokumen deployment menyebut versi minimal.
- WBS perlu memasukkan task "pinning + upgrade guardrails" (lockfile, CI check).

---

## References (authoritative)
- Node.js Releases (production: Active LTS / Maintenance LTS): https://nodejs.org/en/about/previous-releases
- Node.js Release Working Group schedule/policy: https://github.com/nodejs/release#release-schedule
- Next.js Support Policy (Active LTS / Maintenance LTS): https://nextjs.org/support-policy
- Go Release Policy (supported until two newer major releases): https://go.dev/doc/devel/release#policy
- TypeScript download page (latest version + project install guidance): https://www.typescriptlang.org/download
- React versions page (latest major information): https://react.dev/versions
