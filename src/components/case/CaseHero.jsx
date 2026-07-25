import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CaseVideo from "./CaseVideo";

/* Generic split case-study hero. Left column carries the optional logo (small,
   native colors, above the eyebrow, hidden cleanly if the file is absent), the
   mono eyebrow, the serif H1, the lede, and the credibility pills. Right column
   is a 2-up mono metadata grid. The hero media (a CaseVideo) sits large as a
   full-width band directly under the two columns, the placement the ICOI hero
   already uses, so no existing component needs to bend to fit. */
export default function CaseHero({ logo, eyebrow, title, lede, pills = [], meta = [], media }) {
  const [logoOk, setLogoOk] = useState(true);
  const reduce = useReducedMotion();
  return (
    <header className="pt-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1 items-start gap-16 min-[880px]:[grid-template-columns:1.2fr_1fr]"
      >
        <div>
          {logo && logoOk && (
            <img
              src={logo}
              alt=""
              onError={() => setLogoOk(false)}
              className="mb-5 h-10 w-auto"
            />
          )}
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-blue-text">{eyebrow}</span>
          <h1 className="mt-4 font-instrument text-[clamp(44px,6.5vw,76px)] font-normal leading-[1.04] tracking-[-0.015em]">
            {title}
          </h1>
          <p className="mt-8 max-w-[560px] text-[18px] leading-[1.6] text-prose">{lede}</p>
          {pills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {pills.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-stroke bg-white px-3.5 py-1.5 font-mono text-[12px] text-ink"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        <dl className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2 sm:gap-x-8">
          {meta.map(({ label, value }) => (
            <div key={label}>
              <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-grayt">{label}</dt>
              <dd className="max-w-[260px] text-[14px] leading-[1.5]">{value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {media && (
        <CaseVideo
          eager
          feather={media.feather}
          sources={media.sources}
          poster={media.poster}
          label={media.label}
          className="mt-6 aspect-[16/10]"
        />
      )}
    </header>
  );
}
