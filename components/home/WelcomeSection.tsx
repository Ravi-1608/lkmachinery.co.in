import Image from "next/image";
import "./WelcomeSection.css";

export default function WelcomeSection() {
  return (
    <section className="welcome" aria-labelledby="welcome-heading">
      <div className="container">
        <div className="welcome__grid">

          {/* ── Left column: Building Photo ──────────────────────────────── */}
          <div className="welcome__photo">
            <Image
              src="/images/company/welcome-building.png"
              alt="LK Machinery India Pvt. Ltd. Building"
              fill
              className="welcome__photo-image"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* ── Right column: Content ─────────────────────────────────────── */}
          <div>
            <h2 id="welcome-heading" className="welcome__heading">
              <span className="welcome__eyebrow">Welcome to —</span>
              LK Machinery India Pvt Ltd
            </h2>

            {/* 2x2 Stats Grid */}
            <div className="welcome__stats">
              <div>
                <p className="welcome__stat-number">2012</p>
                <p className="welcome__stat-caption">LK India was founded in Pune, Maharashtra</p>
              </div>
              <div>
                <p className="welcome__stat-number">50+</p>
                <p className="welcome__stat-caption">LK Chinese market share</p>
              </div>
              <div>
                <p className="welcome__stat-number">30</p>
                <p className="welcome__stat-caption">Over 30 countries are using LK machines</p>
              </div>
              <div>
                <p className="welcome__stat-number">300</p>
                <p className="welcome__stat-caption">Over 300 patents</p>
              </div>
            </div>

            {/* Body Copy */}
            <div className="welcome__body">
              <p>
                L.K. Machinery India Pvt. Ltd. located at Pune is established to cater to the customer needs.
              </p>
              <p>
                <strong className="welcome__highlight">L.K. Machinery India Pvt. Ltd.</strong> are the reputed Manufacturers and Suppliers of Die-casting Machine, Zinc Die-casting Machine, Aluminum Die-casting Machine, Plastic Injection, and VMC and CNC Machines in India.
              </p>
              <p>
                We have been developing the High-Quality products since the Year <strong className="welcome__highlight">1979</strong>.
              </p>
              <p>
                Our suppliers also offer competitive pricing and a team of experts to help you with your needs.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
