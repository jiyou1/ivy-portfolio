/* The signature pair (DESIGN.md §4 / spec §4.4): one or more verbatim bylaw
   excerpts followed by exactly one "means-arrow" consequence line. The API makes
   the pairing structural: `means` is required, so an excerpt can never render
   without its consequence. Quotes are verbatim from the signed PDF; never edit
   them. Wrap the operative phrase in <Hl> for the pink bottom-half highlight. */

// bottom-half pink highlight; text stays ink, upright (not italic)
export function Hl({ children }) {
  return (
    <b
      className="font-semibold not-italic text-ink"
      style={{ background: "linear-gradient(transparent 60%, var(--color-holo-pink) 60%)" }}
    >
      {children}
    </b>
  );
}

// blue emphasis inside a means line
export function M({ children }) {
  return <b className="font-semibold text-blue-text">{children}</b>;
}

/* `glass` swaps the solid-white card for the LatteLearn frosted surface while
   keeping the structural 3px ink left-rule; ICOI leaves it off for the white
   card. Everything else (colors) resolves from CSS tokens, so the same arrow and
   type reskin per page automatically. */
/* `mono` swaps the italic legal quote for an upright mono excerpt: used by the
   generic ConstraintPair, where the excerpt is a project constraint, not a
   verbatim legal clause. `cite` is optional so a constraint can render without a
   § label. ICOI passes neither, so its excerpts are unchanged. */
function Excerpt({ cite, children, glass, wide, mono }) {
  const surface = glass
    ? "border-white/70 border-l-ink bg-white/60 backdrop-blur-xl shadow-[0_10px_30px_-14px_rgba(139,109,70,0.4)]"
    : "border-stroke border-l-ink bg-white";
  return (
    <div
      className={
        "my-8 rounded-r-xl border border-l-[3px] px-7 py-6 " +
        (wide ? "max-w-[1056px] " : "max-w-[640px] ") +
        surface
      }
    >
      {cite && (
        <span className="mb-3 block font-plex text-[12px] font-semibold tracking-[0.06em] text-ink">
          {cite}
        </span>
      )}
      {mono ? (
        <p className="m-0 font-plex text-[13px] leading-[1.6] not-italic text-ink">{children}</p>
      ) : (
        <p className="m-0 text-[15px] italic text-legal">{children}</p>
      )}
    </div>
  );
}

export default function BylawTrace({ excerpts, means, glass = false, wide = false, mono = false }) {
  return (
    <>
      {excerpts.map((e, i) => (
        <Excerpt key={e.cite ?? i} cite={e.cite} glass={glass} wide={wide} mono={mono}>
          {e.quote}
        </Excerpt>
      ))}
      {/* means-arrow: pulled up under the excerpt, indented to align with its text */}
      <div className={"mb-8 -mt-4 flex items-baseline gap-3 pl-8 " + (wide ? "max-w-[1056px]" : "max-w-[640px]")}>
        <span className="shrink-0 font-plex font-semibold text-blue">→</span>
        <p className="m-0 text-[15px] text-ink">{means}</p>
      </div>
    </>
  );
}
