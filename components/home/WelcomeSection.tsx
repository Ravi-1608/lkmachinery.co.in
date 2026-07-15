import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-offwhite" aria-labelledby="welcome-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column: Building Photo ──────────────────────────────── */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/company/welcome-building.png"
              alt="LK Machinery India Pvt. Ltd. Building"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* ── Right column: Content ─────────────────────────────────────── */}
          <div>
            <h2
              id="welcome-heading"
              className="font-heading text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8"
            >
              <span className="text-brand-red text-xl sm:text-2xl block font-semibold mb-2 tracking-wide">Welcome to —</span>
              LK Machinery India Pvt Ltd
            </h2>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-10 pb-10 border-b border-brand-dark/10">
              <div>
                <p className="font-heading text-brand-dark text-3xl lg:text-4xl mb-1">2012</p>
                <p className="text-brand-dark/60 text-xs font-body leading-tight">LK India was founded in Pune, Maharashtra</p>
              </div>
              <div>
                <p className="font-heading text-brand-dark text-3xl lg:text-4xl mb-1">50+</p>
                <p className="text-brand-dark/60 text-xs font-body leading-tight">LK Chinese market share</p>
              </div>
              <div>
                <p className="font-heading text-brand-dark text-3xl lg:text-4xl mb-1">30</p>
                <p className="text-brand-dark/60 text-xs font-body leading-tight">Over 30 countries are using LK machines</p>
              </div>
              <div>
                <p className="font-heading text-brand-dark text-3xl lg:text-4xl mb-1">300</p>
                <p className="text-brand-dark/60 text-xs font-body leading-tight">Over 300 patents</p>
              </div>
            </div>

            {/* Body Copy */}
            <div className="space-y-4 text-sm font-body text-brand-dark/70 leading-relaxed">
              <p>
                L.K. Machinery India Pvt. Ltd. located at Pune is established to cater to the customer needs.
              </p>
              <p>
                <strong className="text-brand-red font-semibold">L.K. Machinery India Pvt. Ltd.</strong> are the reputed Manufacturers and Suppliers of Die-casting Machine, Zinc Die-casting Machine, Aluminum Die-casting Machine, Plastic Injection, and VMC and CNC Machines in India.
              </p>
              <p>
                We have been developing the High-Quality products since the Year <strong className="text-brand-red font-semibold">1979</strong>.
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
