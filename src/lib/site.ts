/**
 * Site-wide constants for SEO and ecosystem links.
 * Override public URL with NEXT_PUBLIC_SITE_URL in Netlify env when known.
 */
export const SITE_NAME = 'Dubard Studio';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.dubardstudio.it.com';

/**
 * Public Holding URL — set NEXT_PUBLIC_VERDANT_URL when the Holding site is live.
 * Until then the footer uses plain-text honesty (no fabricated domain).
 */
export const VERDANT_HOLDINGS_URL =
  process.env.NEXT_PUBLIC_VERDANT_URL?.replace(/\/$/, '') || '';

/** Primary nav — blueprint IA (Phase 2). Trailing slashes match `next.config` export. */
export const NAV_LINKS = [
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/approach/', label: 'Approach' },
  { href: '/studio/', label: 'Studio' },
] as const;

/** Footer secondary links — Wave A/B per ADR-0004 / ADR-0005 IA */
export const FOOTER_LINKS = [
  { href: '/verdant/', label: 'Verdant' },
  { href: '/book/', label: 'Book a consultation' },
  { href: '/resources/', label: 'Resources' },
  { href: '/fit/', label: 'Fit checklist' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/accessibility/', label: 'Accessibility' },
] as const;
