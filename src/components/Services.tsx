import Section from "./Section";

interface Service {
  title: string;
  tagline: string;
  items: string[];
  icon: JSX.Element;
  featured?: boolean;
}

const iconCls = "h-7 w-7";
const svgProps = { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.6 } as const;

const services: Service[] = [
  {
    title: "Smart Hands & Field Services",
    tagline: "Your remote engineer's hands, eyes, and console cable on Maui.",
    featured: true,
    icon: (
      <svg className={iconCls} {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    items: [
      "Router, firewall, and switch swaps",
      "Circuit turn-ups, migrations, and cutovers",
      "Rack and stack, power, and console access",
      "Live coordination with your remote NOC or engineer",
      "Photo documentation and close-out notes",
    ],
  },
  {
    title: "Network Engineering",
    tagline: "Design, configure, and cut over LAN, WAN, and Wi-Fi.",
    icon: (
      <svg className={iconCls} {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
    items: [
      "Switching, routing, VLANs, and firewalls",
      "Cisco, Meraki, Fortinet, Aruba, Ubiquiti",
      "Site-to-site VPN and SD-WAN",
      "Wi-Fi surveys and access point deployment",
      "Troubleshooting and performance tuning",
    ],
  },
  {
    title: "Structured Cabling",
    tagline: "Clean, labeled, tested runs that the next tech will thank you for.",
    icon: (
      <svg className={iconCls} {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    items: [
      "Cat6 and Cat6A runs and terminations",
      "Fiber patching and cleanup",
      "Patch panels, IDF and MDF build-outs",
      "Rack cleanup, labeling, and testing",
      "Office moves and new-site drops",
    ],
  },
  {
    title: "Business IT Support",
    tagline: "Scheduled service calls for Maui businesses. No contract required.",
    icon: (
      <svg className={iconCls} {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
    items: [
      "Workstations, servers, and printers",
      "Microsoft 365 and Google Workspace",
      "Office Wi-Fi and internet issues",
      "Backups and basic security hygiene",
      "Vendor and ISP coordination",
    ],
  },
  {
    title: "Cloud Engineering",
    tagline: "Practical cloud work from someone who has run it in production.",
    icon: (
      <svg className={iconCls} {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
    items: [
      "AWS and Azure architecture and migrations",
      "Identity: Entra ID, SSO, and MFA rollouts",
      "Backup, disaster recovery, and monitoring",
      "Infrastructure as code and automation",
      "Cost review and right-sizing",
    ],
  },
  {
    title: "Projects & Migrations",
    tagline: "Scoped, scheduled, and documented from kickoff to close-out.",
    icon: (
      <svg className={iconCls} {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.5 4.973 8.5 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
      </svg>
    ),
    items: [
      "Office relocations and new-site build-outs",
      "ISP and circuit changes",
      "Equipment refresh and end-of-life swaps",
      "Server and email migrations",
      "Multi-site rollouts for mainland teams",
    ],
  },
];

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Traditional IT and network engineering, done properly."
      intro="From a single router swap to a full site build-out. Every job gets an experienced engineer, not a dispatcher."
      className="bg-white"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.title}
            className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover ${
              s.featured
                ? "border-brand-blue/30 bg-brand-sky-soft shadow-card"
                : "border-brand-line bg-white shadow-card"
            }`}
          >
            {s.featured && (
              <span className="absolute right-5 top-5 rounded-full bg-brand-coral/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-coral">
                Most requested
              </span>
            )}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-sky text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
              {s.icon}
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-navy">{s.title}</h3>
            <p className="mt-1.5 text-sm text-brand-slate">{s.tagline}</p>
            <ul className="mt-5 space-y-2 border-t border-brand-line/70 pt-5">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-ink">
                  <svg className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
