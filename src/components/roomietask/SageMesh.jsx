/* Green mesh field for the RoomieTask page — the sage-leaning counterpart of
   ICOI's CaseBlobs. Three pre-softened radial gradients that fade to transparent
   (NO runtime blur filter), positioned per the Figma frame: hero top-right,
   research mid-left, reflection bottom-right. Only three color values are used —
   mint #A9E8C4 (leading), cyan #8CDEFF, soft green #BEEFD2 — plus transparent.
   Decorative and inert; painted behind the content so it never affects contrast. */
export default function SageMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* blob 1 — hero, top-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 560, height: 560, top: -120, right: -160,
          background:
            "radial-gradient(circle at 32% 32%, rgba(169,232,196,.55), rgba(140,222,255,.32) 58%, transparent 74%)",
        }}
      />
      {/* blob 2 — research, mid-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 480, height: 480, top: "34%", left: -220,
          background:
            "radial-gradient(circle at 60% 40%, rgba(169,232,196,.5), rgba(190,239,210,.34) 60%, transparent 76%)",
        }}
      />
      {/* blob 3 — reflection, bottom-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 520, height: 520, bottom: -140, right: -120,
          background:
            "radial-gradient(circle at 42% 60%, rgba(140,222,255,.4), rgba(169,232,196,.4) 58%, transparent 76%)",
        }}
      />
    </div>
  );
}
