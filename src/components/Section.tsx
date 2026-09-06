import { useInView } from "../hooks/useInView";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  align = "center",
}: SectionProps) {
  const { ref, inView } = useInView(0.08);
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 ${className} ${inView ? "fade-in-visible" : "fade-in-hidden"}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title || intro) && (
          <div className={`mb-12 max-w-3xl md:mb-16 ${alignCls}`}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-lg leading-relaxed text-brand-slate">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
