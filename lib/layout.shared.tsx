import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'vmaspad',
  repo: 'gnome-react-ui',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          <span>gnome-ui</span>
        </span>
      ),
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
        on: 'nav',
      },
      {
        text: 'Components',
        url: '/docs/components/Button',
        active: 'nested-url',
        on: 'nav',
      },
      {
        text: 'Technical Guide',
        url: '/docs/technical-guide',
        active: 'nested-url',
        on: 'nav',
      },
      {
        text: 'Themes',
        url: '/themes',
        active: 'url',
        on: 'nav',
      },
    ],
    themeSwitch: {
      mode: 'light-dark-system',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
