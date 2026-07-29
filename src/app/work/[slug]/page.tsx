import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getSettings,
  getProjectBySlug,
  getProjectSlugs,
  getProjects,
  type Project,
} from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getProjectSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return buildPageMetadata({ title: 'Not found', description: '', noIndex: true });
  return buildPageMetadata({
    title: project.title,
    description: project.seoDescription || project.description,
    path: `/work/${project.slug}/`,
  });
}

function CaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="case-section">
      <h2 className="case-section-title">{title}</h2>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

function RelatedCases({ current, others }: { current: Project; others: Project[] }) {
  if (others.length === 0) return null;
  return (
    <aside className="case-related" aria-labelledby="case-related-heading">
      <h2 id="case-related-heading" className="case-related-title">
        More selected work
      </h2>
      <ul className="case-related-list">
        {others.map(p => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}/`} className="case-related-link">
              <span className="case-related-meta">
                {[p.industry, p.client].filter(Boolean).join(' · ')}
              </span>
              <span className="case-related-name">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="case-related-all">
        <Link href="/work/">View all work</Link>
        <span className="visually-hidden"> (currently viewing {current.title})</span>
      </p>
    </aside>
  );
}

/**
 * Individual case study — problem → solution → outcomes → value.
 * Business narrative first; technology only if it serves the story (CMS craft notes).
 */
export default function CaseStudyPage({ params }: Props) {
  const settings = getSettings();
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = getProjects()
    .filter(p => p.slug !== project.slug)
    .slice(0, 2);

  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';
  const hasNarrative = Boolean(
    project.problem || project.approach || project.outcomes || project.valueDelivered
  );

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <article className="case-page">
        <header className="case-hero">
          <div className="container case-hero-inner">
            <p className="case-back">
              <Link href="/work/">← All work</Link>
            </p>
            {project.industry && <span className="section-label">{project.industry}</span>}
            <h1 className="case-hero-title">{project.title}</h1>
            <p className="case-hero-lead">{project.description}</p>

            <dl className="case-facts">
              {project.client && (
                <div className="case-fact">
                  <dt>Client</dt>
                  <dd>{project.client}</dd>
                </div>
              )}
              {project.industry && (
                <div className="case-fact">
                  <dt>Industry</dt>
                  <dd>{project.industry}</dd>
                </div>
              )}
              {project.timeline && (
                <div className="case-fact">
                  <dt>Timeline</dt>
                  <dd>{project.timeline}</dd>
                </div>
              )}
            </dl>
          </div>
        </header>

        <div className="container case-page-inner">
          <div className="case-media">
            <Image
              src={project.image}
              alt=""
              width={1100}
              height={688}
              priority
              className="case-image"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>

          <div className="case-body">
            {project.problem && (
              <CaseSection title="Business challenge">
                <p>{project.problem}</p>
              </CaseSection>
            )}

            {project.approach && (
              <CaseSection title="Solution">
                <p>{project.approach}</p>
              </CaseSection>
            )}

            {project.outcomes && (
              <CaseSection title="Business outcomes">
                <p>{project.outcomes}</p>
              </CaseSection>
            )}

            {project.valueDelivered && (
              <CaseSection title="Value delivered">
                <p>{project.valueDelivered}</p>
              </CaseSection>
            )}

            {project.craftNotes && (
              <CaseSection title="Integrity & craft decisions">
                <p>{project.craftNotes}</p>
              </CaseSection>
            )}

            {!hasNarrative && (
              <CaseSection title="Overview">
                <p>{project.description}</p>
              </CaseSection>
            )}

            {project.body && <div className="case-md">{project.body}</div>}
          </div>

          <section className="case-cta" aria-labelledby="case-cta-heading">
            <h2 id="case-cta-heading" className="section-title">
              Facing a similar challenge?
            </h2>
            <p className="section-desc">
              Tell us the business outcome you need. We will respond honestly about fit.
            </p>
            <div className="case-actions">
              <Link href="/contact/" className="btn btn-primary">
                {primaryCta}
              </Link>
              {project.url && (
                <a
                  href={project.url}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live result
                </a>
              )}
            </div>
          </section>

          <RelatedCases current={project} others={related} />
        </div>
      </article>
    </SiteShell>
  );
}
