'use client';

import { AppWindow, Inbox, MailQuestion, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
  appsCount: number;
  messagesCount: number;
  unreadCount: number;
  jobsCount: number;
}

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export function Dashboard({ stats, recentMessages }: { stats: Stats; recentMessages: Message[] }) {
  const tiles = [
    { label: 'Applications', value: stats.appsCount, Icon: AppWindow, color: '#F7A500' },
    { label: 'Total messages', value: stats.messagesCount, Icon: Inbox, color: '#3498FF' },
    { label: 'Unread messages', value: stats.unreadCount, Icon: MailQuestion, color: '#E5484D' },
    { label: 'Open positions', value: stats.jobsCount, Icon: Briefcase, color: '#32CD32' },
  ];

  return (
    <div className="space-y-10" data-testid="admin-dashboard">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">Dashboard</h1>
        <p className="text-white/60 mt-2">Overview of your bakēd Group website</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiles.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            data-testid={`stat-${t.label.toLowerCase().replace(/\s+/g, '-')}`}
            className="rounded-baked border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${t.color}22` }}>
              <t.Icon className="h-6 w-6" style={{ color: t.color }} />
            </div>
            <div className="font-heading text-4xl font-black tracking-tight">{t.value}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">{t.label}</div>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="font-heading text-xl font-bold mb-4">Recent messages</h2>
        {recentMessages.length === 0 ? (
          <div className="rounded-baked border border-white/10 bg-white/[0.02] p-6 text-white/50 text-sm" data-testid="no-recent-messages">
            No messages yet.
          </div>
        ) : (
          <div className="rounded-baked border border-white/10 bg-white/[0.03] overflow-hidden">
            {recentMessages.map((m, i) => (
              <div
                key={m.id}
                data-testid={`recent-message-${i}`}
                className="px-6 py-4 border-b border-white/5 last:border-0 flex items-start gap-4"
              >
                <div className="h-2 w-2 rounded-full mt-2.5" style={{ backgroundColor: m.read ? '#666' : '#F7A500' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="font-semibold text-sm">{m.name} <span className="text-white/40 font-normal">· {m.email}</span></div>
                    <div className="text-xs text-white/40">{new Date(m.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-white/60 mt-1 line-clamp-2">{m.message}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
