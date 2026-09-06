import Section from "./Section";
import { site } from "../config";

const reasons = [
  {
    title: "Enterprise experience on every visit",
    text: "Over 15 years of enterprise IT and network engineering, including hospital, airport, and government environments. You get an engineer, not a runner.",
  },
  {
    title: "Actually on the island",
    text: "Based on Maui, available across Hawaiʻi. No airfare, no per diem, no waiting days for a mainland tech to fly in.",
  },
  {
    title: "Documentation first",
    text: "Labels, photos, serials, and close-out notes on every job. Your next tech, or your auditor, will know exactly what was done.",
  },
  {
    title: "Straightforward pricing",
    text: "Call for a quote. Hourly or fixed-price, scoped up front. No minimum contract and no surprise line items.",
  },
];

export default function WhyMTS() {
  return (
    <Section
      id="why-mts"
      eyebrow="Why Maui Tech Service"
      title="Built for the jobs where showing up matters."
      className="bg-brand-navy text-white [&_h2]:text-white"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {reasons.map((r) => (
          <article
            key={r.title}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-brand-blue-light/40"
          >
            <div className="mb-4 h-1 w-10 rounded bg-brand-coral" />
            <h3 className="font-heading text-lg font-bold text-white">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-line/90">{r.text}</p>
          </article>
        ))}
      </div>

      {/* Sister company callout */}
      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-brand-blue-light/25 bg-brand-blue/10 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
            Need strategy, not just hands?
          </p>
          <p className="mt-1.5 text-sm text-brand-line/90 md:text-base">
            For fractional CTO / vCIO, cybersecurity, and compliance work, see our sister company{" "}
            <span className="font-semibold text-white">{site.sisterCompany.name}</span>. Same
            engineer, different toolbox.
          </p>
        </div>
        <a
          href={site.sisterCompany.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-light shrink-0"
        >
          Visit {site.sisterCompany.name}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>
    </Section>
  );
}
