import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';
import BookingForm from '@/components/forms/BookingForm';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Book a consultation',
    description:
      'Request a consultation with Dubard Studio. We confirm times by email within two business days—no instant calendar theater.',
    path: '/book/',
  });
}

/**
 * Wave A — Consultation booking request (ADR-0004).
 * Contact remains primary conversion; this is a secondary scheduling path.
 */
export default function BookPage() {
  const settings = getSettings();

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="contact-page">
        <header className="contact-hero" aria-labelledby="book-heading">
          <div className="container contact-hero-inner">
            <span className="section-label">Consultation</span>
            <h1 id="book-heading" className="contact-hero-title">
              Book a consultation
            </h1>
            <p className="contact-hero-lead">
              Request a conversation about fit and next steps. We review capacity and confirm or
              propose times by email within two business days.
            </p>
          </div>
        </header>

        <div className="container contact-page-body">
          <div className="contact-layout">
            <div className="contact-form-panel">
              <BookingForm email={settings.email} />
            </div>

            <aside className="contact-aside" aria-label="Booking notes">
              <h2 className="contact-aside-title">How this works</h2>
              <ol className="book-steps">
                <li>You send a request with a preferred window.</li>
                <li>We check real capacity and reply by email.</li>
                <li>If it is not a fit, we say so honestly.</li>
              </ol>

              <p className="contact-aside-note">
                Need a fuller project brief instead? Use the qualified{' '}
                <Link href="/contact/">contact form</Link>. That remains the primary path for new
                work inquiries.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
