# Implementation Kickoff — Paket A

**Canonical spec:** `docs-paket-a/paket-a.md`

Dokumen ini menjawab: “mulai dari mana” dan “urutan kerja seperti agency besar”.

## 1) Preconditions (harus siap sebelum coding serius)

- SSoT disepakati: `docs-paket-a/paket-a.md`
- Repo `docs-paket-a/` bersih; legacy hanya di `docs-paket-a/_deprecated/`
- Backlog tersedia: `artifacts/paket-a/backlog.md`
- Evidence pack tersedia: `artifacts/paket-a/evidence-pack/`

## 2) Kickoff meeting agenda (60–90 menit)

1. Konfirmasi scope boundary (in/out) + risiko utama
2. Konfirmasi acceptance contract: UAT-A 01–16 + Done=PASS+Evidence
3. Konfirmasi owner & jalur komunikasi (incident/urgent)
4. Konfirmasi environment: staging/prod, domain/DNS, secrets store
5. Konfirmasi rencana release: milestone staging → UAT → prod

Output meeting:
- Owner list
- Target tanggal staging ready
- Target tanggal UAT window
- Target tanggal go-live

## 3) Delivery sequence (disarankan)

### Milestone M1 — FE skeleton + critical pages
- Layout, nav, home, products overview/detail, contact/legal
- Minimal content placeholders yang jelas (tanpa placeholder acceptance)

### Milestone M2 — Lead path end-to-end (Option B)
- Form UI → submit → persisted → notification/queue (jika ada) → admin/export
- Hard gate: UAT-A-11/12

### Milestone M3 — Observability + security baseline
- Logging, lead success-rate indicator
- Security headers baseline + export hardening

### Milestone M4 — CWV RUM + a11y gates
- Implement RUM wiring sesuai UAT-A-16
- Jalankan a11y checks untuk flow kritikal

### Milestone M5 — Staging UAT + sign-off
- Jalankan UAT-A 01–16
- Isi evidence pack
- Dapatkan sign-off (Blueprint + UAT)

### Milestone M6 — Production launch
- Pre-launch checklist
- Deploy + smoke test
- Monitor lead pipeline
- Release notes entry

## 4) Definition of “pre-implementation complete”

Pra-implementasi dianggap complete ketika:
- Backlog siap dieksekusi (owner/acceptance/evidence)
- Evidence pack folder siap
- Sign-off request packet siap (tapi status masih bisa PENDING sampai klien approve)
