import { AdminShell } from '@/app/admin/AdminShell';
import { getAdminSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { PageCmsEditor, type PageKey } from '../PageCmsEditor';

const ALLOWED: PageKey[] = ['about', 'services', 'advertising', 'support'];

export const dynamic = 'force-dynamic';

export default async function CmsPage({ params }: { params: Promise<{ pageKey: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { pageKey } = await params;
  if (!ALLOWED.includes(pageKey as PageKey)) notFound();

  return (
    <AdminShell user={{ email: session.email }}>
      <PageCmsEditor pageKey={pageKey as PageKey} />
    </AdminShell>
  );
}
