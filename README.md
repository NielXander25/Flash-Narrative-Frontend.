# Flash Narrative — AI Narrative Intelligence Platform (Frontend)

> **"Bloomberg Terminal meets Luxury Fintech"** — an enterprise-grade dashboard for real-time brand intelligence, sentiment tracking, share-of-voice analytics, and crisis radar across news, web, and social channels.

This repository contains the **frontend** for Flash Narrative. It connects to a separate FastAPI backend (see *Backend Integration* below) that handles scraping, AI analysis, and reporting.

---

## 📑 Table of Contents

1. [Languages & Tech Stack](#-languages--tech-stack)
2. [Why Each Choice](#-why-each-choice)
3. [Project Structure](#-project-structure)
4. [Getting Started](#-getting-started)
5. [Environment Variables](#-environment-variables)
6. [Key Features](#-key-features)
7. [Routing](#-routing-tanstack-router)
8. [Backend Integration](#-backend-integration)
9. [Design System](#-design-system)
10. [Deployment](#-deployment)
11. [Scripts](#-scripts)

---

## 🧬 Languages & Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Language** | TypeScript (strict mode) | 5.8 |
| **Markup** | TSX / JSX | — |
| **Styling** | Tailwind CSS v4 + CSS (`oklch` design tokens) | 4.2 |
| **UI Library** | shadcn/ui (Radix UI primitives) | — |
| **Framework** | React 19 + TanStack Start (SSR) | 19 / 1.16 |
| **Routing** | TanStack Router (file-based) | 1.16 |
| **Build Tool** | Vite | 7.3 |
| **Data Fetching** | TanStack Query | 5.83 |
| **Forms & Validation** | React Hook Form + Zod | 7 / 3 |
| **Charts** | Recharts | 2.15 |
| **Icons** | Lucide React | 0.575 |
| **Notifications** | Sonner | 2.0 |
| **Date Utils** | date-fns + react-day-picker | 4 / 9 |
| **Runtime (prod)** | Cloudflare Workers (edge) | — |

---

## 💡 Why Each Choice

### TypeScript (strict)
Enterprise dashboards manipulate complex domain objects (campaigns, KPIs, mentions, payloads). Strict typing catches schema drift between frontend and the FastAPI backend at compile time, not in production.

### Tailwind CSS v4 **+ shadcn/ui** (not "instead of")
There is a common confusion worth clearing up: **shadcn/ui is built on Tailwind**. It is not an alternative — it is a collection of unstyled Radix UI primitives (Dialog, Select, Slider, etc.) wrapped with Tailwind classes that you copy directly into `src/components/ui/`. This project uses **both, exactly as shadcn is designed to work**:

- **Tailwind v4** provides the utility classes and the `oklch`-based design-token system in `src/styles.css`.
- **shadcn/ui** provides 40+ accessible components in `src/components/ui/` (button, card, dialog, dropdown-menu, slider, tabs, sheet, sonner, sidebar, etc.) — all owned by us, all themable through our tokens.

This combination gives us the velocity of a component library with **zero vendor lock-in** — every UI primitive is editable source code in our repo.

### TanStack Query
Server state ≠ client state. Query gives us caching, refetching, optimistic updates, and request deduplication out of the box, instead of hand-rolling `useEffect` + `useState` for every API call.

### React Hook Form + Zod
The 5-step Campaign Wizard requires per-step validation, conditional fields, and a final composite payload. RHF minimises re-renders; Zod provides a single source of truth for schemas (we can share them server-side if/when needed).

### Recharts
Declarative React charts for sentiment pies, SOV bars, trend lines — composable and themable via our CSS tokens (`--chart-1` … `--chart-5`).

### Radix UI primitives (under shadcn)
Accessibility (WAI-ARIA, keyboard navigation, focus management) is non-negotiable for enterprise. Radix handles it; we style the surface.

### Cloudflare Workers (edge runtime)
Sub-50ms global latency for SSR, no cold starts, no servers to manage.

---

## 📁 Project Structure

```
src/
├── routes/                      # File-based routes (TanStack Router)
│   ├── __root.tsx               # Root shell (html/head/body, providers)
│   ├── index.tsx                # Landing page  →  /
│   ├── login.tsx                # Auth screen   →  /login
│   ├── dashboard.tsx            # Dashboard layout (sidebar + header)
│   ├── dashboard.index.tsx      # Overview      →  /dashboard
│   ├── dashboard.intelligence.tsx
│   ├── dashboard.reports.tsx
│   ├── dashboard.settings.tsx
│   └── dashboard.api.tsx
│
├── components/
│   ├── ui/                      # shadcn/ui primitives (40+ components)
│   ├── layout/                  # Header, Sidebar, Logo, DashboardShell
│   └── dashboard/
│       ├── KPICard.tsx
│       ├── SentimentChart.tsx
│       ├── SOVChart.tsx
│       ├── MentionsTable.tsx
│       ├── CrisisRadar.tsx
│       ├── AgencyPortfolio.tsx
│       ├── AIExecutiveSummary.tsx
│       ├── CampaignWizard.tsx   # 5-step wizard shell
│       └── wizard/
│           ├── Step1Identifiers.tsx
│           ├── Step2Sources.tsx
│           ├── Step3Kpis.tsx
│           ├── Step4Schedule.tsx
│           ├── Step5Review.tsx
│           └── ChipInput.tsx
│
├── lib/
│   ├── types.ts                 # All TypeScript domain models
│   ├── constants.ts             # Industry sectors, suggested competitors, API base
│   ├── api-client.ts            # Backend HTTP client (JWT + X-API-KEY)
│   ├── campaign-payload.ts      # Draft → API payload mapping + validation
│   └── utils.ts                 # cn() classname helper
│
├── hooks/
│   └── use-mobile.tsx
│
├── router.tsx                   # Router instance + QueryClient
└── styles.css                   # Tailwind v4 + design tokens (oklch)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 20 (or **Bun**)
- A running instance of the Flash Narrative **backend** (FastAPI) — see backend repo

### Install & Run
```bash
# Install dependencies
npm install     # or: bun install

# Start dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```bash
# Backend API base URL (FastAPI)
VITE_API_BASE=http://localhost:8000/api/v1

# Optional — for Google Sign-In
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

> Only variables prefixed with `VITE_` are exposed to the browser. Never put secrets here — anything in this file is shipped to the client.

---

## ✨ Key Features

### 1. Campaign Wizard (5 Steps)
A horizontal, fatigue-resistant flow for launching a tracking campaign:
1. **Core Identifiers** — name, target brand, industry, competitors (with smart suggestions per industry).
2. **Data Source Routing** — News & Web / Social Pulse toggles.
3. **KPIs & Crisis Alerts** — sentiment, SOV, volume, engagement targets + alert threshold and recipient emails.
4. **Timeframe & Automation** — historical snapshot vs. live tracker, with conditional schedule config (minute / hour / day + multi-time picker).
5. **Review & Launch** — visual summary; clicking *Launch* compiles state via `buildPayload()` and POSTs to `/campaigns/create`.

### 2. Intelligence Dashboard
- **4 KPI cards**: Sentiment, Share of Voice, Mention Volume, Total Reach.
- **Sentiment donut + SOV bar + trend line** (Recharts).
- **Mentions table** with sentiment tags and source attribution.
- **Crisis Radar** for high-risk signal escalation.
- **AI Executive Summary** rendered from backend markdown.

### 3. Authentication
- Email/password sign-in & sign-up.
- "Continue with Google" (OAuth, requires `VITE_GOOGLE_CLIENT_ID`).
- JWT stored in `localStorage` and attached as `Authorization: Bearer <token>`.
- B2B clients can swap JWT for `X-API-KEY` (handled by `api-client.ts`).

### 4. Reports & API Keys
- Reports listing with status pills.
- API key lifecycle management for Tenant Admins.

---

## 🛣️ Routing (TanStack Router)

Routes use the **flat dot-separated** convention:

| File | URL |
|------|-----|
| `routes/index.tsx` | `/` |
| `routes/login.tsx` | `/login` |
| `routes/dashboard.tsx` | layout shell (renders `<Outlet />`) |
| `routes/dashboard.index.tsx` | `/dashboard` |
| `routes/dashboard.intelligence.tsx` | `/dashboard/intelligence` |
| `routes/dashboard.reports.tsx` | `/dashboard/reports` |
| `routes/dashboard.settings.tsx` | `/dashboard/settings` |
| `routes/dashboard.api.tsx` | `/dashboard/api` |

`src/routeTree.gen.ts` is **auto-generated** — never edit it manually.

---

## 🔌 Backend Integration

The frontend talks to the Flash Narrative **FastAPI** backend (see backend `README` / docs).

### Endpoints currently consumed
| Method & Path | Purpose |
|---------------|---------|
| `POST /auth/register` | Sign up |
| `POST /auth/login` | OAuth2 password flow → JWT |
| `POST /auth/login/google` | Google ID token → JWT |
| `GET  /auth/me` | Current user |
| `POST /campaigns/create` | Launch a campaign (wizard payload) |
| `POST /analysis/run` | Execute an intelligence run |
| `POST /reports/generate/pdf` | Branded PDF |
| `POST /tenant/settings` | White-label branding |
| `GET  /tenant/api-keys` | List masked keys |
| `POST /tenant/api-keys/generate` | Issue new key |

### Auth header strategy
`src/lib/api-client.ts` automatically attaches:
- `Authorization: Bearer <jwt>` if a JWT is in `localStorage`, **else**
- `X-API-KEY: <key>` for headless / B2B usage.

### Wizard payload contract
The exact JSON shape produced by Step 5 is defined by `CampaignPayload` in `src/lib/types.ts` and built by `buildPayload()` in `src/lib/campaign-payload.ts`. Example:

```json
{
  "campaign_name": "Zenith Bank Real-Time Monitor",
  "target": "Zenith Bank",
  "industry": "finance",
  "competitors": ["GTBank", "Access Bank"],
  "sources": ["news_and_web", "social_pulse"],
  "kpis": { "sentiment_target": 80, "share_of_voice_target": 25, "volume_target": 5000 },
  "alert_threshold": 500,
  "alert_emails": ["manager@agency.com"],
  "analysis_type": "live",
  "date_start": "2026-04-20",
  "date_end": "2026-05-20",
  "schedule_config": { "interval_type": "day", "interval_value": 1, "specific_times": ["07:00", "19:00"] }
}
```

---

## 🎨 Design System

All visual tokens live in `src/styles.css` and are referenced through Tailwind's `bg-*`, `text-*`, `border-*` utilities — **never hardcode hex values in components**.

```css
:root {
  --background: oklch(0.16 0.005 270);    /* near-black */
  --foreground: oklch(0.97 0.005 90);
  --primary:    oklch(0.78 0.16 78);      /* signature amber */
  --surface:    oklch(0.19 0.005 270);
  --chart-1:    oklch(0.78 0.16 78);      /* amber */
  --chart-2:    oklch(0.72 0.17 150);     /* green */
  --chart-3:    oklch(0.62 0.22 27);      /* red */
  ...
}
```

Utility classes such as `.panel`, `.gradient-amber`, and `.text-gradient-amber` provide the recurring "luxury fintech" surfaces.

---

## 📜 Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Vite dev server on `http://localhost:8080` |
| `npm run build` | Production build (Workers-targeted) |
| `npm run build:dev` | Development-mode build (source maps, no minify) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |

---

## 📄 License

Proprietary © Flash Narrative. All rights reserved.
