import { site } from "../config";
import { useContact } from "../contact-context";

const recentWork = [
  { job: "Circuit migration & router cutover", where: "Hospital campus" },
  { job: "Core switch install & rack build-out", where: "Airport operations" },
  { job: "Cat6 runs, patch panel & labeling", where: "Dialysis clinic" },
  { job: "Firewall swap with remote engineer", where: "Logistics hub" },
  { job: "Wi-Fi survey & access point install", where: "State facility" },
];

const sectors = ["Healthcare", "Aviation", "Logistics", "Government", "Clinics", "Local Business"];

export default function Hero() {
  const { openContact } = useContact();

  return (
    <section id="top" className="relative overflow-hidden bg-brand-sky-soft pt-28 md:pt-36">
      {/* Background: soft gradient + faint grid */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-sky via-brand-sky-soft to-white" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(27,127,166,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,127,166,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 70% 20%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 70% 20%, black 20%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-blue-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-brand-coral/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* Copy */}
        <div className="animate-fade-in-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-brand-coral" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-coral" />
            </span>
            Based on Maui &middot; Serving all of Hawai&#699;i
          </p>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl md:text-[3.5rem]">
            On-island IT and network engineering,{" "}
            <span className="text-brand-blue">when you need hands on site.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-slate md:text-xl">
            Maui Tech Service provides field IT, enterprise networking, structured cabling,
            and cloud engineering for Maui businesses and for mainland IT teams that need
            trusted smart hands in Hawai&#699;i.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={openContact} className="btn-primary">
              Request Service
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <a href={`tel:${site.phoneTel}`} className="btn-secondary">
              <svg className="h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              Call {site.phoneDisplay}
            </a>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-mist">
              Trusted on site by
            </p>
            <ul className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-medium text-brand-slate"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Work card */}
        <div className="animate-fade-in-up stagger-2 lg:justify-self-end">
          <div className="relative w-full max-w-md rounded-2xl border border-brand-line bg-white p-6 shadow-card">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-bold text-brand-navy">Typical field work</p>
                <p className="text-xs text-brand-mist">Scoped, scheduled, documented</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Taking calls
              </span>
            </div>
            <ul className="divide-y divide-brand-line/70">
              {recentWork.map((w) => (
                <li key={w.job} className="flex items-start gap-3 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sky text-brand-blue">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-brand-ink">{w.job}</p>
                    <p className="text-xs text-brand-mist">{w.where}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-brand-line/70 pt-5 text-center">
              <div>
                <p className="font-heading text-xl font-extrabold text-brand-navy">15+</p>
                <p className="text-[11px] leading-tight text-brand-mist">years enterprise IT</p>
              </div>
              <div>
                <p className="font-heading text-xl font-extrabold text-brand-navy">Maui</p>
                <p className="text-[11px] leading-tight text-brand-mist">based, on island</p>
              </div>
              <div>
                <p className="font-heading text-xl font-extrabold text-brand-navy">1</p>
                <p className="text-[11px] leading-tight text-brand-mist">point of contact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
