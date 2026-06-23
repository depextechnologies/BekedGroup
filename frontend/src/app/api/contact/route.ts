import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  company: z.string().max(120).optional().or(z.literal('')),
  message: z.string().min(5).max(4000),
});

async function trySendEmail(msg: {
  name: string; email: string; phone?: string; company?: string; message: string;
}) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return false;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: parseInt(process.env.SMTP_PORT || '587') === 465,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `Baked Group <${user}>`,
      to: process.env.SMTP_TO || user,
      replyTo: msg.email,
      subject: `[Baked Group] New contact from ${msg.name}`,
      text: `Name: ${msg.name}\nEmail: ${msg.email}\nPhone: ${msg.phone || '-'}\nCompany: ${msg.company || '-'}\n\n${msg.message}`,
    });
    return true;
  } catch (e) {
    console.error('SMTP error', e);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);
    const saved = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message,
      },
    });
    void trySendEmail(data);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'invalid' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Use POST to submit' });
}
