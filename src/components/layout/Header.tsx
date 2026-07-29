'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/brand/BrandLogo';
import { NAV_LINKS } from '@/lib/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';

type HeaderProps = {
  tagline: string;
  whatsapp?: string;
};

export default function Header({ tagline, whatsapp }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    setTheme(t || 'light');

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dubard-theme', next);
    setTheme(next);
  };

  const closeMenu = () => setMenuOpen(false);
  const waLink = whatsapp
    ? buildWhatsAppLink(whatsapp, 'Hi Dubard Studio. I found you on your website.')
    : '';

  return (
    <>
      <header
        className="site-header"
        style={{ boxShadow: scrolled ? '0 1px 20px rgba(28,28,56,0.08)' : 'none' }}
      >
        <div className="container header-inner">
          <div className="brand">
            <Link href="/" className="brand-link" aria-label="Dubard Studio home" onClick={closeMenu}>
              <BrandLogo size="header" alt="" />
            </Link>
            {tagline ? <span className="tagline">{tagline}</span> : null}
          </div>

          <nav className="nav-desktop" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact/" className="nav-cta">
              Start a conversation
            </Link>
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              onClick={toggleTheme}
            >
              <span className="icon-sun" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              </span>
              <span className="icon-moon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
                </svg>
              </span>
            </button>

            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(open => !open)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <nav
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <button className="mobile-nav-close" type="button" onClick={closeMenu} aria-label="Close menu">
          ✕
        </button>
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <Link href="/contact/" className="mobile-nav-cta" onClick={closeMenu}>
          Start a conversation
        </Link>
        <div className="mobile-nav-secondary">
          <Link href="/book/" onClick={closeMenu}>
            Book a consultation
          </Link>
          <Link href="/fit/" onClick={closeMenu}>
            Fit checklist
          </Link>
          <Link href="/resources/" onClick={closeMenu}>
            Resources
          </Link>
          {waLink ? (
            <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
              WhatsApp
            </a>
          ) : null}
        </div>
      </nav>
    </>
  );
}
