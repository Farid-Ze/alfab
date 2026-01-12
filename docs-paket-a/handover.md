# HANDOVER — PT. Alfa Beauty Cosmetica (Paket A + Lead API Option B)

**Dokumen ini adalah dokumen “handover” (serah-terima)** — bukan dokumen yang akan terus diisi AI untuk validasi. Isi utamanya:
- apa yang sudah *freeze* (keputusan, kontrak, arsitektur, endpoint)
- cara menjalankan & mengoperasikan
- catatan penting / risiko / batasan
- daftar pekerjaan lanjutan yang disepakati

Dokumen terkait:
- Canonical spec Paket A: `docs-paket-a/paket-a.md`
- Runbook triage (Signals → Logs → Trace correlation): `docs-paket-a/runbook-triage.md`
- Runbook deploy (Deploy → Migrate → Smoke test): `docs-paket-a/runbook-deploy.md`
- Backlog & evidence pack: `artifacts/paket-a/backlog.md`, `artifacts/paket-a/evidence-pack/`

> Catatan: folder `docs/` di repo ini di-ignore (legacy/local-only). Karena itu, **handover canonical untuk Paket A berada di `docs-paket-a/handover.md` ini**.

---

## 1) Snapshot freeze (referensi versi)

**Tanggal:** 2026-01-12

**Repo:** `Farid-Ze/alfab`

**Branch:** `main`

**Freeze commit (HEAD):** _isi saat handover final_

Catatan:
- Jika ada perubahan yang belum di-commit (local-only), catat ringkas di sini untuk mencegah “hilang saat pindah mesin”.

---

## 2) Yang sudah di-freeze (hard gates)

### 2.1 Scope boundary (tidak berubah tanpa CR)
- **In scope:** positioning website + katalog (tanpa harga publik) + education/events + Become Partner lead capture + SEO basics + analytics + CWV RUM + Option B lead pipeline.
- **Out of scope (Paket B):** login multi-role, harga publik/tier pricing, cart/order builder, ERP sync, SLA routing, invoice/payment, loyalty.

Rujukan: `docs-paket-a/paket-a.md` §2.

### 2.2 Acceptance contract
- UAT-A **01–16** adalah kontrak penerimaan.
- Definisi Done: **PASS + Evidence**.

Rujukan: `docs-paket-a/paket-a.md` §8–§10.

### 2.3 Konfigurasi bisnis yang harus ditetapkan (freeze sebelum go-live)

Nilai berikut harus disepakati Owner dan tidak diubah “diam-diam” karena memengaruhi conversion path:

| Item | Status | Nilai (diisi manusia) | Catatan |
|---|---|---|---|
| WhatsApp target number (E.164) | TBD |  | UAT-05 hard gate |
| WhatsApp prefill message | TBD |  | Tone B2B |
| Fallback contact email | TBD |  | Dipakai saat deep link tidak support |

---

## 3) Ringkasan deliverable yang sudah “freeze”

### 3.1 Lead API (Option B) — kontrak & perilaku

Base routes:
- `GET /health`
- `GET /metrics` (admin-only)
- `POST /api/v1/rum` (telemetry, unauth, rate-limited)
- `POST /api/v1/events` (telemetry, unauth, rate-limited)
- `POST /api/v1/leads`
- `GET /api/v1/admin/leads.csv` (admin-only)
- `GET /api/v1/admin/lead-notifications` (admin-only)
- `GET /api/v1/admin/lead-notifications/stats` (admin-only)

#### `POST /api/v1/leads`

Tujuan: menerima lead Become Partner dari website, disimpan secara durable.

Kontrak request (JSON) — Partner profiling (Paket A §5)

Required:
- `business_name`
- `contact_name`
- `phone_whatsapp`
- `city`
- `salon_type` (enum: `SALON|BARBER|BRIDAL|UNISEX|OTHER`)
- `consent` (boolean)

Optional:
- `chair_count` (int)
- `specialization` (string)
- `current_brands_used` (string)
- `monthly_spend_range` (string)
- `email` (string)
- `message` (string; max 2000)
- `page_url_initial` (string)
- `page_url_current` (string)

Legacy aliases (masih diterima untuk transisi; jangan dipakai untuk integrasi baru):
- `name` → dipetakan ke `contact_name`
- `phone` → dipetakan ke `phone_whatsapp`

Anti-spam honeypot:
- `company` (honeypot, wajib hidden di UI) → jika terisi: dianggap spam

Headers:
- `Idempotency-Key` (optional tapi direkomendasikan)
  - jika diisi, server dedupe dan mengembalikan `id` yang sama untuk submit ulang
  - yang disimpan adalah hash SHA-256 (bukan raw key)

Response:
- sukses: `202 Accepted` + JSON `{ "status": "accepted", "id": "<uuid>" }`
- spam (honeypot): `202 Accepted` (tanpa body)
- invalid payload: `400 Bad Request` + `{ "error": "..." }`
- error internal: `500` + `{ "error": "internal" }`

Normalisasi:
- `phone_whatsapp` dinormalisasi ke E.164-ish (contoh `+62...`) bila input `08...` / `62...`.

#### `POST /api/v1/rum` (CWV RUM)

Tujuan: menerima Core Web Vitals RUM (best-effort).

Kontrak request minimum:
- `metric_id` (string; dedupe)
- `metric_name` (contoh: `LCP|CLS|INP`)
- `value` (float)
- `rating` (string)
- `device_type` (`mobile|desktop|unknown`)
- `page_url_initial`, `page_url_current`

Perilaku:
- endpoint unauth + rate-limited
- receiver best-effort dedupe berbasis `metric_id` (TTL/LRU in-memory)

#### `POST /api/v1/events` (Website analytics)

Tujuan: menerima event analytics low-cardinality.

Kontrak request minimum:
- `event_name`
- `device_type`
- `page_url_initial`, `page_url_current`

#### `GET /metrics` (admin-only)

Tujuan: expose Prometheus metrics untuk operasional.

Auth (wajib): sama seperti admin export.

#### `GET /api/v1/admin/leads.csv`

Tujuan: export inbox leads (CSV) untuk follow-up.

Auth (wajib):
- `Authorization: Bearer <LEAD_API_ADMIN_TOKEN>` atau
- `X-Admin-Token: <LEAD_API_ADMIN_TOKEN>`

Query params:
- `limit` (default 500, max 5000)
- `before` (RFC3339) untuk pagination sederhana (`created_at < before`)

Security:
- mitigasi CSV formula injection: nilai diawali `= + - @` diprefix `'`

#### `/api/v1/admin/lead-notifications` & `/stats`

Tujuan: monitoring outbox tanpa menampilkan PII lead.

Auth (wajib): sama seperti admin export.

---

### 3.2 Database schema (Postgres/Supabase)

Migrations (Goose) baseline:
- `migrations/00001_create_leads.sql` — tabel `public.leads`
- `migrations/00002_harden_leads_rls.sql` — RLS ON + revoke grants (Supabase Data API hardening)
- `migrations/00003_add_idempotency_key_hash.sql`
- `migrations/00004_create_lead_notifications.sql` — tabel `public.lead_notifications`
- `migrations/00005_harden_lead_notifications_rls.sql` — RLS ON + revoke grants
- `migrations/00006_add_lead_notifications_reclaim_index.sql`
- `migrations/00007_add_partner_profile_fields.sql`

Async trace correlation (outbox):
- `migrations/00008_add_lead_notifications_traceparent.sql` — tambah kolom `lead_notifications.traceparent`

Catatan penting hardening:
- RLS ON + no policies → Data API tidak bisa baca/tulis
- Aplikasi backend tetap bisa insert/list via koneksi DB (service role / DB user)

---

### 3.3 Observability minimal

Metrics (Prometheus; admin-only):
- Lead outcome: `lead_api_lead_submissions_total{result=...}` termasuk `rate_limited`
- HTTP low-cardinality: `lead_api_http_requests_total{route,method,status_class}` + histogram duration
- Outbox backlog gauges: pending ready/delayed + oldest ready pending age

Triage detail: `docs-paket-a/runbook-triage.md`.

---

## 4) Konfigurasi runtime (tanpa menyimpan secrets di repo)

Referensi env:
- `.env.example` (safe untuk commit)
- `.env` (local-only; di-ignore)

Backend env vars:
- `APP_ENV` (default `development`)
- `PORT` (default `8080`)
- `DATABASE_URL`
- `TRUSTED_PROXIES` (optional)
- `LEAD_API_ADMIN_TOKEN` (wajib)
- `LEAD_API_RATE_LIMIT_RPS` (default 5)
- `LEAD_API_MAX_BODY_BYTES` (default 65536)

Notifikasi (opsional):
- Email: `LEAD_NOTIFY_EMAIL_ENABLED=true` + SMTP vars
- Webhook: `LEAD_NOTIFY_WEBHOOK_ENABLED=true` + `GOOGLE_SHEETS_WEBHOOK_URL` (+ secret optional)

---

## 5) Cara menjalankan & operasi

### 5.1 Lokal

Targets:
- `make test`
- `make run`
- `make migrate-up`
- `make db-check`

Catatan:
- Untuk local DB: lihat `docker-compose.yml`.

### 5.2 Prod / Supabase

1) Apply migrations
- `go run ./cmd/migrate up`

2) Verifikasi hardening + schema
- `go run ./cmd/dbcheck`

---

## 5.3 Catatan governance: staging di akun pribadi (budget terbatas)

Jika saat ini belum ada budget untuk **Vercel Pro/Team**, staging boleh berjalan di akun pribadi **dengan syarat** berikut agar tidak jadi “single point of failure”:

Minimum guardrails (wajib):
- **Repo akses:** Owner harus punya akses ke repo (GitHub) agar bisa melihat source + histori deploy.
- **Secrets tidak disimpan di repo:** semua secrets tetap di platform env vars / secret store.
- **Backup akses:** simpan kredensial platform (Vercel/Supabase/dll) di password manager yang bisa diserahkan ke Owner saat approval (jangan via chat).
- **2FA:** akun pribadi yang dipakai staging wajib 2FA.

Yang perlu dicatat untuk handover (isi oleh operator):
- Hosting frontend (staging): _Vercel Hobby (personal)_
- URL staging frontend: _<isi>_
- Hosting Lead API (staging): _<isi>_
- URL staging Lead API: _<isi>_
- Lokasi env vars/secrets: _Vercel Project Settings / Supabase Project Settings_

> Catatan: tujuan guardrails ini bukan “sempurna”, tapi memastikan Owner bisa mengambil alih tanpa mengulang setup dari nol.

### Rencana transisi saat owner sudah approve (domain + email perusahaan)

Checklist transfer (disarankan):
1) Buat akun platform dengan email perusahaan (Owner sebagai admin).
2) Pindahkan domain/DNS ke kendali perusahaan (Cloudflare/registrar atas nama perusahaan).
3) Transfer proyek hosting (atau re-create dengan IaC sederhana) dan pindahkan env vars.
4) Rotasi secrets penting (admin token, webhook secret, SMTP creds).
5) Jalankan ulang `smoke-http` + UAT-A 01–16 (staging/prod) dan simpan evidence baru.

---

## 6) Known gaps / pekerjaan lanjutan (belum freeze)

- UAT-A 01–16: eksekusi UAT + sign-off final owner masih perlu dipastikan.
- Observability prod: Prometheus scrape `/metrics` + alerting/dashboard belum divalidasi end-to-end.
- Notifikasi/fanout lead: outbox + worker ada, tapi channel resmi + SOP rotation/ownership belum diputuskan.
- Retention policy & SOP purge untuk lead PII perlu keputusan owner.

---

## 7) Handover checklist (serah-terima final)

- [ ] `LEAD_API_ADMIN_TOKEN` diset secret kuat (bukan placeholder)
- [ ] `DATABASE_URL` prod valid (pooler + ssl bila perlu)
- [ ] migrations sudah di-apply sampai versi terbaru (termasuk `00008_*traceparent*`)
- [ ] `dbcheck` PASS
- [ ] UAT-A 11 & 12 PASS (lead submit + export protected)
- [ ] Prometheus scrape `/metrics` berjalan + minimal alert rules terpasang
- [ ] SOP akses & rotasi admin token disepakati
