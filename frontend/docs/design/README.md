# Design Specification: "Elegant Professional"

**Status**: ✅ Implemented
**Typography**: **Montserrat** (Single Family, All Weights)
**Color**: **Monochrome tokens** (from `src/app/globals.css`)

---

## 1. Constraints (Do/Don’t)

> [!CAUTION]
> **Do not change** the core palette. Use tokens like `--background`, `--foreground`, `--panel`.

> [!IMPORTANT]
> **Use Montserrat** for all text, and keep motion subtle + professional.

---

## 2. Typography Tokens (Montserrat)

| Class | Weight | Size | Use |
|---|---|---|---|
| `type-hero` | Bold (700) | `clamp(2.25rem, 6vw, 4.5rem)` | Hero headlines |
| `type-h1` | SemiBold (600) | `clamp(2rem, 5vw, 3.5rem)` | Page titles |
| `type-h2` | SemiBold (600) | `clamp(1.25rem, 2.6vw, 1.75rem)` | Section titles |
| `type-body` | Regular (400) | `0.9375rem`–`1rem` | Paragraphs |
| `type-kicker` | Medium (600) | `0.75rem` uppercase | Labels |

---

## 3. Motion + Shadow Tokens

| Token | Value | Use |
|---|---|---|
| `--transition-elegant` | `400ms cubic-bezier(0.22, 1, 0.36, 1)` | Hovers, reveals |
| `--shadow-elegant` | Multi-layer shadow | Cards, CTAs |

**Components used:**
- `LenisProvider` (smooth scroll)
- `StaggerReveal` (staggered entrance)
- `ScrollReveal` (viewport reveal)
- `Preloader` (curtain reveal)

---

## 4. Page Coverage (Current Routes)

| Page | Route | Status |
|---|---|---|
| Homepage | `/[locale]` | ✅ |
| Products | `/[locale]/products` | ✅ |
| Product Detail | `/[locale]/products/[slug]` | ✅ |
| Education | `/[locale]/education` | ✅ |
| Partnership | `/[locale]/partnership` | ✅ |
| About | `/[locale]/about` | ✅ |
| Contact | `/[locale]/contact` | ✅ |
| Privacy | `/[locale]/privacy` | ✅ |
| Terms | `/[locale]/terms` | ✅ |
| 404 | Per-locale not-found | ✅ |

---

## 5. Dependencies

- `lenis` (smooth scroll)
- `framer-motion` (animations)
- `next/font/local` (Montserrat)

---

## 6. Performance Budget (Target)

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

Resource targets remain in the acceptance checklist for verification.

---

## 7. Governance Decisions (Pending)

| ID | Item | Recommended | Owner Decision |
|---|---|---|---|
| GOV-01 | Brand Definition | Approve "Elegant Professional" | [ ] Approved / [ ] Reject |
| GOV-04 | Homepage Copy | Approve current hero copy | [ ] Approved / [ ] Edit |
| GOV-05 | Brand Logos | Confirm usage rights | [ ] Confirmed / [ ] Remove |
| GOV-14 | About Story | Approve history as written | [ ] Approved / [ ] Update |

---

## 8. Brand Guidelines (Summary)

**Voice**: Professional, knowledgeable, elegant, reliable.
**Aesthetic**: Shadow & depth, not flat.

**Do**:
- Use `--shadow-elegant` for depth.
- Use staggered reveals for content blocks.

**Don’t**:
- Don’t introduce bright accent colors outside status tokens.
- Don’t use system fonts.
