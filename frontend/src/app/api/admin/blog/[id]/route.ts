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
  try {
    const post = await prisma.blogPost.update({ where: { id }, data: body });
    return NextResponse.json({ ok: true, post });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.code === 'P2002' ? 'Slug already exists' : e.message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
