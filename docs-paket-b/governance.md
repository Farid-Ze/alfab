# PT. ALFA BEAUTY COSMETICA: OPERATIONAL GOVERNANCE & INCIDENT PLAYBOOK
**For IT Operations, Security, & Support Teams**

**Date:** January 08, 2026
**Version:** 1.1 (WA Deep Link Clarification)
**Reference:** Blueprint V3.4, DevOps V2.4, FSD V2.6

---

## 1. PREAMBLE: THE "PREPARE FOR FAILURE" DOCTRINE

Sistem B2B Distribusi adalah urat nadi perusahaan. Sebagai standar operasional PT. Alfa Beauty Cosmetica, kita tidak hanya merancang untuk "Happy Path", tapi juga mempersiapkan prosedur baku untuk "Doom Scenarios". Dokumen ini adalah panduan bertahan hidup saat teknologi gagal.

---

## 2. INCIDENT SEVERITY MATRIX (SEV LEVELS)

Definisi baku untuk merespon insiden, menghindari kepanikan yang tidak perlu.

| Level | Definisi | Contoh Skenario | Response Time (SLA) | Eskalasi Ke |
| :--- | :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | **Bisnis Berhenti Total.** Sales tidak bisa kirim order. | ERP Mati Total, Login Gagal Masal, Database Down. | < 15 Menit | CTO, CIO, VP Sales |
| **SEV-2 (High)** | **Fungsi Utama Terganggu.** Order bisa masuk tapi lambat/manual. | Fitur Cek Kredit Error (Amber State), Stok Sync Macet. | < 1 Jam | Eng Lead, Ops Manager |
| **SEV-3 (Medium)** | **Isur Minor/Kosmetik.** Tidak menghalangi transaksi. | Gambar produk tidak muncul, Typo harga, Dashboard lambat. | < 24 Jam | Support Team |
| **SEV-4 (Low)** | **Request/Pertanyaan.** | Partner lupa password, tanya fitur baru. | < 48 Jam | Helpdesk |

---

## 3. INCIDENT PLAYBOOKS (RUNBOOKS)

Prosedur langkah-demi-langkah "Kalo X terjadi, lakukan Y".

### A. Skenario: "ERP HEARTATTACK" (Koneksi ERP Terputus)
**Gejala:** API Sync Stok/Limit error.
1.  **Immediate Action:**
    *   System otomatis masuk ke **Degraded Mode**.
    *   Toggle `CREDIT_CHECK_BYPASS = TRUE` di Admin Panel (Default status: AMBER/Approval).
    *   Stok ditampilkan berdasarkan *Last Known Good Snapshot* (Cache Redis terakhir).
2.  **User Communication:** Tampilkan banner di Dashboard Partner:
    *   *"Sistem sedang maintenance. Order Anda akan diproses manual oleh Admin. Mohon tunggu konfirmasi WA."*
3.  **Recovery:**
    *   Restart Bridge Service / VPN Tunnel ke ERP.
    *   Setelah koneksi pulih, jalankan script `Reconcile_Orders` untuk sinkronisasi order yang masuk selama *downtime*.

**ERP Integration Monitoring:**
- **Risk Level:** HIGH (Critical Path)
- **Buffer Absorbed:** 2 MD dari total 5 MD untuk gap fixes
- Week 3-7 memerlukan monitoring intensif untuk progress integrasi
- Weekly checkpoint dengan tim IT klien untuk memastikan API access

### B. Skenario: "AGENT ABUSE" (Penyalahgunaan Akun)
**Gejala:** Anomali order drastis dari satu Salesman atas nama banyak toko berbeda.
1.  **Immediate Action:**
    *   Revoke akses token Salesman tersebut via fitur `Force Logout` di Admin.
    *   Freeze sementara akun Salesman (status `SUSPENDED`).
2.  **Audit Forensic:**
    *   Tarik log `[AUDIT_IMPERSONATION]`.
    *   Cocokkan Geo-Location IP Salesman dengan Lokasi Toko saat order dibuat (Apakah masuk akal?).
3.  **Legal/HR:** Serahkan bukti log ke HR untuk sanksi indisipliner.

### C. Skenario: "WHATSAPP DEEP LINK ISSUE" (Link Tidak Berfungsi)
**Gejala:** Link "Kirim via WA" tidak membuka aplikasi WhatsApp atau format pesan rusak.
1.  **Fallback Action:**
    *   Aktifkan fitur **"Copy to Clipboard"**.
    *   User meng-copy rincian order teks, lalu paste manual ke WA personal Sub-Distributor.
2.  **Note:** Sistem menggunakan **WA Deep Link** (`wa.me/62xxx?text=...`), **bukan** WhatsApp Business API. Tidak ada dependency ke vendor BSP pihak ketiga.

---

## 4. SECURITY GOVERNANCE SOP

### A. Protocol Audit "Shadow Mode"
Fitur Impersonation sangat *powerful* namun berbahaya.
*   **Kebijakan:** Setiap aksi "Checkout" yang dilakukan via Shadow Mode **WAJIB** memicu notifikasi email/SMS ke Pemilik Toko Asli.
    *   *Message:* "Halo [Nama Toko], Salesman [Nama Sales] baru saja membuat order atas nama Anda. Hubungi kami jika ini tidak sah."
*   **Review Berkala:** CIO wajib mereview "Top 10 Agents by Impersonation Count" setiap bulan.

### B. Data Retention & Purging
Untuk menjaga performa dan kepatuhan privasi.
*   **Operational Logs:** Simpan 90 hari (Hot Storage), selebihnya arsip ke Cold Storage (3 tahun).
*   **Audit Trails:** Simpan permanen (7 tahun) untuk keperluan audit keuangan/fraud.
*   **Cart Abandoned:** Hapus otomatis setelah 30 hari untuk membersihkan Redis.

---

## 5. BUSINESS CONTINUITY PLAN (BCP)

Jika "Kiamat Digital" terjadi (Data Center Terbakar / Cyber Attack Total).

*   **RPO (Recovery Point Objective):** Maksimum kehilangan data = **1 Jam** (Snapshot Database per jam).
*   **RTO (Recovery Time Objective):** Waktu untuk sistem UP kembali = **4 Jam**.
*   **Manual Fallback PDF:**
    *   Tim Sales wajib memiliki **Katalog PDF Offline** & **Daftar Harga Excel** di Tablet mereka.
    *   Jika sistem mati total > 4 jam, kembali ke cara lama: Tulis Nota Manual -> Foto -> Kirim ke Admin Pusat.

---

## 6. CLARIFICATION: WHATSAPP INTEGRATION

> **PENTING:** Sistem ini menggunakan **WhatsApp Deep Link**, bukan WhatsApp Business API.

| Aspek | Status |
|-------|--------|
| **Mekanisme** | `wa.me/{nomor}?text={pesan}` yang dibuka browser/app Partner |
| **Biaya** | **Rp 0** (gratis, tidak ada biaya per-message) |
| **Registrasi** | Tidak perlu daftar WhatsApp BSP |
| **Bot/Automation** | Tidak ada (semua manual) |
| **Dependency** | Hanya butuh WhatsApp terinstall di device Partner |

---

## 7. PENUTUP

Dokumen ini melengkapi arsitektur teknis dengan **Kedewasaan Operasional**. Sistem tercanggih sekalipun akan gagal tanpa panduan operasional yang disiplin.

**Disahkan Oleh:**

_____________________
**VP of Operations**

_____________________
**Chief Information Officer**
