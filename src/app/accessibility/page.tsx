import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Accessibility',
    description:
      'Dubard Studio accessibility commitment, standards posture, and how to report barriers.',
    path: '/accessibility/',
  });
}

/**
 * Accessibility statement. Reinforces integrity: accessible is not optional.
 */
export default function AccessibilityPage() {
  const settings = getSettings();
  const updated = '21 July 2026';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="legal-page">
        <header className="legal-hero" aria-labelledby="a11y-heading">
          <div className="container legal-hero-inner">
            <span className="section-label">Commitment</span>
            <h1 id="a11y-heading" className="legal-hero-title">
              Accessibility
            </h1>
            <p className="legal-hero-lead">
              Accessible digital experiences are part of quality at Dubard Studio, not an optional
              extra. Last updated {updated}.
            </p>
          </div>
        </header>

        <div className="container legal-body">
          <section>
            <h2>Our commitment</h2>
            <p>
              As a digital solutions firm within Verdant Holdings, we aim for this website to be
              usable by as many people as possible. We target{' '}
              <strong>WCAG 2.2 Level AA</strong> as our default posture for public pages.
            </p>
          </section>

          <section>
            <h2>What we design for</h2>
            <ul>
              <li>Keyboard-operable primary journeys (including skip link to main content)</li>
              <li>Visible focus states on interactive controls</li>
              <li>Form fields with visible labels, not placeholder-only labeling</li>
              <li>Text contrast that supports reading</li>
              <li>Respect for <code>prefers-reduced-motion</code></li>
              <li>Meaningful link and button names (no icon-only controls without accessible names)</li>
            </ul>
          </section>

          <section>
            <h2>Known limitations</h2>
            <p>
              The site is actively evolving. Some older media or third-party embeds may not yet meet
              every success criterion. We track gaps and close them as part of ongoing quality work.
            </p>
          </section>

          <section>
            <h2>Report a barrier</h2>
            <p>
              If you encounter an accessibility barrier, email{' '}
              <a href={`mailto:${settings.email}`}>{settings.email}</a> with:
            </p>
            <ul>
              <li>The page URL</li>
              <li>What you were trying to do</li>
              <li>The assistive technology or browser you were using, if relevant</li>
            </ul>
            <p>We take these reports seriously and will respond as quickly as we can.</p>
          </section>

          <section>
            <h2>Related</h2>
            <p className="legal-nav">
              <Link href="/approach/">Approach</Link>
              {' · '}
              <Link href="/contact/">Contact</Link>
              {' · '}
              <Link href="/privacy/">Privacy</Link>
            </p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
