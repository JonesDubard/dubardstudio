'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#testimonials', label: 'Testimonials' },
];

export default function Header({ tagline }: { tagline: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);

  // Sync with initial theme set by inline script
  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    setTheme(t || 'light');

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dubard-theme', next);
    setTheme(next);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header" style={{ boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none' }}>
        <div className="container header-inner">
          {/* Brand */}
          <div className="brand">
            <Link href="#home" aria-label="Dubard Studio home">
              <strong>Dubard Studio</strong>
            </Link>
            <span className="tagline">{tagline}</span>
          </div>

          {/* Desktop nav */}
          <nav className="nav-desktop" aria-label="Main navigation">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            <a href="#contact" className="nav-cta">Contact</a>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              onClick={toggleTheme}
            >
              <span className="icon-sun" aria-hidden>☀️</span>
              <span className="icon-moon" aria-hidden>🌙</span>
            </button>

            <button
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <nav
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <button className="mobile-nav-close" onClick={closeMenu} aria-label="Close menu">✕</button>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <a href="#contact" onClick={closeMenu} style={{ color: 'var(--accent)' }}>Contact →</a>
      </nav>
    </>
  );
}
