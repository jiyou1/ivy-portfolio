/* Dev-only TODO-SLOT marker. Any unfinished copy lives in the content file as a
   string prefixed "TODO:" and renders through here: a dashed amber outline in dev
   so it is impossible to miss, and nothing at all in a production build. This is
   the guarantee that placeholder copy can never ship looking like final copy. */
export default function Todo({ text, inline = false, className = "" }) {
  if (!import.meta.env.DEV) return null;
  const base =
    "border border-dashed border-st-warn bg-st-warn-fill font-mono text-[12px] leading-[1.5] text-st-warn";
  if (inline) {
    return <span className={`${base} rounded px-1.5 py-0.5 ${className}`}>{text}</span>;
  }
  return (
    <div className={`my-3 max-w-[640px] rounded-lg px-4 py-3 ${base} ${className}`}>{text}</div>
  );
}
