import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Privacy',
    description: 'How Dubard Studio handles information you share through this website.',
    path: '/privacy/',
  });
}

/**
 * Privacy notice for contact and site use. Counsel review welcome before scale.
 */
export default function PrivacyPage() {
  const settings = getSettings();
  const updated = '21 July 2026';

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="legal-page">
        <header className="legal-hero" aria-labelledby="privacy-heading">
          <div className="container legal-hero-inner">
            <span className="section-label">Legal</span>
            <h1 id="privacy-heading" className="legal-hero-title">
              Privacy
            </h1>
            <p className="legal-hero-lead">
              How we handle information you share with Dubard Studio through this website. Last
              updated {updated}.
            </p>
          </div>
        </header>

        <div className="container legal-body">
          <section>
            <h2>Who we are</h2>
            <p>
              Dubard Studio is a digital solutions firm and a company within Verdant Holdings. This
              notice covers the public website and inquiries submitted through it.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <p>When you use the contact form, we may collect:</p>
            <ul>
              <li>Name and email address</li>
              <li>Organization and role</li>
              <li>What you need help with and your project summary</li>
              <li>Optional timeline, referral source, and whether you are a Verdant sister enterprise</li>
            </ul>
            <p>
              If you email us or message us on WhatsApp, those platforms process the conversation
              under their own terms. We use what you send so we can respond.
            </p>
          </section>

          <section>
            <h2>How we use information</h2>
            <p>We use inquiry details to:</p>
            <ul>
              <li>Respond to your request and assess fit</li>
              <li>Route Verdant sister inquiries appropriately</li>
              <li>Operate and improve the website and our services</li>
              <li>Meet legal or accounting obligations when required</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </section>

          <section>
            <h2>How forms are processed</h2>
            <p>
              Contact form submissions are processed through our hosting provider (Netlify Forms).
              Access is limited to people who need it to respond. We keep submissions only as long as
              needed for the inquiry and ordinary business records.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can email us to ask what inquiry data we hold about you, or to request correction
              or deletion where that does not conflict with legal retention needs.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Privacy questions:{' '}
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>
            <p className="legal-nav">
              <Link href="/contact/">Contact</Link>
              {' · '}
              <Link href="/accessibility/">Accessibility</Link>
            </p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
