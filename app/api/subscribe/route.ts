import { NextResponse, after } from "next/server";

// Simple, strict-enough email check (the browser also validates the field).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Upstash Redis over its REST API (no package needed). The KV_* names are what
// Vercel sets when you connect Upstash from the Vercel dashboard.
const DB_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const DB_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

function db(command: string[]) {
  return fetch(DB_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${DB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
}

// Emails you about a new sign-up through Resend (free plan). Skipped if not configured.
// Without your own domain, Resend only sends to the address you signed up with.
async function notifyNewSubscriber(email: string, subscribedAt: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  try {
    const total = (await (await db(["HLEN", "subscribers"])).json().catch(() => ({}))) as { result?: number };
    const count = typeof total.result === "number" ? `You now have ${total.result} subscribers.` : "";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM ?? "Deving Dev <onboarding@resend.dev>",
        to: [to],
        subject: `New subscriber: ${email}`,
        text: `${email} joined the Deving Dev list.\n\nSigned up: ${new Date(subscribedAt).toUTCString()}\n${count}`,
      }),
    });
    if (!res.ok) console.error("Sign-up notification failed", res.status, await res.text());
  } catch (err) {
    console.error("Sign-up notification failed", err);
  }
}

export async function POST(req: Request) {
  let body: { email?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this field. Pretend it worked so bots move on.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!DB_URL || !DB_TOKEN) {
    console.error("Upstash is not configured (see README), so the email was not saved.");
    return NextResponse.json({ error: "Sign-ups are not set up yet. Please try again later." }, { status: 503 });
  }

  const entry = {
    email,
    subscribedAt: new Date().toISOString(),
    source: "devingdev.com",
    consent: "Joined newsletter from homepage form",
  };

  try {
    // One hash called "subscribers": field = email, value = JSON details.
    // HSETNX only writes if the email isn't there yet, so duplicates are skipped.
    const res = await db(["HSETNX", "subscribers", email, JSON.stringify(entry)]);
    const data = (await res.json().catch(() => ({}))) as { result?: number; error?: string };
    if (!res.ok || data.error) throw new Error(data.error ?? `Upstash responded ${res.status}`);
    // result 1 = new email, 0 = already subscribed. Only notify for new ones, after the reply is sent.
    if (data.result === 1) after(() => notifyNewSubscriber(email, entry.subscribedAt));
  } catch (err) {
    console.error("Failed to save subscriber", err);
    return NextResponse.json({ error: "Could not save your email. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
