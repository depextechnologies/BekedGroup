import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../AdminShell';
import { MessagesList } from './MessagesList';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell user={{ email: session.email }}>
      <MessagesList initialMessages={messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() }))} />
    </AdminShell>
  );
}
