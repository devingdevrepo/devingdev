import WalnutLogo from "@/components/WalnutLogo";
import Illustration from "@/components/Illustration";
import SignupForm from "@/components/SignupForm";
import { site } from "@/site.config";

const perks = [
  { title: "New AI tools, tested", text: "What's actually worth your time, tried by a real developer first." },
  { title: "Real code you can copy", text: "Small, working examples you can use the same day." },
  { title: "Honest takes, no hype", text: "What AI changes for developers, and what it doesn't." },
];

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <div className="page">
      <header className="nav">
        <a href="/" className="brand" aria-label={`${site.name} home`}>
          <WalnutLogo size={38} />
          <span className="brand-name">
            Deving <span className="accent">Dev</span>
          </span>
        </a>
        <nav className="nav-links">
          {site.youtube && (
            <a href={site.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          )}
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">by {site.author} · Software developer</p>
            <h1>
              Become the developer <em>AI can&apos;t replace.</em>
            </h1>
            <span className="rule" aria-hidden="true" />
            <p className="lead">
              Short, practical emails about AI and code, from a developer who uses both every day.
            </p>
            <SignupForm />
          </div>
          <div className="hero-art">
            <Illustration />
          </div>
        </section>

        <section className="perks" aria-label="What you'll get">
          {perks.map((p, i) => (
            <article className="perk" key={p.title}>
              <span className="perk-num">0{i + 1}</span>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer">
        <span>
          © {year} {site.name}
        </span>
        <span className="footer-note">Made with code and a lot of walnuts.</span>
      </footer>
    </div>
  );
}
