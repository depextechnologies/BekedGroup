import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../AdminShell';
import { AdvertisingLeads } from './AdvertisingLeads';

export const dynamic = 'force-dynamic';

export default async function AdvertisingAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const leads = await prisma.advertisingLead.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell user={{ email: session.email }}>
      <AdvertisingLeads
        initialLeads={leads.map((l) => ({
          ...l,
          createdAt: l.createdAt.toISOString(),
        }))}
      />
    </AdminShell>
  );
}
