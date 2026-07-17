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
    // Active section = the last one whose top has scrolled above a line just
    // below the fixed nav. Measuring near the top (not the viewport center)
    // keeps "home" active at scrollY 0 even though the hero is shorter than
    // half the viewport, and it updates on every scroll tick.
    const onScroll = () => {
      const line = 120; // px below the top, roughly under the fixed nav bar
      let current = sections[0]?.id ?? "home";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      // At the very bottom the last section may be too short to reach the line.
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
