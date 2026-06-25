import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { PAGE_DEFAULTS, type PageKey } from '@/lib/pageContent';

const ALLOWED: PageKey[] = ['about', 'services', 'advertising', 'support'];

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, ctx: { params: Promise<{ pageKey: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  const { pageKey } = await ctx.params;
  if (!ALLOWED.includes(pageKey as PageKey)) {
    return NextResponse.json({ ok: false, error: 'invalid page' }, { status: 400 });
  }

  const row = await prisma.pageContent.findUnique({ where: { pageKey } });
  return NextResponse.json({
    ok: true,
    pageKey,
    defaults: PAGE_DEFAULTS[pageKey as PageKey],
    data: row?.data ?? null,
    updatedAt: row?.updatedAt ?? null,
  });
}

export async function PUT(req: Request, ctx: { params: Promise<{ pageKey: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  const { pageKey } = await ctx.params;
  if (!ALLOWED.includes(pageKey as PageKey)) {
    return NextResponse.json({ ok: false, error: 'invalid page' }, { status: 400 });
  }

  const body = (await req.json().catch(() => null)) as { data?: unknown } | null;
  if (!body || typeof body.data !== 'object' || body.data === null) {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
  }

  // Persist as-is. Frontend merges with defaults at read time.
  const row = await prisma.pageContent.upsert({
    where: { pageKey },
    update: { data: body.data as object },
    create: { pageKey, data: body.data as object },
  });

  return NextResponse.json({ ok: true, pageKey: row.pageKey, updatedAt: row.updatedAt });
}
