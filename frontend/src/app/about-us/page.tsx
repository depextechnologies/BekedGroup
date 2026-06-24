import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { AboutUsContent } from './AboutUsContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: 'À Propos de Nous | Baked Group' },
  description:
    'Découvrez la mission, les valeurs et la vision de Baked Group, la Super App africaine qui simplifie la vie quotidienne grâce à la technologie.',
  alternates: { canonical: `${SITE_URL}/about-us` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/about-us`,
    title: 'À Propos de Nous | Baked Group',
    description:
      'La mission, les valeurs et la vision de Baked Group — la Super App africaine qui simplifie la vie quotidienne.',
    siteName: 'Baked Group',
  },
  twitter: { card: 'summary_large_image', title: 'À Propos de Nous | Baked Group' },
};

export default async function AboutUsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <AboutUsContent />
      <Footer settings={settings} />
      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: `${SITE_URL}/about-us`,
            name: 'À Propos de Nous | Baked Group',
            description: metadata.description,
            mainEntity: {
              '@type': 'Organization',
              name: 'Baked Group',
              url: SITE_URL,
              email: 'contact@baked.group',
              sameAs: [
                settings.facebookUrl,
                settings.linkedinUrl,
                settings.instagramUrl,
              ].filter(Boolean),
            },
          }),
        }}
      />
    </main>
  );
}
