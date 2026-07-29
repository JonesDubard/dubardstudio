import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings, getServices } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';
import ServicesSection from '@/components/sections/ServicesSection';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Services',
    description:
      'Dubard Studio services: brand, websites, QA, Mobile Money (Orange and MTN), workshops, and operations. Framed by business problems, fit, and outcomes.',
    path: '/services/',
  });
}

/**
 * Services: offers + fit/non-fit. Open composition; business outcomes over tool lists.
 */
export default function ServicesPage() {
  const settings = getSettings();
  const services = getServices();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="services-page">
        <header className="services-hero" aria-labelledby="services-heading">
          <div className="container services-hero-inner">
            <span className="section-label">Offers</span>
            <h1 id="services-heading" className="services-hero-title">
              How we help the business
            </h1>
            <p className="services-hero-lead">
              Each offer starts from a real business problem, then clarifies who we are a fit for,
              and who we are not. No freelance capability checklists.
            </p>
          </div>
        </header>

        <div className="container services-page-body">
          <ServicesSection services={services} variant="page" />

          <section className="services-cta" aria-labelledby="services-cta-heading">
            <h2 id="services-cta-heading" className="section-title">
              Not sure which offer fits?
            </h2>
            <p className="section-desc">
              Describe the outcome you need. We will recommend the smallest coherent scope, or tell
              you honestly if we are not the right studio.
            </p>
            <Link href="/contact/" className="btn btn-primary">
              {primaryCta}
            </Link>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
