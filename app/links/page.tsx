import type { Metadata } from "next";
import WalnutLogo from "@/components/WalnutLogo";
import SignupForm from "@/components/SignupForm";
import { site, links } from "@/site.config";

export const metadata: Metadata = {
  title: `${site.author} | ${site.name} links`,
  description: "All of Massin's links: YouTube, LinkedIn and the Deving Dev newsletter.",
};

const icons = {
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z" />
  ),
  web: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9h-3a15.6 15.6 0 0 0-1.3-5.6A8 8 0 0 1 18.9 11ZM12 4.1c.9 1.2 1.8 3.5 1.9 6.9h-3.8c.1-3.4 1-5.7 1.9-6.9ZM9.4 5.4A15.6 15.6 0 0 0 8.1 11h-3a8 8 0 0 1 4.3-5.6ZM5.1 13h3a15.6 15.6 0 0 0 1.3 5.6A8 8 0 0 1 5.1 13Zm6.9 6.9c-.9-1.2-1.8-3.5-1.9-6.9h3.8c-.1 3.4-1 5.7-1.9 6.9Zm2.6-1.3a15.6 15.6 0 0 0 1.3-5.6h3a8 8 0 0 1-4.3 5.6Z" />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
  ),
  mail: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.3-8-5.3ZM5.6 7 12 11.2 18.4 7H5.6Z" />
  ),
};

export default function Links() {
  return (
    <div className="links-page">
      <span className="links-dot dot-lavender" aria-hidden="true" />
      <span className="links-dot dot-sage" aria-hidden="true" />
      <span className="links-dot dot-tan" aria-hidden="true" />

      <main className="links-card">
        <div className="links-avatar">
          <WalnutLogo size={64} />
        </div>
        <h1 className="links-name">
          Deving <span className="accent">Dev</span>
        </h1>
        <p className="links-by">by {site.author} · Software developer · YouTuber</p>
        <p className="links-tagline">Building with code. Making sense of AI.</p>

        <ul className="links-list">
          {links
            .filter((l) => l.href)
            .map((l) => {
              const external = l.href.startsWith("http");
              return (
                <li key={l.label}>
                  <a
                    className="link-btn"
                    href={l.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      {icons[l.icon]}
                    </svg>
                    <span className="link-text">
                      <strong>{l.label}</strong>
                      {l.note && <span>{l.note}</span>}
                    </span>
                    <span className="link-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              );
            })}
        </ul>

        <section className="links-news" aria-labelledby="news-title">
          <h2 id="news-title">Get my emails</h2>
          <p>Short, practical emails about AI and code.</p>
          <SignupForm />
        </section>

        <p className="links-foot">
          © {new Date().getFullYear()} {site.name}
        </p>
      </main>
    </div>
  );
}
