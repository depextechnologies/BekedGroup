import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  delete body.id;
  delete body.createdAt;
  delete body.updatedAt;
  const job = await prisma.jobOpening.update({ where: { id }, data: body });
  return NextResponse.json({ ok: true, job });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.jobOpening.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
