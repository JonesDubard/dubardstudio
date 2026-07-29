import Link from 'next/link';
import type { SiteSettings } from '@/lib/content';

type AboutSectionProps = {
  settings: SiteSettings;
  variant?: 'page' | 'teaser';
};

export default function AboutSection({ settings, variant = 'page' }: AboutSectionProps) {
  const isTeaser = variant === 'teaser';

  if (isTeaser) {
    const label = settings.homeStudioLabel || 'Why Dubard';
    const title =
      settings.homeStudioTitle ||
      'A digital solutions firm clients trust with business-critical presence';

    return (
      <section className="section home-studio-teaser" id="home-studio" aria-labelledby="aboutHeading">
        <div className="container home-studio-inner">
          <span className="section-label">{label}</span>
          <h2 id="aboutHeading" className="section-title">
            {title}
          </h2>
          <p className="home-studio-copy">{settings.aboutPara1}</p>
          <div className="about-actions">
            <Link href="/studio/" className="btn btn-outline">
              About the studio
            </Link>
            <Link href="/approach/" className="btn btn-outline">
              Our approach
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="about" id="studio" aria-labelledby="aboutHeading">
      <div className="container about-inner">
        <div className="about-content" style={{ maxWidth: '40rem' }}>
          <span className="section-label">Studio</span>
          <h2 id="aboutHeading">Dubard Studio</h2>
          <p className="about-copy">{settings.aboutPara1}</p>
          {settings.aboutPara2 && <p className="about-copy">{settings.aboutPara2}</p>}

          <div className="about-actions">
            {settings.cvFile && (
              <a href={settings.cvFile} className="btn btn-primary" download>
                Download company profile
              </a>
            )}
            <Link href="/contact/" className="btn btn-outline">
              Start a conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
