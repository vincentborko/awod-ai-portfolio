# Launch Checklist

## SEO
- Set production URL in `.env.local`:
  - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
- Verify:
  - `/sitemap.xml`
  - `/robots.txt`
  - OpenGraph preview image renders

## Legal
- Replace placeholder content in:
  - `src/app/impressum/page.tsx`
  - `src/app/datenschutz/page.tsx`

## Booking
- Confirm public Calendly link in `src/data/site.ts`
- Confirm event availability in Calendly dashboard

## Contact
- Confirm email in `src/data/site.ts`

## Deploy
- Install dependencies: `npm install`
- Build: `npm run build`
- Deploy on Vercel and connect domain

## Post-Launch
- Submit sitemap in Google Search Console
- Add analytics (GA4 or Plausible) when ready
