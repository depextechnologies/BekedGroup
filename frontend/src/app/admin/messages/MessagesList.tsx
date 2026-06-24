'use client';

import { useState } from 'react';
import { Mail, Phone, Building, Trash2, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Msg {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessagesList({ initialMessages }: { initialMessages: Msg[] }) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>(initialMessages[0]?.id ?? null);
  const selected = messages.find((m) => m.id === selectedId);

  const markRead = async (m: Msg, read: boolean) => {
    setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, read } : x)));
    await fetch(`/api/admin/messages/${m.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    });
  };

  const remove = async (m: Msg) => {
    if (!confirm(`Delete message from ${m.name}?`)) return;
    setMessages((prev) => prev.filter((x) => x.id !== m.id));
    if (selectedId === m.id) setSelectedId(null);
    await fetch(`/api/admin/messages/${m.id}`, { method: 'DELETE' });
    toast.success('Message deleted');
  };

  const onSelect = (m: Msg) => {
    setSelectedId(m.id);
    if (!m.read) markRead(m, true);
  };

  return (
    <div className="space-y-8" data-testid="messages-page">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">Messages</h1>
        <p className="text-white/60 mt-2">All contact form submissions.</p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-baked border border-white/10 bg-white/[0.02] p-10 text-center text-white/50" data-testid="no-messages">
          No messages yet.
        </div>
      ) : (
        <div className="grid lg:grid-cols-[360px_1fr] gap-6 min-h-[60vh]">
          <div className="rounded-baked border border-white/10 bg-white/[0.03] overflow-hidden">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelect(m)}
                data-testid={`message-item-${m.id}`}
                className={cn(
                  'w-full text-left px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors flex items-start gap-3',
                  selectedId === m.id && 'bg-white/[0.06]'
                )}
              >
                <div className="h-2 w-2 rounded-full mt-2" style={{ backgroundColor: m.read ? '#444' : '#F7A500' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{m.name}</div>
                  <div className="text-xs text-white/50 truncate">{m.email}</div>
                  <div className="text-xs text-white/40 mt-1">{new Date(m.createdAt).toLocaleDateString()}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-baked border border-white/10 bg-white/[0.03] p-8">
            {selected ? (
              <div data-testid="message-detail">
                <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                  <div>
                    <h2 className="font-heading text-2xl font-bold">{selected.name}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/60">
                      <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4" /> {selected.email}</span>
                      {selected.phone && <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4" /> {selected.phone}</span>}
                      {selected.company && <span className="inline-flex items-center gap-1.5"><Building className="h-4 w-4" /> {selected.company}</span>}
                    </div>
                    <div className="text-xs text-white/40 mt-2">{new Date(selected.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markRead(selected, !selected.read)}
                      data-testid="message-toggle-read"
                      className="px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs uppercase tracking-wider hover:border-white/40 transition-colors"
                    >
                      <CheckCheck className="h-3 w-3 inline mr-1.5" />
                      {selected.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <button
                      onClick={() => remove(selected)}
                      data-testid="message-delete"
                      className="px-4 py-2 rounded-full border border-brand-red/40 text-brand-red text-xs uppercase tracking-wider hover:bg-brand-red/10 transition-colors"
                    >
                      <Trash2 className="h-3 w-3 inline mr-1.5" /> Delete
                    </button>
                  </div>
                </div>
                <div className="text-base text-white/85 leading-relaxed whitespace-pre-wrap">{selected.message}</div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href={`mailto:${selected.email}?subject=Re: votre message bakēd Group`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-gold text-bg-primary text-xs uppercase tracking-wider font-bold hover:bg-yellow-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" /> Reply by email
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-white/50 text-center py-20">Select a message</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
