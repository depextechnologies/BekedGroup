import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

const ALLOWED = [
  'companyName', 'contactEmail', 'contactPhone', 'contactAddress', 'googleMapsUrl',
  'facebookUrl', 'linkedinUrl', 'instagramUrl', 'tiktokUrl', 'youtubeUrl',
  'footerTextFr', 'footerTextEn', 'copyrightText', 'logoUrl', 'faviconUrl',
  'appStoreUrl', 'playStoreUrl',
];

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  const data: any = {};
  for (const k of ALLOWED) if (k in body) data[k] = body[k];
  const updated = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
  return NextResponse.json({ ok: true, settings: updated });
}

export async function GET() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  return NextResponse.json({ ok: true, settings });
}
