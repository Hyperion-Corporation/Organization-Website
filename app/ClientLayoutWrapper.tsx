'use client';

import React, { useState, useEffect } from 'react';
import Header from '../src/frameworks/react/components/layout/Header';
import Footer from '../src/frameworks/react/components/layout/Footer';
import NetworkFieldBackdrop from '../src/frameworks/react/components/graphics/NetworkFieldBackdrop';
import { useAppDispatch } from '../src/libraries/redux/store/hooks';
import { setTheme } from '../src/libraries/redux/actions/appActions';
import { persistTheme, readStoredTheme } from '../src/libraries/redux/services/persistence';
import ReduxProvider from '../src/libraries/redux/store/ReduxProvider';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Product-site shell: full-width top navigation + scrolling content.
 * Intentionally not the personal github-pages layout (sticky left sidebar + narrow column).
 */
const ClientLayoutContent: React.FC<ClientLayoutWrapperProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTheme = readStoredTheme();
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

  return (
    <>
      <NetworkFieldBackdrop />
      <div
        className={`shell-root forge-shell flex flex-col min-h-screen transition-colors duration-300 font-sans ${
          darkMode ? 'dark text-slate-100' : 'text-stone-900'
        }`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        <div className="shell-main forge-shell__main flex-1 w-full overflow-y-auto">
          <main id="main-content" tabIndex={-1} className="forge-shell__content outline-none">
            {children}
          </main>
          <div className="forge-shell__footer-wrap">
            <Footer darkMode={darkMode} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </>
  );
};

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children }) => (
  <ReduxProvider>
    <ClientLayoutContent>{children}</ClientLayoutContent>
  </ReduxProvider>
);

export default ClientLayoutWrapper;
