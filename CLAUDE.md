# syncTaskpro-admin — CLAUDE.md
# Angular super-admin panel for SyncTaskPro

---

## What This Is

The super-admin panel for platform operators. Used to manage tenants,
users, support tickets, and monitor system health. Separate from the
client-facing web app.

Read the master CLAUDE.md at `/SyncTaskPro/CLAUDE.md` first — always.

---

## Tech Stack

- Angular 19 (standalone components, no NgModules)
- SCSS with glassmorphism design system
- Tailwind CSS v4 (via @tailwindcss/postcss)
- Auth0 (@auth0/auth0-angular)
- Port: 4201

---

## Design System

Refined glassmorphism dark theme with red accent (#FF2D55).
Same token architecture as syncTaskpro-web but with red branding.
Theme scheme (dark/light/system) and background customization via ThemeService.
Settings page at `/admin/settings`.

Semantic tokens: `--bg-base`, `--accent`, `--glass-bg`, `--text-primary`, etc.
Ambient background with red-tinted orbs, noise texture, preset backgrounds.
Glass cards use `::before` highlight, primary buttons use gradient fill.

Fonts: Sora (display/headings), Inter (body text) — loaded from Google Fonts.

Login page features animated red particle orbs, "ADMIN CONSOLE" badge,
gradient login button, glass card, and audit warning strip.

Style files:
- `src/styles/_variables.scss` — Refined CSS custom properties (red accent)
- `src/styles/_backgrounds.scss` — Ambient orbs, noise texture
- `src/styles/_glass.scss` — Refined glass mixins (glass-card, glass-card-glow, btn-primary, stat-value, badges)
- `src/styles/_typography.scss` — Sora + Inter font, heading/paragraph styles
- `src/styles.scss` — Imports all + Tailwind + scrollbar + reset

---

## Folder Structure

```
src/app/
  core/
    auth/           auth.guard.ts
    theme/          theme.service.ts (theme scheme, background customization)
    storage/        image-storage.service.ts (IndexedDB for custom backgrounds)
    interceptors/   auth.interceptor.ts, error.interceptor.ts
    tenancy/        admin-company.service.ts
    audit/          admin-audit.service.ts (GET /api/admin/audit with category/severity filters)
    translations/   admin-translation.service.ts (keys CRUD, coverage, import/export, auto-translate trigger)
    api/generated/  NSwag-generated client (gitignored, never edit)
  shared/
    layouts/        app-shell.component.ts (topbar + sidebar with Companies nav), auth-layout.component.ts
  features/
    auth/           login.component.ts, callback.component.ts
    companies/
      company-list/    paged table with search/filter, tier badges
      company-detail/  read-only company info, audit fields
    audit/          audit-log.component.ts (table view, category/severity filters, pagination)
    translations/   translations.component.ts (coverage matrix, namespace filter, inline key editing, auto-translate, JSON export)
    dashboard/      dashboard.component.ts (bento grid, stat cards)
    settings/       settings.component.ts (theme switcher, background customization)
    tenants/        tenants.component.ts
    users/          users.component.ts
    support/        support.component.ts
src/environments/   environment.ts, environment.prod.ts
src/styles/         _variables.scss, _glass.scss, _typography.scss
```

---

## Routes

All authenticated routes are under `/admin/`:
- `/admin/dashboard` — Platform overview (total tenants, active users, health)
- `/admin/companies` — Paged company list with search/filter
- `/admin/companies/:id` — Company detail (read-only)
- `/admin/audit` — Audit log viewer with category/severity filters
- `/admin/translations` — Translation management (coverage, keys, import/export, auto-translate)
- `/admin/tenants` — Manage registered companies (legacy)
- `/admin/users` — Manage platform users
- `/admin/support` — Support ticket management
- `/login` — Auth0 login (standalone, not under auth layout — full-page red-themed login)
- `/callback` — Auth0 redirect handler (standalone)

---

## How to Run

```bash
npm install
npx ng serve          # http://localhost:4201
```

Auth0 credentials are configured in environment files + assets/env.js.

---

## Component File Convention

Every component uses separate files — never inline templates or styles:
- `*.component.ts` — Logic only (templateUrl + styleUrl)
- `*.component.html` — Template
- `*.component.scss` — Styles

---

## Key Decisions

- All components are standalone (no NgModules)
- Lazy-loaded routes via loadComponent()
- Admin routes scoped under /admin/ prefix
- Separate Auth0 client from the web app (different clientId)
- Double admin guard: Auth0 Action (server) + client guard (role + email)
- cacheLocation: 'memory' — tokens NEVER in localStorage
- No offline_access scope — admin must re-authenticate on token expiry
- allowedAdminEmails in environment.ts as fallback whitelist
- Unauthorized page is intentionally hostile (no navigation links)
- Runtime config via assets/env.js (window.__env)
- Topbar shows real avatar (with UseAvatar toggle logic) or initials — read-only
- Admin does NOT allow profile editing — display only
- API clients are auto-generated by NSwag — never hand-write API calls

---

## Translation-First Rule (NON-NEGOTIABLE)

See master CLAUDE.md for full details. Summary:

- NEVER hardcode user-facing text — always use translation keys
- ALL new keys go in en.json seed data first, then pt/es/fr
- Key convention: `admin.[section].[subsection].[purpose]`
- PRs must include "Translation Decisions" section
- Note: admin panel templates not yet i18n-ized — will be converted in future session

---

## Last Updated
Date: 2026-03-06
Session: Translation management — coverage matrix, namespace filter, inline key editing, auto-translate trigger, JSON export
