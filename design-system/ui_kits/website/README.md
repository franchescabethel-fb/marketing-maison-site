# Marketing Maison — Website UI Kit

A speculative, hi-fi recreation of the **themarketingmaison.com** website built from the brand voice + logo system. **No production site or codebase was supplied**; this kit is a designed-from-scratch interpretation of how the brand would render on the web. Use it as a starting point for actual production work — not as a snapshot of an existing site.

## Surfaces included

- **Home** — hero, the philosophy (owned vs rented), service grid, pricing strip, dispatch CTA, footer.
- **Services** — one-page detail layout for the six service lines.
- **Pricing** — three-tier comparison with footnotes.
- **Diagnosis** — the inquiry form (the brand's term for "contact us").
- **The Dispatch** — editorial blog index (newsletter / field-guide content).

Each surface is a JSX component composed inside `index.html`, which boots a tiny in-memory router so you can click between them like the real site.

## Components

- `Nav.jsx` — sticky top nav with horizontal wordmark + section links + a wine CTA.
- `Hero.jsx` — full-bleed cream hero with Cinzel eyebrow, Cormorant headline, DM Sans subhead, and primary CTA.
- `PhilosophySection.jsx` — the **Owned vs Rented** diptych — the brand's signature visual moment.
- `ServiceGrid.jsx` — six service-line cards in a 3×2 grid, each tagged with a wine eyebrow.
- `PricingStrip.jsx` — three pricing tiers; middle (Full Infrastructure) is the inverse-fill emphasis card.
- `DispatchCTA.jsx` — newsletter signup block, the brand's primary list-building moment on every page.
- `Footer.jsx` — full-bleed Mulled Wine footer, tan type, monogram top-right.
- `PageHome.jsx`, `PageServices.jsx`, `PagePricing.jsx`, `PageDiagnosis.jsx`, `PageDispatch.jsx` — full page compositions.

## Stack

Plain HTML + React 18 + Babel standalone (no build). All design tokens come from `../../colors_and_type.css`.
