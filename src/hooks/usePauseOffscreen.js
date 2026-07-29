import { useEffect, useRef } from "react";

/* Pauses an autoplaying <video> while it is off-screen (too many playing
   videos choke mobile devices). Attach the returned ref to the video. */
export default function usePauseOffscreen() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
