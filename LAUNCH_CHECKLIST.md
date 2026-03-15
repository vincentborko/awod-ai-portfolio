# Launch Checklist (Go/No-Go)

Use this as the final release gate. Launch only when every `MUST` item is done.

## 0) MVP Launch-Now Criteria (Minimum)
Launch is allowed when all items below are checked.

### A) Absolute Blocker (`MUST`)
- [ ] `MUST` `npm run build` passes
- [ ] `MUST` `npm run lint` passes
- [ ] `MUST` No broken navigation (Home, Portfolio, Services, About, Contact, Legal)
- [ ] `MUST` Booking works (Calendly opens + bookable slots visible)
- [ ] `MUST` Contact works (`mailto:` opens with correct email)
- [ ] `MUST` Legal pages are complete (Impressum + Datenschutz)
- [ ] `MUST` No obvious placeholder/internal text visible to visitors

### B) Launch Today (`SHOULD`)
- [ ] Core copy is understandable and not repetitive
- [ ] Key media loads (hero + showreel + portfolio assets)
- [ ] Mobile menu and CTA buttons work on phone
- [ ] Production domain + HTTPS verified

### C) Can Wait Until After Launch (`POST-LAUNCH`)
- [ ] Fine-tuning wording and section structure
- [ ] Deeper SEO optimization and metadata polishing
- [ ] Advanced analytics events and dashboards
- [ ] Visual refinements and micro-interactions

### D) Fast Go/No-Go Decision
- [ ] If all `MUST` are done -> launch now
- [ ] If any `MUST` fails -> fix first, then launch

## 1) Go/No-Go Rules
- [ ] `MUST` Build passes: `npm run build`
- [ ] `MUST` Lint passes: `npm run lint`
- [ ] `MUST` No placeholder/internal text is visible to users
- [ ] `MUST` Contact + booking are working end-to-end
- [ ] `MUST` Legal pages are complete and accurate

## 2) Content & Messaging
- [ ] Headlines are clear, short, and non-repetitive
- [ ] No confusing wording, no exaggerated claims
- [ ] CTA wording is consistent across pages (`Book a Call` or agreed final text)
- [ ] No internal filenames or technical labels are shown in UI
- [ ] Video names are hidden where required (showreel/focus views)

## 3) Media & UX Quality
- [ ] All videos load and play on desktop + mobile
- [ ] Thumbnails are correct and not stretched/cropped badly
- [ ] No layout jumps or overlapping elements
- [ ] Navigation works on desktop and mobile menu
- [ ] Buttons/links have correct destinations

## 4) Booking & Contact Flow
- [ ] Calendly URL in `src/data/site.ts` is a public booking link
- [ ] Calendly widget loads and booking can be completed
- [ ] Availability and event types in Calendly are correct
- [ ] Contact email in `src/data/site.ts` is correct
- [ ] Test: user can reach you via both email and booking form

## 5) Legal & Compliance
- [ ] `src/app/impressum/page.tsx` has final legal data
- [ ] `src/app/datenschutz/page.tsx` is final and up to date
- [ ] Third-party tools used on site are reflected in privacy text
- [ ] External links in legal pages open correctly

## 6) SEO & Discoverability
- [ ] `NEXT_PUBLIC_SITE_URL` is set to production domain
- [ ] `/sitemap.xml` is accessible
- [ ] `/robots.txt` is accessible
- [ ] OpenGraph image renders correctly
- [ ] Page titles/meta descriptions are meaningful and unique

## 7) Performance & Technical QA
- [ ] Test on latest Chrome, Safari, and mobile Safari/Chrome
- [ ] No console errors on key pages
- [ ] Core pages load fast on normal mobile network
- [ ] No broken imports, missing assets, or 404 media links
- [ ] Re-run after deploy: `npm run build` locally still clean

## 8) Analytics & Monitoring
- [ ] Analytics tool connected (GA4/Plausible or chosen stack)
- [ ] At least one conversion event defined (booking click/submit)
- [ ] Basic uptime + error monitoring configured

## 9) Release Steps
- [ ] Final review in preview deployment
- [ ] Merge to production branch
- [ ] Deploy on Vercel
- [ ] Verify domain + HTTPS + redirects
- [ ] Smoke test after deploy: Home, Portfolio, Services, About, Contact, Legal

## 10) 48h Post-Launch Checks
- [ ] Check booking completions and email reachability
- [ ] Check logs for runtime/client errors
- [ ] Confirm no user-facing copy issues reported
- [ ] Submit sitemap in Google Search Console
