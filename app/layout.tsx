import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';
import { Ubuntu, Ubuntu_Mono } from 'next/font/google';

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const ubuntuMono = Ubuntu_Mono({
  variable: '--font-ubuntu-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'gnome-ui',
    template: '%s · gnome-ui',
  },
  description:
    'Technical documentation and design system for a GNOME-inspired UI library with orange theme tokens.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${ubuntuMono.variable}`}
      suppressHydrationWarning
    >
      <body className="gnome-shell font-sans text-foreground min-h-screen flex flex-col antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
