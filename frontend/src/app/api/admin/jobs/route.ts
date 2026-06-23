import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  if (!body.slug) body.slug = (body.titleEn || body.titleFr || 'job').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  delete body.id;
  delete body.createdAt;
  delete body.updatedAt;
  const job = await prisma.jobOpening.create({ data: body });
  return NextResponse.json({ ok: true, job });
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const jobs = await prisma.jobOpening.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ ok: true, jobs });
}
