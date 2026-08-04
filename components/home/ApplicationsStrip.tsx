import Image from "next/image";
import Link from "next/link";
import { getAllApplications } from "@/lib/applications";
import "./ApplicationsStrip.css";

export default function ApplicationsStrip() {
  const apps = getAllApplications();
  if (!apps.length) return null;

  return (
    <section className="applications" aria-labelledby="applications-heading">
      <div className="container">

        {/* Section header */}
        <div className="applications__header">
          <h2 id="applications-heading" className="applications__heading">
            APPLIC<span className="applications__highlight">ATIONS</span>
          </h2>
        </div>

        {/* 6-panel strip — every panel carries both the open (title + tags +
            CTA) and collapsed (vertical caption) states; CSS decides which
            shows, based on which panel is open by default or hovered. */}
        <div className="applications__strip">
          {apps.map((app, i) => {
            const tags = app.filterTabs.filter((tab) => tab !== "All");
            return (
              <div
                key={app.slug}
                className={`applications__panel ${i === 0 ? "applications__panel--main" : "applications__panel--sub"}`}
              >
                {app.image ? (
                  <Image
                    src={app.image}
                    alt={app.name}
                    fill
                    className="applications__panel-image"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                ) : (
                  <div className="applications__panel-fallback" />
                )}
                <div className="applications__panel-gradient" aria-hidden="true" />
                <div className="applications__panel-overlay" aria-hidden="true" />

                <div className="applications__panel-content">
                  <h3 className="applications__panel-title">
                    {app.name}
                  </h3>
                  <div className="applications__tags">
                    {tags.map((tag) => (
                      <span key={tag} className="applications__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/applications/${app.slug}`} className="applications__panel-cta">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                <Link
                  href={`/applications/${app.slug}`}
                  className="applications__panel-caption"
                  aria-label={app.name}
                >
                  <span className="applications__panel-caption-text">
                    {app.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
