import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Simple, strict-enough email check (the browser also validates the field).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  const entry = {
    email,
    subscribedAt: new Date().toISOString(),
    source: "devingdev.com",
    consent: "Joined newsletter from homepage form",
  };

  const webhook = process.env.SUBSCRIBE_WEBHOOK_URL;

  try {
    if (webhook) {
      // Production: send to your Google Sheet (see README for the 2-minute setup).
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...entry, secret: process.env.SUBSCRIBE_WEBHOOK_SECRET ?? "" }),
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      // Apps Script always answers 200, so check its own ok flag (false means the secret didn't match).
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (result.ok !== true) throw new Error("Webhook rejected the request (check the secret)");
    } else if (process.env.NODE_ENV !== "production") {
      // Local development: save to data/subscribers.csv so you can test without any setup.
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "subscribers.csv"), `${entry.email},${entry.subscribedAt},${entry.source}\n`);
    } else {
      console.error("SUBSCRIBE_WEBHOOK_URL is not set, so the email was not saved.");
      return NextResponse.json(
        { error: "Sign-ups are not set up yet. Please try again later." },
        { status: 503 }
      );
    }
  } catch (err) {
    console.error("Failed to save subscriber", err);
    return NextResponse.json({ error: "Could not save your email. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
