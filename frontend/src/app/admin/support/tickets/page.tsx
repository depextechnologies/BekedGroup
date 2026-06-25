import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../../AdminShell';
import { LeadsManager } from '../LeadsManager';

export const dynamic = 'force-dynamic';

export default async function SupportTicketsAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const tickets = await prisma.supportTicket.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <AdminShell user={{ email: session.email }}>
      <LeadsManager
        kind="ticket"
        title="Support tickets"
        subtitle="Customer support requests submitted via the /support form."
        statuses={['open', 'in_progress', 'resolved', 'closed']}
        endpoint="/api/admin/support/tickets"
        initial={tickets.map((t) => ({
          id: t.id,
          headline: t.fullName,
          subline: t.subject,
          tertiary: t.email,
          status: t.status,
          read: t.read,
          createdAt: t.createdAt.toISOString(),
          rows: [
            { label: 'Email', value: t.email, href: `mailto:${t.email}` },
            { label: 'Phone', value: t.phone || '—', href: t.phone ? `tel:${t.phone}` : undefined },
            { label: 'Order #', value: t.orderNumber || '—' },
            { label: 'Service', value: t.service || '—' },
            { label: 'Subject', value: t.subject },
          ],
          message: t.description,
          attachmentUrl: t.attachmentUrl,
        }))}
      />
    </AdminShell>
  );
}
