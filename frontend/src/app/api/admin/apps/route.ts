import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const apps = await prisma.application.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ ok: true, apps });
}
