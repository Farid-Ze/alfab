# Contributing to Alfa Beauty B2B

## Governance (Scrum)

### Branching Strategy
We follow a simplified **GitFlow**:
- `main`: Production-ready code (Protected).
- `feature/*`: New features (e.g., `feature/lead-form`).
- `fix/*`: Bug fixes (e.g., `fix/validation-error`).
- `docs/*`: Documentation updates.

### Commit Messages
Follow **Conventional Commits**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `chore:` Maintenance (deps, build, etc.)

Example: `feat: add whatsapp sticky button`

### Pull Requests
1. Create PR to `main`.
2. Ensure CI passes (Lint, Type-Check, Tests).
3. Request review from Tech Lead.
4. Squash & Merge.

## Code Standards
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.9 (Strict)
- **Styling:** Tailwind CSS 4 (Utility-first)
- **Linting:** ESLint + Prettier (via `npm run lint`)

## Reporting Issues
Use the provided [Issue Templates](.github/ISSUE_TEMPLATE) for bugs and feature requests.
