"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export default function PrivacyPolicyContent() {
  const { locale } = useLocale();

  if (locale === "id") {
    return (
      <div className="space-y-6">
        <p className="type-body text-zinc-700">
          <span className="font-semibold text-zinc-900">Draft</span> kebijakan privasi ini disediakan untuk
          Paket A dan dapat disesuaikan sebelum peluncuran final.
        </p>

        <section className="space-y-2">
          <h2 className="type-h3">Informasi yang kami kumpulkan</h2>
          <ul className="list-disc space-y-1 pl-5 type-body text-zinc-700">
            <li>Data yang Anda kirimkan melalui form Kemitraan (mis. nama bisnis, kontak, WhatsApp, kota).</li>
            <li>Data teknis dasar untuk analytics/performa (mis. event klik CTA, metrik RUM).</li>
            <li>Informasi yang Anda kirimkan saat menghubungi kami via WhatsApp/email.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="type-h3">Cara kami menggunakan informasi</h2>
          <ul className="list-disc space-y-1 pl-5 type-body text-zinc-700">
            <li>Menindaklanjuti permintaan konsultasi produk dan/atau pendaftaran kemitraan.</li>
            <li>Meningkatkan kualitas website (stabilitas, performa, dan pengalaman pengguna).</li>
            <li>Mencegah spam/penyalahgunaan pada jalur lead.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="type-h3">Penyimpanan & keamanan</h2>
          <p className="type-body text-zinc-700">
            Data lead disimpan secara durable sebelum ditandai sukses. Kami menerapkan langkah keamanan wajar
            untuk melindungi data dari akses tidak sah.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="type-h3">Cookie & teknologi serupa</h2>
          <p className="type-body text-zinc-700">
            Kami dapat menggunakan cookie/teknologi serupa untuk analitik dan peningkatan performa. Anda
            dapat mengatur preferensi cookie melalui pengaturan browser Anda.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="type-h3">Hubungi kami</h2>
          <p className="type-body text-zinc-700">
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui halaman
            Contact atau WhatsApp.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="type-body text-zinc-700">
        This is a <span className="font-semibold text-zinc-900">draft</span> privacy policy for Paket A and
        can be refined prior to final launch.
      </p>

      <section className="space-y-2">
        <h2 className="type-h3">Information we collect</h2>
        <ul className="list-disc space-y-1 pl-5 type-body text-zinc-700">
          <li>Information you submit via the Partnership lead form (e.g., business name, contact, WhatsApp, city).</li>
          <li>Basic technical/analytics data for performance and reliability (e.g., CTA clicks, RUM metrics).</li>
          <li>Information you provide when contacting us via WhatsApp/email.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="type-h3">How we use information</h2>
        <ul className="list-disc space-y-1 pl-5 type-body text-zinc-700">
          <li>To respond to product consultation requests and partnership inquiries.</li>
          <li>To improve the website (stability, performance, and user experience).</li>
          <li>To prevent spam and abuse in the lead pipeline.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="type-h3">Storage & security</h2>
        <p className="type-body text-zinc-700">
          Leads are durably persisted before being considered successful. We use reasonable security measures
          to protect information from unauthorized access.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="type-h3">Cookies & similar technologies</h2>
        <p className="type-body text-zinc-700">
          We may use cookies/similar technologies for analytics and performance. You can manage cookies via
          your browser settings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="type-h3">Contact</h2>
        <p className="type-body text-zinc-700">
          If you have questions about this policy, please contact us via the Contact page or WhatsApp.
        </p>
      </section>
    </div>
  );
}
