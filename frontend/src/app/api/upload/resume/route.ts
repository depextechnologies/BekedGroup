import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED = new Map<string, string>([
  // PDF
  ['application/pdf', '.pdf'],
  // Word
  ['application/msword', '.doc'],
  [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.docx',
  ],
  // Images
  ['image/png', '.png'],
  ['image/jpeg', '.jpg'],
  ['image/webp', '.webp'],
  ['image/heic', '.heic'],
]);

const EXT_FALLBACK = new Set(['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp', '.heic']);

function sanitizeBase(name: string): string {
  const base = path.basename(name).toLowerCase();
  return base.replace(/[^a-z0-9._-]/g, '-').slice(0, 60);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ ok: false, error: 'Empty file' }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'File too large. Maximum 5 MB.' },
        { status: 413 },
      );
    }

    let ext = ALLOWED.get(file.type) ?? '';
    if (!ext) {
      const fallback = path.extname(file.name).toLowerCase();
      if (EXT_FALLBACK.has(fallback)) ext = fallback === '.jpeg' ? '.jpg' : fallback;
    }
    if (!ext) {
      return NextResponse.json(
        { ok: false, error: 'Unsupported file type. Use PDF, Word, or image.' },
        { status: 415 },
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
    await mkdir(uploadDir, { recursive: true });

    const id = crypto.randomBytes(10).toString('hex');
    const original = sanitizeBase(file.name.replace(/\.[^.]+$/, ''));
    const filename = `${Date.now()}-${id}-${original}${ext}`;
    const fullPath = path.join(uploadDir, filename);

    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(fullPath, bytes);

    const url = `/uploads/resumes/${filename}`;
    return NextResponse.json({
      ok: true,
      url,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
