// The Deving Dev walnut mark: a walnut split by a slash, with < and > on each half.
export default function WalnutLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="walnut-shape">
          <path d="M50 4 C78 4 96 28 96 58 C96 88 78 111 54 109 C51 108.5 49 108.5 46 109 C22 111 4 88 4 58 C4 28 22 4 50 4 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#walnut-shape)">
        <rect width="100" height="115" fill="#D4A27F" />
        <polygon points="60,0 110,0 110,115 40,115" fill="#E0B492" />
      </g>
      <path
        d="M50 4 C78 4 96 28 96 58 C96 88 78 111 54 109 C51 108.5 49 108.5 46 109 C22 111 4 88 4 58 C4 28 22 4 50 4 Z"
        fill="none"
        stroke="#141413"
        strokeWidth="5"
      />
      <line x1="59" y1="6" x2="41" y2="108" stroke="#141413" strokeWidth="5" strokeLinecap="round" />
      <polyline points="31,48 21,58 31,68" fill="none" stroke="#141413" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="69,48 79,58 69,68" fill="none" stroke="#141413" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
