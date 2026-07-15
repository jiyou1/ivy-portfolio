import { useEffect, useState } from "react";

/* Sticky table-of-contents rail (spec §4.2). Numerals fixed in the left margin;
   scrollspy lights the active numeral (--blue-text) and reveals its label, which
   also appears on hover. Labels stay in the DOM (opacity, not display) so screen
   readers always read them. Hidden below 880px. Anchor links smooth-scroll via
   the global scroll-behavior (which reduced-motion disables). */
const ICOI_SECTIONS = [
  ["01", "context", "Context"],
  ["02", "before", "The spreadsheet"],
  ["03", "rules", "Rules → interface"],
  ["04", "log", "The audit trail"],
  ["05", "shipped", "What shipped"],
  ["06", "reflect", "Reflection"],
];

/* `sections` lets a sibling case study (LatteLearn) reuse this exact rail with a
   different set of anchors; ICOI keeps the default. Colors come from CSS tokens
   (--color-blue-text etc.), so a page that overrides those tokens reskins the
   rail for free. */
export default function Toc({ sections = ICOI_SECTIONS }) {
  const [active, setActive] = useState(sections[0][1]);

  useEffect(() => {
    const els = sections.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Contents"
      className="fixed left-16 top-1/2 z-40 hidden -translate-y-1/2 min-[880px]:block"
    >
      <ul className="flex flex-col gap-1">
        {sections.map(([n, id, label]) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-baseline gap-3 py-2"
              >
                <span
                  aria-hidden="true"
                  className={
                    "font-plex text-[11px] transition-colors " +
                    (isActive ? "text-blue-text" : "text-stroke-2 group-hover:text-blue")
                  }
                >
                  {n}
                </span>
                <span
                  aria-hidden="true"
                  className={
                    "text-[13px] tracking-[0.02em] transition-all duration-150 motion-reduce:transition-none " +
                    (isActive
                      ? "translate-x-0 text-ink opacity-100"
                      : "-translate-x-1 text-grayt opacity-0 group-hover:translate-x-0 group-hover:opacity-100")
                  }
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
