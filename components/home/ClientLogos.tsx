import Image from "next/image";

const CLIENTS = [
  { name: "Aurangabad Electricals Limited", file: "ael.png" },
  { name: "Sigma Engineered Solutions", file: "sigma.png" },
  { name: "OMR Bagla", file: "omr-bagla.png" },
  { name: "Uno Minda", file: "uno-minda.png" },
  { name: "Oswal Industries", file: "oswal-industries.png" },
  { name: "Godrej", file: "godrej.png" },
  { name: "Nemak", file: "nemak.png" },
  { name: "Hindware", file: "hindware.png" },
  { name: "Super Auto India Limited", file: "super-auto-india.png" },
  { name: "Suvarna Alloys", file: "suvarna-alloys.png" },
];

export default function ClientLogos() {
  return (
    <section className="py-16 bg-white border-t border-brand-dark/5" aria-labelledby="clients-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="clients-heading" className="font-heading text-brand-dark text-2xl sm:text-3xl uppercase tracking-widest mb-12 text-center lg:text-left">
          OUR VALUABLE <span className="text-brand-red">CLIENTS</span>
        </h2>

        {/* Marquee or grid. For 10 logos, a flex wrap or grid is clean. */}
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
          {CLIENTS.map((client) => (
            <div key={client.name} className="relative h-12 w-28 sm:h-16 sm:w-36 flex items-center justify-center">
              <Image
                src={`/images/clients/${client.file}`}
                alt={client.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 112px, 144px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
