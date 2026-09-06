import Section from "./Section";
import { site } from "../config";
import { useContact } from "../contact-context";

const cardCls =
  "group flex flex-col items-center gap-3 rounded-2xl border border-brand-line bg-white p-6 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-card-hover";
const iconWrap = "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-sky text-brand-blue";

export default function Contact() {
  const { openContact } = useContact();
  const hasBooking = Boolean(site.bookingUrl);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Request service"
      intro="Call or email for the fastest response. For scheduled work, send the details and we will confirm a window and a quote."
      className="bg-brand-sky-soft"
    >
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
        {/* Phone */}
        <a href={`tel:${site.phoneTel}`} className={cardCls}>
          <span className={iconWrap}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mist">Call</span>
          <span className="font-heading text-base font-bold text-brand-navy group-hover:text-brand-blue">
            {site.phoneDisplay}
          </span>
        </a>

        {/* Email */}
        <a href={`mailto:${site.email}`} className={cardCls}>
          <span className={iconWrap}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mist">Email</span>
          <span className="break-all font-heading text-base font-bold text-brand-navy group-hover:text-brand-blue">
            {site.email}
          </span>
        </a>

        {/* Book / form */}
        {hasBooking ? (
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={cardCls}>
            <span className={iconWrap}>
              <CalendarIcon />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mist">Book</span>
            <span className="font-heading text-base font-bold text-brand-navy group-hover:text-brand-blue">
              Book a service call
            </span>
          </a>
        ) : (
          <button type="button" onClick={openContact} className={cardCls}>
            <span className={iconWrap}>
              <CalendarIcon />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mist">Online</span>
            <span className="font-heading text-base font-bold text-brand-navy group-hover:text-brand-blue">
              Request a service call
            </span>
          </button>
        )}
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-4 text-center">
        <button onClick={openContact} className="btn-primary">
          Send job details
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
        <p className="max-w-xl text-sm text-brand-slate">
          Based in Maui, Hawai&#699;i. Available island-wide and across the state by
          arrangement. Emergency and after-hours work is handled case by case, so call if it
          is urgent.
        </p>
      </div>
    </Section>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
    </svg>
  );
}
