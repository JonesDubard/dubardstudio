import Link from 'next/link';
import type { Metadata } from 'next';
import { getSettings } from '@/lib/content';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Message received',
    description: 'Your message was sent to Dubard Studio.',
    path: '/success/',
    noIndex: true,
  });
}

export default function SuccessPage() {
  const settings = getSettings();
  const waLink = buildWhatsAppLink(
    settings.whatsapp,
    `Hi Dubard Studio. I just sent a message via your site.`
  );

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="success-page">
        <div className="container success-inner">
          <span className="section-label">Thank you</span>
          <h1 className="success-title">Message received</h1>
          <p className="success-copy">
            Thanks for reaching out. We will review your note and respond within two business days
            with an honest read on fit—or, for consultation requests, a confirmed or proposed time.
            No fake instant proposals.
          </p>
          <div className="success-actions">
            <a href={waLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
            <Link href="/" className="btn btn-outline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
