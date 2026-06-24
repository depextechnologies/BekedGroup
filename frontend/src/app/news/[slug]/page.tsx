import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { NewsArticleView } from './NewsArticleView';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.newsArticle.findUnique({ where: { slug } });
  if (!article || !article.published) {
    return { title: { absolute: 'Communiqué introuvable | bakēd Group' } };
  }
  const title = article.titleEn || article.titleFr;
  const description = (article.bodyEn || article.bodyFr).replace(/[#*_`>~]+/g, '').slice(0, 160);
  const ogImage = article.image || undefined;
  return {
    title: { absolute: `${title} | bakēd Group` },
    description,
    alternates: { canonical: `${SITE_URL}/news/${article.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/news/${article.slug}`,
      title,
      description,
      siteName: 'bakēd Group',
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [settings, article] = await Promise.all([
    prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.newsArticle.findUnique({ where: { slug } }),
  ]);
  if (!article || !article.published) notFound();

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <NewsArticleView
        article={{
          ...article,
          updatedAt: article.updatedAt.toISOString(),
        }}
      />
      <Footer settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.titleEn || article.titleFr,
            description: (article.bodyEn || article.bodyFr).replace(/[#*_`>~]+/g, '').slice(0, 160),
            image: article.image || undefined,
            datePublished: article.createdAt.toISOString(),
            dateModified: article.updatedAt.toISOString(),
            author: { '@type': 'Organization', name: 'bakēd Group', url: SITE_URL },
            publisher: { '@type': 'Organization', name: 'bakēd Group', url: SITE_URL },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/news/${article.slug}` },
          }),
        }}
      />
    </main>
  );
}
