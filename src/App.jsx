import { motion, useReducedMotion } from "framer-motion";

/* ---------- data ---------- */

const PROJECTS = [
  {
    slug: "icoi",
    label: "OPERATIONAL PORTAL · CLIENT PROJECT",
    title: "ICOI Membership Portal",
    desc: "End-to-end design and React build of a membership management system, delivered for a real client's daily operations with full handoff.",
    tags: "FIGMA · REACT · DESIGN SYSTEM",
    cover: "/covers/icoi.png",
    href: "/decks/icoi-poster.pdf",
    external: false,
  },
  {
    slug: "lattelearn",
    label: "PRODUCTIVITY APP · PM & DESIGN LEAD",
    title: "LatteLearn",
    desc: "A focus companion that brings the café study experience home. Led a 9-person team from concept to a packaged desktop app.",
    tags: "FIGMA · ELECTRON · PM",
    cover: "/covers/lattelearn.png",
    href: "/decks/lattelearn.pdf",
    external: false,
  },
  {
    slug: "roomietask",
    label: "UX RESEARCH · HCI PROCESS",
    title: "RoomieTask",
    desc: "Shared task coordination app designed through surveys, interviews, affinity mapping, prototyping, and moderated usability testing.",
    tags: "RESEARCH · PROTOTYPING · TESTING",
    cover: "/covers/roomietask.png",
    href: "/decks/roomietask.pdf",
    external: false,
  },
  {
    slug: "designathon",
    label: "EVENT PLATFORM · DESIGN AT UCI",
    title: "Design-a-thon",
    desc: "Website and event experience for UCI's largest student design event, serving 200+ participants with a 4-person design team.",
    tags: "FIGMA · WEB DESIGN · BRANDING",
    cover: "/covers/designathon.png",
    href: "https://ucidesignathon.devpost.com/",
    external: true,
  },
];

const BIO = [
  "I didn't start in the creative space. I started with math: the certainty of it, the way a hard problem clicks open when you find the right structure. That pull led me to computer science, and to UC Irvine's Donald Bren School of Information & Computer Sciences, where I'm finishing my B.S. in Informatics with a specialization in Human-Computer Interaction.",
  "Somewhere along the way, I realized the problems I loved most weren't purely technical. They lived at the boundary, where a system meets a person, where logic needs an artist's eye. HCI turned out to be the place where my love for art and my love for the sciences stopped competing and started compounding.",
  "I still write code. I still ship. My capstone isn't a mockup, it's a membership portal a real organization runs its daily operations on. But underneath it all, I just love to make things: designing them, building them, experimenting until something unexpected works. Math taught me precision. CS taught me to build. Design taught me to play.",
];

const DESIGN_TOOLS = ["FIGMA", "FIGJAM", "ILLUSTRATOR", "PHOTOSHOP", "FRAMER"];
const ENG_TOOLS = ["REACT", "JAVASCRIPT", "HTML/CSS", "TAILWIND", "GIT/GITHUB", "VERCEL"];

const LINKS = {
  email: "mailto:jiyoul@uci.edu",
  linkedin: "https://www.linkedin.com/in/jiyouivylee",
  resume: "/resume.pdf",
};

/* ---------- shared bits ---------- */

function SectionLabel({ children }) {
  return (
    <p className="text-[12px] font-semibold tracking-[0.14em] text-blue">{children}</p>
  );
}

function Blobs() {
  return (
    <>
      <div className="blob h-[480px] w-[480px] bg-gradient-to-br from-holo-cyan/85 to-holo-violet/40 top-[20px] right-[-120px]" />
      <div className="blob h-[320px] w-[320px] bg-gradient-to-br from-holo-pink/80 to-holo-cyan/40 top-[340px] right-[60px]" />
      <div className="blob h-[400px] w-[400px] bg-gradient-to-br from-holo-violet/80 to-holo-pink/35 top-[760px] left-[-160px]" />
      <div className="blob h-[360px] w-[360px] bg-gradient-to-br from-holo-cyan/75 to-holo-pink/35 top-[1150px] right-[-110px]" />
      <div className="blob h-[440px] w-[440px] bg-gradient-to-br from-holo-pink/75 to-holo-violet/35 top-[1900px] left-[-180px]" />
      <div className="blob h-[380px] w-[380px] bg-gradient-to-br from-holo-violet/75 to-holo-cyan/35 top-[2700px] right-[-120px]" />
      <div className="blob h-[360px] w-[360px] bg-gradient-to-br from-holo-cyan/70 to-holo-violet/35 bottom-[700px] left-[-130px]" />
      <div className="blob h-[340px] w-[340px] bg-gradient-to-br from-holo-pink/70 to-holo-cyan/35 bottom-[60px] left-[420px]" />
    </>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const items = [
    ["HOME", "#home"],
    ["ABOUT ME", "#about"],
    ["PROJECTS", "#projects"],
    ["GET IN TOUCH", "#contact"],
  ];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-10 lg:px-16">
      <div className="glass flex items-center gap-5 rounded-full px-5 py-3 sm:gap-8 sm:px-7">
        {items.map(([label, href], i) => (
          <a
            key={label}
            href={href}
            className={
              i === 0
                ? "rounded-full bg-ink px-4 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white"
                : "hidden text-[11px] font-medium tracking-[0.08em] text-ink transition-colors hover:text-blue sm:block"
            }
          >
            {label}
          </a>
        ))}
      </div>
      <a
        href={LINKS.resume}
        target="_blank"
        rel="noreferrer"
        className="glass rounded-full px-5 py-3 text-[11px] font-semibold tracking-[0.06em] text-blue transition-transform hover:-translate-y-0.5"
      >
        Link to RESUME ↗
      </a>
    </nav>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const reduce = useReducedMotion();
  return (
    <header id="home" className="relative px-5 pb-20 pt-36 sm:px-10 lg:px-16 lg:pt-44">
      <motion.img
        src="/bubble.png"
        alt=""
        aria-hidden
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="pointer-events-none absolute right-[2%] top-24 w-[300px] select-none drop-shadow-[0_24px_50px_rgba(51,89,204,0.18)] sm:w-[380px] lg:right-[6%] lg:w-[460px]"
        animate={reduce ? {} : { y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="text-[12px] font-medium tracking-[0.14em] text-grayt">
        WELCOME TO MY CREATIVE STUDIO ✳
      </p>
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mt-5 text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.03em]"
      >
        hello, i'm ivy
        <br />
        jiyou lee!
      </motion.h1>
      <p className="mt-6 max-w-xl text-lg text-grayt">
        I design in Figma. Then I open VS Code and make it real.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {["ICONIC", "INTERACTIVE", "SHIPPED"].map((w) => (
          <span
            key={w}
            className="glass rounded-full px-4.5 py-2 text-[13px] font-semibold tracking-[0.06em] text-blue"
          >
            {"{ " + w + " }"}
          </span>
        ))}
      </div>
    </header>
  );
}

/* ---------- about ---------- */

function Polaroid({ src, caption, rotate, x, y, z, fan }) {
  return (
    <motion.div
      variants={{
        rest: { rotate, x, y },
        fan: { rotate: fan.rotate, x: fan.x, y: fan.y },
      }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      style={{ zIndex: z }}
      className="absolute w-[200px] rounded-md bg-white p-3 pb-2 shadow-[0_16px_30px_rgba(26,46,102,0.22)] sm:w-[230px]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-[3px] bg-imgbg">
        <img
          src={src}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="py-2 text-center font-hand text-xl text-ink">{caption}</p>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
        <motion.div
          initial="rest"
          whileHover="fan"
          whileTap="fan"
          className="relative mx-auto h-[420px] w-[340px] shrink-0 sm:w-[420px]"
          aria-label="Photos of Ivy"
        >
          <Polaroid src="/polaroid3.jpg" caption="irvine, ca" rotate={-9} x={0} y={60} z={1} fan={{ rotate: -16, x: -56, y: 36 }} />
          <Polaroid src="/polaroid2.jpg" caption="likelion days ☆" rotate={8} x={120} y={40} z={2} fan={{ rotate: 16, x: 186, y: 16 }} />
          <Polaroid src="/polaroid1.jpg" caption="ivy ☺ 2026" rotate={-2} x={60} y={100} z={3} fan={{ rotate: 0, x: 64, y: 120 }} />
        </motion.div>

        <div className="max-w-2xl">
          <SectionLabel>01 — ABOUT ME ☺</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
            Designer who ships.
          </h2>
          {BIO.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 leading-[1.7] text-ink/90">
              {p}
            </p>
          ))}

          <p className="mt-8 text-[11px] font-semibold tracking-[0.12em] text-grayt">DESIGN</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {DESIGN_TOOLS.map((t) => (
              <span key={t} className="glass rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.08em]">{t}</span>
            ))}
          </div>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.12em] text-grayt">ENGINEERING</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {ENG_TOOLS.map((t) => (
              <span key={t} className="glass rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.08em]">{t}</span>
            ))}
          </div>

          <p className="mt-10 text-[11px] font-semibold tracking-[0.12em] text-grayt">FIND ME</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><span className="mr-3 font-semibold text-blue">LinkedIn</span><a className="hover:text-blue" href={LINKS.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/jiyouivylee</a></li>
            <li><span className="mr-3 font-semibold text-blue">Email</span><a className="hover:text-blue" href={LINKS.email}>jiyoul@uci.edu</a></li>
            <li><span className="mr-3 font-semibold text-blue">Resume</span><a className="hover:text-blue" href={LINKS.resume} target="_blank" rel="noreferrer">PDF download ↓</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- works ---------- */

function WorkCard({ p }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      whileHover={reduce ? {} : { y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass group block rounded-[28px] p-6"
    >
      <div className="relative aspect-[592/360] overflow-hidden rounded-2xl border border-imgbg bg-white">
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-[0.06em] text-blue">
          COVER — {p.title.toUpperCase()}
        </span>
        <motion.img
          src={p.cover}
          alt={p.title + " cover"}
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-5 text-[10.5px] font-medium tracking-[0.12em] text-grayt">{p.label}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-[-0.01em]">{p.title}</h3>
      <p className="mt-3 text-[14px] leading-[1.55] text-ink/90">{p.desc}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[9.5px] font-semibold tracking-[0.08em] text-blue">{p.tags}</span>
        <span className="rounded-full bg-blue px-4 py-2 text-[10.5px] font-semibold tracking-[0.06em] text-white transition-transform group-hover:-translate-y-0.5">
          VIEW ↗
        </span>
      </div>
    </motion.a>
  );
}

function Works() {
  return (
    <section id="projects" className="relative px-5 py-20 sm:px-10 lg:px-16">
      <SectionLabel>02 — SELECTED WORKS</SectionLabel>
      <h2 className="mt-3 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
        Designed, built, and shipped.
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <WorkCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  const buttons = [
    ["EMAIL", LINKS.email, true],
    ["LINKEDIN", LINKS.linkedin, false],
    ["RESUME ↓", LINKS.resume, false],
  ];
  return (
    <section id="contact" className="relative px-5 py-28 text-center sm:px-10">
      <SectionLabel>03 — GET IN TOUCH ✉</SectionLabel>
      <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
        I'm looking for new opportunities.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.6] text-grayt">
        I'm always on the lookout for new opportunities to grow and learn. I love
        tackling challenges and adapting to changes as they come.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        {buttons.map(([label, href, primary]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("/") || href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className={
              primary
                ? "rounded-full bg-blue px-6 py-3 text-[11px] font-semibold tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
                : "glass rounded-full px-6 py-3 text-[11px] font-semibold tracking-[0.08em] text-ink transition-transform hover:-translate-y-0.5"
            }
          >
            {label}
          </a>
        ))}
      </div>
      <p className="mt-14 text-[11px] text-grayt">designed and built by ivy jiyou lee ☆</p>
    </section>
  );
}

/* ---------- app ---------- */

export default function App() {
  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Blobs />
      </div>
      <Nav />
      <main className="relative mx-auto max-w-[1440px]">
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>
    </div>
  );
}
