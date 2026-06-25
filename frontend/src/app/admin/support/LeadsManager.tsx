'use client';

import { useState } from 'react';
import { Trash2, Check, ExternalLink, Mail, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Lead {
  id: string;
  headline: string;
  subline: string;
  tertiary: string;
  status: string;
  read: boolean;
  createdAt: string;
  rows: { label: string; value: string; href?: string }[];
  message: string;
  attachmentUrl?: string;
}

const STATUS_COLOR: Record<string, string> = {
  open: 'bg-brand-gold/15 text-brand-gold',
  in_progress: 'bg-brand-blue/15 text-brand-blue',
  resolved: 'bg-brand-green/15 text-brand-green',
  closed: 'bg-white/10 text-white/55',
  new: 'bg-brand-gold/15 text-brand-gold',
  reviewing: 'bg-brand-blue/15 text-brand-blue',
  approved: 'bg-brand-green/15 text-brand-green',
  rejected: 'bg-brand-red/15 text-brand-red',
};

export function LeadsManager({
  kind, title, subtitle, statuses, endpoint, initial,
}: {
  kind: 'ticket' | 'partner';
  title: string;
  subtitle: string;
  statuses: string[];
  endpoint: string;
  initial: Lead[];
}) {
  const [leads, setLeads] = useState<Lead[]>(initial);
  const [selected, setSelected] = useState<Lead | null>(null);

  const markRead = async (l: Lead) => {
    if (l.read) return;
    setLeads((c) => c.map((x) => (x.id === l.id ? { ...x, read: true } : x)));
    await fetch(`${endpoint}/${l.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read: true }) });
  };

  const setStatus = async (l: Lead, status: string) => {
    setLeads((c) => c.map((x) => (x.id === l.id ? { ...x, status } : x)));
    if (selected?.id === l.id) setSelected({ ...selected, status });
    const res = await fetch(`${endpoint}/${l.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    if (!res.ok) toast.error('Failed to update');
  };

  const remove = async (l: Lead) => {
    if (!confirm(`Delete "${l.headline}"?`)) return;
    const res = await fetch(`${endpoint}/${l.id}`, { method: 'DELETE' });
    if (!res.ok) return toast.error('Delete failed');
    setLeads(leads.filter((x) => x.id !== l.id));
    if (selected?.id === l.id) setSelected(null);
    toast.success('Deleted');
  };

  return (
    <div className="space-y-8" data-testid={`${kind}-leads-manager`}>
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">{title}</h1>
        <p className="text-white/60 mt-2">{leads.length} entr{leads.length !== 1 ? 'ies' : 'y'} — {subtitle}</p>
      </div>

      {leads.length === 0 ? (
        <div data-testid={`${kind}-empty`} className="rounded-baked border border-white/10 bg-white/[0.02] p-12 text-center text-white/50">
          <Megaphone className="h-10 w-10 mx-auto mb-4 text-white/20" />
          No submissions yet.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1 space-y-2">
            {leads.map((l) => (
              <button
                key={l.id}
                onClick={() => { setSelected(l); markRead(l); }}
                data-testid={`${kind}-row-${l.id}`}
                className={cn(
                  'w-full text-left rounded-baked border p-4 transition-colors',
                  selected?.id === l.id ? 'border-brand-gold bg-brand-gold/5' : 'border-white/10 bg-white/[0.03] hover:border-white/30',
                  !l.read && 'ring-1 ring-brand-gold/40'
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-heading text-sm font-bold truncate">{l.headline}</span>
                  <span className={cn('px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold flex-shrink-0', STATUS_COLOR[l.status] || 'bg-white/5')}>{l.status}</span>
                </div>
                <div className="text-xs text-white/55 truncate">{l.subline}</div>
                <div className="text-[10px] text-white/35 mt-1">{new Date(l.createdAt).toLocaleString()}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selected ? (
              <div className="rounded-baked bg-white/[0.03] border border-white/10 p-7 space-y-5" data-testid={`${kind}-detail-${selected.id}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-bold">{selected.headline}</h2>
                    <div className="text-white/60 mt-1 text-sm">{selected.subline}</div>
                  </div>
                  <button onClick={() => remove(selected)} data-testid={`${kind}-delete`} className="p-2 rounded-full border border-brand-red/40 text-brand-red hover:bg-brand-red/10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {selected.rows.map((r, i) => {
                    const inner = (
                      <div className="rounded-2xl bg-bg-primary/40 border border-white/5 p-3">
                        <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold">{r.label}</div>
                        <div className="text-sm text-white truncate flex items-center gap-1">{r.value}{r.href && <ExternalLink className="h-3 w-3 opacity-60" />}</div>
                      </div>
                    );
                    return r.href ? (
                      <a key={i} href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">{inner}</a>
                    ) : <div key={i}>{inner}</div>;
                  })}
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-white/50 mb-2">Description</div>
                  <div className="rounded-2xl bg-bg-primary/60 border border-white/10 p-5 text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{selected.message}</div>
                </div>

                {selected.attachmentUrl && (
                  <a href={selected.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand-gold hover:text-yellow-300">
                    <ExternalLink className="h-3.5 w-3.5" /> View attachment
                  </a>
                )}

                <div className="border-t border-white/10 pt-5">
                  <div className="text-xs uppercase tracking-wider font-bold text-white/50 mb-3">Status</div>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((s) => (
                      <button key={s} onClick={() => setStatus(selected, s)} data-testid={`${kind}-status-${s}`} className={cn('px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all inline-flex items-center gap-1.5', selected.status === s ? STATUS_COLOR[s] : 'bg-white/5 text-white/55 hover:text-white')}>
                        {selected.status === s && <Check className="h-3 w-3" />}{s}
                      </button>
                    ))}
                  </div>
                </div>

                <a href={`mailto:${selected.tertiary}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand-gold hover:text-yellow-300">
                  <Mail className="h-3.5 w-3.5" /> Reply by email
                </a>
              </div>
            ) : (
              <div className="rounded-baked border border-dashed border-white/10 p-12 text-center text-white/40">Select an entry to view details</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
