import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const ApplicationSchema = z.object({
  jobId: z.string().min(1),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  resumeUrl: z.string().url().optional().or(z.literal('')),
  message: z.string().min(5).max(8000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ApplicationSchema.parse(body);
    const job = await prisma.jobOpening.findUnique({ where: { id: data.jobId } });
    if (!job) return NextResponse.json({ ok: false, error: 'job not found' }, { status: 404 });

    const saved = await prisma.jobApplication.create({
      data: {
        jobId: data.jobId,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        resumeUrl: data.resumeUrl || null,
        message: data.message,
      },
    });
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'invalid' }, { status: 400 });
  }
}

export async function GET() {
  const jobs = await prisma.jobOpening.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ ok: true, jobs });
}
