# Alfa Beauty Frontend

Modern, high-performance frontend for Alfa Beauty, built with Next.js 16.

![Next.js 16](https://img.shields.io/badge/Next.js-16.1-black)
![React 19](https://img.shields.io/badge/React-19.2-blue)
![Tailwind 4](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🏗️ Architecture: Logic vs UI

This project follows a strict separation of concerns to maintain scalability and testability.

### 1. UI Components (`src/components/ui`)

* **Purpose**: Dumb, presentational components.
* **Rules**:
  * No business logic.
  * Receives data via props.
  * Styled with Tailwind data-attributes for variants.
* **Examples**: `Button`, `Section`, `Container`, `WhatsAppCTA`.

### 2. Site Components (`src/components/site`)

* **Purpose**: Structural components specific to the website layout.
* **Rules**:
  * Can contain minimal layout logic.
  * Connects UI primitives to the app context.
* **Examples**: `SiteHeader`, `SiteFooter`.

### 3. Business Logic (`src/lib`)

* **Purpose**: Pure functions and core domain logic.
* **Rules**:
  * Framework-agnostic where possible.
  * Heavily unit-tested.
* **Examples**: `utils.ts` (formatting), `image.ts` (placeholders), `schemas.ts` (validation).

### 4. State Logic (`src/hooks`)

* **Purpose**: React hooks for component behavior.
* **Rules**:
  * Encapsulates side-effects (localStorage, Scroll, Resize).
* **Examples**: `useScrollPosition`, `useMediaQuery`.

---

## 🧪 Testing

We use a dual-layer testing strategy to ensure reliability.

### 1. Unit Testing (Jest + RTL)

Tests individual functions, hooks, and utilities.

```bash
# Run all unit tests
npm test

# Watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Scope**:

* `src/lib/*.ts`: Utilities, Formatters, logic.
* `src/hooks/*.ts`: Custom hooks behavior.

### 2. E2E Testing (Playwright)

Tests the application behavior from a user's perspective across multiple browsers.

```bash
# Run all E2E tests
npm run test:e2e

# Run specific project (e.g., Mobile Safari)
npx playwright test --project="Mobile Safari"

# Debug mode (opens browser)
npx playwright test --debug
```

**Browser Support**:

* **Desktop**: Chrome, Firefox, Safari (WebKit)
* **Mobile**: Android (Pixel 5), iOS (iPhone 12), Legacy iOS (iPhone 8)
* **Tablet**: iPad (Gen 7)

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router
│   ├── [locale]/         # i18n dynamic routes
│   └── api/              # API Routes (Health, etc.)
├── components/
│   ├── analytics/        # WebVitals, Tracking
│   ├── seo/              # JSON-LD Schemas
│   ├── site/             # Header, Footer
│   └── ui/               # Reusable primitives
├── hooks/                # Custom React Hooks
├── lib/                  # Utilities & Constants
├── styles/               # CSS Tokens & Global Styles
└── types/                # TypeScript Interfaces
```

## 📦 Deployment

Configured for **Vercel** with automatic optimization.

```bash
# Analyze bundle size before push
npm run analyze

# Production build
npm run build
```
