# SYSTEM DIAGRAMS — WEBSITE PAKET A

> **DEPRECATED:** Diagram sistem Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §3).
# SYSTEM DIAGRAMS — WEBSITE PAKET A

## Sitemap (Mermaid)

```mermaid
graph TD
  HOME[Home] --> PRODUCTS[Products Overview]
  PRODUCTS --> PDETAIL[Product Detail]
  HOME --> EDU[Education/Events]
  EDU --> EDETAIL[Event Detail (optional)]
  HOME --> PARTNER[Partnership]
  PARTNER --> BECOME[Become Partner Form]
  HOME --> ABOUT[About]
  HOME --> CONTACT[Contact]
  HOME --> LEGAL[Privacy/Terms]
  PDETAIL --> WA[WhatsApp Consult CTA]
  HOME --> WA

  %% Lead pipeline (Option B)
  BECOME --> LEADAPI[Lead API (Option B)]
  LEADAPI --> STORE[(Durable Persistence)]
  LEADAPI --> NOTIF[Notification/Fanout]
  LEADAPI --> EXPORT[Admin Export (Access-controlled)]
```
