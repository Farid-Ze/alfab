# Alfa Design System

**Single Source of Truth**: `src/app/globals.css`
**Framework**: Tailwind CSS v4 + Semantic CSS Variables
**Governance**: Enforced via `npm run lint` (See Section 4).

---

## 1. Typography (`type-*`)

Defined in `src/app/globals.css`. Do NOT use raw Tailwind utility classes like `text-4xl font-bold` for core text elements.

| Class | Desktop Size | Mobile Size | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **`type-hero`** | ~4.5rem | ~2.25rem | 700 | Main Hero Headline only. |
| **`type-hero-kicker`** | 0.75rem | 0.6875rem | 600 | Uppercase label above Hero Headline. |
| **`type-h1`** | ~3.5rem | ~2rem | 600 | Page Titles. |
| **`type-h2`** | ~1.75rem | ~1.25rem | 600 | Section Headings. |
| **`type-h3`** | ~1.25rem | ~1.05rem | 600 | Card Titles, Subsections. |
| **`type-body`** | 1rem | 0.9375rem | 400 | Standard body copy. |
| **`type-ui`** | 1rem | 0.9375rem | 500 | Interactive elements (buttons, inputs). |
| **`type-nav`** | 0.875rem | 1.0625rem | 500 | Navigation links. |
| **`type-kicker`** | 0.75rem | 0.75rem | 600 | Uppercase standard kicker. |
| **`type-data`** | 0.875rem | 0.875rem | 400 | Meta data, timestamps. |

### Font Stacks

- **Display**: `var(--font-display)` (Header, Hero).
- **Body**: `var(--font-body)` (Paragraphs, UI).
- **Mono**: `var(--font-geist-mono)` (Code, Data).

---

## 2. Color System (Semantic Tokens)

We use usage-based semantic names. Dark mode is handled automatically via CSS variables.

| Token | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| **`--background`** | White | Zinc-950 | Page root. |
| **`--panel`** | Zinc-50 | Zinc-900 | Cards, sidebars. |
| **`--foreground`** | Zinc-950 | Zinc-50 | Primary text. |
| **`--muted`** | Zinc-500 | Zinc-400 | Secondary text. |
| **`--border`** | Zinc-200 | Zinc-800 | Hairline borders. |

### Status Colors

| State | Text Class | Background Class |
| :--- | :--- | :--- |
| **Success** | `text-success` | `bg-success-bg` |
| **Error** | `text-error` | `bg-error-bg` |
| **Warning** | `text-warning` | `bg-warning-bg` |
| **Info** | `text-info` | `bg-info-bg` |

---

## 3. Component Library (Base Classes)

### Buttons

- **`ui-btn-primary`**: Foreground bg, Background text.
- **`ui-btn-secondary`**: Transparent bg, Foreground border.
- **`ui-btn-ghost`**: Transparent, no border.
- **`ui-btn-inverted`**: For use on dark backgrounds (White bg, Black text).

### Cards

- **`ui-interactive-card`**: Hover lift, border change.
- **`ui-card-elevated`**: Subtler shadow, for featured content.

### Dark Surface Utilities

- **`ui-section-dark`**: Forces dark theme within a section (Inverted).
- **`ui-hero-on-media`**: White text optimized for video overlays.
- **`ui-icon-dark`**: Circular icon container (dark mode compatible).

---

## 4. Governance & "Frozen" Components

Critical components are protected by automated linting scripts (`scripts/lint-*-freeze.mjs`). Changes to these files trigger CI failures unless the script is updated (Owner Approval).

| Freeze Scope | Controlled Files | Lint Command |
| :--- | :--- | :--- |
| **Hero Section** | `HomeHero.tsx`, `HeroVideo.tsx` | `npm run lint:hero-freeze` |
| **Buttons** | `Button.tsx`, `ButtonLink.tsx` | `npm run lint:button-freeze` |
| **Carousel** | `Carousel.tsx` | `npm run lint:carousel-freeze` |
| **Category Card** | `CategoryCard.tsx` | `npm run lint:category-card-freeze` |

---

## 5. Animation & Motion

Respects `prefers-reduced-motion`.

| Token | Duration | Usage |
| :--- | :--- | :--- |
| **`--transition-fast`** | 100-150ms | Hover states. |
| **`--transition-base`** | 150-200ms | UI state changes. |
| **`--transition-slow`** | 250-350ms | Layout shifts. |
| **`--transition-cinematic`** | 700-800ms | Hero reveals. |

### Utility Classes

- **`.animate-fade-in`**: Simple fade.
- **`.animate-fade-in-up`**: Fade + TranslateY.
- **`.ui-drill-in` / `.ui-drill-back`**: Mobile menu usage.
