import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const LeadSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  company: z.string().max(120).optional().or(z.literal('')),
  country: z.string().max(80).optional().or(z.literal('')),
  message: z.string().min(5).max(4000),
});

async function trySendEmail(lead: z.infer<typeof LeadSchema>) {
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
      from: process.env.SMTP_FROM || `bakēd Group <${user}>`,
      to: process.env.SMTP_TO || user,
      replyTo: lead.email,
      subject: `[ADbakēd] New advertising lead — ${lead.firstName} ${lead.lastName}`,
      text: `Name: ${lead.firstName} ${lead.lastName}
Email: ${lead.email}
Phone: ${lead.phone || '-'}
Company: ${lead.company || '-'}
Country: ${lead.country || '-'}

${lead.message}`,
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
    const data = LeadSchema.parse(body);
    const saved = await prisma.advertisingLead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        country: data.country || '',
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
  return NextResponse.json({ ok: true, message: 'Use POST to submit an advertising lead' });
}
