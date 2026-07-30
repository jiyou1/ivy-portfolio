import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Blobs from "../components/Blobs";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Works from "../components/Works";
import Contact from "../components/Contact";

export default function Home() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState(null);
  const worksHeadingRef = useRef(null);

  const handleSkill = (skill) => {
    // clicking the active skill again clears the filter (spec §5.2)
    setFilter((cur) => (cur === skill ? null : skill));
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // move focus to the works heading for screen readers, without a second scroll jump
    requestAnimationFrame(() => worksHeadingRef.current?.focus({ preventScroll: true }));
  };

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Blobs />
      </div>
      <Nav />
      <main className="relative mx-auto max-w-[1440px]">
        <Hero />
        <About onSkill={handleSkill} />
        <Works filter={filter} onClear={() => setFilter(null)} headingRef={worksHeadingRef} />
        <Contact />
      </main>
    </div>
  );
}
