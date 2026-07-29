import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings, getProjects } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';
import WorkIndex from '@/components/work/WorkIndex';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Work',
    description:
      'Selected Dubard Studio engagements: business challenges solved and value delivered. Quality over wallpaper portfolios.',
    path: '/work/',
  });
}

/**
 * Work index — curated proof for serious buyers.
 * Hierarchy: page promise → light filter → cases (challenge + value) → conversation CTA.
 */
export default function WorkIndexPage() {
  const settings = getSettings();
  const projects = getProjects();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="work-page">
        <header className="work-hero" aria-labelledby="work-heading">
          <div className="container work-hero-inner">
            <span className="section-label">Proof</span>
            <h1 id="work-heading" className="work-hero-title">
              Work that moves the business
            </h1>
            <p className="work-hero-lead">
              Selected engagements, each framed by the challenge, the solution, and the value
              delivered. Curated for clarity, not a wallpaper gallery.
            </p>
          </div>
        </header>

        <div className="container work-page-body">
          <WorkIndex projects={projects} />

          <section className="work-cta" aria-labelledby="work-cta-heading">
            <h2 id="work-cta-heading" className="section-title">
              Have a similar challenge?
            </h2>
            <p className="section-desc">
              Share the business outcome you need. We will respond honestly about fit. No dark
              patterns.
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
