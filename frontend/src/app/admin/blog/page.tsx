import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../AdminShell';
import { BlogManager } from './BlogManager';

export const dynamic = 'force-dynamic';

export default async function BlogAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <AdminShell user={{ email: session.email }}>
      <BlogManager
        initialPosts={posts.map((p) => ({
          ...p,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        }))}
      />
    </AdminShell>
  );
}
