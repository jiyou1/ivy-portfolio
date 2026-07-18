import { useState } from "react";

/* Hero-meta helpers for the ICOI page: glassmorphic colored tool logos, and the
   sponsor block (logo + a short write-up). Logos are inline brand SVGs so they
   ship self-contained with accurate colors; the .glass chip (index.css) gives the
   frosted, colored-shadow tile. The sponsor mark reads a real file if present,
   else falls back to an "ICOI" monogram tile so nothing empty ships. */

const chip =
  "glass inline-flex h-7 w-7 flex-none items-center justify-center rounded-[9px] p-1";

/* ---- brand marks (viewBox-normalized, brand colors) ---- */
const Figma = () => (
  <svg viewBox="0 0 38 57" className="h-full w-auto" aria-hidden>
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
  </svg>
);
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23 23 20.46" className="h-full w-full" aria-hidden>
    <circle r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);
const Tailwind = () => (
  <svg viewBox="0 0 54 33" className="h-auto w-full" aria-hidden>
    <path
      fill="#38bdf8"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
    />
  </svg>
);
const Spring = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="#6db33f" aria-hidden>
    <path d="M21.85 2.19a10.72 10.72 0 0 1-1.24 2.16A11.96 11.96 0 1 0 3.11 20.68l.44.39a.6.6 0 0 0 .99-.35c.9-4.36 3.3-6.02 5.9-7.66 2.2-1.4 4.7-2.98 6.2-6.1.34-.7.6-1.44.77-2.2.5 2.6.02 5.35-1.5 7.86-.36.6-.77 1.14-1.2 1.64a12.4 12.4 0 0 1 .4 3.15.6.6 0 0 0 1.02.43C22.66 12.9 24.4 6.7 21.85 2.19zM6.2 17.9a1.03 1.03 0 1 1 .02-2.06 1.03 1.03 0 0 1-.02 2.06z" />
  </svg>
);
const Postgres = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="#336791" aria-hidden>
    <path d="M12 2C7.9 2 4.3 3.2 4.3 5.8v12.4C4.3 20.8 7.9 22 12 22s7.7-1.2 7.7-3.8V5.8C19.7 3.2 16.1 2 12 2zm0 1.6c3.9 0 6.1 1.1 6.1 2.2S15.9 8 12 8 5.9 6.9 5.9 5.8 8.1 3.6 12 3.6zM5.9 8.3c1.3.8 3.5 1.3 6.1 1.3s4.8-.5 6.1-1.3v2.1c0 1.1-2.2 2.2-6.1 2.2S5.9 11.5 5.9 10.4V8.3zm0 4.6c1.3.8 3.5 1.3 6.1 1.3s4.8-.5 6.1-1.3V15c0 1.1-2.2 2.2-6.1 2.2S5.9 16.1 5.9 15v-2.1zm0 4.6c1.3.8 3.5 1.3 6.1 1.3s4.8-.5 6.1-1.3v.7c0 1.1-2.2 2.2-6.1 2.2s-6.1-1.1-6.1-2.2v-.7z" />
  </svg>
);

const TOOLS = [
  ["Figma", <Figma key="f" />],
  ["React", <ReactLogo key="r" />],
  ["Tailwind", <Tailwind key="t" />],
  ["Spring Boot", <Spring key="s" />],
  ["PostgreSQL", <Postgres key="p" />],
];

export function ToolChips() {
  return (
    <ul className="flex flex-col gap-2">
      {TOOLS.map(([name, logo]) => (
        <li key={name} className="flex items-center gap-2.5 text-[14px] leading-none text-ink">
          <span className={chip}>{logo}</span>
          {name}
        </li>
      ))}
    </ul>
  );
}

export function Sponsor() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-start gap-3">
      {failed ? (
        <span className="glass flex h-11 w-11 flex-none items-center justify-center rounded-xl font-plex text-[11px] font-semibold text-blue-text">
          ICOI
        </span>
      ) : (
        <img
          src="/ICOI%20Logo.png"
          alt="Islamic Center of Irvine logo"
          onError={() => setFailed(true)}
          className="glass h-11 w-11 flex-none rounded-xl object-contain p-1.5"
        />
      )}
      <p className="max-w-[220px] text-[13px] leading-[1.5] text-prose">
The <b className="font-semibold text-ink">Islamic Center of Irvine</b>, a nonprofit mosque and
        community center in Irvine, CA.
      </p>
    </div>
  );
}
