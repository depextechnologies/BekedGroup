import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { NewsList } from './NewsList';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: 'Actualités | bakēd Group' },
  description:
    'Les dernières annonces officielles, étapes franchies et apparitions presse de bakēd Group.',
  alternates: { canonical: `${SITE_URL}/news` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/news`,
    title: 'Actualités | bakēd Group',
    description: 'Les dernières annonces officielles de bakēd Group.',
    siteName: 'bakēd Group',
  },
  twitter: { card: 'summary_large_image', title: 'Actualités | bakēd Group' },
};

export default async function NewsIndexPage() {
  const [settings, articles] = await Promise.all([
    prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.newsArticle.findMany({
      where: { published: true },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true, slug: true, titleFr: true, titleEn: true,
        bodyFr: true, bodyEn: true, image: true, updatedAt: true,
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <NewsList
        articles={articles.map((a) => ({
          ...a,
          updatedAt: a.updatedAt.toISOString(),
        }))}
      />
      <Footer settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            url: `${SITE_URL}/news`,
            name: 'bakēd Group News',
            publisher: { '@type': 'Organization', name: 'bakēd Group', url: SITE_URL },
          }),
        }}
      />
    </main>
  );
}
