/* Warm mesh-gradient field for the LatteLearn page — the café-toned counterpart
   of the home page's holo mesh, using the same `.blob` technique (blur(70px) on
   saturated caramel/pink blobs) so this page keeps the site's signature gradient
   DNA instead of reading flat. Distributed down the full scroll and alternating
   sides for a continuous wash. Decorative and inert; painted behind the content,
   so it never affects text contrast. */
const BLOBS = [
  "h-[560px] w-[560px] from-[#E8C88F]/80 to-[#FFB8EB]/45 top-[-60px] right-[-110px]",
  "h-[420px] w-[420px] from-[#FFB8EB]/70 to-[#E8C88F]/45 top-[520px] left-[-150px]",
  "h-[520px] w-[520px] from-[#E8C88F]/78 to-[#FFB8EB]/42 top-[1400px] right-[-120px]",
  "h-[440px] w-[440px] from-[#FFB8EB]/68 to-[#E8C88F]/45 top-[2450px] left-[-150px]",
  "h-[520px] w-[520px] from-[#E8C88F]/76 to-[#FFB8EB]/42 top-[3500px] right-[-120px]",
  "h-[440px] w-[440px] from-[#FFB8EB]/66 to-[#E8C88F]/44 top-[4600px] left-[-150px]",
  "h-[500px] w-[500px] from-[#E8C88F]/74 to-[#FFB8EB]/40 top-[5650px] right-[-110px]",
  "h-[460px] w-[460px] from-[#FFB8EB]/66 to-[#E8C88F]/44 top-[6650px] left-[-140px]",
  "h-[420px] w-[420px] from-[#E8C88F]/70 to-[#FFB8EB]/40 bottom-[40px] left-[400px]",
];

export default function CafeMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {BLOBS.map((c, i) => (
        <div key={i} className={`blob bg-gradient-to-br ${c}`} />
      ))}
    </div>
  );
}
