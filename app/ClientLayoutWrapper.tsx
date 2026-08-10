'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Sidebar from '../src/frameworks/react/components/layout/Sidebar';
import Footer from '../src/frameworks/react/components/layout/Footer';
import Header from '../src/frameworks/react/components/layout/Header';
import NetworkFieldBackdrop from '../src/frameworks/react/components/graphics/NetworkFieldBackdrop';
import { useAppDispatch } from '../src/libraries/redux/store/hooks';
import { setTheme } from '../src/libraries/redux/actions/appActions';
import { persistTheme, readStoredTheme } from '../src/libraries/redux/services/persistence';
import ReduxProvider from '../src/libraries/redux/store/ReduxProvider';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

const ClientLayoutContent: React.FC<ClientLayoutWrapperProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to true (Dark Mode)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  // Expanded by default so desktop shell has labels; users can still collapse.
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // --- getActiveSection Logic ---
  const getActiveSection = (path: string | null) => {
    if (!path || path === '/') return 'home';
    const match = path.match(/^\/(?:content\/)?([a-z-]+)/);
    if (match) {
      return match[1];
    }
    return 'home';
  };

  const activeSection = getActiveSection(pathname);

  // --- Dark Mode Logic ---
  useEffect(() => {
    const storedTheme = readStoredTheme();

    // If stored as 'light', set false. Otherwise default to true (Dark).
    setDarkMode(storedTheme !== 'light');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      persistTheme('dark');
      dispatch(setTheme('dark'));
    } else {
      document.documentElement.classList.remove('dark');
      persistTheme('light');
      dispatch(setTheme('light'));
    }
  }, [darkMode, dispatch]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleSidebarCollapsed = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // --- Mobile Menu Logic ---
  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);


  return (
    // shell-* classes are backed by critical inline CSS in app/layout.tsx so
    // the layout survives if the Tailwind bundle is delayed or blocked.
    <>
      <NetworkFieldBackdrop />
      <div
        className={`shell-root flex flex-col h-screen overflow-hidden transition-colors duration-300 font-sans ${
          darkMode ? 'dark bg-helios-ink/80 text-slate-200' : 'bg-stone-50/80 text-stone-800'
        }`}
      >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <div className="shell-body flex flex-1 w-full max-w-7xl mx-auto overflow-hidden min-h-0">
        {/* Desktop sidebar */}
        <div className="shell-sidebar-slot hidden lg:block h-full shrink-0">
          <Sidebar
            activeSection={activeSection}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            isCollapsed={isSidebarCollapsed}
            toggleCollapse={toggleSidebarCollapsed}
          />
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-stone-50 dark:bg-helios-ink overflow-y-auto">
            <Sidebar
              activeSection={activeSection}
              darkMode={darkMode}
              toggleTheme={toggleTheme}
              isCollapsed={false}
              toggleCollapse={toggleSidebarCollapsed}
            />
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-50"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
        )}

        <div className="shell-main flex-1 min-w-0 h-full overflow-y-auto">
          <main
            id="main-content"
            tabIndex={-1}
            className="shell-main-inner flex-1 w-full max-w-5xl mx-auto pt-20 lg:pt-12 outline-none"
          >
            {children}
            <Footer darkMode={darkMode} toggleTheme={toggleTheme} />
          </main>
        </div>
      </div>
      </div>
    </>
  );
};

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children }) => (
  <ReduxProvider><ClientLayoutContent>{children}</ClientLayoutContent></ReduxProvider>
);

export default ClientLayoutWrapper;
