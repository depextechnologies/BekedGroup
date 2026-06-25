import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { PrivacyContent } from './PrivacyContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: 'Politique de Confidentialité | bakēd Group' },
  description:
    "Politique de Confidentialité de bakēd Group — collecte, utilisation, partage, conservation et protection de vos données personnelles, ainsi que vos droits.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/privacy`,
    title: 'Politique de Confidentialité | bakēd Group',
    description:
      'Découvrez comment bakēd Group protège vos données personnelles sur sa Super App.',
    siteName: 'bakēd Group',
  },
  twitter: { card: 'summary_large_image', title: 'Politique de Confidentialité | bakēd Group' },
};

export default async function PrivacyPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <PrivacyContent />
      <Footer settings={settings} />
    </main>
  );
}
