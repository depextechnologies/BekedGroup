import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { BlogList } from './BlogList';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

export const metadata: Metadata = {
  title: { absolute: 'Blog | bakēd Group' },
  description:
    'Histoires, idées et perspectives de l\'équipe bakēd Group — analyses produit, annonces et coulisses de la Super App africaine.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog | bakēd Group',
    description: 'Histoires, idées et perspectives de l\'équipe bakēd Group.',
    siteName: 'bakēd Group',
  },
  twitter: { card: 'summary_large_image', title: 'Blog | bakēd Group' },
};

export default async function BlogIndexPage() {
  const [settings, posts] = await Promise.all([
    prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true, slug: true, titleFr: true, titleEn: true,
        excerptFr: true, excerptEn: true, featuredImage: true,
        category: true, updatedAt: true,
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <BlogList
        posts={posts.map((p) => ({
          ...p,
          updatedAt: p.updatedAt.toISOString(),
        }))}
      />
      <Footer settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            url: `${SITE_URL}/blog`,
            name: 'bakēd Group Blog',
            publisher: { '@type': 'Organization', name: 'bakēd Group', url: SITE_URL },
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.titleEn || p.titleFr,
              url: `${SITE_URL}/blog/${p.slug}`,
              datePublished: p.updatedAt,
            })),
          }),
        }}
      />
    </main>
  );
}
