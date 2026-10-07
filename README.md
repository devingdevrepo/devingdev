# Deving Dev: homepage

A one-page Next.js site for devingdev.com that collects newsletter emails.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. While you develop, every email you submit is saved to `data/subscribers.csv`, so you can test without any setup.

## Save emails for real (Google Sheet, free, about 5 minutes)

1. Create a new Google Sheet, for example "Deving Dev subscribers".
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete what's there and paste the code from `google-apps-script.js`.
4. Change `SECRET` to a long random text (for example, mash your keyboard for 30 characters).
5. Click **Deploy → New deployment**, choose **Web app**, set **Execute as: Me** and **Who has access: Anyone**, then **Deploy** and allow access.
6. Copy the **Web app URL**.
7. Create a file called `.env.local` (copy `.env.example`) and set:
   ```
   SUBSCRIBE_WEBHOOK_URL=the Web app URL
   SUBSCRIBE_WEBHOOK_SECRET=the same secret as in step 4
   ```
8. Restart `npm run dev` and submit a test email. It should appear in your sheet.

## Put it online (Vercel)

1. Push this folder to a GitHub repository.
2. Import it at vercel.com (Next.js is detected automatically).
3. In the project's **Settings → Environment Variables**, add `SUBSCRIBE_WEBHOOK_URL` and `SUBSCRIBE_WEBHOOK_SECRET`.
4. Add your domain `devingdev.com` in **Settings → Domains** and follow the DNS steps.

On the live site, if the webhook isn't set, the form shows a friendly "not set up yet" message instead of losing emails silently.

## Later: moving to a newsletter tool

When you're ready to send emails, export the sheet as CSV (**File → Download → CSV**) and import it into any newsletter tool. The `subscribed_at` column is your record of when each person signed up.

## Change the text and links

- Headline, perks and footer: `app/page.tsx`
- YouTube and LinkedIn links: `site.config.ts` (leave empty to hide)
- Colors: the variables at the top of `app/globals.css`

## Privacy (you're in the EU)

Because you collect emails from people in the EU, add a short privacy page before you promote the site. Say who you are, what you collect (email and sign-up date), why (your newsletter, and later offers if you plan that), and how people can ask you to delete their data. If you plan to send sales emails, say so on the page near the form, so people know what they're signing up for. This isn't legal advice; check with a professional if you're unsure.
