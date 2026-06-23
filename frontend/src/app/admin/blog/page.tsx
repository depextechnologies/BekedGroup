import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';
import { AdminShell } from '../AdminShell';
import { FileText } from 'lucide-react';

export default async function BlogPlaceholder() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return (
    <AdminShell user={{ email: session.email }}>
      <PhaseTwoStub label="Blog management" icon={<FileText className="h-6 w-6" />} />
    </AdminShell>
  );
}

function PhaseTwoStub({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <div className="rounded-baked border border-white/10 bg-white/[0.03] p-10 text-center" data-testid="phase2-stub">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-6">{icon}</div>
        <h1 className="font-heading text-2xl font-bold">{label}</h1>
        <p className="text-white/60 mt-3">
          Database schema is ready (Prisma models <code className="text-brand-gold">BlogPost</code> and <code className="text-brand-gold">NewsArticle</code>).
          Full editor UI scheduled for Phase 2.
        </p>
        <Link href="/admin" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-brand-gold text-bg-primary text-xs uppercase tracking-wider font-bold">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
