import Link from 'next/link';
import { getSettings } from '@/lib/content';
import SiteShell from '@/components/layout/SiteShell';

export default function NotFound() {
  const settings = getSettings();

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="legal-page">
        <header className="legal-hero" aria-labelledby="not-found-heading">
          <div className="container legal-hero-inner">
            <span className="section-label">404</span>
            <h1 id="not-found-heading" className="legal-hero-title">
              Page not found
            </h1>
            <p className="legal-hero-lead">
              That URL is not on this site. Try one of the paths below, or tell us what you were
              looking for.
            </p>
          </div>
        </header>

        <div className="container legal-body">
          <ul className="not-found-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/work/">Work</Link>
            </li>
            <li>
              <Link href="/services/">Services</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </SiteShell>
  );
}
