import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings, getProjects, getServices } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WorkSection from '@/components/sections/WorkSection';

export async function generateMetadata(): Promise<Metadata> {
  const s = getSettings();
  return buildPageMetadata({
    description: s.defaultSeoDescription || s.heroSubheadline,
    path: '/',
    ogImage: s.ogImage || s.heroImage,
  });
}

/**
 * Homepage — design-direction hierarchy:
 * brand-first hero → selected proof → offer teaser → studio → conversion.
 * Phase 3: hero, studio teaser, and CTA band copy are CMS-driven (settings.json).
 */
export default async function Home() {
  const settings = getSettings();
  const projects = getProjects().slice(0, 3);
  const services = getServices();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';
  const ctaHeading = settings.homeCtaHeading || 'Ready to talk about the business outcome?';
  const ctaBody =
    settings.homeCtaBody ||
    'Share the problem you need solved. We will respond honestly about fit. No dark patterns.';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <HeroSection settings={settings} />
      <WorkSection projects={projects} variant="teaser" />
      <ServicesSection services={services} variant="teaser" />
      <AboutSection settings={settings} variant="teaser" />
      <section className="section home-cta-band" aria-labelledby="home-cta-heading">
        <div className="container home-cta-inner">
          <h2 id="home-cta-heading" className="section-title">
            {ctaHeading}
          </h2>
          <p className="section-desc">{ctaBody}</p>
          <Link href="/contact/" className="btn btn-primary">
            {primaryCta}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
