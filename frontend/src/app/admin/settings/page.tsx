import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../AdminShell';
import { SettingsEditor } from './SettingsEditor';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  const homepage = await prisma.homepageContent.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  return (
    <AdminShell user={{ email: session.email }}>
      <SettingsEditor
        initialSettings={{ ...settings, updatedAt: settings.updatedAt.toISOString() }}
        initialHomepage={{ ...homepage, updatedAt: homepage.updatedAt.toISOString() }}
      />
    </AdminShell>
  );
}
