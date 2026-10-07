"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          // Hidden field that only bots fill in.
          company: form.get("company") ?? "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="success" role="status">
        <span className="success-icon" aria-hidden="true">✓</span>
        <div>
          <strong>You're in.</strong>
          <p>Thanks for joining. The first email is on its way soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="signup" onSubmit={onSubmit} noValidate={false}>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <div className="signup-row">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining..." : "Join the list"}
        </button>
      </div>
      {/* Honeypot: hidden from people, visible to spam bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <p className={status === "error" ? "form-note error" : "form-note"} aria-live="polite">
        {status === "error"
          ? message
          : "Free. No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
