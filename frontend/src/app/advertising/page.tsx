import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { prisma } from '@/lib/prisma';
import { AdvertisingContent } from './AdvertisingContent';
import { getPageContent } from '@/lib/pageContent';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: 'ADbakēd Advertising Solutions | bakēd Group' },
  description:
    'Reach more customers through targeted advertising across the bakēd ecosystem. Launch campaigns, generate leads, and grow your business with ADbakēd.',
  alternates: { canonical: `${SITE_URL}/advertising` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/advertising`,
    title: 'ADbakēd Advertising Solutions | bakēd Group',
    description:
      'Targeted advertising across the bakēd ecosystem — EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd.',
    siteName: 'bakēd Group',
  },
  twitter: { card: 'summary_large_image', title: 'ADbakēd Advertising Solutions | bakēd Group' },
};

export default async function AdvertisingPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  const cms = await getPageContent('advertising');

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <AdvertisingContent cms={cms} />
      <Footer settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Digital Advertising',
            provider: { '@type': 'Organization', name: 'bakēd Group', url: SITE_URL },
            areaServed: 'Africa',
            url: `${SITE_URL}/advertising`,
            name: 'ADbakēd Advertising Solutions',
            description: metadata.description,
          }),
        }}
      />
    </main>
  );
}
