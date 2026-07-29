import Link from 'next/link';
import type { Service } from '@/lib/content';

type ServicesSectionProps = {
  services: Service[];
  variant?: 'page' | 'teaser';
};

export default function ServicesSection({ services, variant = 'page' }: ServicesSectionProps) {
  const isTeaser = variant === 'teaser';
  const list = isTeaser ? services.slice(0, 4) : services;
  const headingId = isTeaser ? 'home-services-heading' : 'servicesHeading';

  if (isTeaser) {
    return (
      <section
        id="home-services"
        className="section home-services-teaser"
        aria-labelledby={headingId}
      >
        <div className="container">
          <span className="section-label">How we help</span>
          <h2 id={headingId} className="section-title">
            Problems we solve
          </h2>
          <p className="section-desc">
            From unclear brands to sites that fail to convert, we focus on business outcomes, not
            tool lists.
          </p>

          <ul className="home-offer-list">
            {list.map(service => (
              <li key={service.title} className="home-offer-item">
                <h3 className="home-offer-title">{service.title}</h3>
                <p className="home-offer-tagline">{service.tagline}</p>
              </li>
            ))}
          </ul>

          <p className="section-more">
            <Link href="/services/" className="btn btn-outline">
              View services
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <div id="services" className="services-catalog" aria-labelledby={headingId}>
      <h2 id={headingId} className="visually-hidden">
        Service offers
      </h2>
      <ol className="services-list">
        {list.map((service, index) => (
          <li key={service.title} className="service-offer">
            <article>
              <header className="service-offer-header">
                <span className="service-offer-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="service-offer-title">{service.title}</h3>
              </header>
              <p className="service-offer-tagline">{service.tagline}</p>

              {service.items?.length > 0 && (
                <ul className="service-offer-outcomes">
                  {service.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              <div className="service-offer-fit">
                {service.fit && (
                  <p>
                    <span className="service-fit-label">Good fit</span>
                    {service.fit}
                  </p>
                )}
                {service.nonFit && (
                  <p>
                    <span className="service-fit-label">Not a fit</span>
                    {service.nonFit}
                  </p>
                )}
              </div>

              <p className="service-offer-cta">
                <Link href="/contact/">Start a conversation →</Link>
              </p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
