import Section from "./Section";
import { useContact } from "../contact-context";

const steps = [
  {
    n: "01",
    title: "Send the job",
    text: "Call, email, or use the form. A ticket, SOW, or a few sentences about what needs to happen is enough to start.",
  },
  {
    n: "02",
    title: "Get a quote and a window",
    text: "We confirm scope, parts, access, and timing. Hourly or fixed-price, agreed before anyone rolls a truck.",
  },
  {
    n: "03",
    title: "On-site work",
    text: "Work is done to your MOP or our plan, with your remote engineer on the line when needed. Change windows and after-hours are fine.",
  },
  {
    n: "04",
    title: "Close-out",
    text: "Photos, serials, labels, test results, and notes delivered the same day so your ticket can close.",
  },
];

export default function HowItWorks() {
  const { openContact } = useContact();
  return (
    <Section
      id="how-it-works"
      eyebrow="How It Works"
      title="Simple to engage. Easy to close the ticket."
      className="bg-white"
    >
      <ol className="relative grid gap-8 md:grid-cols-4">
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-line to-transparent md:block" />
        {steps.map((s) => (
          <li key={s.n} className="relative">
            <div className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-blue bg-white font-heading text-sm font-extrabold text-brand-blue">
              {s.n}
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-navy">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-slate">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 text-center">
        <button onClick={openContact} className="btn-primary">
          Start a request
        </button>
      </div>
    </Section>
  );
}
