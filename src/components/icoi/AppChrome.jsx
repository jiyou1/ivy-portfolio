import { useEffect, useRef, useState } from "react";

/* Shared chrome for the 1:1 ICOI admin replicas (Activity Log, Member Records).
   Everything is laid out at the design's native 1440x1024 px and scaled to fit
   the walkthrough's aspect-locked laptop screen. */

export const APP = "/work/icoi/app/";

/* Measures the screen box and returns [ref, scale] where scale maps the
   1440px design space onto the box. */
export function useAppScale() {
  const ref = useRef(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, scale];
}

function SideItem({ icon, label, active }) {
  return (
    <div className={"flex w-full items-center gap-[8px] rounded-[4px] py-[8px] pl-[8px]" + (active ? " bg-[#353230]" : "")}>
      <img alt="" src={APP + icon} className="size-[24px]" />
      <p className={"whitespace-nowrap text-[14px] leading-[1.2]" + (active ? " text-[#F9F9F8]" : " text-[#D5D1CA]")} style={{ fontFamily: "Poppins", fontWeight: 500 }}>
        {label}
      </p>
    </div>
  );
}

export function AppSidebar({ active = "Dashboard" }) {
  return (
    <div aria-hidden className="flex h-full w-[216px] flex-none flex-col bg-[#111110]">
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[56px] w-full items-center gap-[8px] px-[24px] py-[4px]">
          <img alt="" src={APP + "icoi-logo.png"} className="size-[25.132px] object-contain" />
          <div className="flex flex-1 items-center justify-between">
            <p className="text-[16px] leading-[1.2] tracking-[0.8px]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
              <span className="text-[#F9F9F8]">ICOI </span>
              <span className="text-[#B6B1AB]">Admin</span>
            </p>
            <img alt="" src={APP + "arrow-line-left.svg"} className="size-[16px]" />
          </div>
        </div>
        <div className="h-px w-[192px] bg-[#353230]" />
      </div>
      <div className="mt-[32px] flex w-full flex-col gap-[2px] px-[12px]">
        <p className="pb-[4px] pl-[4px] text-[12px] leading-[1.2] tracking-[1.2px] text-[#B6B1AB]" style={{ fontFamily: "'DM Mono'", fontWeight: 500 }}>
          MAIN
        </p>
        <SideItem icon="house-line.svg" label="Dashboard" active={active === "Dashboard"} />
        <SideItem icon="file-plus.svg" label="Applications" active={active === "Applications"} />
        <SideItem icon="users-three.svg" label="Members" active={active === "Members"} />
        <SideItem icon="barcode.svg" label="QR Code Logs" active={active === "QR Code Logs"} />
      </div>
      <div className="mt-auto flex w-full flex-col gap-[2px] px-[8px]">
        <p className="pb-[4px] pl-[4px] text-[12px] leading-[1.2] tracking-[1.2px] text-[#B6B1AB]" style={{ fontFamily: "'DM Mono'", fontWeight: 500 }}>
          ADMIN
        </p>
        <SideItem icon="file-plus.svg" label="Reports" />
        <SideItem icon="gear-fine.svg" label="Settings" />
        <div className="mx-auto my-[2px] h-px w-[192px] bg-[#353230]" />
        <div className="flex w-full flex-col px-[8px] py-[16px]">
          <div className="flex w-full items-center gap-[8px]">
            <span className="flex size-[32px] items-center justify-center rounded-full bg-[#1C4966] text-[12px] leading-[1.2] text-[#F9F9F8]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
              KB
            </span>
            <div className="flex min-w-px flex-1 flex-col leading-[1.2]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
              <p className="w-full text-[14px] text-[#E6E4DF]">Karima B.</p>
              <p className="w-full text-[10px] text-[#B6B1AB]">Administrator</p>
            </div>
            <img alt="" src={APP + "dots-three.svg"} className="size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
