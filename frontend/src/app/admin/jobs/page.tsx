import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminShell } from '../AdminShell';
import { JobsManager } from './JobsManager';

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const [jobs, applications] = await Promise.all([
    prisma.jobOpening.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.jobApplication.findMany({ orderBy: { createdAt: 'desc' }, include: { job: true } }),
  ]);
  return (
    <AdminShell user={{ email: session.email }}>
      <JobsManager
        initialJobs={jobs.map((j) => ({ ...j, createdAt: j.createdAt.toISOString(), updatedAt: j.updatedAt.toISOString() }))}
        applications={applications.map((a) => ({
          ...a,
          createdAt: a.createdAt.toISOString(),
          jobTitle: a.job.titleFr,
        }))}
      />
    </AdminShell>
  );
}
