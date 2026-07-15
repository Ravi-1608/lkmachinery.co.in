import Image from "next/image";
import { getAllApplications } from "@/lib/applications";

export default function ApplicationsStrip() {
  const apps = getAllApplications();
  if (!apps.length) return null;

  const firstApp = apps[0];
  const otherApps = apps.slice(1);

  return (
    <section className="py-20 lg:py-28 bg-brand-offwhite" aria-labelledby="applications-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-10">
          <h2 id="applications-heading" className="font-heading font-bold text-[40px] tracking-[6%] text-brand-dark">
            APPLIC<span className="text-brand-red">ATIONS</span>
          </h2>
        </div>

        {/* 6-panel strip */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px]">
          
          {/* First Panel (Widest) */}
          <div className="relative flex flex-col justify-end lg:flex-[3] h-[300px] lg:h-full rounded-2xl overflow-hidden group">
            {firstApp.image ? (
              <Image 
                src={firstApp.image} 
                alt={firstApp.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            ) : (
              <div className="absolute inset-0 bg-brand-dark/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
            
            <div className="relative z-10 p-6 lg:p-8">
              <h3 className="text-white font-heading font-bold text-2xl sm:text-3xl tracking-widest uppercase mb-4">
                {firstApp.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {["DCM", "IMM", "CNC", "AUTOMATION"].map(cat => (
                  <span 
                    key={cat} 
                    className="px-3 py-1 border border-white/40 text-white text-[10px] sm:text-xs font-semibold tracking-wider rounded-sm backdrop-blur-sm bg-black/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Remaining 5 Panels */}
          {otherApps.map(app => (
            <div 
              key={app.slug} 
              className="relative flex lg:flex-[1.2] h-[120px] lg:h-full rounded-2xl overflow-hidden group"
            >
              {app.image ? (
                <Image 
                  src={app.image} 
                  alt={app.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 15vw"
                />
              ) : (
                <div className="absolute inset-0 bg-brand-dark/20" />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" aria-hidden="true" />
              
              {/* Vertical Text on Desktop, Horizontal on Mobile */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white font-heading font-bold text-lg sm:text-xl tracking-widest uppercase lg:-rotate-90 whitespace-nowrap drop-shadow-md">
                  {app.name}
                </h3>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
