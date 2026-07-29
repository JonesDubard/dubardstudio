import type { Metadata } from 'next';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { buildPageMetadata } from '@/lib/seo';
import SiteShell from '@/components/layout/SiteShell';
import ContactForm from '@/components/forms/ContactForm';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Contact',
    description:
      'Start a qualified conversation with Dubard Studio about brand, websites, QA, Mobile Money, workshops, or digital operations.',
    path: '/contact/',
  });
}

/**
 * Contact: qualified inquiry form + honest next step. Business outcome first.
 */
export default function ContactPage() {
  const settings = getSettings();
  const primaryCta = settings.primaryCtaLabel || 'Start a conversation';
  const waLink = buildWhatsAppLink(
    settings.whatsapp,
    `Hi Dubard Studio. I visited your site and would like to discuss a project.`
  );

  return (
    <SiteShell tagline={settings.tagline} email={settings.email}>
      <div className="contact-page">
        <header className="contact-hero" aria-labelledby="contact-heading">
          <div className="container contact-hero-inner">
            <span className="section-label">Contact</span>
            <h1 id="contact-heading" className="contact-hero-title">
              {primaryCta}
            </h1>
            <p className="contact-hero-lead">
              Tell us the business problem you need to solve. We will respond honestly about fit,
              usually within two business days. No dark patterns, no fake instant proposals.
            </p>
          </div>
        </header>

        <div className="container contact-page-body">
          <div className="contact-layout">
            <div className="contact-form-panel">
              <ContactForm email={settings.email} />
            </div>

            <aside className="contact-aside" aria-label="Other ways to reach us">
              <h2 className="contact-aside-title">Other channels</h2>
              <dl className="contact-facts">
                <div className="contact-fact">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </dd>
                </div>
                {settings.location && (
                  <div className="contact-fact">
                    <dt>Location</dt>
                    <dd>{settings.location}</dd>
                  </div>
                )}
              </dl>

              <a href={waLink} className="whatsapp-cta" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.857L.057 23.571l5.853-1.534A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.359-.213-3.73.978.994-3.641-.234-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                Message on WhatsApp
              </a>

              <p className="contact-aside-note">
                Prefer to request a consultation time?{' '}
                <Link href="/book/">Book a consultation</Link>. Prefer a lighter path first? Browse{' '}
                <Link href="/services/">services</Link> or <Link href="/work/">selected work</Link>.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
