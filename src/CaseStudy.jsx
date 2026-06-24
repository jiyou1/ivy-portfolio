import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
            One brand, every surface — from screen to signage.
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
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">OVERVIEW</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink/90">
            Prime Academy is a test-prep academy based in Irvine, CA, offering SAT, ACT, and AP courses. The project spanned web redesign, print collateral, and in-center signage — all unified under one brand system.
          </p>
        </section>

        {/* Problem */}
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">THE PROBLEM</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink/90">
            The existing brand lacked cohesion: the website felt dated, print flyers used inconsistent layouts and colors, and in-center signage didn't match either. Parents and students encountered a different visual identity at every touchpoint.
          </p>
        </section>

        {/* Process 01 */}
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">PROCESS 01 — RESEARCH &amp; AUDIT</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink/90">
            Conducted a full brand audit across web, print, and physical signage. Catalogued every color, typeface, and layout pattern in use, then benchmarked against three competitor academies in the area.
          </p>
        </section>

        {/* Process 02 */}
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">PROCESS 02 — BRAND SYSTEM</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink/90">
            Defined a unified color palette, type scale, and component library in Figma. Created reusable templates for flyers, posters, and digital banners so future materials stay on-brand without a designer in the loop.
          </p>
        </section>

        {/* Process 03 */}
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">PROCESS 03 — DESIGN &amp; BUILD</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink/90">
            Redesigned the website with a mobile-first approach, then extended the system to print flyers and in-center signage. Every surface — screen or paper — uses the same grid, spacing, and visual language.
          </p>
        </section>

        {/* Solution screens */}
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">SOLUTION</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink/90">
            Final deliverables included a fully responsive marketing site, a suite of course flyers (SAT, ACT, AP), and animated TV signage for the Irvine learning center.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Redesigned website */}
            <div className="overflow-hidden rounded-2xl bg-imgbg">
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
            {/* TODO: Replace with real signage footage at /videos/prime-academy-signage.mp4 */}
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-imgbg text-[11px] font-semibold tracking-[0.06em] text-blue">
              SIGNAGE VIDEO — COMING SOON
            </div>
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

        {/* Iteration — Before & After */}
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">
            ITERATION — BEFORE &amp; AFTER
          </p>
          <div className="mt-8 space-y-10">
            {/* Website */}
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Website Homepage</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl bg-imgbg">
                  <p className="px-3 pt-3 text-[10px] font-semibold tracking-[0.08em] text-grayt">BEFORE</p>
                  <video
                    src="/videos/Built-in_Retina_Display.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-imgbg">
                  <p className="px-3 pt-3 text-[10px] font-semibold tracking-[0.08em] text-blue">AFTER</p>
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
              </div>
            </div>

            {/* Course Flyer */}
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Course Flyer</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-imgbg text-[11px] font-semibold tracking-[0.06em] text-grayt">
                  BEFORE — old flyer layout
                </div>
                <div className="overflow-hidden rounded-2xl bg-imgbg">
                  <p className="px-3 pt-3 text-[10px] font-semibold tracking-[0.08em] text-blue">AFTER</p>
                  <img
                    src="/images/SAT Flyer 2026 Summer.png"
                    alt="Redesigned SAT flyer"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* In-Center Signage */}
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">In-Center Signage</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-imgbg text-[11px] font-semibold tracking-[0.06em] text-grayt">
                  BEFORE — old signage
                </div>
                {/* TODO: Replace with real signage footage at /videos/prime-academy-signage.mp4 */}
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-imgbg text-[11px] font-semibold tracking-[0.06em] text-blue">
                  AFTER — COMING SOON
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Takeaways */}
        <section className="mt-20">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">TAKEAWAYS</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink/90">
            Shipping one brand across every surface taught me that consistency is a design decision you make once and enforce everywhere. The hardest part wasn't the visual work — it was getting stakeholders aligned on a single source of truth.
          </p>
        </section>

        {/* Next project */}
        <section className="mt-24 text-center">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">
            NEXT PROJECT
          </p>
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
