import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../../AdminShell';
import { LeadsManager } from '../LeadsManager';

export const dynamic = 'force-dynamic';

export default async function PartnersAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const partners = await prisma.partnerApplication.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <AdminShell user={{ email: session.email }}>
      <LeadsManager
        kind="partner"
        title="Partner applications"
        subtitle="Companies applying to join the bakēd ecosystem."
        statuses={['new', 'reviewing', 'approved', 'rejected']}
        endpoint="/api/admin/support/partners"
        initial={partners.map((p) => ({
          id: p.id,
          headline: p.companyName,
          subline: p.partnerType,
          tertiary: p.email,
          status: p.status,
          read: p.read,
          createdAt: p.createdAt.toISOString(),
          rows: [
            { label: 'Contact', value: p.contactName },
            { label: 'Email', value: p.email, href: `mailto:${p.email}` },
            { label: 'Phone', value: p.phone, href: `tel:${p.phone}` },
            { label: 'Activity', value: p.activityType },
            { label: 'City', value: p.cityRegion || '—' },
            { label: 'Website', value: p.website || '—', href: p.website || undefined },
          ],
          message: p.description,
        }))}
      />
    </AdminShell>
  );
}
