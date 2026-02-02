# Data Architecture Specification

**Framework**: TOGAF (Data Architecture)
**Scope**: Data Models, Schema, and Migration Strategy.

---

## 1. Canonical Data Model (CDM)

### Product (Catalog)

**Source**: `src/content/data/products.json` (read-only JSON catalog).

| Field | Type | Description |
| :--- | :--- | :--- |
| `slug` | String | URL-friendly identifier. |
| `name` | String | Product name. |
| `brand` | String | Brand name. |
| `audience` | Enum[] | `SALON`, `BARBER`. |
| `functions` | String[] | Key functions/tags. |
| `categories` | Enum[] | `shampoo`, `treatment`, `styling`, `color`, `grooming` (optional). |
| `summary` | String | Short description. |
| `benefits` | String[] | Bullet benefits. |
| `howToUse` | String | Usage guidance. |
| `image.url` | String | Image URL (local or remote). |
| `image.alt` | String | Accessibility text. |
| `image.caption` | String | Optional caption. |

### Lead (Transactional)

**Source**: Supabase `leads` table (inserted via server action).

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Contact name. |
| `phone` | String | WhatsApp number. |
| `email` | String | Contact email (optional). |
| `message` | String | Optional note. |
| `ip_address` | String | Request IP (truncated). |
| `page_url_initial` | String | First landing URL (session). |
| `page_url_current` | String | Current page URL. |
| `raw` | JSONB | Full payload + profiling fields. |

---

## 2. Schema Evolution (Migration)

**Strategy**: Strangler Fig Pattern.
**Current State**: Hybrid (JSON Catalog + SQL Leads).
**Target State (2027)**: Full SQL.

### Phase 1: Hybrid (Current)

* Product Data: Static JSON (Fast, Zero Latency).
* Lead Data: PostgreSQL (Secure, RLS).

### Phase 2: Migration (Trigger: > 1000 SKUs)

1. Create `products` table in Supabase.
2. Run `scripts/migrate-products.ts`.
3. Switch `catalog.ts` to read from DB.

---

## 3. Data Governance

* **Access**: RLS Policy ensures `anon` key can `INSERT` leads but NOT `SELECT`.
* **Backup**: Daily Snapshot (Supabase).
* **Retention**: 3 Years.
