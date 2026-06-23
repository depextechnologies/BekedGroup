import { prisma } from '@/lib/prisma';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { CareersClient } from './CareersClient';

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([
    prisma.jobOpening.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
    prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
  ]);

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Header />
      <CareersClient jobs={jobs} contactEmail={settings.contactEmail} />
      <Footer settings={settings} />
    </main>
  );
}
