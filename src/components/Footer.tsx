import Logo from "./Logo";
import { site } from "../config";

const links = [
  { label: "Services", href: "#services" },
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why MTS", href: "#why-mts" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy-deep text-brand-line">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-mist">
              Field IT, network engineering, structured cabling, and cloud services for Maui
              businesses and mainland IT teams that need trusted hands in Hawai&#699;i.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
              Site
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-brand-line/80 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${site.phoneTel}`} className="text-brand-line/80 transition-colors hover:text-white">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-brand-line/80 transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="text-brand-mist">Maui, Hawai&#699;i</li>
              {site.googleListingUrl && (
                <li>
                  <a
                    href={site.googleListingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-line/80 transition-colors hover:text-white"
                  >
                    Find us on Google
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-brand-mist md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            Strategy, cybersecurity &amp; fractional CTO:{" "}
            <a
              href={site.sisterCompany.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-blue-light transition-colors hover:text-white"
            >
              {site.sisterCompany.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
