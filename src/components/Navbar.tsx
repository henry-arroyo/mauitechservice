import { useState, useEffect } from "react";
import Logo from "./Logo";
import { site } from "../config";
import { useContact } from "../contact-context";

const links = [
  { label: "Services", href: "#services" },
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why MTS", href: "#why-mts" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openContact } = useContact();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-brand-line/70 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3" aria-label="Main navigation">
        <a href="#top" aria-label="Maui Tech Service home">
          <Logo />
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-brand-slate transition-colors hover:text-brand-navy"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`tel:${site.phoneTel}`}
              className="text-sm font-semibold text-brand-navy transition-colors hover:text-brand-blue"
            >
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <button onClick={openContact} className="btn-primary !px-5 !py-2.5">
              Request Service
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-brand-navy transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-navy transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-navy transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="border-t border-brand-line bg-white px-6 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-brand-ink transition-colors hover:text-brand-blue"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-3 flex flex-col gap-3">
            <a href={`tel:${site.phoneTel}`} className="btn-secondary">
              Call {site.phoneDisplay}
            </a>
            <button
              onClick={() => {
                setOpen(false);
                openContact();
              }}
              className="btn-primary"
            >
              Request Service
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
