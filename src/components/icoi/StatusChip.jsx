/* Status chip (DESIGN.md §4). Colors come strictly from the semantic status ramp;
   never mix stops across ramps. Used inline in prose and in the verdict table. */
const RAMP = {
  active: "st-good",
  voting: "st-info",
  suspended: "st-warn",
  terminated: "st-bad",
  honorary: "st-hon",
};

export default function StatusChip({ status, children }) {
  const c = RAMP[status] ?? "st-info";
  return (
    <span
      className="inline-block rounded-md border font-plex text-[11px] font-semibold uppercase tracking-[0.08em]"
      style={{
        color: `var(--color-${c})`,
        borderColor: `var(--color-${c}-border)`,
        background: `var(--color-${c}-fill)`,
        padding: "3px 10px",
        verticalAlign: "1px",
      }}
    >
      {children}
    </span>
  );
}
