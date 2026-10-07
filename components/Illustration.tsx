// Decorative art next to the headline: orange sun with orbit lines, soft circles and a code card.
export default function Illustration() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6 + 0.15;
    return {
      x1: 200 + 128 * Math.cos(a),
      y1: 200 + 128 * Math.sin(a),
      x2: 200 + 150 * Math.cos(a),
      y2: 200 + 150 * Math.sin(a),
    };
  });
  return (
    <svg viewBox="0 0 420 420" className="illustration" aria-hidden="true" focusable="false">
      <circle cx="200" cy="200" r="198" fill="none" stroke="#141413" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#141413" strokeWidth="1.5" />
      <circle className="sun" cx="200" cy="200" r="118" fill="#D97757" />
      {ticks.map((t, i) => (
        <line key={i} {...t} stroke="#141413" strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle cx="345" cy="88" r="50" fill="#BCD1CA" />
      <circle cx="40" cy="92" r="32" fill="#CBCADB" />
      <circle cx="355" cy="318" r="22" fill="#D4A27F" />
      <g className="spark" stroke="#141413" strokeWidth="3" strokeLinecap="round">
        <line x1="104" y1="40" x2="128" y2="40" />
        <line x1="116" y1="28" x2="116" y2="52" />
        <line x1="107" y1="31" x2="125" y2="49" />
        <line x1="125" y1="31" x2="107" y2="49" />
      </g>
      <g transform="translate(70 210) rotate(8)">
        <rect x="6" y="10" width="170" height="170" rx="30" fill="#141413" opacity="0.18" />
        <rect width="170" height="170" rx="30" fill="#141413" />
        <text
          x="85"
          y="102"
          textAnchor="middle"
          fontFamily="ui-monospace, Menlo, monospace"
          fontWeight="700"
          fontSize="58"
          fill="#F0EEE6"
        >
          {"</>"}
        </text>
      </g>
    </svg>
  );
}
