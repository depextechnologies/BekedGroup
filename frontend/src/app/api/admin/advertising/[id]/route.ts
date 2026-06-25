import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const data: any = {};
  if (typeof body.read === 'boolean') data.read = body.read;
  if (typeof body.status === 'string') data.status = body.status;
  const lead = await prisma.advertisingLead.update({ where: { id }, data });
  return NextResponse.json({ ok: true, lead });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.advertisingLead.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
