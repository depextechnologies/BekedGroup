import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../AdminShell';
import { AppsEditor } from './AppsEditor';

export const dynamic = 'force-dynamic';

export default async function AdminAppsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const apps = await prisma.application.findMany({ orderBy: { order: 'asc' } });

  return (
    <AdminShell user={{ email: session.email }}>
      <AppsEditor initialApps={apps.map((a) => ({ ...a, createdAt: a.createdAt.toISOString(), updatedAt: a.updatedAt.toISOString() }))} />
    </AdminShell>
  );
}
