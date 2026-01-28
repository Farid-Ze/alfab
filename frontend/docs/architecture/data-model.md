# Canonical Data Model

**Domain**: CRM & Catalog
**Status**: Draft
**Owner**: Architecture Team

## 1. Overview

This document serves as the Single Source of Truth (SSOT) for the data entities used in the Alfa Beauty B2B platform. It aligns with the frontend TypeScript definitions and the backend Supabase schema.

## 2. Entities

### 2.1 Lead (B2B Partner)

Represents a potential business partner (Salon/Barber) applying for an account.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Yes | Primary Key (db-generated) |
| `business_name` | String | Yes | Name of the Salon/Barber |
| `email` | String | Yes | Contact Email (Unique) |
| `phone` | String | Yes | WhatsApp-enabled phone number |
| `segment` | Enum | Yes | `SALON` or `BARBER` |
| `city` | String | Yes | City for logistics grouping |
| `status` | Enum | Yes | `NEW`, `CONTACTED`, `QUALIFIED`, `REJECTED` |
| `created_at` | Timestamp | Yes | UTC creation time |

**TypeScript Interface**:

```typescript
interface Lead {
  id: string;
  businessName: string;
  email: string; // PII
  phone: string; // PII
  segment: "SALON" | "BARBER";
  city: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "REJECTED";
  createdAt: string;
}
```

### 2.2 Product (Catalog)

Represents a SKU available for distribution. Sourced from `products.json` (Static) but modeled for future DB migration.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `slug` | String | Yes | Primary Key (URL-friendly ID) |
| `name` | String | Yes | Display Name |
| `brand` | String | Yes | Brand Name (Brand A, Brand B) |
| `audience` | Array&lt;Enum&gt; | Yes | Target segments: `SALON`, `BARBER` |
| `categories` | Array&lt;Enum&gt; | No | `shampoo`, `styling`, `treatment`, `color`, `grooming` |
| `functions` | Array&lt;String&gt; | Yes | Functional benefits (e.g., "Repair") |
| `summary` | String | Yes | Short description for cards |
| `benefits` | Array&lt;String&gt; | Yes | Bullet points for details |
| `howToUse` | String | Yes | Instructions |

**Constraint**: `categories` must match the defined taxonomy to ensure filter stability.

## 3. Data Flow

- **Leads**: Frontend Form -> `/api/leads` (Rate Limited) -> Supabase `leads` table.
- **Products**: `src/content/products.json` -> `/api/products` (Cached) -> Frontend ISR Pages.

## 4. Privacy & Governance (COBIT)

- **PII**: `email` and `phone` are PII. Access restricted to Sales Role via Row Level Security (RLS).
- **Retention**: Leads retained for 5 years or until deletion request (GDPR/UU PDP).
- **Backup**: Daily snapshot of Supabase DB.
