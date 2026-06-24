import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' } });
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  if (!body.slug) body.slug = slugify(body.titleEn || body.titleFr || 'post');
  delete body.id;
  delete body.createdAt;
  delete body.updatedAt;
  try {
    const post = await prisma.blogPost.create({ data: body });
    return NextResponse.json({ ok: true, post });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.code === 'P2002' ? 'Slug already exists' : e.message }, { status: 400 });
  }
}
