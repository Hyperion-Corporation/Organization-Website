import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import './tailwind-entry.css';

// Components style themselves via Tailwind's `dark:` variant off a `dark`
// class on an ancestor (tailwind.config.cjs: darkMode: 'class') — the
// toolbar toggle below drives that class here the same way
// app/ClientLayoutWrapper.tsx drives it on <html> in the real site.
//
// `parameters.backgrounds` only does anything with the backgrounds addon
// registered (it isn't, in .storybook/main.ts) — the story canvas's own
// background comes from this wrapper instead. Separately, the "Docs" page
// (autodocs) renders each story inside Storybook's own preview chrome
// (border, toolbar, background), which is themed independently via
// `parameters.docs.theme` — without it that chrome stays light regardless
// of the `dark` class below.
function ThemeWrapper({ theme, children }: { theme: 'light' | 'dark'; children: React.ReactNode }) {
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.body.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#f8fafc';
    }, [theme]);

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 p-6 min-h-[100px]">
                {children}
            </div>
        </div>
    );
}

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            theme: themes.dark,
        },
    },
    globalTypes: {
        theme: {
            description: 'Light/dark theme',
            defaultValue: 'dark',
            toolbar: {
                title: 'Theme',
                icon: 'mirror',
                items: [
                    { value: 'light', title: 'Light' },
                    { value: 'dark', title: 'Dark' },
                ],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const theme = context.globals.theme ?? 'dark';
            return (
                <ThemeWrapper theme={theme}>
                    <Story />
                </ThemeWrapper>
            );
        },
    ],
};

export default preview;
