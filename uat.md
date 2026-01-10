# USER ACCEPTANCE TEST (UAT) SCENARIOS

**Project:** Alfabeauty B2B Digital Hub
**Document Type:** Test Script & Sign-off Criteria
**Version:** 2.0

## TUJUAN DOKUMEN

Dokumen ini berfungsi sebagai acuan tunggal untuk menyatakan bahwa sistem **BERHASIL** dibangun. Jika seluruh skenario di bawah ini berstatus **PASS** (Berhasil), maka proyek dianggap selesai (Go-Live) dan pelunasan pembayaran wajib dilakukan.

---

## 1. SKENARIO AKUN & AKSES (IDENTITY)

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-01** | **Login Partner** | 1. Masukan email terdaftar  2. Masukan password  3. Klik Login | Masuk ke Dashboard Partner. Nama Toko & Saldo Poin muncul. | $$$$ |
| **UAT-02** | **Cek Harga Tiering** | 1. Login sebagai User Silver  2. Buka Produk A | Harga yang tampil adalah Harga Silver (Bukan Harga Retail). | $$$$ |
| **UAT-03** | **Agent Masquerade** | 1. Login sebagai Salesman  2. Pilih menu "Kelola Klien"  3. Pilih Toko Budi | Tampilan berubah seolah-olah Salesman adalah Toko Budi. | $$$$ |
| **UAT-03B** | **Audit Trail Impersonation** | 1. Lakukan UAT-03 2. Cek Log System | Log mencatat: `Agent:SALES acted_as Partner:BUDI`. | $$$$ |
| **UAT-03C** | **Impersonation Checkout Notification** | 1. Login Salesman 2. Shadow Mode ke Toko 3. Checkout | Owner Toko menerima WA/Email: "Salesman X membuat order atas nama Anda." | $$$$ |

---

## 2. SKENARIO ORDER & KREDIT (COMMERCIAL)

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-04** | **Order Normal (Limit Aman)** | 1. Masukan barang ke keranjang  2. Total order < Sisa Limit  3. Checkout | Tombol "Kirim Order" berwarna Hijau/Aktif. Order terkirim. | $$$$ |
| **UAT-05** | **Order Over Limit** | 1. Masukan barang mahal  2. Total order > Sisa Limit  3. Lihat tombol Checkout | Muncul peringatan "Limit Tidak Cukup". Tombol berubah jadi "Ajukan Approval". | $$$$ |
| **UAT-06** | **Diskon Volume** | 1. Beli Shampoo 12 pcs | Harga satuan otomatis turun (sesuai aturan grosir). | $$$$ |
| **UAT-06B** | **Region Not Assigned** | 1. Login Partner tanpa region_id  2. Coba Checkout | Muncul error: "Wilayah Anda belum terdaftar. Hubungi Admin." Order diblokir. | $$$$ |

---

## 3. SKENARIO ROUTING & SLA

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-20** | **Geo-Routing ke Sub-Distributor** | 1. Login Partner Surabaya  2. Checkout order | Order di-route ke WA Sub-Distributor **Surabaya** (bukan Jakarta). Cek `routed_to_subdist_id`. | $$$$ |
| **UAT-21** | **Order Tampil di Dashboard SubDist** | 1. Login SubDist Surabaya  2. Buka menu "Order Masuk" | Order dari UAT-20 muncul dengan status "SUBMITTED". | $$$$ |
| **UAT-22** | **SubDist Update Status → PROCESSING** | 1. SubDist klik "Proses Order" | Status order berubah jadi "PROCESSING". Partner notif via WA. | $$$$ |
| **UAT-23** | **SLA Reminder 18 Jam** | 1. Submit order  2. Tunggu 18 jam tanpa respon SubDist | Sistem kirim reminder ke Manager SubDist. `sla_reminder_sent = true`. | $$$$ |
| **UAT-24** | **SLA Escalation 24 Jam** | 1. Submit order  2. Tunggu 24 jam tanpa respon SubDist | Notifikasi terkirim ke Admin HQ. `sla_escalated = true`. Log tercatat di `SLA_ESCALATION_LOGS`. | $$$$ |
| **UAT-25** | **No SubDist in Region** | 1. Login Partner di region tanpa SubDist aktif  2. Checkout | Error: "Tidak ada Sub-Distributor aktif di wilayah Anda." Fallback to HQ. | $$$$ |

---

## 4. SKENARIO INVOICE & PEMBAYARAN

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-30** | **Invoice Auto-Generated** | 1. Order status jadi APPROVED | Invoice otomatis terbuat dengan status "UNPAID". `due_date` sesuai Tier (14 hari untuk Gold). | $$$$ |
| **UAT-31** | **Invoice Tampil di Order History** | 1. Partner buka Order History  2. Lihat detail order | Tampil badge "Invoice: Belum Dibayar" dan info "Poin akan cair setelah lunas". | $$$$ |
| **UAT-32** | **Record Pembayaran Parsial** | 1. Admin input pembayaran 50%  2. Cek Invoice | Status Invoice jadi "PARTIAL". `amount_paid` terupdate. | $$$$ |
| **UAT-33** | **Record Pembayaran Lunas** | 1. Admin input pembayaran sisa  2. Cek Invoice | Status Invoice jadi "PAID". `paid_at` terisi. | $$$$ |

---

## 5. SKENARIO LOYALITAS - POIN

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-07** | **Estimasi Poin** | 1. Buka halaman produk  2. Lihat label poin | Muncul tulisan "Dapatkan +50 Poin" di kartu produk. | $$$$ |
| **UAT-08** | **Redeem Poin (Potongan)** | 1. Di keranjang, pilih "Gunakan Poin"  2. Masukan 1000 Poin | Total tagihan berkurang Rp 100.000 (sesuai rate). | $$$$ |
| **UAT-40** | **Order Dibawah Threshold (Rp 500rb)** | 1. Order dengan total Rp 400.000  2. Checkout | `is_eligible_for_points = false`. Estimasi poin = 0. Pesan: "Order di bawah minimum untuk earn poin." | $$$$ |
| **UAT-41** | **Poin Pending Saat Invoice UNPAID** | 1. Order COMPLETED dengan total Rp 1.000.000  2. Invoice masih UNPAID | `points_earned = 100`, tapi `point_balance` Partner TIDAK bertambah. Tampil: "100 poin pending, menunggu pembayaran." | $$$$ |
| **UAT-42** | **Poin Cair Saat Invoice PAID** | 1. Lanjutkan UAT-41  2. Admin set Invoice = PAID | `point_balance` Partner bertambah 100 poin. Record `POINT_TRANSACTIONS` dengan `type = EARNED`. Notif: "100 poin sudah ditambahkan!" | $$$$ |
| **UAT-43** | **Multiplier Gold 1.2x** | 1. Partner Gold, order Rp 1.000.000  2. Invoice lunas | Poin earned = 1.000.000 / 10.000 * 1.2 = **120 poin** (bukan 100). | $$$$ |
| **UAT-44** | **Multiplier Platinum 1.5x** | 1. Partner Platinum, order Rp 1.000.000  2. Invoice lunas | Poin earned = 1.000.000 / 10.000 * 1.5 = **150 poin**. | $$$$ |

---

## 6. SKENARIO RESILIENCE (DOOM SCENARIOS)

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-09** | **ERP Down (Degraded Mode)** | 1. Matikan koneksi ke ERP  2. User coba login & lihat produk | Produk tetap tampil (dari Cache). Stok mungkin tidak real-time. | $$$$ |
| **UAT-10** | **Cold Start Mitigation** | 1. Biarkan app idle 30 menit 2. Hit endpoint API | Response time < 2 detik (karena `min-instances=1`). | $$$$ |

---

## 7. SKENARIO PARTNER PROFILING & ADMIN CONFIG

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-11** | **Partner Profile Form** | 1. Register Partner baru 2. Isi form Jenis Salon + Region | Jenis Salon & Region tersimpan. Tampil di Profile Page. | $$$$ |
| **UAT-12** | **Admin Config Edit** | 1. Login Admin 2. Ubah multiplier Gold ke 1.30 | Perubahan tersimpan. Partner Gold dapat 130 poin per Rp 1 Juta. | $$$$ |
| **UAT-13** | **Config Audit Trail** | 1. Lakukan UAT-12 2. Cek Log Config | Log mencatat: `Admin:ADMIN_01 changed loyalty.multiplier.gold from 1.20 to 1.30`. | $$$$ |
| **UAT-13B** | **SLA Config Edit** | 1. Admin ubah `sla.reminder_hours` ke 12 | Reminder dikirim setelah 12 jam (bukan 18 jam). | $$$$ |

---

## 8. SKENARIO MULTI-BAHASA

| ID | Skenario Pengujian | Langkah Pengujian (Steps) | Ekspektasi Hasil (Expected Result) | Status |
| --- | --- | --- | --- | --- |
| **UAT-14** | **Switch Bahasa** | 1. Klik tombol "EN" di pojok kanan | Seluruh menu dan deskripsi produk berubah jadi Bahasa Inggris. | $$$$ |

---

## TEST CASE SUMMARY

| Kategori | Count | Priority |
| --- | --- | --- |
| Identity & Access | 5 | P0 |
| Commercial (Credit) | 4 | P0 |
| Routing & SLA | 6 | P0 |
| Invoice & Payment | 4 | P0 |
| Loyalty | 7 | P0 |
| Resilience | 2 | P1 |
| Config & Profile | 4 | P1 |
| Multi-Language | 1 | P2 |
| **TOTAL** | **33** | |

---

**LEMBAR PENGESAHAN (SIGN-OFF)**

Dengan ini menyatakan bahwa pengujian telah dilakukan dan sistem berfungsi sesuai skenario di atas.

**Disetujui Oleh (Client):**
Nama: _________________
Tanggal: _________________

**Diserahkan Oleh (Vendor):**
Nama: _________________
Tanggal: _________________