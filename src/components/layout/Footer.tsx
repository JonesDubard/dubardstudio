import Link from 'next/link';
import { FOOTER_LINKS, VERDANT_HOLDINGS_URL } from '@/lib/site';

type FooterProps = {
  email: string;
  /** CMS verdantUrl preferred; falls back to env constant */
  verdantUrl?: string;
};

export default function Footer({ email, verdantUrl }: FooterProps) {
  const holdingUrl = (verdantUrl || VERDANT_HOLDINGS_URL).replace(/\/$/, '');

  return (
    <footer className="site-footer">
      <div className="container footer-inner footer-inner-stack">
        <nav className="footer-nav" aria-label="Footer">
          {FOOTER_LINKS.map(link => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          {holdingUrl ? (
            <a href={holdingUrl} rel="noopener noreferrer">
              Verdant Holdings
            </a>
          ) : null}
        </nav>
        <div className="footer-meta">
          <p>
            © {new Date().getFullYear()} Dubard Studio
            {' · '}
            <span>A Verdant Holdings company</span>
          </p>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </footer>
  );
}
