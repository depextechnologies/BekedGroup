import type { Metadata } from 'next';
import { Jost, Manrope } from 'next/font/google';
import { I18nProvider } from '@/i18n/I18nProvider';
import { Toaster } from 'sonner';
import './globals.css';

const heading = Jost({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  variable: '--font-chivo',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'bakēd Group — Simplifier la vie des gens et les connecter ensemble',
    template: '%s — bakēd Group',
  },
  description:
    'bakēd Group construit un écosystème unifié de super-app : EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd. Une seule application. Plusieurs services. Une expérience connectée.',
  keywords: [
    'bakēd Group', 'super app', 'écosystème digital', 'food delivery', 'marketplace',
    'real estate', 'vehicle marketplace', 'smart services', 'technology', 'EXPRESSbakēd',
    'FOODbakēd', 'MARTbakēd', 'SHOPbakēd', 'AUTObakēd', 'IMMObakēd',
  ],
  authors: [{ name: 'bakēd Group' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'bakēd Group',
    title: 'bakēd Group — Simplifier la vie des gens et les connecter ensemble',
    description: 'Une seule application. Plusieurs services. Une expérience connectée.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bakēd Group',
    description: 'Simplifier la vie des gens et les connecter ensemble.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'fr-FR': SITE_URL, 'en-US': `${SITE_URL}/en` },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${heading.variable} ${manrope.variable}`}>
      <body className="bg-bg-primary text-white font-body antialiased">
        <I18nProvider>
          {children}
          <Toaster theme="dark" position="top-right" />
        </I18nProvider>
      </body>
    </html>
  );
}
