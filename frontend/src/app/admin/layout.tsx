import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { AdminShell } from './AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // No layout enforcement at root /admin level (login page is at /admin/login and
  // it handles itself). All other admin/* segments are protected by their own server
  // components using getAdminSession.
  return <>{children}</>;
}
