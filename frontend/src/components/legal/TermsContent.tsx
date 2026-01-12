"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export default function TermsContent() {
  const { locale } = useLocale();

  if (locale === "id") {
    return (
      <div className="space-y-6">
        <p className="type-body text-zinc-700">
          <span className="font-semibold text-zinc-900">Draft</span> syarat & ketentuan ini disediakan untuk
          Paket A dan dapat disesuaikan sebelum peluncuran final.
        </p>

        <section className="space-y-2">
          <h2 className="type-h3">Penggunaan website</h2>
          <p className="type-body text-zinc-700">
            Website ini disediakan untuk informasi produk, edukasi, dan jalur konsultasi/kemitraan untuk
            profesional salon & barbershop.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="type-h3">Tidak ada harga publik</h2>
          <p className="type-body text-zinc-700">
            Kami tidak menampilkan harga publik. Konsultasi, rekomendasi, dan pemesanan dilakukan melalui
            WhatsApp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="type-h3">Keterbatasan</h2>
          <p className="type-body text-zinc-700">
            Konten disediakan apa adanya. Kami berupaya menjaga akurasi, namun informasi dapat berubah.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="type-h3">Perubahan</h2>
          <p className="type-body text-zinc-700">
            Kami dapat memperbarui syarat ini dari waktu ke waktu. Versi terbaru akan dipublikasikan di halaman
            ini.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="type-body text-zinc-700">
        These are <span className="font-semibold text-zinc-900">draft</span> terms for Paket A and can be
        refined prior to final launch.
      </p>

      <section className="space-y-2">
        <h2 className="type-h3">Website use</h2>
        <p className="type-body text-zinc-700">
          This website provides product information, education highlights, and consultation/partnership
          pathways for salon & barbershop professionals.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="type-h3">No public pricing</h2>
        <p className="type-body text-zinc-700">
          We do not publish public pricing. Consultation, recommendations, and ordering happen via WhatsApp.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="type-h3">Limitations</h2>
        <p className="type-body text-zinc-700">
          Content is provided as-is. We aim for accuracy, but information may change over time.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="type-h3">Changes</h2>
        <p className="type-body text-zinc-700">
          We may update these terms from time to time. The latest version will be published on this page.
        </p>
      </section>
    </div>
  );
}
