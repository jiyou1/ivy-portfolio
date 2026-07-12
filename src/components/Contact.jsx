import { Envelope } from "@phosphor-icons/react";
import { Mail, Linkedin, Download } from "iconoir-react";
import SectionLabel from "./SectionLabel";
import { LINKS } from "../data/site";

export default function Contact() {
  const buttons = [
    { label: "EMAIL", href: LINKS.email, primary: true, Icon: Mail },
    { label: "LINKEDIN", href: LINKS.linkedin, primary: false, Icon: Linkedin },
    { label: "RESUME", href: LINKS.resume, primary: false, Icon: Download },
  ];
  return (
    <section id="contact" className="relative px-5 py-28 text-center sm:px-10">
      <div className="flex items-center justify-center gap-2.5">
        <SectionLabel>03 — GET IN TOUCH</SectionLabel>
        <Envelope size={20} weight="duotone" className="text-blue" aria-hidden />
      </div>
      <h2 className="mx-auto mt-4 max-w-3xl text-[2rem] font-bold tracking-[-0.02em] sm:text-[2.75rem]">
        I'm looking for new opportunities.
      </h2>
      <p className="mx-auto mt-7 max-w-xl text-[17px] leading-[1.6] text-grayt">
        I'm always on the lookout for new opportunities to grow and learn. I love
        tackling challenges and adapting to changes as they come.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        {buttons.map(({ label, href, primary, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("/") || href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className={
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-semibold tracking-[0.08em] transition-transform hover:-translate-y-0.5 " +
              (primary ? "bg-blue text-white" : "glass text-ink")
            }
          >
            <Icon width={14} height={14} strokeWidth={2} aria-hidden />
            {label}
          </a>
        ))}
      </div>
      <p className="mt-14 text-[13px] text-grayt">designed and built by ivy jiyou lee ☆</p>
    </section>
  );
}
