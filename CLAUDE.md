# LK Machinery India — Project Briefing (CLAUDE.md)

## What this project is

Rebuild of lkmachinery.co.in for L.K. Machinery India Pvt. Ltd. (industrial machinery manufacturer — die casting, injection molding, CNC, automation). Built from an approved Figma design. Currently in active development, hosted on Vercel (not yet on the production domain).

## Stack

* Next.js (App Router), TypeScript, Tailwind CSS v4 (CSS-first config — tokens live in `app/globals.css` under `@theme`, NOT in `tailwind.config.ts` which is kept only as a documented reference)
* Fonts: Arial (system font, no web-font loading needed) for headings, Inter (via `next/font/google`) for body/titles — confirmed directly from Figma's typography inspector, do not reintroduce Archivo Black or any other font
* Hosting: Vercel
* Repo: `Ravi-1608/lkmachinery.co.in` on GitHub

## Project structure

```
/app
  /(marketing)/about, /contact, /investor-relations, /careers
  /products/page.tsx, /products/[category]/page.tsx, /products/[category]/[model]/page.tsx
  /applications/[slug]/page.tsx
  /blogs/page.tsx, /blogs/[slug]/page.tsx
/components
  /layout (Header, Footer)
  /home (Hero, CategoryBand, WelcomeSection, ApplicationsStrip, QuickLinks, CtaBand, ClientLogos)
  /product (SpotlightCard, ProductCard, TagPill, DcmFilterGrid)
  /forms (EnquiryForm)
/data
  products.json — 27 real, verified machine models across DCM/IMM/CNC/Automation
  applications.json — 6 industry application pages
  content.json — blog/news/article example content
/lib
  products.ts, applications.ts, content.ts — typed data-access helpers
  seo.ts — structured data (JSON-LD) generators
```

## Critical rule: real content only, never fabricate

This project had a serious incident where a homepage draft shipped with entirely invented product names and fake technical specs before being caught. Since then, every piece of content has been verified against either:

1. The original Figma export screenshots, or
2. lk.world (the parent company's live site — used to verify/correct several Figma placeholder errors, e.g. Potenza A's tonnage was wrong in Figma and corrected from the live site)

Never invent product names, specs, client names, testimonials, or statistics. If content is genuinely missing, flag it explicitly (the existing pattern uses a `note` field in JSON data for internal flags, or clearly-bracketed placeholder text like `[Event Name]` for template content) rather than filling gaps with plausible-sounding fiction.

## Key real data (do not treat as placeholder)

* 10 real client logos with permission to display, in `public/images/clients/`: AEL (Aurangabad Electricals, formerly CIE), Sigma Engineered Solutions, OMR Bagla, Uno Minda, Oswal Industries, Godrej, Nemak, Hindware, Super Auto India, Suvarna Alloys
* Real contact info: Phone +91 8888718587, Email avinash@lkmachinery.co.in, Address: Plot No. PAP K-5 & K-6, Chakan MIDC, Phase II, Village-Khalumbre, Tal-Khed, Pune-410501
* Real social links: LinkedIn `linkedin.com/company/lk-machinery-india-pvt-ltd` (NOT any `/admin/` path), Facebook `facebook.com/profile.php?id=61564740759926`, Instagram `instagram.com/lkmi_pvt_ltd`, WhatsApp `wa.me/918888718587`
* LK India incorporated 2012 (verified via MCA record, CIN U29253PN2012FTC144876) — distinct from parent LK Group's 1979 founding. Never blur these two facts together.
* Lead capture: enquiry form posts directly to vtiger CRM's native Web-to-Lead endpoint (`https://lkmachineryindiapvt.od2.vtiger.com/modules/Webforms/capture.php`) — this is intentional, not a placeholder. The hidden field name is `cf_leads_cfleadsproductinterested` (note the odd doubled "cfleads" — this is vtiger's own auto-generated field name, must match exactly or the mapping silently fails).
* The enquiry form intentionally has no file-upload/attachment control, even though the Figma design shows one on the Contact page — vtiger's native Web-to-Lead endpoint handles file attachments poorly, so this was a deliberate scope decision, not a gap or bug. Do not add a file upload field and do not flag its absence as a QA finding.

## Current known issue (why this handoff is happening)

The homepage's Products section (`components/home/CategoryBand.tsx`) is supposed to implement a sticky-stack scroll animation: each category band (DCM/IMM/CNC/AUTOMATION) should pin under the header while the user scrolls, then the next band slides up and visually covers it (rounded top corners create a "card stack" effect), repeating through all 4 categories.

This has gone through multiple fix attempts that each solved one layer of the problem but not the whole thing:

1. Added rounded top corners (`rounded-t-[48px]`) — done, working
2. Fixed wrapper height so sticky has scroll room to pin (`minHeight: 180vh` on wrapper, sticky child at `min-h-screen`) — done, working
3. Removed `height: 100%` from `<html>` which was breaking `position: sticky` entirely — helped, but not fully
4. Removed `overflow-x-clip` from `<html>` (it was silently forcing `overflow-y: auto` per CSS spec, re-breaking sticky) and fixed the actual horizontal-overflow source (mobile drawer) instead of masking it at the root — this was the most recent fix

As of this handoff, it's unconfirmed whether the sticky pinning actually works correctly end-to-end — please verify by actually running the dev server and scrolling through the Products section yourself, not just reading the code. If it's still broken, consider that there may be an entirely different root cause not yet found (check for any remaining `overflow`, `transform`, `filter`, or `contain` properties on ancestors of `CategoryBand`, including inside `Header.tsx` given its `fixed` positioning and mobile drawer logic).

The founder has requested this specific section be rewritten in plain CSS (not Tailwind utilities) so it's directly editable without Tailwind knowledge — see the "plain CSS" note above.

## Design reference

Original Figma file: https://www.figma.com/design/0y2ZOICdljfIinwkQNezrF/LK-Machinery-Design?node-id=0-1&t=Drce6p9LZ5vRxrwg-1. If Figma access isn't set up for you, ask the founder for exported PNG screenshots of specific pages/sections as needed — this has been the working pattern throughout the project so far.

Verified brand tokens (from Figma, sampled/inspected directly — do not guess new values)

* Red: `#DB0A2A`
* Dark: `#242222` / `#3D3A3A` (category band dark variant)
* Grey: `#A3A3A3` (category band light variant — NOT `#F3F2F0` off-white, that was a past bug)
* Off-white: `#F3F2F0`

## Workflow notes

* All deployment is via Vercel, connected to the `main` branch on GitHub
* Always run `npm run build` before considering a task done
* For anything involving scroll/interaction behavior, test by actually scrolling in a real browser (`npm run dev`), not just by reading the code — this project has been burned multiple times by fixes that looked correct in code but didn't work in practice
