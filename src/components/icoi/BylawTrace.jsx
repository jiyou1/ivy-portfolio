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

function Excerpt({ cite, children }) {
  return (
    <div className="my-8 max-w-[640px] rounded-r-xl border border-l-[3px] border-stroke border-l-ink bg-white px-7 py-6">
      <span className="mb-3 block font-plex text-[12px] font-semibold tracking-[0.06em] text-ink">
        {cite}
      </span>
      <p className="m-0 text-[15px] italic text-legal">{children}</p>
    </div>
  );
}

export default function BylawTrace({ excerpts, means }) {
  return (
    <>
      {excerpts.map((e, i) => (
        <Excerpt key={e.cite ?? i} cite={e.cite}>
          {e.quote}
        </Excerpt>
      ))}
      {/* means-arrow: pulled up under the excerpt, indented to align with its text */}
      <div className="mb-8 -mt-4 flex max-w-[640px] items-baseline gap-3 pl-8">
        <span className="shrink-0 font-plex font-semibold text-blue">→</span>
        <p className="m-0 text-[15px] text-ink">{means}</p>
      </div>
    </>
  );
}
