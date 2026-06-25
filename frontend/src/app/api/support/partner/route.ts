import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const Schema = z.object({
  companyName: z.string().min(1).max(150),
  activityType: z.string().min(1).max(120),
  cityRegion: z.string().max(120).optional().or(z.literal('')),
  contactName: z.string().min(1).max(120),
  phone: z.string().min(4).max(40),
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal('')),
  partnerType: z.string().min(1).max(60),
  description: z.string().min(5).max(4000),
});

async function notify(p: z.infer<typeof Schema>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return false;
  try {
    const tx = nodemailer.createTransport({ host, port: parseInt(process.env.SMTP_PORT || '587'), secure: parseInt(process.env.SMTP_PORT || '587') === 465, auth: { user, pass } });
    await tx.sendMail({
      from: process.env.SMTP_FROM || `bakēd Group <${user}>`,
      to: process.env.PARTNERS_EMAIL || 'partners@baked.group',
      replyTo: p.email,
      subject: `[Partner Application] ${p.companyName} — ${p.partnerType}`,
      text: `Company: ${p.companyName}\nActivity: ${p.activityType}\nCity: ${p.cityRegion || '-'}\nContact: ${p.contactName}\nPhone: ${p.phone}\nEmail: ${p.email}\nWebsite: ${p.website || '-'}\nPartner Type: ${p.partnerType}\n\n${p.description}`,
    });
    return true;
  } catch { return false; }
}

export async function POST(req: Request) {
  try {
    const data = Schema.parse(await req.json());
    const saved = await prisma.partnerApplication.create({
      data: {
        companyName: data.companyName, activityType: data.activityType,
        cityRegion: data.cityRegion || '', contactName: data.contactName,
        phone: data.phone, email: data.email, website: data.website || '',
        partnerType: data.partnerType, description: data.description,
      },
    });
    void notify(data);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'invalid' }, { status: 400 });
  }
}
