import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Svg(props: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    />
  );
}

export function IconMark(props: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="mark" {...props}>
      <circle cx="16" cy="16" r="14" stroke="#d4b87a" strokeWidth="1" />
      <path d="M16 4v24" stroke="#d4b87a" strokeWidth="1.4" />
      <path d="M5 16h22" stroke="#d4b87a" strokeWidth="0.7" opacity="0.55" />
      <path
        d="M7 9c5.5 3.6 12.5 3.6 18 0"
        stroke="#d4b87a"
        strokeWidth="0.7"
        opacity="0.45"
      />
      <path
        d="M7 23c5.5-3.6 12.5-3.6 18 0"
        stroke="#d4b87a"
        strokeWidth="0.7"
        opacity="0.45"
      />
    </svg>
  );
}

export const Icons = {
  command: (p: P) => (
    <Svg {...p}>
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    </Svg>
  ),
  kyc: (p: P) => (
    <Svg {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 18c1.2-3 3.2-4.5 5-4.5S12.8 15 14 18" />
      <path d="M16 11h5M16 15h5M16 19h3" />
    </Svg>
  ),
  trade: (p: P) => (
    <Svg {...p}>
      <path d="M4 17h16l-3-6H7l-3 6z" />
      <path d="M8 11V7h8v4" />
    </Svg>
  ),
  clm: (p: P) => (
    <Svg {...p}>
      <path d="M7 4h8l4 4v12H7V4z" />
      <path d="M15 4v4h4M9 12h6M9 16h4" />
    </Svg>
  ),
  documents: (p: P) => (
    <Svg {...p}>
      <path d="M6 5h9l4 4v10H6V5z" />
      <path d="M15 5v4h4" />
    </Svg>
  ),
  integrations: (p: P) => (
    <Svg {...p}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M8.5 12H15M16.2 8.8l-6 2.4M16.2 15.2l-6-2.4" />
    </Svg>
  ),
  access: (p: P) => (
    <Svg {...p}>
      <rect x="5" y="11" width="14" height="9" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Svg>
  ),
  releases: (p: P) => (
    <Svg {...p}>
      <path d="M5 19V5h9l5 5v9H5z" />
      <path d="M14 5v5h5M8 13h6" />
    </Svg>
  ),
  support: (p: P) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5M12 16.5v.5" />
    </Svg>
  ),
  audit: (p: P) => (
    <Svg {...p}>
      <path d="M5 6h14v14H5V6z" />
      <path d="M8 4v4M16 4v4M8 12h8M8 16h5" />
    </Svg>
  ),
  sql: (p: P) => (
    <Svg {...p}>
      <path d="M4 8c0-2 3.6-3.5 8-3.5s8 1.5 8 3.5-3.6 3.5-8 3.5S4 10 4 8z" />
      <path d="M4 8v8c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V8" />
    </Svg>
  ),
  copilot: (p: P) => (
    <Svg {...p}>
      <path d="M12 4l2.2 4.6L19 11l-4.8 2.4L12 18l-2.2-4.6L5 11l4.8-2.4L12 4z" />
    </Svg>
  ),
  dossier: (p: P) => (
    <Svg {...p}>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 19c1-3.5 3-5 6-5s5 1.5 6 5" />
    </Svg>
  ),
};

export const ICON_MAP = Icons;
