import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings, getTestimonials, getPeople } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';
import TestimonialsList from '@/components/feedback/TestimonialsList';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Studio',
    description:
      'Dubard Studio: a Verdant craft studio in Monrovia, working with Liberian, diaspora, and international clients on brand and digital outcomes that endure.',
    path: '/studio/',
  });
}

const PRINCIPLES = [
  {
    title: 'Business outcomes over showcase',
    body: 'We measure success by clarity, trust, and conversion that holds up, not by how trendy the deliverable looks in a portfolio.',
  },
  {
    title: 'Honest fit conversations',
    body: 'We say early when we are not the right studio. Protecting craft and integrity means declining work that would force dark patterns or disposable aesthetics.',
  },
  {
    title: 'Stewardship after launch',
    body: 'Launch is not the finish line. We document, hand off, or retain so the work stays coherent as the business grows.',
  },
  {
    title: 'Local reality, global standard',
    body: 'Based in Monrovia and available worldwide. We understand Liberian and diaspora contexts, and we deliver to the same craft and accessibility bars as any Verdant enterprise.',
  },
] as const;

/**
 * Studio: principles and character. Light people/proof. No vanity portfolio tone.
 */
export default function StudioPage() {
  const settings = getSettings();
  const testimonials = getTestimonials();
  const people = getPeople();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="studio-page">
        <header className="studio-hero" aria-labelledby="studio-heading">
          <div className="container studio-hero-inner">
            <span className="section-label">Studio</span>
            <h1 id="studio-heading" className="studio-hero-title">
              Dubard Studio
            </h1>
            <p className="studio-hero-lead">{settings.aboutPara1}</p>
            {settings.location && <p className="studio-hero-meta">{settings.location}</p>}
          </div>
        </header>

        <div className="container studio-page-body">
          {settings.aboutPara2 && (
            <section className="studio-story" aria-labelledby="studio-story-heading">
              <h2 id="studio-story-heading" className="studio-section-title">
                Who we serve
              </h2>
              <p className="studio-story-copy">{settings.aboutPara2}</p>
            </section>
          )}

          {people.length > 0 && (
            <section className="studio-people" aria-labelledby="studio-people-heading">
              <h2 id="studio-people-heading" className="studio-section-title">
                People
              </h2>
              <p className="studio-section-lead">The humans behind the work.</p>
              <ul className="studio-people-list">
                {people.map(person => (
                  <li key={person.slug} className="studio-person">
                    {person.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={person.photo}
                        alt=""
                        className="studio-person-photo"
                        width={96}
                        height={96}
                      />
                    ) : null}
                    <div className="studio-person-copy">
                      <h3 className="studio-person-name">{person.name}</h3>
                      <p className="studio-person-role">{person.role}</p>
                      <p className="studio-person-bio">{person.bio}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="studio-principles" aria-labelledby="studio-principles-heading">
            <h2 id="studio-principles-heading" className="studio-section-title">
              How the studio shows up
            </h2>
            <ul className="studio-principle-list">
              {PRINCIPLES.map(item => (
                <li key={item.title} className="studio-principle">
                  <h3 className="studio-principle-title">{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          {testimonials.length > 0 && (
            <section className="studio-quotes" aria-labelledby="studio-quotes-heading">
              <h2 id="studio-quotes-heading" className="studio-section-title">
                What clients say
              </h2>
              <p className="studio-section-lead">
                Attributable feedback from real engagements. Not a rotating wallpaper of praise.
              </p>
              <TestimonialsList items={testimonials} />
            </section>
          )}

          <section className="studio-links" aria-labelledby="studio-links-heading">
            <h2 id="studio-links-heading" className="studio-section-title">
              Dig deeper
            </h2>
            <ul className="studio-link-list">
              <li>
                <Link href="/approach/">Our approach</Link>
                <span>How we qualify, make, and steward work</span>
              </li>
              <li>
                <Link href="/work/">Selected work</Link>
                <span>Business challenges and value delivered</span>
              </li>
              <li>
                <Link href="/verdant/">Verdant Holdings</Link>
                <span>How Dubard sits inside the ecosystem</span>
              </li>
            </ul>
          </section>

          <section className="studio-cta" aria-labelledby="studio-cta-heading">
            <h2 id="studio-cta-heading" className="section-title">
              Want to work with the studio?
            </h2>
            <p className="section-desc">
              Share the business outcome you need. We will respond honestly about fit.
            </p>
            <div className="studio-cta-actions">
              <Link href="/contact/" className="btn btn-primary">
                {primaryCta}
              </Link>
              {settings.cvFile && (
                <a href={settings.cvFile} className="btn btn-outline" download>
                  Download company profile
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
