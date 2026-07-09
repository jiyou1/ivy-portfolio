/* Three violet-forward holo blobs behind the content (spec §4.1). No runtime
   filter: blur(): these are pure radial-gradients that fade to transparent, so
   they read soft without a blur filter. Decorative and inert. */
export default function CaseBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute rounded-full"
        style={{
          width: 560, height: 560, top: -120, right: -160,
          background: "radial-gradient(circle at 30% 30%, rgba(184,158,255,.55), rgba(140,222,255,.35) 60%, transparent 75%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 480, height: 480, top: "38%", left: -220,
          background: "radial-gradient(circle at 60% 40%, rgba(184,158,255,.45), rgba(255,184,235,.3) 65%, transparent 78%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 520, height: 520, bottom: -140, right: -120,
          background: "radial-gradient(circle at 40% 60%, rgba(140,222,255,.4), rgba(184,158,255,.4) 60%, transparent 76%)",
        }}
      />
    </div>
  );
}
