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
- Live site: saved to a Google Sheet through `SUBSCRIBE_WEBHOOK_URL` (Apps Script in `google-apps-script.js`).
- Local dev without env vars: saved to `data/subscribers.csv` (git-ignored).
- Never log or commit real subscriber emails. Never commit `.env.local`.

## Rules
- Run `npm run build` after changes and fix any errors before saying you're done.
- Keep the page fast and simple: no new dependencies unless I ask.
- Check the page on mobile width (390px) when you change layout.
- I'm in Spain (EU): keep the "Free. No spam. Unsubscribe anytime." note and remind me about a privacy page before launch.
