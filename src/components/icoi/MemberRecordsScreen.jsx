import { useEffect, useRef, useState } from "react";

/* Member Records screen for the walkthrough laptop: the two Figma frames
   "Member Detail (Individual) - 1 / - 2" (two scroll states of one page)
   stitched into a single 1224x1254 content strip. Sidebar and page header are
   fixed crops, the content scrolls under them, exactly like the shipped app.
   Laid out at the design's native 1440x1024 and scaled to fit the screen. */

const APP = "/work/icoi/app/";

export default function MemberRecordsScreen() {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden">
      <div
        className="flex bg-[#F5F5F6]"
        style={{ width: 1440, height: 1024, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }}
      >
        <img alt="" aria-hidden src={APP + "member-sidebar-2x.webp"} className="h-[1024px] w-[216px] flex-none" />
        <div className="flex min-w-0 flex-1 flex-col">
          <img alt="" aria-hidden src={APP + "member-header-2x.webp"} className="h-[115px] w-[1224px] flex-none" />
          <div className="min-h-0 flex-1 overflow-y-auto" aria-label="Member record for Ahmad Hassan, scrollable">
            <img
              alt="Member record showing admin memo, personal information, membership details, digital membership card, recent activity, and family members"
              src={APP + "member-content-2x.webp"}
              className="block h-auto w-[1224px] max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
