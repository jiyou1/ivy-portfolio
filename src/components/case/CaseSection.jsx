/* Generic case-study section primitives, lifted from the ICOI page's inline
   helpers so every case study shares one prose rhythm (prose caps at 760px).
   Eyebrow: mono blue-text section marker with an optional number + icon.
   CaseSection: the section shell (anchor id, eyebrow, H2 heading, body paras),
   with children for the section's figures and interactive blocks. */

export function Eyebrow({ n, icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 font-plex text-[12px] uppercase tracking-[0.14em] text-blue-text">
      {Icon && <Icon width={14} height={14} strokeWidth={2} aria-hidden />}
      {n && <span>{n}</span>}
      {children}
    </span>
  );
}

export const H2 = ({ children, ...rest }) => (
  <h2 className="mb-4 mt-4 max-w-[760px] text-[28px] font-extrabold leading-tight tracking-[-0.02em]" {...rest}>
    {children}
  </h2>
);

export const P = ({ children }) => (
  <p className="mb-4 max-w-[760px] text-[17px] leading-[1.65] text-prose">{children}</p>
);

export default function CaseSection({ id, n, icon, eyebrow, heading, body = [], children }) {
  return (
    <section id={id} className="pt-24">
      <Eyebrow n={n} icon={icon}>{eyebrow}</Eyebrow>
      <H2>{heading}</H2>
      {body.map((t, i) => (
        <P key={i}>{t}</P>
      ))}
      {children}
    </section>
  );
}
