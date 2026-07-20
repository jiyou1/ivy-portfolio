import { useEffect, useRef, useState } from "react";

/* LatteLearn Focus screen — built 1:1 from Figma frame 625:174 (1440x1024).
   Sprites are the frame's own exports in /public/lattelearn/; the espresso
   machine sprite is replaced by the brew video (spec #3). Behaviors override
   the static frame: live countdown, draining brew bar, pausable video, CSS
   marquee. Desktop-only fixed canvas for now. */

const A = "/lattelearn/";
const SESSION = 25 * 60; // 25:00

/* pixel sprites must scale crisp, never smoothed */
const PIX = { imageRendering: "pixelated" };

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/* soft contact shadow under a sprite (Figma blurred-ellipse PNGs, redone in CSS) */
function Shadow({ x, y, w, h }) {
  return (
    <div
      aria-hidden
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        background: "radial-gradient(50% 50% at 50% 50%, rgba(28,27,25,0.4), transparent 70%)",
      }}
    />
  );
}

function TaskRow({ children }) {
  return (
    <div className="flex items-center gap-[12px]">
      <span className="size-[14px] rounded-full border-[2px] border-[#f5f0e6]/80" />
      <p className="font-['Jersey_25'] text-[16px] text-[#f5f0e6]">{children}</p>
    </div>
  );
}

/* Scales the fixed 1440x1024 screen to fill any container width (case-study
   hero + shipped centerpiece embeds). Fully interactive — the pomodoro runs. */
export function FocusEmbed({ className = "" }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={"relative w-full overflow-hidden rounded-2xl border border-stroke " + className}
      style={{ aspectRatio: "1440 / 1024" }}
    >
      {scale > 0 && (
        <div style={{ width: 1440, height: 1024, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <FocusScreen />
        </div>
      )}
    </div>
  );
}

export default function FocusScreen() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION);
  const [running, setRunning] = useState(true);
  const videoRef = useRef(null);

  // countdown — stops itself at 0
  useEffect(() => {
    if (!running || secondsLeft === 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, secondsLeft === 0]);

  // machine brews only while the timer runs
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (running && secondsLeft > 0) v.play().catch(() => {});
    else v.pause();
  }, [running, secondsLeft === 0]);

  const restart = () => {
    setSecondsLeft(SESSION);
    setRunning(true);
  };
  const skip = () => {
    setSecondsLeft(0);
    setRunning(false);
  };

  return (
    <div className="relative mx-auto h-[1024px] w-[1440px] overflow-hidden bg-white">
      {/* marquee keyframes, scoped to this screen */}
      <style>{`
        @keyframes ll-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ll-marquee { animation: ll-marquee 12s linear infinite; }
        .ll-marquee:hover { animation-play-state: paused; }
      `}</style>

      {/* backdrop — two stacked copies, as in the frame (counter strip shows below) */}
      <img src={A + "backdrop.png"} alt="" style={PIX} className="absolute left-[-86px] top-0 h-[1024px] w-[1526px] max-w-none object-cover" />
      <img src={A + "backdrop.png"} alt="" style={PIX} className="absolute left-[-86px] top-[-72px] h-[1024px] w-[1526px] max-w-none object-cover" />

      {/* contact shadows */}
      <Shadow x={100} y={872} w={430} h={16} />
      <Shadow x={1002} y={856} w={290} h={13} />
      <Shadow x={1272} y={800} w={190} h={11} />
      <Shadow x={580} y={747} w={280} h={14} />

      {/* espresso machine — the brew loop, in the sprite's exact box */}
      <video
        ref={videoRef}
        poster="/espresso-brew-poster.png"
        autoPlay
        loop
        muted
        playsInline
        // multiply knocks out the video's baked-in white bg (no alpha in either
        // export). The bg is ~253 + compression wobble, which left a faint box;
        // brightness(1.02) clips near-white to pure white BEFORE the blend so
        // the knockout is total. Swap for a yuva420p webm to drop both hacks.
        style={{ ...PIX, mixBlendMode: "multiply", filter: "brightness(1.02)" }}
        className="absolute left-[508px] top-[336px] size-[424.8px] object-cover"
      >
        <source src="/espresso-brew.webm" type="video/webm" />
        <source src="/espresso-brew.mp4" type="video/mp4" />
      </video>

      {/* counter sprites */}
      <img src={A + "pastry-case.png"} alt="" style={PIX} className="absolute left-[82px] top-[372px] size-[468.9px] max-w-none object-cover" />
      <img src={A + "plant.png"} alt="" style={PIX} className="absolute left-[1242px] top-[512px] size-[243px] max-w-none object-cover" />
      <img src={A + "caddy.png"} alt="" style={PIX} className="absolute left-[980px] top-[451px] size-[365px] max-w-none object-cover" />
      <img src={A + "menu-lamp.png"} alt="" style={PIX} className="absolute left-[26px] top-[-72px] size-[580px] max-w-none object-cover" />

      {/* menu board: tasks */}
      {/* leading-[1.15] ≈ Figma's "normal" for Jersey 25; browser normal is
          looser and pushed the list off the board */}
      <div className="absolute left-[111px] top-[118px] flex w-[409px] flex-col items-start gap-[12px] [&_p]:leading-[1.15]">
        <p className="font-['Jersey_25'] text-[30px] text-[#f5f0e6]">MY TASKS</p>
        <div className="h-[2px] w-[10px]" />
        <div className="flex items-center gap-[10px] text-[#ffb848]">
          <p
            className="font-['Jersey_25'] text-[22px]"
            style={{ textShadow: "0px 0px 14px rgba(255,184,72,0.8)" }}
          >
            MATH
          </p>
          <p className="font-['Jersey_25'] text-[16px]">· brewing</p>
        </div>
        <TaskRow>PRACTICE MIDTERM</TaskRow>
        <TaskRow>FINISH REVIEW FOR EXAM</TaskRow>
        <div className="h-[6px] w-[10px]" />
        <p className="font-['Jersey_25'] text-[22px] text-[#f5f0e6]">SCIENCE</p>
        <TaskRow>PRACTICE MIDTERM</TaskRow>
        <p className="font-['Jersey_25'] text-[16px] text-[#f5f0e6] opacity-55">+ ADD TASK</p>
      </div>

      {/* top-right buttons */}
      <button type="button" className="absolute left-[965px] top-[119px] flex items-center gap-[8px] rounded-[10px] bg-[#1c1b19] px-[20px] py-[8px]">
        <img src={A + "icon-customize.svg"} alt="" className="size-[24px]" />
        <span className="font-['Jersey_25'] text-[22px] text-[#ffb848]">CUSTOMIZE</span>
      </button>
      <button type="button" className="absolute left-[1143px] top-[119px] flex items-center gap-[8px] rounded-[10px] bg-[#1c1b19] px-[20px] py-[8px]">
        <img src={A + "icon-statistics.svg"} alt="" className="size-[24px]" />
        <span className="font-['Jersey_25'] text-[22px] text-[#f5f0e6]">STATISTICS</span>
      </button>
      <button type="button" aria-label="Sound" className="absolute left-[1320px] top-[119px] flex items-center rounded-[10px] bg-[#1c1b19] p-[9px]">
        <img src={A + "icon-sound.svg"} alt="" className="size-[22px]" />
      </button>
      <button type="button" aria-label="Settings" className="absolute left-[1368px] top-[119px] flex items-center rounded-[10px] bg-[#1c1b19] p-[9px]">
        <img src={A + "icon-settings.svg"} alt="" className="size-[22px]" />
      </button>

      {/* wordmark sign */}
      <div className="absolute left-[1174px] top-[31px] flex w-[234px] flex-col items-start gap-[6px] rounded-[12px] bg-[#1c1b19] px-[22px] py-[12px]">
        <div className="flex w-full items-center gap-[8px]">
          <img src={A + "icon-cup.svg"} alt="" className="size-[24px]" />
          <p className="font-['Jersey_25'] text-[30px] text-[#f5f0e6]">LATTE LEARN</p>
        </div>
        {/* brew underline: 10 amber segments */}
        <div className="flex h-[7px] w-full gap-[1.7px]">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="h-[7px] w-[13.3px] rounded-[2px] bg-[#ffb848]" />
          ))}
        </div>
      </div>

      {/* timer panel */}
      <div className="absolute left-[calc(50%+2px)] top-[806px] h-[201px] w-[338px] -translate-x-1/2 rounded-[16px] bg-[rgba(28,27,25,0.8)]">
        <p className="absolute left-[169px] top-[15px] w-[248px] -translate-x-1/2 text-center font-['Jersey_25'] text-[20px] text-[#f5f0e6] opacity-85">
          POMODORO
        </p>
        <p className="absolute left-[169px] top-[74.5px] w-[248px] -translate-x-1/2 -translate-y-1/2 text-center font-['Jersey_10'] text-[84px] leading-none text-[#f5f0e6]">
          {fmt(secondsLeft)}
        </p>

        {/* brew bar: time REMAINING — starts full, drains left-anchored */}
        <div className="absolute left-[46px] top-[118px] h-[12px] w-[248px] overflow-hidden rounded-[3px] bg-[rgba(245,240,230,0.16)]">
          <div
            className="absolute left-0 top-0 h-[12px] rounded-[3px] bg-[#ffb848]"
            style={{ width: `${(secondsLeft / SESSION) * 100}%`, transition: "width 1s linear" }}
          />
          {[25, 50, 74, 99, 124, 149, 174, 198, 223].map((x) => (
            <span key={x} className="absolute top-0 h-[12px] w-[2px] bg-[rgba(28,27,25,0.55)]" style={{ left: x }} />
          ))}
        </div>

        {/* controls */}
        <div className="absolute left-[85px] top-[146px] flex items-start gap-[24px]">
          <button type="button" aria-label="Restart" onClick={restart} className="relative size-[40px] rounded-full bg-[#ffb848]">
            <img src={A + "icon-restart.svg"} alt="" className="absolute left-[10px] top-[10px] size-[20px]" />
          </button>
          <button
            type="button"
            aria-label={running ? "Pause" : "Play"}
            onClick={() => secondsLeft > 0 && setRunning((r) => !r)}
            className="relative size-[40px] rounded-full bg-[#ffb848]"
            style={running ? undefined : { opacity: 0.7 }}
          >
            <img src={A + "icon-pause.svg"} alt="" className="absolute left-[10px] top-[10px] size-[20px]" />
          </button>
          <button type="button" aria-label="Skip session" onClick={skip} className="relative size-[40px] rounded-full bg-[#ffb848]">
            <img src={A + "icon-skip.svg"} alt="" className="absolute left-[10px] top-[10px] size-[20px]" />
          </button>
        </div>
      </div>

      {/* music pill: marquee, pauses on hover */}
      <div className="absolute left-[1126px] top-[956px] h-[36px] w-[282px] rounded-full bg-[#1c1b19]">
        <img src={A + "icon-music.svg"} alt="" className="absolute left-[14px] top-[8px] size-[20px]" />
        <div className="absolute left-[44px] top-0 h-[36px] w-[226px] overflow-hidden">
          <p className="ll-marquee absolute top-[9px] whitespace-nowrap font-['Jersey_25'] text-[19px] text-[#f5f0e6]">
            {"CAFÉ PLAYLIST · NOW PLAYING · CAFÉ PLAYLIST · NOW PLAYING · "}
          </p>
        </div>
      </div>
    </div>
  );
}
