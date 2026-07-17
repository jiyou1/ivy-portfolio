/* Judgment beats: a stack of rows, each a mono key (the surface or decision) and
   one Inter sentence stating the call I made. Hairline rules between rows keep it
   reading as a ledger of decisions, not a feature list. Generic; pass beats as
   an array of { k, p }. */
export default function JudgmentBeats({ beats = [] }) {
  return (
    <div className="my-8 max-w-[760px] overflow-hidden rounded-2xl border border-stroke bg-white">
      {beats.map((b, i) => (
        <div
          key={b.k}
          className={
            "grid grid-cols-1 gap-2 px-7 py-6 sm:grid-cols-[180px_1fr] sm:gap-6 " +
            (i > 0 ? "border-t border-stroke" : "")
          }
        >
          <span className="pt-0.5 font-plex text-[11px] uppercase tracking-[0.08em] text-blue-text">
            {b.k}
          </span>
          <p className="m-0 text-[15px] leading-[1.65] text-prose">{b.p}</p>
        </div>
      ))}
    </div>
  );
}
