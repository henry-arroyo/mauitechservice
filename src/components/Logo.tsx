interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0F2A44" />
      <g transform="translate(6 10)">
        <path
          d="M9.5 6.5C14.5 1.5 22 3 24.5 9.5c1.2 3.1 2.8 5.5 6.5 6.2 6-1.2 13.8-.8 18.6 3.6 4.2 3.9 3.6 9.9-.6 13.2-6 4.6-14.6 3.4-20.8.6-3.7-1.7-5.7-1-8.8.5C14.2 36 8.8 34.6 6 30.5 2.6 25.6 1.9 19.6 4.2 14.3c1.2-2.9 3-5.4 5.3-7.8z"
          fill="#4FA8CB"
          opacity="0.28"
        />
        <path
          d="M9.5 6.5C14.5 1.5 22 3 24.5 9.5c1.2 3.1 2.8 5.5 6.5 6.2 6-1.2 13.8-.8 18.6 3.6 4.2 3.9 3.6 9.9-.6 13.2-6 4.6-14.6 3.4-20.8.6-3.7-1.7-5.7-1-8.8.5C14.2 36 8.8 34.6 6 30.5 2.6 25.6 1.9 19.6 4.2 14.3c1.2-2.9 3-5.4 5.3-7.8z"
          fill="none"
          stroke="#E8F3F8"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <g stroke="#E8F3F8" strokeWidth="1.4" strokeLinecap="round">
          <line x1="13" y1="17" x2="26" y2="20" />
          <line x1="26" y1="20" x2="37" y2="24" />
          <line x1="37" y1="24" x2="46" y2="20" />
          <line x1="26" y1="20" x2="24" y2="30" />
          <line x1="37" y1="24" x2="33" y2="31" />
        </g>
        <g fill="#E8F3F8">
          <circle cx="13" cy="17" r="2.4" />
          <circle cx="46" cy="20" r="2.4" />
          <circle cx="24" cy="30" r="2.4" />
          <circle cx="33" cy="31" r="2.4" />
        </g>
        <circle cx="26" cy="20" r="3.2" fill="#E8683C" />
        <circle cx="37" cy="24" r="3.2" fill="#E8683C" />
      </g>
    </svg>
  );
}

export default function Logo({ className = "", withText = true, light = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0" />
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-heading text-[17px] font-extrabold tracking-tight ${
              light ? "text-white" : "text-brand-navy"
            }`}
          >
            Maui Tech Service
          </span>
          <span
            className={`mt-1 text-[10px] font-medium uppercase tracking-[0.22em] ${
              light ? "text-brand-blue-light" : "text-brand-blue"
            }`}
          >
            Field IT &middot; Networking &middot; Cloud
          </span>
        </span>
      )}
    </span>
  );
}
