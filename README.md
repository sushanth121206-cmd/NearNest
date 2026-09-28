# NearNest

**Local Shops • Better Prices • Faster Delivery**
*From Your Nearby Store to Your Doorstep*

A production-ready, responsive hyperlocal **retail** shopping platform connecting customers with
nearby local stores across six categories — **Electronics, Clothing & Fashion, Home & Living,
Beauty & Wellness, Hardware & Tools, and Books & Gifts**. Delivery is powered by **XpressBees**.

> NearNest is intentionally **not** a food, grocery or restaurant service. There is no food
> vertical anywhere in the product, the data model, or the design system.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) + React 18 + TypeScript (strict) |
| Styling | Tailwind CSS 3.4 + shadcn/ui (Radix primitives) |
| Database | Supabase (PostgreSQL) — customers, shops, products, orders, inventory |
| Auth | Firebase Authentication (email + phone/OTP) with role-based access control |
| AI | Gemini API — intelligent search, recommendations, multilingual assistant |
| Payments | Razorpay — UPI, cards, net banking, refunds |
| Maps | Google Maps Platform — locations, distance matrix, navigation |
| Images | Cloudinary — product/store uploads and optimisation |
| Notifications | Firebase Cloud Messaging |
| Hosting | Vercel-ready |

---

## Quick start

```bash
cd nearnest
npm install
cp .env.example .env.local     # add your keys (optional — the app runs without them)
npm run dev
```

Open <http://localhost:3000>. Without API keys the app runs in **demo mode** against a built-in
Hyderabad dataset, so every screen and flow is fully explorable.

### Demo sign-in

Any of these work (validation rules are enforced exactly as specified):

| Role | Identifier | Password |
| --- | --- | --- |
| Buyer | `9876543210` or `buyer@nearnest.in` | `nearnest` |
| Store owner | `9876543211` or `seller@nearnest.in` | `nearnest` |
| Rider | `9876543212` or `rider@nearnest.in` | `nearnest` |

> Only **10-digit Indian mobile numbers starting 6–9** and **@gmail.com addresses** are accepted.
> Errors: `Enter valid 10-digit mobile number`, `Please use your Gmail address`,
> `Password must be at least 6 characters`.

---

## Three role-based entry points

Each user type has its own login route with a distinct visual surface and a distinct post-login
destination. There is no generic login form.

| Route | Role | Surface | CTA | Lands on |
| --- | --- | --- | --- | --- |
| [`/login/buyer`](src/app/login/buyer/page.tsx) | Buyer | Light storefront (`#FDFDFD` + mint `#A0D0C9`) | **Continue as Buyer** | `/home` |
| [`/login/seller`](src/app/login/seller/page.tsx) | Store owner | Dark operator gradient (`#011628 → #01263E`) | **Access Seller Dashboard** | `/seller/overview` |
| [`/login/rider`](src/app/login/rider/page.tsx) | Delivery partner | Dark operator + scooter-bag mark | **Start Delivering** | `/partner/dashboard` |

Role boundaries are enforced in [`src/middleware.ts`](src/middleware.ts) via the `nn_session`
cookie, which the auth provider mirrors on sign-in and clears on logout.

---

## Design system

The app uses a **two-surface architecture**; the surfaces are never mixed.

### Surface A — Light storefront (`/home`, `/product/*`, `/cart`, `/checkout`, `/order/*`)

| Token | Value | Usage |
| --- | --- | --- |
| Page background | `#FDFDFD` / `#F8FCFC` | Body, off-white cards |
| Header | `#011628` | Sticky navy bar |
| Primary CTA | `#0DCEA1` | Buttons, active states, success |
| Secondary text | `#464F5B` / `#5C8586` | Body copy, muted copy |
| Discount / alert | `#FF5A5F` | Badges, errors |
| Mint accent | `#A0D0C9` | Category washes, soft panels |

### Surface B — Dark operator (`/seller/*`, `/partner/*`)

| Token | Value | Usage |
| --- | --- | --- |
| Background | `#011628 → #01263E → #0B2639` | Gradient shell |
| Text | `#FFFFFF` | High contrast |
| Buttons / active | `#0DCEA1` | Same signature green |
| Pending | `#F5A623` | Status pill |
| Processing | `#4A90D9` | Status pill |
| Delivered | `#0DCEA1` | Status pill |

**Typography** — Inter (body) and Poppins (headers, prices, stats), plus Noto Sans scripts for
Telugu, Devanagari, Tamil, Kannada and Malayalam. **Iconography** — rounded line icons throughout.

The logo is a geometric **N** built from two arrow chevrons on a teal-to-green gradient
([`src/components/brand/logo.tsx`](src/components/brand/logo.tsx)), with a green scooter-bag
variant for **NearNest Express**.

---

## Routes

### Buyer
| Route | Description |
| --- | --- |
| `/home` | Hero, 6 category tiles, popular grid, nearby stores, value-prop footer |
| `/onboarding/language` | 6-language grid (first login only) |
| `/onboarding/location` | Current location / PIN code / area-city |
| `/category/[slug]` | Category listing with sort + stock filter |
| `/product/[id]` | Gallery, delivery-vs-pickup chooser, quantity stepper |
| `/store/[id]` | Store profile and its catalogue |
| `/search` | Products + stores, radius control, AI entry point |
| `/cart` | Grouped by store, per-store delivery/pickup, summary |
| `/checkout` | Address, ETA callout, payment methods, Razorpay |
| `/order/confirmation` | Success animation, order ID, XpressBees tracking ID |
| `/order/[id]/tracking` | 5-stage timeline, rider card, map, ETA banner |
| `/orders`, `/account` | Order history, profile and language settings |

### Store owner — `/seller/*`
`overview` (4 stat cards + recent orders) · `orders` (filters, accept/reject) ·
`inventory` (low-stock flags, restock, add product) · `earnings` (today/week/month, trend chart,
payouts)

### Delivery partner — `/partner/*`
`dashboard` (online toggle, 3 stats, pulsing new-request banner) · `deliveries` ·
`delivery/[id]` (accept/decline) · `delivery/[id]/navigate` · `delivery/[id]/progress` ·
`earnings` · `profile` · `support` · `join` (recruitment)

---

## AI assistant

A floating green bubble is available on **every** page. It posts to
[`/api/gemini/chat`](src/app/api/gemini/chat/route.ts), which calls the real Gemini endpoint when
`GEMINI_API_KEY` is set and otherwise falls back to deterministic multilingual replies, so the
widget never breaks. Suggested prompts, a 6-language toggle and product/store result cards are
included.

---

## API routes

| Route | Purpose |
| --- | --- |
| `POST/GET /api/orders` | Create and list orders (Supabase-backed, demo fallback) |
| `POST/PUT/PATCH /api/razorpay/order` | Create order, verify signature, refund |
| `POST /api/gemini/chat` | Assistant completions with catalogue grounding |
| `GET /api/maps/distance` | Distance matrix (Google fallback to Haversine) |

---

## Database

[`supabase/schema.sql`](supabase/schema.sql) defines enums, tables (profiles, stores, products,
inventory, addresses, orders, order items, riders, delivery requests, payouts, notifications),
indexes, **Row Level Security** policies for all three roles, a `handle_new_user()` trigger that
auto-creates profiles on Firebase signup, and a `nearby_stores()` helper function.

---

## Responsive behaviour

Mobile-first single-column layouts. Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280`.
Product grids go 2 → 3 → 4 wide; dashboards swap the bottom tab bar for a persistent left sidebar
at `lg`.

Every list — search results, cart, orders, inventory, deliveries — renders a **designed empty
state** rather than a blank page, using the exact copy from the product guidelines.

---

## Scripts

```bash
npm run dev         # development server
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

---

## Project structure

```
nearnest/
├── src/
│   ├── app/
│   │   ├── (storefront)/     # light surface: home, product, cart, checkout, order
│   │   ├── seller/            # dark operator dashboard
│   │   ├── partner/           # NearNest Express portal
│   │   ├── login/ register/ onboarding/
│   │   └── api/               # orders, razorpay, gemini, maps
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── brand/             # logo marks
│   │   ├── auth/ operator/ storefront/ onboarding/ ai/ shared/
│   ├── hooks/                 # auth, cart, preferences
│   ├── lib/                   # constants, validation, i18n, firebase, supabase, ai
│   └── middleware.ts
├── supabase/schema.sql
└── .env.example
```

---

## Deployment

Import the repository into Vercel and add the environment variables from
[`.env.example`](.env.example). No additional configuration is required — `next.config.mjs`
already whitelists the Cloudinary and Unsplash image hosts used for optimised product imagery.
