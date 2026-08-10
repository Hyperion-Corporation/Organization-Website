import React from 'react';
import Link from 'next/link';
import { Moon, Sun, Github } from 'lucide-react';
import { PRIMARY_NAV, SECONDARY_NAV } from '../../../../constants/siteNav';

interface FooterProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode, toggleTheme }) => {
  const companyUnique = PRIMARY_NAV.filter((n) =>
    ['about', 'products', 'projects'].includes(n.slug)
  );

  const resources = PRIMARY_NAV.filter((n) =>
    ['reports', 'posts', 'faq', 'contact'].includes(n.slug)
  ).concat(SECONDARY_NAV.filter((n) => n.slug === 'press'));

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
          <p className="forge-footer__col-title">Company</p>
          <ul className="forge-footer__links">
            {companyUnique.map((item) => (
              <li key={item.slug}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="forge-footer__col-title">Resources</p>
          <ul className="forge-footer__links">
            {resources.map((item) => (
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
              <button
                type="button"
                onClick={toggleTheme}
                className="forge-footer__theme"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="forge-footer__bar">
        <p>&copy; {new Date().getFullYear()} Hyperion Corporation. All rights reserved.</p>
        <p className="forge-footer__meta">Static export · GitHub Pages · corporate IA</p>
      </div>
    </footer>
  );
};

export default Footer;
