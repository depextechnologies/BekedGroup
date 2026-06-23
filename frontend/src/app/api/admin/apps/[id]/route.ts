import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await prisma.application.update({
      where: { id },
      data: {
        prefix: body.prefix,
        color: body.color,
        colorKey: body.colorKey,
        descFr: body.descFr,
        descEn: body.descEn,
        illustration: body.illustration,
        logoImage: body.logoImage ?? '',
        icon: body.icon,
        enabled: body.enabled,
        order: body.order,
      },
    });
    return NextResponse.json({ ok: true, app: updated });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.application.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
