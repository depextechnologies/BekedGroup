import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { TermsContent } from './TermsContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: "Conditions Générales d'Utilisation | bakēd Group" },
  description:
    "Conditions Générales d'Utilisation de bakēd Group — règles, responsabilités, paiements, remboursements, propriété intellectuelle et juridiction applicable.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/terms`,
    title: "Conditions Générales d'Utilisation | bakēd Group",
    description:
      "Lisez les Conditions Générales d'Utilisation officielles de la Super App bakēd.",
    siteName: 'bakēd Group',
  },
  twitter: { card: 'summary_large_image', title: "Conditions Générales d'Utilisation | bakēd Group" },
};

export default async function TermsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <TermsContent />
      <Footer settings={settings} />
    </main>
  );
}
