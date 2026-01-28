# 2. Standardized Error Handling via Error Boundaries

Date: 2026-01-28
Status: Accepted

## Context

Applications fail. Unhandled exceptions cause "White Screen of Death," eroding trust.
We need a consistent way to handle errors across:

1. Root Layout (Global crash).
2. Route Segments (Page crash).
3. Components (Widget crash).

## Decision

We adopt a **3-Layer Error Boundary Strategy**:

1. **Global**: `global-error.tsx` catches Root Layout errors. Uses `<a>` for Hard Reload (Task 62).
2. **Segment**: `error.tsx` catches Page/Layout errors. Uses `reset()` to attempt recovery.
3. **Component**: `ErrorBoundary.tsx` wrapper for volatile widgets (e.g., VideoPlayer).

All layers use the shared `ErrorState` component for UI consistency.

## Consequences

- **Reliability**: The app shell remains visible even if a route fails.
- **UX**: Users always have a "Try Again" or "Return Home" path.
- **Observability**: All boundaries automatically report to Sentry (Task 6).

## Compliance

- **ITIL**: Incident Management (Service Continuity).
