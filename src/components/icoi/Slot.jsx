import { useState } from "react";

/* Asset-or-placeholder. Reads real files from /public/case/icoi/ when they exist;
   otherwise renders a labelled dashed placeholder so the page can be built and
   reviewed before Ivy delivers assets (spec §7). Placeholders never ship as
   content: a missing/broken src falls back to the Slot box. */
const MIN_H = {
  default: "min-h-[200px]",
  tall: "min-h-[420px]",
  wide: "min-h-[320px]",
  beat: "min-h-[240px]",
  photo: "min-h-[200px]",
};

export default function Slot({ src, video, alt = "", label, variant = "default", className = "", bare = false, contain = false, width, height }) {
  const [failed, setFailed] = useState(!src && !video);
  const edge = bare ? "" : "border border-stroke";
  const fit = contain ? "object-contain" : "object-cover";

  if (video) {
    return (
      <video
        src={video}
        poster={src}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full rounded-2xl ${edge} ${fit} ${className}`}
      />
    );
  }

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`w-full rounded-2xl ${edge} ${fit} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-[1.5px] border-dashed border-stroke-2 bg-imgbg ${MIN_H[variant]} ${className}`}
    >
      <span className="whitespace-pre-line px-6 text-center font-plex text-[12px] leading-[1.8] text-grayt">
        {label}
      </span>
    </div>
  );
}
