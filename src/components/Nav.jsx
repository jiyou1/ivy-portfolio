import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparks } from "iconoir-react";

export default function Nav() {
  const items = [
    ["HOME", "#home", "home"],
    ["ABOUT ME", "#about", "about"],
    ["PROJECTS", "#projects", "projects"],
    ["GET IN TOUCH", "#contact", "contact"],
  ];
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = items
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;
    // Scrollspy via IntersectionObserver (no per-frame scroll work). A section
    // is active while it spans the band just under the fixed nav; sections are
    // contiguous, so at most two ever intersect it - take the later one.
    const inBand = new Set();
    const band = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        const current = sections.filter((s) => inBand.has(s.id)).pop();
        if (current) setActive(current.id);
      },
      { rootMargin: "-120px 0px -75% 0px" }
    );
    sections.forEach((s) => band.observe(s));
    // The last section can be too short to reach the band at max scroll;
    // treat "almost fully in view" as active (the old bottom-of-page snap).
    const last = sections[sections.length - 1];
    const bottom = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(last.id);
      },
      { threshold: 0.98 }
    );
    bottom.observe(last);
    return () => {
      band.disconnect();
      bottom.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-10 lg:px-16">
      <div
        className="glass flex items-center gap-5 rounded-full px-5 py-3 sm:gap-8 sm:px-7"
        style={{ background: "rgba(255, 255, 255, 0.7)" }}
      >
        {items.map(([label, href, id]) => {
          const isActive = active === id;
          return (
            <a
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={
                "relative rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.08em] transition-colors " +
                (isActive ? "text-white" : "text-ink hover:text-blue-text") +
                (id === "home" ? "" : " hidden sm:block")
              }
            >
              {isActive && (
                <motion.span
                  layoutId="navpill"
                  className="absolute inset-0 -z-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </a>
          );
        })}
      </div>
      <Link
        to="/playground"
        className="group glass relative isolate overflow-hidden rounded-full px-5 py-3 text-[11px] font-semibold tracking-[0.06em] text-blue-text transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_10px_28px_rgba(88,28,180,0.45)]"
      >
        {/* smooth indigo -> violet fill, revealed on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #7c3aed 100%)" }}
        />
        <span className="relative inline-flex items-center gap-1.5">
          Join my Playground
          <Sparks
            width={14}
            height={14}
            strokeWidth={2}
            aria-hidden
            className="transition-transform duration-500 group-hover:rotate-90"
          />
        </span>
      </Link>
    </nav>
  );
}
