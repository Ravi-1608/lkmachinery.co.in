// Applications strip — 4 industry cards
// Server Component — no interactivity needed

interface ApplicationCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function TransportIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="14" width="28" height="16" rx="3" fill="currentColor" opacity="0.8"/>
      <rect x="32" y="18" width="5" height="8" rx="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="10" cy="32" r="4" fill="currentColor"/>
      <circle cx="24" cy="32" r="4" fill="currentColor"/>
      <rect x="8" y="6" width="14" height="10" rx="2" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function ElectronicsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="8" width="28" height="18" rx="3" fill="currentColor" opacity="0.8"/>
      <rect x="15" y="26" width="10" height="4" fill="currentColor" opacity="0.5"/>
      <rect x="10" y="30" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.4"/>
      <rect x="11" y="13" width="18" height="8" rx="2" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="17" r="2.5" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function ConsumerIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 10h24l-3 16H11L8 10Z" fill="currentColor" opacity="0.7"/>
      <path d="M5 8h30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="15" cy="32" r="3" fill="currentColor"/>
      <circle cx="25" cy="32" r="3" fill="currentColor"/>
    </svg>
  );
}

function IndustrialIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="24" width="28" height="10" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="10" y="14" width="8" height="12" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="22" y="10" width="8" height="16" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="16" y="18" width="8" height="8" rx="1" fill="currentColor" opacity="0.4"/>
      <path d="M14 14V8M26 10V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const APPLICATIONS: ApplicationCard[] = [
  {
    title: "Transportation",
    description:
      "Structural and powertrain components for automotive, EV, and commercial vehicles — manufactured to exacting tolerances.",
    icon: <TransportIcon />,
  },
  {
    title: "Smart 3C & 5G",
    description:
      "Ultra-thin, high-precision housings and heat-dissipation parts for consumer electronics, smartphones, and 5G base stations.",
    icon: <ElectronicsIcon />,
  },
  {
    title: "Daily Necessities",
    description:
      "High-volume production of durable consumer goods, appliance housings, and packaging components with consistent quality.",
    icon: <ConsumerIcon />,
  },
  {
    title: "Industrial Supplies",
    description:
      "Heavy-duty components for energy, defence, and general industry — engineered for long service life under extreme conditions.",
    icon: <IndustrialIcon />,
  },
];

export default function ApplicationsStrip() {
  return (
    <section className="py-20 lg:py-28 bg-brand-dark" aria-labelledby="applications-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            Industries We Serve
          </p>
          <h2 id="applications-heading" className="font-heading text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Built for the applications that matter
          </h2>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPLICATIONS.map(({ title, description, icon }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-7 bg-white/5 border border-white/10
                         hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-brand-red mb-5">{icon}</div>

              {/* Title */}
              <h3 className="font-heading text-white text-xl mb-3">{title}</h3>

              {/* Description */}
              <p className="text-white/55 text-sm leading-relaxed font-body">{description}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 inset-x-0 h-0.5 rounded-b-2xl bg-brand-red
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
