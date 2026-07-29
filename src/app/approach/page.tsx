import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Approach',
    description:
      'How Dubard Studio works: craft with consequence, accessibility as default, honest conversion, and Verdant-aligned integrity.',
    path: '/approach/',
  });
}

const PRINCIPLES = [
  {
    title: 'One system, not three moods',
    body: 'Brand, site, and product should feel related. We design for coherence so organizations stop paying for fragmented reinvention every season.',
  },
  {
    title: 'Accessible is not optional',
    body: 'Inclusion is part of quality. We target WCAG 2.2 AA posture and treat keyboard, contrast, and motion preferences as craft, not a patch after launch.',
  },
  {
    title: 'Clarity converts honestly',
    body: 'We grow demand without burning trust. No dark patterns, no claims we cannot substantiate.',
  },
  {
    title: 'Part of Verdant',
    body: 'Dubard is a Verdant Holdings studio. We inherit Foundation standards and keep the Holding relationship honest and findable.',
  },
] as const;

const STEPS = [
  {
    title: 'Qualify',
    body: 'We check mission fit, integrity fit, and whether we can honestly help. Misaligned work is declined early.',
  },
  {
    title: 'Discover',
    body: 'We define the business problem, audience, constraints, and what success looks like before we design.',
  },
  {
    title: 'Propose',
    body: 'We recommend the smallest coherent scope, with clear trade-offs, timeline honesty, and stewardship model.',
  },
  {
    title: 'Make',
    body: 'We iterate with critique loops and accessibility gates, so craft and inclusion ship together.',
  },
  {
    title: 'Prove & steward',
    body: 'We launch with measurement that respects trust, then hand off or retain so the work keeps earning respect.',
  },
] as const;

/**
 * Approach: method, integrity, accessibility, Verdant alignment.
 */
export default function ApproachPage() {
  const settings = getSettings();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="approach-page">
        <header className="approach-hero" aria-labelledby="approach-heading">
          <div className="container approach-hero-inner">
            <span className="section-label">Method</span>
            <h1 id="approach-heading" className="approach-hero-title">
              How we work
            </h1>
            <p className="approach-hero-lead">
              Craft with consequence: clarity, accessibility, and honest conversion. A calm process
              built for business outcomes that still deserve respect years later.
            </p>
          </div>
        </header>

        <div className="container approach-page-body">
          <section className="approach-principles" aria-labelledby="principles-heading">
            <h2 id="principles-heading" className="approach-section-title">
              Principles that govern every engagement
            </h2>
            <ol className="approach-principle-list">
              {PRINCIPLES.map((item, index) => (
                <li key={item.title} className="approach-principle">
                  <span className="approach-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="approach-principle-title">{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="approach-steps" aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="approach-section-title">
              From first conversation to stewardship
            </h2>
            <ol className="approach-step-list">
              {STEPS.map((step, index) => (
                <li key={step.title} className="approach-step">
                  <span className="approach-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="approach-step-title">{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <p className="approach-verdant-note">
            Learn how Dubard relates to the wider holdings on our{' '}
            <Link href="/verdant/">Verdant</Link> page.
          </p>

          <section className="approach-cta" aria-labelledby="approach-cta-heading">
            <h2 id="approach-cta-heading" className="section-title">
              Ready to see if we are a fit?
            </h2>
            <p className="section-desc">
              Take the short fit checklist, or tell us the business outcome you need. We will respond
              honestly about scope and fit.
            </p>
            <div className="approach-cta-actions">
              <Link href="/fit/" className="btn btn-primary">
                Fit checklist
              </Link>
              <Link href="/contact/" className="btn btn-outline">
                {primaryCta}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
