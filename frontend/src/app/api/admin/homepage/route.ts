import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

const ALLOWED = [
  'heroTitleFr', 'heroTitleEn', 'heroHighlightFr', 'heroHighlightEn',
  'heroSubFr', 'heroSubEn', 'heroCta1Fr', 'heroCta1En', 'heroCta2Fr', 'heroCta2En',
  'heroBgImage', 'heroForegroundImage',
  'aboutTitleFr', 'aboutTitleEn', 'aboutBodyFr', 'aboutBodyEn',
  'careersImage',
];

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  const data: any = {};
  for (const k of ALLOWED) if (k in body) data[k] = body[k];
  const updated = await prisma.homepageContent.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
  return NextResponse.json({ ok: true, homepage: updated });
}
