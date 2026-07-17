/* White stat band: serif numerals over mono labels, on a hairline-bordered card.
   Generic across case studies; pass an array of { value, label }. */
export default function StatStrip({ stats = [], className = "" }) {
  return (
    <div
      className={`grid grid-cols-2 gap-8 rounded-2xl border border-stroke bg-white px-8 py-10 md:grid-cols-4 ${className}`}
    >
      {stats.map(({ value, label }) => (
        <div key={label}>
          <div className="font-instrument text-[clamp(40px,6vw,56px)] leading-none text-ink">{value}</div>
          <div className="mt-3 font-plex text-[11px] uppercase leading-[1.5] tracking-[0.1em] text-grayt">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
