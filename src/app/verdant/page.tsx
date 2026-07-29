import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { VERDANT_HOLDINGS_URL } from '@/lib/site';
import SiteShell from '@/components/layout/SiteShell';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Verdant',
    description:
      'How Dubard Studio, a digital solutions firm, relates to Verdant Holdings: honest ecosystem endorsement.',
    path: '/verdant/',
  });
}

const POINTS = [
  {
    title: 'What Verdant is',
    body: 'Verdant Holdings is a living house of enterprises, founded to build enduring companies that solve meaningful problems across Africa. Rooted in purpose, renewing through innovation, and united by shared values, every business within the Verdant ecosystem is designed to create lasting economic, technological, and social impact while becoming stronger through collaboration.',
  },
  {
    title: 'What Dubard is within the house',
    body: 'Dubard Studio is a digital solutions firm inside Verdant Holdings. We deliver brand systems, websites, QA, Mobile Money integrations, workshops, and the operations behind the brand, with endurance, integrity, and accessibility as defaults.',
  },
  {
    title: 'For sister enterprises',
    body: 'Verdant subsidiaries can engage Dubard for brand and digital work that must stay coherent with Foundation doctrine, without inventing a separate identity system for every project.',
  },
  {
    title: 'For external clients',
    body: 'You hire Dubard Studio. Verdant is the holdings relationship behind us: standards, stewardship, and honesty. It is findable here, never hidden, and never a third competing brand on the page.',
  },
] as const;

/**
 * Verdant relationship page. Dubard Studio is the name; the firm is a digital solutions company within Verdant.
 */
export default function VerdantPage() {
  const settings = getSettings();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="verdant-page">
        <header className="verdant-hero" aria-labelledby="verdant-heading">
          <div className="container verdant-hero-inner">
            <span className="section-label">Ecosystem</span>
            <h1 id="verdant-heading" className="verdant-hero-title">
              Part of Verdant Holdings
            </h1>
            <p className="verdant-hero-lead">
              Dubard Studio leads on this site. The relationship to Verdant Holdings is honest and
              findable: never hidden, never a third orphan identity.
            </p>
          </div>
        </header>

        <div className="container verdant-page-body">
          <ol className="verdant-point-list">
            {POINTS.map((point, index) => (
              <li key={point.title} className="verdant-point">
                <span className="verdant-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="verdant-point-title">{point.title}</h2>
                  <p>{point.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {VERDANT_HOLDINGS_URL ? (
            <p className="verdant-holding-link">
              <a href={VERDANT_HOLDINGS_URL} rel="noopener noreferrer">
                Visit Verdant Holdings
              </a>
            </p>
          ) : (
            <p className="muted verdant-holding-link">
              The public Holding site URL will appear here when published.
            </p>
          )}

          <section className="verdant-cta" aria-labelledby="verdant-cta-heading">
            <h2 id="verdant-cta-heading" className="section-title">
              Engaging Dubard Studio
            </h2>
            <p className="section-desc">
              Whether you are an external client or a Verdant sister enterprise, start with the
              business outcome you need. We will respond honestly about fit.
            </p>
            <div className="verdant-cta-actions">
              <Link href="/contact/" className="btn btn-primary">
                {primaryCta}
              </Link>
              <Link href="/services/" className="btn btn-outline">
                View services
              </Link>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
