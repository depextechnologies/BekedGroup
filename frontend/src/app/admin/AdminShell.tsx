'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, AppWindow, Inbox, Settings, LogOut, Briefcase, FileText, Newspaper, Megaphone, LifeBuoy, Handshake, Menu, X } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', Icon: LayoutDashboard, exact: true },
  { href: '/admin/applications', label: 'Applications', Icon: AppWindow },
  { href: '/admin/messages', label: 'Messages', Icon: Inbox },
  { href: '/admin/jobs', label: 'Careers', Icon: Briefcase },
  { href: '/admin/advertising', label: 'Advertising', Icon: Megaphone },
  { href: '/admin/support/tickets', label: 'Support', Icon: LifeBuoy },
  { href: '/admin/support/partners', label: 'Partners', Icon: Handshake },
  { href: '/admin/blog', label: 'Blog', Icon: FileText },
  { href: '/admin/news', label: 'News', Icon: Newspaper },
  { href: '/admin/settings', label: 'Settings', Icon: Settings },
];

export function AdminShell({ user, children }: { user: { email: string }; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white flex" data-testid="admin-shell">
      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:sticky top-0 left-0 h-screen w-72 bg-bg-secondary border-r border-white/10 z-40 flex flex-col transition-transform',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin"><img src="/logos/baked-header.png" alt="bakēd" className="h-9 w-auto object-contain" /></Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/60"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`admin-nav-${item.label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand-gold text-bg-primary'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                )}
              >
                <item.Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Signed in as</div>
          <div className="text-sm text-white mb-3 truncate">{user.email}</div>
          <button
            onClick={handleLogout}
            data-testid="admin-logout"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-white/80 text-sm hover:border-brand-red hover:text-brand-red transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-bg-primary/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setOpen(true)} className="text-white"><Menu className="h-6 w-6" /></button>
          <img src="/logos/baked-header.png" alt="bakēd" className="h-8 w-auto object-contain" />
        </header>
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
