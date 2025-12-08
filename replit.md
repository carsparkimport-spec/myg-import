# Overview

MYG Import is a Next.js-based web application for a Luxembourg-based Japanese vehicle import business. The platform provides a bilingual (French/English) storefront showcasing vehicles, import process information, pricing simulation, and legal documentation. The application focuses on transparency and customer education throughout the import journey.

**IMPORTANT**: This site is synchronized with GitHub repository `carsparkimport-spec/myg-import`. All data changes (vehicles, translations) should be made on GitHub and will be reflected automatically on the site.

# Recent Changes

**December 8, 2025**: Full Git synchronization with GitHub repository
- Performed `git reset --hard origin/main` to sync all code from GitHub
- Recreated GitHub integration files for data synchronization:
  - `src/lib/github.ts` - GitHub API client using Replit's GitHub connector
  - `src/app/api/vehicles/route.ts` - Vehicles API endpoint
  - `src/app/api/translations/route.ts` - Translations API endpoint
- Updated I18nProvider with `tObject()` function and GitHub sync
- Updated stock page and vehicle detail page to fetch from GitHub API
- Changed port from 5050 to 5000 for Replit compatibility
- To sync future code changes: run `git fetch origin && git reset --hard origin/main && npm install`

**October 27, 2025**: Migrated from Vercel to Replit
- Updated Next.js dev server configuration to bind to 0.0.0.0:5000 for Replit compatibility
- Configured `allowedDevOrigins` in next.config.ts to use REPLIT_DEV_DOMAIN environment variable
- Set up Replit workflow for development server
- Configured deployment settings for Replit autoscale publishing
- Project now runs cleanly on Replit with no cross-origin warnings
- Fixed all React Hook dependency warnings in simulator page by converting functions to useCallback
- Fixed Suspense boundary issue in CGV page for useSearchParams
- Fixed auction sheet image path on blog page (changed .jpeg to .jpg extension to match actual file)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Next.js 15.2.4 with App Router, TypeScript, and React 19
- Server and client components are strategically separated
- Server components handle data fetching and static content
- Client components manage interactivity and state (language switching, forms, galleries)

**Styling**: Tailwind CSS v4 with custom design tokens
- CSS variables for theming (`--background`, `--foreground`)
- Custom font loading via `next/font` (Inter, Roboto Mono, Oswald, Antonio)
- Responsive design with mobile-first approach

**Internationalization (i18n)**:
- Custom client-side i18n system with locale provider pattern
- Two locales supported: French (default) and English
- Translation keys stored in JSON format (`src/i18n/locales/`)
- Alternative i18n implementation exists in `src/components/i18n/` with TypeScript message files
- Language preference persisted via cookies and URL query parameters
- URL-based locale switching with query string `?lang=en|fr`

**Routing Strategy**:
- File-based routing via Next.js App Router
- Key pages: home (`/`), stock (`/stock`), vehicle details (`/voiture/[id]`), import process (`/importation`), simulator (`/simulateur`), about (`/a-propos`), blog (`/blog`), contact (`/contact`), terms (`/cgv`)
- Dynamic routes for individual vehicle pages with static data source

**State Management**:
- React Context API for i18n state (locale and translations)
- Local component state with `useState` for UI interactions
- No global state management library (Redux, Zustand) used
- Server-side data fetching for static content

## Data Architecture

**Vehicle Data**:
- Static JSON file (`src/data/vehicles.json`) serves as data source
- No database implementation currently
- Vehicle schema includes: id, make, model, year, mileage, fuel, transmission, price, description, images, details, featured flag
- Images stored in public directory with path references in JSON

**Content Management**:
- Legal documents (CGV) stored as Markdown or DOCX files in `public/cgv/`
- Locale-specific files: `public/cgv/{type}/{locale}.md|docx`
- Server-side parsing of Markdown with section extraction
- Client-side DOCX parsing using Mammoth.js library for rich text extraction

**Images & Assets**:
- Static assets in `public/` directory
- Vehicle images organized by model: `/images/vehicles/{make-model}/{number}.jpeg`
- Background images for hero sections and page backgrounds
- Next.js Image component for optimization

## API Routes

**Exchange Rate API** (`/api/fx`):
- Fetches JPY/EUR conversion rates
- Primary source: XE.com API (requires `XE_ACCOUNT_ID` and `XE_API_KEY` env vars)
- Fallback to European Central Bank (ECB) API for historical rates
- Window-based averaging (1-30 days) for rate stability
- Edge-compatible with `force-dynamic` export

**CGV API** (`/api/cgv`):
- Serves legal terms and conditions
- Supports two document types: 'import' and 'sale'
- Returns parsed sections with id, title, and body
- Markdown-first with DOCX fallback
- Server-side text parsing for Article-based section splitting

## Component Architecture

**Layout Components**:
- Root layout wrapper with font loading and i18n provider
- Reusable `Layout` component with header, navigation, and footer
- Fixed header with logo, navigation, language switcher, and CTA
- Responsive navigation with mobile menu support

**UI Components**:
- `VehicleCard`: Grid-based vehicle listing with image, specs, and price
- `VehicleGallery`: Image carousel with lightbox, keyboard navigation, and touch gestures
- `VehicleDetailsCard`: Dynamic details table with special formatting for options lists
- `LanguageSwitcher`: Toggle between FR/EN with visual active state
- `Navigation`: Active route highlighting with translated labels

**Feature-Specific Components**:
- Simulator page: Complex form with budget/auction toggle, country selection, port selection, fee calculations
- Blog page: Educational content about auction sheets with visual annotation guide
- Contact page: Contact form with business information and hours

## Third-Party Integrations

**Document Processing**:
- Mammoth.js for DOCX to HTML/text conversion
- Browser-only usage for client-side document rendering
- Type definitions in `src/types/mammoth-browser.d.ts`

**External APIs**:
- XE.com Currency API for real-time forex rates (optional, requires credentials)
- European Central Bank (ECB) API as fallback for historical exchange rates
- Both APIs cached/rate-limited to manage costs and performance

## Development & Deployment

**Build Configuration**:
- TypeScript with strict mode enabled
- Next.js with Turbopack for faster development builds
- Server binds to 0.0.0.0:5000 for Replit proxy compatibility
- `allowedDevOrigins` configured to use REPLIT_DEV_DOMAIN for iframe proxy support

**Environment Variables**:
- `REPLIT_DEV_DOMAIN`: Dynamically whitelisted origin for Replit's development iframe proxy
- `XE_ACCOUNT_ID` & `XE_API_KEY`: Optional credentials for premium forex data (not currently set)

**Deployment**:
- Currently deployed on Replit with autoscale deployment target
- Build command: `npm run build`
- Production command: `npm run start` (binds to 0.0.0.0:5000)
- Static generation possible for most pages
- API routes run as serverless functions
- Image optimization handled by Next.js

## Key Architectural Decisions

**Why Static JSON over Database**:
- Small vehicle inventory (currently 1 vehicle)
- Simplifies deployment without database dependencies
- Easy content updates via file commits
- Future migration path to Postgres/Drizzle possible when scale requires

**Why Custom i18n over Library**:
- Lightweight implementation for just 2 locales
- Full control over translation loading and caching
- Avoids dependency bloat for simple use case
- Trade-off: Manual implementation vs. library features

**Why Dual i18n Implementations**:
- Legacy `src/i18n/` with JSON files
- Newer `src/components/i18n/` with TypeScript modules
- Inconsistency suggests migration in progress
- TypeScript approach provides better type safety and IDE support

**Why Client-Side Document Parsing**:
- Mammoth.js runs in browser to avoid server-side binary dependencies
- Reduces server load for infrequent CGV access
- Trade-off: Larger client bundle vs. simpler server deployment

**Why Multiple Font Families**:
- Brand differentiation with custom typography
- Oswald/Antonio for headings (bold, impactful)
- Inter for body text (readable, modern)
- Roboto Mono for technical/code content
- Google Fonts integration for performance