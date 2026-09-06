import { useState, useEffect, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "../config";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", company: "", email: "", phone: "", message: "" };
const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export default function ContactModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setTurnstileToken(null);
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      let data: { message?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON body */
      }

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink placeholder-brand-mist outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-slate";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 flex max-h-[95vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-brand-line px-6 py-4">
          <div>
            <h2 id="modal-title" className="font-heading text-lg font-bold text-brand-navy">
              Request service
            </h2>
            <p className="text-xs text-brand-mist">
              Or call{" "}
              <a href={`tel:${site.phoneTel}`} className="font-medium text-brand-blue">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-brand-mist transition-colors hover:bg-brand-sky hover:text-brand-navy"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-600/20">
                <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-base font-bold text-brand-navy">Request received</p>
                <p className="mt-1 text-sm text-brand-slate">
                  Thanks, {form.name.split(" ")[0]}. We will follow up shortly to confirm scope and scheduling.
                </p>
              </div>
              <button onClick={onClose} className="btn-primary mt-2">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name <span className="text-brand-coral">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company <span className="font-normal normal-case text-brand-mist">(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Company or MSP"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-brand-coral">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone <span className="font-normal normal-case text-brand-mist">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="(808) 555-1234"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  What do you need done? <span className="text-brand-coral">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Site location, what needs to happen, preferred dates or change window, and anything your remote engineer wants us to know."
                />
              </div>

              <div className="flex justify-center">
                <Turnstile
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  options={{ theme: "light" }}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                />
              </div>

              {status === "error" && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!turnstileToken || status === "loading"}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === "loading" ? "Sending..." : "Send request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
