import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  PuzzlePiece,
  MagnifyingGlass,
  Swatches,
  Hammer,
  CheckCircle,
  ArrowsClockwise,
  Monitor,
  Lightbulb,
  ArrowRight,
} from "@phosphor-icons/react";

function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 text-blue">
      <Icon size={16} weight="duotone" />
      <span className="text-[12px] font-semibold tracking-[0.14em] uppercase">{children}</span>
    </div>
  );
}

function BeforeAfterPair({ label, beforeContent, afterContent }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-ink">{label}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border-2 border-ink/10 bg-imgbg">
          <p className="px-3 pt-3 text-[10px] font-semibold tracking-[0.08em] text-grayt">BEFORE</p>
          {beforeContent}
        </div>
        <div className="overflow-hidden rounded-2xl border-2 border-blue/20 bg-imgbg">
          <p className="px-3 pt-3 text-[10px] font-semibold tracking-[0.08em] text-blue">AFTER</p>
          {afterContent}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudy({ slug }) {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-clip">
      {/* top bar */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center px-5 py-4 sm:px-10 lg:px-16">
        <Link
          to="/"
          className="glass rounded-full px-5 py-3 text-[11px] font-semibold tracking-[0.06em] text-blue transition-transform hover:-translate-y-0.5"
        >
          ← Back to Home
        </Link>
      </nav>

      <main className="relative mx-auto max-w-[960px] px-5 pb-28 pt-28 sm:px-10">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">
            BRAND SYSTEM &middot; WEB &middot; PRINT &middot; SIGNAGE
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            Prime Academy
          </h1>
          <p className="mt-4 max-w-xl text-lg text-grayt">
            One brand, every surface, from screen to signage.
          </p>
          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-imgbg">
            <video
              src="/videos/Prime_New_Website.mp4"
              poster="/covers/prime-academy.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </motion.header>

        {/* Overview */}
        <section className="mt-14">
          <SectionLabel icon={Compass}>OVERVIEW</SectionLabel>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            Prime Academy is a test-prep academy based in Irvine, CA, offering SAT, ACT, and AP courses. The project spanned web redesign, print collateral, and in-center signage, all unified under one brand system.
          </p>
        </section>

        {/* Problem */}
        <section className="mt-14">
          <SectionLabel icon={PuzzlePiece}>THE PROBLEM</SectionLabel>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            The existing brand lacked cohesion: the website felt dated, print flyers used inconsistent layouts and colors, and in-center signage didn't match either. Parents and students encountered a different visual identity at every touchpoint.
          </p>
        </section>

        {/* Process 01 */}
        <section className="mt-14">
          <SectionLabel icon={MagnifyingGlass}>PROCESS 01: RESEARCH &amp; AUDIT</SectionLabel>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            Conducted a full brand audit across web, print, and physical signage. Catalogued every color, typeface, and layout pattern in use, then benchmarked against three competitor academies in the area.
          </p>
        </section>

        {/* Process 02 */}
        <section className="mt-14">
          <SectionLabel icon={Swatches}>PROCESS 02: BRAND SYSTEM</SectionLabel>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            Defined a unified color palette, type scale, and component library in Figma. Created reusable templates for flyers, posters, and digital banners so future materials stay on-brand without a designer in the loop.
          </p>
        </section>

        {/* Process 03 */}
        <section className="mt-14">
          <SectionLabel icon={Hammer}>PROCESS 03: DESIGN &amp; BUILD</SectionLabel>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            Redesigned the website with a mobile-first approach, then extended the system to print flyers and in-center signage. Every surface, screen or paper, uses the same grid, spacing, and visual language.
          </p>
        </section>

        {/* Solution: deliverables gallery */}
        <section className="mt-14">
          <SectionLabel icon={CheckCircle}>SOLUTION</SectionLabel>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            Final deliverables included a fully responsive marketing site and a suite of course flyers (SAT, ACT, AP) for the Irvine learning center.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* SAT flyer */}
            <div className="overflow-hidden rounded-2xl bg-imgbg">
              <img
                src="/images/SAT Flyer 2026 Summer.png"
                alt="SAT course flyer"
                className="h-full w-full object-cover"
              />
            </div>
            {/* ACT flyer */}
            <div className="overflow-hidden rounded-2xl bg-imgbg">
              <img
                src="/images/ACT Flyer 2026 Summer (Tabloid ver.2).png"
                alt="ACT course flyer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Iteration: Before & After */}
        <section className="mt-14">
          <SectionLabel icon={ArrowsClockwise}>ITERATION: BEFORE &amp; AFTER</SectionLabel>
          <div className="mt-8 space-y-10">
            {/* Website */}
            <BeforeAfterPair
              label="Website Homepage"
              beforeContent={
                <video
                  src="/videos/Built-in_Retina_Display.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              }
              afterContent={
                <video
                  src="/videos/Prime_New_Website.mp4"
                  poster="/covers/prime-academy.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              }
            />

            {/* Course Flyer */}
            <BeforeAfterPair
              label="Course Flyer"
              beforeContent={
                <img
                  src="/images/Prime_SAT_ACT_Flyer_Letter (1) (1).jpg"
                  alt="Old SAT/ACT flyer"
                  className="h-full w-full object-cover"
                />
              }
              afterContent={
                <img
                  src="/images/SAT Flyer 2026 Summer.png"
                  alt="Redesigned SAT flyer"
                  className="h-full w-full object-cover"
                />
              }
            />
          </div>
        </section>

        {/* Digital Signage: 0 to 1 */}
        <section className="mt-14">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-grayt">BUILT FROM SCRATCH &middot; 0 TO 1</p>
          <SectionLabel icon={Monitor}>DIGITAL SIGNAGE</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
            There was no signage before.
          </h2>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            The center had wall-mounted TVs but nothing running on them. I built the whole system from the hardware up: set up the Raspberry Pi players, handled the network and device configuration, scheduled content through the Yodeck CMS, and designed the animated graphics that now run on the lobby displays. My design doesn't just live on screens, it runs on the wall.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Process photo */}
            <figure>
              <div className="overflow-hidden rounded-2xl bg-imgbg">
                <img
                  src="/images/prime-academy-pi-setup.jpg"
                  alt="Configuring the Raspberry Pi player"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[13px] leading-relaxed text-grayt">
                Configuring the Raspberry Pi player that drives the lobby display.
              </figcaption>
            </figure>
            {/* Live signage video */}
            <figure>
              <div className="overflow-hidden rounded-2xl bg-imgbg">
                <video
                  src="/videos/prime-academy-signage.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover rounded-2xl"
                />
              </div>
              <figcaption className="mt-3 text-[13px] leading-relaxed text-grayt">
                The finished signage running in the center.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Takeaways */}
        <section className="mt-14">
          <SectionLabel icon={Lightbulb}>TAKEAWAYS</SectionLabel>
          <p className="mt-4 text-base leading-[1.75] text-ink/90">
            Shipping one brand across every surface taught me that consistency is a design decision you make once and enforce everywhere. The hardest part wasn't the visual work, it was getting stakeholders aligned on a single source of truth.
          </p>
        </section>

        {/* Next project */}
        <section className="mt-24 text-center">
          <SectionLabel icon={ArrowRight}>NEXT PROJECT</SectionLabel>
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            className="mt-4 text-2xl font-bold tracking-[-0.01em] text-ink transition-colors hover:text-blue"
          >
            View All Projects &rarr;
          </button>
        </section>
      </main>
    </div>
  );
}
