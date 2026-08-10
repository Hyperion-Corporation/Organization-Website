'use client';

// Add useState to manage the menu open/closed state
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  User,
  Code,
  Wrench,
  Tv,
  FileText,
  PenTool,
  Folder,
  Menu, // Import Menu icon for the closed state
  X,    // Import X icon for the open state
  Sun,
  Moon
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/content/about', icon: User },
  { label: 'Projects', href: '/content/projects', icon: Code },
  { label: 'Reports', href: '/content/reports', icon: FileText },
  { label: 'Tools', href: '/content/tools', icon: Wrench },
  { label: 'Updates', href: '/content/posts', icon: PenTool },
  { label: 'Media', href: '/content/media', icon: Tv },
  { label: 'Other', href: '/content/other', icon: Folder },
];

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({ darkMode, toggleTheme }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    // Remove md:hidden to make visible on desktop
    <header className="w-full bg-stone-50/80 dark:bg-helios-ink/80 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title Area */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl text-stone-900 dark:text-white flex items-center gap-2" onClick={closeMobileMenu}>
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-blue-600 bg-clip-text text-transparent">Hyperion</span>
              <span className="text-stone-900 dark:text-white">Corp</span>
            </Link>
          </div>

          {/* Controls: Theme Toggle & Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-stone-600 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Mobile Menu Button - Hide on Large Screens where Sidebar exists */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-stone-600 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE Menu Dropdown Container */}
      {/* Conditionally render based on state */}
      {isMobileMenuOpen && (
        <div className="absolute w-full bg-stone-50 dark:bg-helios-ink border-b border-stone-200 dark:border-slate-800 shadow-lg z-40 animate-in slide-in-from-top-2">
          {/* ... (Menu rendering logic remains the same) ... */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-200
                    ${isActive
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}