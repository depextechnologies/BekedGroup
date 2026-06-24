import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../AdminShell';
import { NewsManager } from './NewsManager';

export const dynamic = 'force-dynamic';

export default async function NewsAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const articles = await prisma.newsArticle.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <AdminShell user={{ email: session.email }}>
      <NewsManager
        initialArticles={articles.map((a) => ({
          ...a,
          createdAt: a.createdAt.toISOString(),
          updatedAt: a.updatedAt.toISOString(),
        }))}
      />
    </AdminShell>
  );
}
