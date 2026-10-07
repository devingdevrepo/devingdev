# Deving Dev website

One-page Next.js site for devingdev.com. Its only goal right now is collecting newsletter emails.

## About me
- I'm Massin, a software developer and YouTuber. Brand name: "Deving Dev".
- Explain things simply and step by step. Tell me exactly what to click when I need to do something outside the code (Google, Vercel, DNS).

## Stack
- Next.js (App Router) + TypeScript, plain CSS in `app/globals.css` (no Tailwind).
- Fonts: Lora (serif headings) and Poppins (body), loaded with `next/font/google` in `app/layout.tsx`.
- Text and links to edit: `app/page.tsx` and `site.config.ts`.

## Brand style (keep it consistent)
- Colors: cream `#F0EEE6` background, ink `#141413` text, clay orange `#D97757` accent, plus soft sage `#BCD1CA`, lavender `#CBCADB`, tan `#D4A27F`.
- Serif headlines, sans-serif body, rounded pill buttons, calm and warm feel. No neon, no gradients.
- Logo: the walnut split by a slash with `<` and `>` (`components/WalnutLogo.tsx`, `public/icon.svg`).

## Email sign-ups
- Form: `components/SignupForm.tsx` posts to `app/api/subscribe/route.ts`.
- Saved to Upstash Redis through its REST API (plain `fetch`, no SDK): hash `subscribers`, field = email, value = JSON with `subscribedAt`, `source`, `consent`. `HSETNX` skips duplicates.
- Env vars: `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (or Vercel's `KV_REST_API_URL` / `KV_REST_API_TOKEN`). Same database for local and live.
- New sign-ups (HSETNX result 1) trigger an email to `NOTIFY_EMAIL` via Resend's REST API, sent with `after()` so it never slows or breaks the sign-up. Optional: skipped without `RESEND_API_KEY`.
- Never store emails in files or in the repo. Never log or commit real subscriber emails. Never commit `.env.local`.

## Rules
- Run `npm run build` after changes and fix any errors before saying you're done.
- Keep the page fast and simple: no new dependencies unless I ask.
- Check the page on mobile width (390px) when you change layout.
- I'm in Spain (EU): keep the "Free. No spam. Unsubscribe anytime." note and remind me about a privacy page before launch.
