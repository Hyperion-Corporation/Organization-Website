'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Github } from 'lucide-react';
import { PRIMARY_NAV, sectionFromPath } from '../../../../constants/siteNav';
import orgLogo from '@/assets/icons/Hyperion-mark.png';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

/**
 * Product-site top navigation (Helios Forge).
 * Replaces the personal-portfolio pattern of sticky left sidebar + sparse header.
 */
export default function Header({ darkMode, toggleTheme }: HeaderProps) {
  const pathname = usePathname();
  const active = sectionFromPath(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header className="forge-topbar sticky top-0 z-50">
      <div className="forge-topbar__inner">
        <Link href="/" className="forge-brand" onClick={() => setMobileOpen(false)}>
          <span className="forge-brand__mark">
            <img src={orgLogo.src} alt="" width={36} height={36} decoding="async" />
          </span>
          <span className="forge-brand__text">
            <span className="forge-brand__name">Hyperion</span>
            <span className="forge-brand__tag">Corporation</span>
          </span>
        </Link>

        <nav className="forge-nav" aria-label="Primary">
          {PRIMARY_NAV.map((item) => {
            const isActive = active === item.slug;
            return (
              <Link
                key={item.slug}
                href={item.href}
                className={`forge-nav__link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.shortLabel ?? item.label}
              </Link>
            );
          })}
        </nav>

        <div className="forge-topbar__actions">
          <a
            href="https://github.com/Hyperion-Corporation"
            target="_blank"
            rel="noopener noreferrer"
            className="forge-icon-btn"
            aria-label="Hyperion on GitHub"
          >
            <Github size={18} />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="forge-icon-btn"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="forge-icon-btn forge-topbar__menu-btn"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="forge-mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="forge-mobile-nav" className="forge-mobile-nav" role="dialog" aria-label="Site menu">
          <nav className="forge-mobile-nav__list" aria-label="Mobile primary">
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`forge-mobile-nav__link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={18} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
