# Runbook Deploy (Paket A + Lead API Option B)

Dokumen ini menjelaskan urutan **deploy + verifikasi fungsionalitas utama** dengan prinsip:

- **Tidak mengganggu data user asli**
- Ada langkah verifikasi yang **read-only**
- Jika perlu end-to-end test, lakukan dengan **test row yang dibersihkan otomatis**

Rujukan:
- Canonical spec: `docs-paket-a/paket-a.md`
- Handover: `docs-paket-a/handover.md`
- Triage: `docs-paket-a/runbook-triage.md`

---

## 1) Preflight (wajib sebelum deploy)

1. Pastikan environment variables terset di target (secret store / platform config), minimal:
   - `APP_ENV`
   - `PORT`
   - `DATABASE_URL`
   - `LEAD_API_ADMIN_TOKEN`

2. Pastikan akses database sudah benar:
   - koneksi aplikasi menggunakan DB role/user yang bisa INSERT/SELECT
   - untuk Supabase: gunakan connection string service role / DB user, **bukan anon/authenticated**

---

## 2) Apply migrations (zero downtime friendly)

1. Jalankan migrasi:
   - `go run ./cmd/migrate up`

2. Verifikasi status migrasi:
   - `go run ./cmd/migrate status`

3. Verifikasi schema/security:
   - `go run ./cmd/dbcheck`

Catatan penting:
- Migrasi hardening (RLS + revoke) didesain aman untuk Supabase dan Postgres plain.
- `dbcheck` memverifikasi RLS flags, index penting, dan guardrail `traceparent`.

---

## 3) Smoke test — mode read-only (recommended di production)

Gunakan smoke test read-only untuk verifikasi jalur utama tanpa menulis data user:

- `make smoke-http`

Konfigurasi environment:
- `SMOKE_BASE_URL=https://<domain-api>`
- `SMOKE_ADMIN_TOKEN=<admin-token>` (atau gunakan `LEAD_API_ADMIN_TOKEN`)

Yang diverifikasi:
- `GET /health`
- `POST /api/v1/leads` dengan honeypot `company` terisi (harus 202, dan **tidak persist**)
- `GET /api/v1/admin/lead-notifications/stats` (admin-only)
- `GET /metrics` (admin-only)

Safety guard:
- Jika base URL `http://...`, set `SMOKE_ALLOW_INSECURE=true` (untuk staging/local saja).

### Catatan: dimana URL staging?

Repo ini **tidak menyimpan** URL staging secara hardcoded.

Umumnya (Paket A):
- **Frontend (Next.js)** di-host di **Vercel** → ambil URL dari **Vercel Dashboard → Project → Deployments** (Preview URL). Anda bisa menjadikan deployment branch `main` atau branch `staging` sebagai “staging”.
- **Lead API (Go)**: gunakan base URL yang di-expose oleh hosting Anda (mis. `https://api-staging.<domain>`).

Tips agar rapi:
- Tetapkan alias domain `staging.<domain>` (frontend) dan `api-staging.<domain>` (backend), lalu jadikan itu input untuk smoke/UAT.

Budget note:
- Jika belum ada budget untuk **Vercel Pro/Team**, staging masih bisa berjalan di **Vercel Hobby (akun personal)**.
- Best-practice minimal: aktifkan 2FA dan pastikan proses serah-terima kredensial ke Owner sudah disiapkan (lihat `docs-paket-a/handover.md` §5.3).

---

## 4) Smoke test — end-to-end notifications (staging / controlled only)

Jika perlu verifikasi end-to-end pipeline (DB insert → outbox → worker → sender), gunakan:

- `make smoke-notify`

Kebijakan data:
- Test ini **membuat 1 lead bertag** (run_id unik) + outbox rows.
- Default: **auto-cleanup** (menghapus lead; outbox ikut terhapus via FK cascade).
- Untuk mencegah salah target DB, wajib set:
  - `SMOKE_ALLOW_DB_WRITE=true`

Opsional:
- `SMOKE_KEEP=true` untuk menahan data (untuk investigasi), tapi **jangan** dipakai di prod.

---

## 5) Setelah deploy

Minimal checklist:
- [ ] `dbcheck` PASS
- [ ] `smoke-http` PASS
- [ ] `metrics-check` PASS (verifikasi cepat endpoint `/metrics`)
- [ ] /metrics ter-scrape oleh Prometheus (targets UP + rules loaded)
- [ ] Tidak ada lonjakan `lead_api_lead_submissions_total{result="internal"}`

Jika ada incident:
- ikuti `docs-paket-a/runbook-triage.md` (Signals → Logs → Trace correlation)

---

## Appendix — Akses Prometheus tanpa domain (local/staging)

Jika belum ada domain/ingress untuk Prometheus, akses UI Prometheus bisa dilakukan via localhost:

### Opsi 1: Prometheus local via Docker Compose (paling cepat)

Repo ini menyediakan compose minimal:
- `docker-compose.prometheus.yml`

Catatan penting:
- Endpoint `/metrics` di Lead API **admin-protected**, jadi Prometheus perlu token via `bearer_token_file`.
- Untuk menghindari masalah bind-mount di Windows (terutama drive non-`C:`), compose ini **generate config + token file di dalam container**.
- Token diambil dari environment host: `LEAD_API_ADMIN_TOKEN`.

UI:
- Buka `http://localhost:9090`
- Validasi `Status -> Targets` (atau `/targets`) menunjukkan job `alfab-lead-api` status **UP**.

Alertmanager (opsional, local):
- UI/API Alertmanager: `http://localhost:9093`
- Validasi alert diterima: `GET http://localhost:9093/api/v2/alerts`

Validasi tambahan (tanpa UI):
- Rules ter-load: `GET http://localhost:9090/api/v1/rules`
- Alerts aktif: `GET http://localhost:9090/api/v1/alerts`

Opsional (local-only):
- Untuk membuktikan mekanisme alert FIRING tanpa fault injection, set `PROM_ENABLE_LOCAL_DRILL=true` lalu restart compose.
- Jangan gunakan drill ini di staging/prod.

### Opsi 2: Kubernetes port-forward (lebih aman)

Jika nanti memakai K8s, gunakan `kubectl port-forward` untuk mengakses Prometheus tanpa expose publik.
