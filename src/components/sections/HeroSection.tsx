import Link from 'next/link';
import type { SiteSettings } from '@/lib/content';

type HeroSectionProps = {
  settings: SiteSettings;
};

/**
 * Home first viewport — brand name · promise · support · CTAs · dominant plane.
 * Header keeps the official logo mark; hero uses typographic brand for clarity.
 */
export default function HeroSection({ settings }: HeroSectionProps) {
  const brand = settings.siteTitle || 'Dubard Studio';
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';
  const secondaryCta = settings.secondaryCtaLabel || 'View selected work';
  const hasImage = Boolean(settings.heroImage);

  return (
    <section
      className={`hero hero--bleed${hasImage ? '' : ' hero--field'}`}
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-heading"
    >
      {hasImage && (
        <div className="hero-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={settings.heroImage!} alt="" className="hero-media-img" />
        </div>
      )}

      <div className="hero-scrim" aria-hidden="true" />

      <div className="container hero-content">
        <p className="hero-brand">{brand}</p>
        <h1 id="hero-heading" className="hero-headline">
          {settings.heroHeadline}
        </h1>
        <p className="hero-lead">{settings.heroSubheadline}</p>
        <div className="hero-ctas">
          <Link href="/contact/" className="btn btn-primary">
            {primaryCta}
          </Link>
          <Link href="/work/" className="btn btn-ghost">
            {secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
