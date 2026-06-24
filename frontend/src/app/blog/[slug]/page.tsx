import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { BlogArticle } from './BlogArticle';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || !post.published) {
    return { title: { absolute: 'Article introuvable | bakēd Group' } };
  }
  const title = post.metaTitleEn || post.titleEn || post.titleFr;
  const description = post.metaDescEn || post.excerptEn || post.excerptFr || 'bakēd Group';
  const ogImage = post.featuredImage || undefined;
  return {
    title: { absolute: `${title} | bakēd Group` },
    description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      title,
      description,
      siteName: 'bakēd Group',
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [settings, post] = await Promise.all([
    prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.blogPost.findUnique({ where: { slug } }),
  ]);
  if (!post || !post.published) notFound();

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <BlogArticle
        post={{
          ...post,
          updatedAt: post.updatedAt.toISOString(),
        }}
      />
      <Footer settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.titleEn || post.titleFr,
            description: post.excerptEn || post.excerptFr,
            image: post.featuredImage || undefined,
            datePublished: post.createdAt.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            author: { '@type': 'Organization', name: 'bakēd Group', url: SITE_URL },
            publisher: { '@type': 'Organization', name: 'bakēd Group', url: SITE_URL },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
            articleSection: post.category,
          }),
        }}
      />
    </main>
  );
}
