import Image from "next/image";
import Link from "next/link";
import { getAllApplications } from "@/lib/applications";
import "./ApplicationsStrip.css";

export default function ApplicationsStrip() {
  const apps = getAllApplications();
  if (!apps.length) return null;

  const firstApp = apps[0];
  const otherApps = apps.slice(1);

  return (
    <section className="applications" aria-labelledby="applications-heading">
      <div className="container">

        {/* Section header */}
        <div className="applications__header">
          <h2 id="applications-heading" className="applications__heading">
            APPLIC<span className="applications__highlight">ATIONS</span>
          </h2>
        </div>

        {/* 6-panel strip */}
        <div className="applications__strip">

          {/* First Panel (Widest) */}
          <div className="applications__panel applications__panel--main">
            {firstApp.image ? (
              <Image
                src={firstApp.image}
                alt={firstApp.name}
                fill
                className="applications__panel-image"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            ) : (
              <div className="applications__panel-fallback" />
            )}
            <div className="applications__panel-gradient" aria-hidden="true" />

            <div className="applications__panel-content">
              <h3 className="applications__panel-title">
                {firstApp.name}
              </h3>
              <div className="applications__tags">
                {["DCM", "IMM", "CNC", "AUTOMATION"].map(cat => (
                  <span key={cat} className="applications__tag">
                    {cat}
                  </span>
                ))}
              </div>
              <Link href={`/applications/${firstApp.slug}`} className="applications__panel-cta">
                Learn More
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Remaining 5 Panels */}
          {otherApps.map(app => (
            <div key={app.slug} className="applications__panel applications__panel--sub">
              {app.image ? (
                <Image
                  src={app.image}
                  alt={app.name}
                  fill
                  className="applications__panel-image"
                  sizes="(max-width: 1024px) 100vw, 15vw"
                />
              ) : (
                <div className="applications__panel-fallback" />
              )}
              <div className="applications__panel-overlay" aria-hidden="true" />

              {/* Vertical Text on Desktop, Horizontal on Mobile */}
              <div className="applications__panel-caption">
                <h3 className="applications__panel-caption-text">
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
