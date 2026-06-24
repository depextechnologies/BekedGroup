import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from './AdminShell';
import { Dashboard } from './Dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [appsCount, messagesCount, unreadCount, jobsCount, blogCount, newsCount, recentMessages] = await Promise.all([
    prisma.application.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.jobOpening.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.newsArticle.count({ where: { published: true } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  return (
    <AdminShell user={{ email: session.email }}>
      <Dashboard
        stats={{ appsCount, messagesCount, unreadCount, jobsCount, blogCount, newsCount }}
        recentMessages={recentMessages.map((m) => ({
          ...m,
          createdAt: m.createdAt.toISOString(),
        }))}
      />
    </AdminShell>
  );
}
