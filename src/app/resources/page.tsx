import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings, getResources } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Resources',
    description:
      'Value-first guides and materials from Dubard Studio. No download walls, no gated proof theater.',
    path: '/resources/',
  });
}

/**
 * Wave A — Resource library (ADR-0004).
 * Ungated list; Contact remains primary conversion.
 */
export default function ResourcesPage() {
  const settings = getSettings();
  const resources = getResources();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="resources-page">
        <header className="resources-hero" aria-labelledby="resources-heading">
          <div className="container resources-hero-inner">
            <span className="section-label">Library</span>
            <h1 id="resources-heading" className="resources-hero-title">
              Resources
            </h1>
            <p className="resources-hero-lead">
              Practical material for buyers who want clarity before they talk. Free to use. No email
              wall.
            </p>
          </div>
        </header>

        <div className="container resources-page-body">
          {resources.length === 0 ? (
            <p className="resources-empty">
              Resources are being prepared. Meanwhile, browse{' '}
              <Link href="/approach/">our approach</Link> or{' '}
              <Link href="/work/">selected work</Link>.
            </p>
          ) : (
            <ul className="resources-list">
              {resources.map(item => {
                const external = item.url.startsWith('http');
                const download = item.url.endsWith('.pdf') || item.type === 'PDF';

                return (
                  <li key={item.slug} className="resource-item">
                    <div className="resource-meta">
                      <span className="resource-type">{item.type}</span>
                      <h2 className="resource-title">
                        <a
                          href={item.url}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          {...(download ? { download: true } : {})}
                        >
                          {item.title}
                        </a>
                      </h2>
                      <p className="resource-summary">{item.summary}</p>
                    </div>
                    <a
                      href={item.url}
                      className="resource-action"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      {...(download ? { download: true } : {})}
                    >
                      {download ? 'Download' : external ? 'Open' : 'Read'}
                      <span className="visually-hidden">: {item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          <section className="resources-cta" aria-labelledby="resources-cta-heading">
            <h2 id="resources-cta-heading" className="section-title">
              Ready for a conversation?
            </h2>
            <p className="section-desc">
              Share the business outcome you need, or request a consultation time. We respond
              honestly about fit.
            </p>
            <div className="resources-cta-actions">
              <Link href="/contact/" className="btn btn-primary">
                {primaryCta}
              </Link>
              <Link href="/fit/" className="btn btn-outline">
                Fit checklist
              </Link>
              <Link href="/book/" className="btn btn-outline">
                Book a consultation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
