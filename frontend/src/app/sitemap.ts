import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://baked.group';
  const jobs = await prisma.jobOpening.findMany({ where: { published: true } });
  const blog = await prisma.blogPost.findMany({ where: { published: true } });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const jobRoutes = jobs.map((j) => ({
    url: `${SITE_URL}/careers#${j.slug}`,
    lastModified: j.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blog.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...jobRoutes, ...blogRoutes];
}
