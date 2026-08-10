import React from 'react';
import Link from 'next/link';
import { Moon, Sun, Github } from 'lucide-react';
import { PRIMARY_NAV } from '../../../../constants/siteNav';

interface FooterProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode, toggleTheme }) => {
  const explore = PRIMARY_NAV.filter((n) =>
    ['about', 'projects', 'tools', 'reports'].includes(n.slug)
  );
  const publish = PRIMARY_NAV.filter((n) =>
    ['posts', 'media', 'other'].includes(n.slug)
  );

  return (
    <footer className="forge-footer">
      <div className="forge-footer__grid">
        <div className="forge-footer__brand">
          <p className="forge-footer__eyebrow">Hyperion Corporation</p>
          <p className="forge-footer__lead">
            Software that optimizes creative and engineering work for games, simulations, and
            related systems—starting with Visual Graph Programming.
          </p>
          <a
            href="https://github.com/Hyperion-Corporation"
            target="_blank"
            rel="noopener noreferrer"
            className="forge-footer__social"
          >
            <Github size={16} aria-hidden /> GitHub Organization
          </a>
        </div>

        <div>
          <p className="forge-footer__col-title">Explore</p>
          <ul className="forge-footer__links">
            {explore.map((item) => (
              <li key={item.slug}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="forge-footer__col-title">Publish</p>
          <ul className="forge-footer__links">
            {publish.map((item) => (
              <li key={item.slug}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="forge-footer__col-title">Site</p>
          <ul className="forge-footer__links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <button type="button" onClick={toggleTheme} className="forge-footer__theme" aria-label="Toggle Dark Mode">
                {darkMode ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="forge-footer__bar">
        <p>&copy; {new Date().getFullYear()} Hyperion Corporation. All rights reserved.</p>
        <p className="forge-footer__meta">Static export · GitHub Pages · Helios Forge identity</p>
      </div>
    </footer>
  );
};

export default Footer;
