import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ServicesContent } from './ServicesContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: 'Nos Services | Baked Group' },
  description:
    'Découvrez les services innovants de Baked Group : livraison, restauration, commerce électronique, automobile, immobilier et bien plus encore.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/services`,
    title: 'Nos Services | Baked Group',
    description:
      'La Super App africaine — livraison, repas, marché, boutique, automobile, immobilier.',
    siteName: 'Baked Group',
  },
  twitter: { card: 'summary_large_image', title: 'Nos Services | Baked Group' },
};

export default async function ServicesPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 }, update: {}, create: { id: 1 },
  });
  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <ServicesContent />
      <Footer settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            provider: { '@type': 'Organization', name: 'Baked Group', url: SITE_URL },
            url: `${SITE_URL}/services`,
            name: 'Nos Services | Baked Group',
            description: metadata.description,
            areaServed: 'Africa',
            serviceType: ['Delivery', 'Food', 'Marketplace', 'E-commerce', 'Automotive', 'Real Estate'],
          }),
        }}
      />
    </main>
  );
}
