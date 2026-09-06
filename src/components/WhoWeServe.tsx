import Section from "./Section";

const sectors = [
  { name: "Hospitals & health systems", note: "HIPAA-aware, change-window friendly" },
  { name: "Dialysis & outpatient clinics", note: "Multi-site, patient-area sensitive" },
  { name: "Airport & aviation operations", note: "Badge-controlled and escorted work" },
  { name: "Airline catering & food logistics", note: "24/7 operations, tight windows" },
  { name: "Package delivery & shipping", note: "Airport-side facilities" },
  { name: "State agencies & secure facilities", note: "Cleared, escorted, by the book" },
];

export default function WhoWeServe() {
  return (
    <Section
      id="who-we-serve"
      eyebrow="Who We Serve"
      title="Two kinds of customers. One standard of work."
      className="bg-brand-sand"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mainland teams */}
        <article className="rounded-2xl border border-brand-line bg-white p-8 shadow-card">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-brand-navy">
            Mainland IT teams, MSPs, carriers &amp; integrators
          </h3>
          <p className="mt-3 leading-relaxed text-brand-slate">
            You own the design and the change ticket. We are the reliable local resource
            that shows up, follows the MOP, keeps your engineer on the phone, and sends photos
            before leaving. No flights, no per diem, no waiting on a mainland tech.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-brand-ink sm:grid-cols-2">
            {[
              "Scheduled and after-hours change windows",
              "Console, LTE, and out-of-band access on hand",
              "Works from your MOP or runbook",
              "Photos, serials, and close-out documentation",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-coral" />
                {t}
              </li>
            ))}
          </ul>
        </article>

        {/* Maui businesses */}
        <article className="rounded-2xl border border-brand-line bg-white p-8 shadow-card">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-brand-navy">
            Maui businesses that need real IT help
          </h3>
          <p className="mt-3 leading-relaxed text-brand-slate">
            Medical offices, contractors, shops, restaurants, nonprofits, and property
            managers. Get enterprise-quality work on a service-call basis without signing a
            long-term managed services contract. Book when you need us.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-brand-ink sm:grid-cols-2">
            {[
              "Scheduled on-site service calls",
              "Network, Wi-Fi, and internet fixes",
              "New office setup and moves",
              "Straight answers, call for a quote",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-coral" />
                {t}
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* Sector experience */}
      <div className="mt-12">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-mist">
          Field experience across Maui
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-3 rounded-xl border border-brand-line bg-white/70 px-4 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-sky text-brand-blue">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-brand-navy">{s.name}</p>
                <p className="text-xs text-brand-slate">{s.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
