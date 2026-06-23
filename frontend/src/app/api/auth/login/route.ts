import { NextResponse } from 'next/server';
import { authenticateAdmin, signAdminToken, setAdminCookie } from '@/lib/auth';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = LoginSchema.parse(body);
    const user = await authenticateAdmin(email, password);
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }
    const token = await signAdminToken({ sub: user.id, email: user.email, role: user.role });
    await setAdminCookie(token);
    return NextResponse.json({ ok: true, user: { email: user.email, name: user.name } });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'invalid' }, { status: 400 });
  }
}
