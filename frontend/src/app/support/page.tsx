import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { prisma } from '@/lib/prisma';
import { SupportContent } from './SupportContent';

export const dynamic = 'force-dynamic';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: 'Assistance & Support | bakēd Group' },
  description:
    "Besoin d'aide ? Consultez le centre d'assistance bakēd Group pour les commandes, paiements, comptes, livraisons, partenariats et support technique.",
  alternates: { canonical: `${SITE_URL}/support` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/support`,
    title: 'Assistance & Support | bakēd Group',
    description: "Centre d'assistance bakēd Group — commandes, paiements, livraisons, partenariats, support technique.",
    siteName: 'bakēd Group',
  },
  twitter: { card: 'summary_large_image', title: 'Assistance & Support | bakēd Group' },
};

export default async function SupportPage() {
  const settings = await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <SupportContent />
      <Footer settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'How do I download the bakēd app?', acceptedAnswer: { '@type': 'Answer', text: 'Launching soon on App Store and Google Play.' } },
              { '@type': 'Question', name: 'How do I create an account?', acceptedAnswer: { '@type': 'Answer', text: 'Open the app, tap Create account, fill info, confirm by email or SMS.' } },
              { '@type': 'Question', name: 'How do I contact support?', acceptedAnswer: { '@type': 'Answer', text: 'Use the support form on this page or email contact@baked.group.' } },
            ],
          }),
        }}
      />
    </main>
  );
}
