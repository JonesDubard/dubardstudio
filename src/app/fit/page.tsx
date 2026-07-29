import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';
import FitChecklist from '@/components/fit/FitChecklist';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Fit checklist',
    description:
      'A short, ungated checklist to see whether Dubard Studio is likely a fit—honest guidance, not a scored readiness quiz.',
    path: '/fit/',
  });
}

/**
 * Wave B — Honest fit checklist (ADR-0005).
 * Qualitative guidance only; Contact remains primary conversion.
 */
export default function FitPage() {
  const settings = getSettings();

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="fit-page">
        <header className="fit-hero" aria-labelledby="fit-heading">
          <div className="container fit-hero-inner">
            <span className="section-label">Fit</span>
            <h1 id="fit-heading" className="fit-hero-title">
              Is Dubard a fit?
            </h1>
            <p className="fit-hero-lead">
              Five quick questions. You get plain guidance—likely a fit, talk first, or probably not
              yet. No percentages, no email wall, no “audit” theater.
            </p>
          </div>
        </header>

        <div className="container fit-page-body">
          <div className="fit-layout">
            <div className="fit-panel">
              <FitChecklist />
            </div>

            <aside className="fit-aside" aria-label="About this checklist">
              <h2 className="fit-aside-title">Why this exists</h2>
              <p className="fit-aside-copy">
                Serious buyers deserve a way to self-qualify before they write. This checklist helps
                you decide whether a conversation is worth both of our time.
              </p>
              <p className="fit-aside-copy">
                Prefer to skip ahead? Go straight to <Link href="/contact/">contact</Link> or{' '}
                <Link href="/book/">book a consultation</Link>.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
