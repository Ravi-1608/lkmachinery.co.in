import Image from "next/image";
import "./ClientLogos.css";

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
    <section className="client-logos" aria-labelledby="clients-heading">
      <div className="container">
        <h2 id="clients-heading" className="client-logos__heading">
          OUR VALUABLE <span className="client-logos__highlight">CLIENTS</span>
        </h2>

        {/* Marquee or grid. For 10 logos, a flex wrap or grid is clean. */}
        <div className="client-logos__row">
          {CLIENTS.map((client) => (
            <div key={client.name} className="client-logos__logo">
              <Image
                src={`/images/clients/${client.file}`}
                alt={client.name}
                fill
                className="client-logos__logo-image"
                sizes="(max-width: 640px) 112px, 144px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
