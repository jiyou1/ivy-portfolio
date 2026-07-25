import { Link } from "react-router-dom";
import { HOME_PROJECTS } from "../data/projects";

/* "See next" — the other case studies as image cards, reusing the same covers
   the home grid uses. Given the current slug, shows every other home project
   (4 studies → 3 cards). Covers are authored at the home card's 592/360 ratio,
   so the same aspect crops them cleanly. */
export default function SeeNext({ current }) {
  const others = HOME_PROJECTS.filter((p) => p.slug !== current);
  if (others.length === 0) return null;

  return (
    <nav aria-label="See next" className="pt-10">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-grayt">See next</p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {others.map((p) => (
          <Link
            key={p.slug}
            to={p.href}
            className="group block overflow-hidden rounded-2xl border border-stroke bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(11,14,20,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <div
              className="relative aspect-[592/360] overflow-hidden bg-imgbg"
              style={p.thumb ? { backgroundColor: p.thumb } : undefined}
            >
              <img
                src={p.cover}
                alt={p.title + " cover"}
                loading="lazy"
                decoding="async"
                style={p.coverPosition ? { objectPosition: p.coverPosition } : undefined}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* same 30% white hover wash as the home Works cards */}
              <span className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
              {p.brewing && (
                <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] text-white">
                  STILL BREWING
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-[17px] font-bold leading-snug tracking-[-0.01em]">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-ink/70">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
