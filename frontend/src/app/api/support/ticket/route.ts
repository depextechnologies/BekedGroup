import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const Schema = z.object({
  fullName: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  orderNumber: z.string().max(80).optional().or(z.literal('')),
  service: z.string().max(80).optional().or(z.literal('')),
  subject: z.string().min(2).max(200),
  description: z.string().min(5).max(4000),
  attachmentUrl: z.string().url().optional().or(z.literal('')),
});

async function notify(t: z.infer<typeof Schema>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return false;
  try {
    const tx = nodemailer.createTransport({ host, port: parseInt(process.env.SMTP_PORT || '587'), secure: parseInt(process.env.SMTP_PORT || '587') === 465, auth: { user, pass } });
    await tx.sendMail({
      from: process.env.SMTP_FROM || `bakēd Group <${user}>`,
      to: process.env.SUPPORT_EMAIL || 'customerservice@baked.group',
      replyTo: t.email,
      subject: `[Support] ${t.subject} — ${t.fullName}`,
      text: `Name: ${t.fullName}\nEmail: ${t.email}\nPhone: ${t.phone || '-'}\nOrder: ${t.orderNumber || '-'}\nService: ${t.service || '-'}\n\n${t.description}\n\nAttachment: ${t.attachmentUrl || '-'}`,
    });
    return true;
  } catch { return false; }
}

export async function POST(req: Request) {
  try {
    const data = Schema.parse(await req.json());
    const saved = await prisma.supportTicket.create({
      data: {
        fullName: data.fullName, email: data.email,
        phone: data.phone || '', orderNumber: data.orderNumber || '',
        service: data.service || '', subject: data.subject,
        description: data.description, attachmentUrl: data.attachmentUrl || '',
      },
    });
    void notify(data);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'invalid' }, { status: 400 });
  }
}
