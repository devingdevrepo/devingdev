# Deving Dev: homepage

A one-page Next.js site for devingdev.com that collects newsletter emails.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The form needs the database below before it can save emails (until then it shows "not set up yet").

## Save emails (Upstash, free, about 3 minutes)

Emails are never stored in this code or on your computer. They go to a small online database, the same one for local testing and the live site.

1. Go to **console.upstash.com** and sign up (GitHub login works).
2. Click **Create Database** → type **Redis**, name it `devingdev`, pick the region closest to you (Europe), plan **Free** → **Create**.
3. On the database page, scroll to **REST API** and copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
4. Copy `.env.example` to `.env.local` and paste both values in.
5. Restart `npm run dev` and submit a test email.

**See your emails:** open your database in Upstash → **Data Browser** → key `subscribers`. Each email is listed with its sign-up date.

## Get an email when someone signs up (Resend, free)

1. Go to **resend.com** and sign up with the email where you want the alerts.
2. Click **API Keys → Create API Key**, name it `devingdev`, permission **Sending access** → **Add**, and copy the key.
3. In `.env.local` add:
   ```
   RESEND_API_KEY=the key
   NOTIFY_EMAIL=the email you signed up to Resend with
   ```
4. Add the same two values on Vercel too.

You get one email per new subscriber (not for repeats), with their address, the time and your total count. Check your spam folder the first time and mark it "Not spam".

## Put it online (Vercel)

1. Import the GitHub repository at vercel.com (Next.js is detected automatically).
2. In the project's **Settings → Environment Variables**, add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` with the same values.
3. Add your domain `devingdev.com` in **Settings → Domains** and follow the DNS steps.

## Later: moving to a newsletter tool

Export the `subscribers` key from the Upstash Data Browser and import the emails into any newsletter tool. The `subscribedAt` value is your record of when each person signed up.

## Change the text and links

- Headline, perks and footer: `app/page.tsx`
- YouTube and LinkedIn links: `site.config.ts` (leave empty to hide)
- Colors: the variables at the top of `app/globals.css`

## Privacy (you're in the EU)

Because you collect emails from people in the EU, add a short privacy page before you promote the site. Say who you are, what you collect (email and sign-up date), why (your newsletter, and later offers if you plan that), and how people can ask you to delete their data. If you plan to send sales emails, say so on the page near the form, so people know what they're signing up for. This isn't legal advice; check with a professional if you're unsure.
