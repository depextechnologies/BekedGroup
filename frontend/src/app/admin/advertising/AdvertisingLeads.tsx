'use client';

import { useState } from 'react';
import { Mail, Trash2, Phone, Building2, Globe, Megaphone, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
  status: string;
  read: boolean;
  createdAt: string;
}

const STATUSES = ['new', 'contacted', 'qualified', 'closed'];
const STATUS_COLOR: Record<string, string> = {
  new: 'bg-brand-gold/15 text-brand-gold',
  contacted: 'bg-brand-blue/15 text-brand-blue',
  qualified: 'bg-brand-purple/15 text-brand-purple',
  closed: 'bg-brand-green/15 text-brand-green',
};

export function AdvertisingLeads({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selected, setSelected] = useState<Lead | null>(null);

  const markRead = async (l: Lead) => {
    if (l.read) return;
    setLeads((curr) => curr.map((x) => (x.id === l.id ? { ...x, read: true } : x)));
    await fetch(`/api/admin/advertising/${l.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read: true }) });
  };

  const setStatus = async (l: Lead, status: string) => {
    setLeads((curr) => curr.map((x) => (x.id === l.id ? { ...x, status } : x)));
    if (selected?.id === l.id) setSelected({ ...selected, status });
    const res = await fetch(`/api/admin/advertising/${l.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    if (!res.ok) toast.error('Failed to update');
  };

  const remove = async (l: Lead) => {
    if (!confirm(`Delete lead from ${l.firstName} ${l.lastName}?`)) return;
    const res = await fetch(`/api/admin/advertising/${l.id}`, { method: 'DELETE' });
    if (!res.ok) return toast.error('Delete failed');
    setLeads(leads.filter((x) => x.id !== l.id));
    if (selected?.id === l.id) setSelected(null);
    toast.success('Deleted');
  };

  return (
    <div className="space-y-8" data-testid="advertising-leads">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">Advertising leads</h1>
        <p className="text-white/60 mt-2">{leads.length} lead{leads.length !== 1 ? 's' : ''} from the ADbakēd contact form.</p>
      </div>

      {leads.length === 0 ? (
        <div data-testid="ad-leads-empty" className="rounded-baked border border-white/10 bg-white/[0.02] p-12 text-center text-white/50">
          <Megaphone className="h-10 w-10 mx-auto mb-4 text-white/20" />
          No leads yet. Once businesses submit the ADbakēd contact form, they will appear here.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* List */}
          <div className="lg:col-span-1 space-y-2">
            {leads.map((l) => (
              <button
                key={l.id}
                onClick={() => { setSelected(l); markRead(l); }}
                data-testid={`ad-lead-row-${l.id}`}
                className={cn(
                  'w-full text-left rounded-baked border p-4 transition-colors',
                  selected?.id === l.id
                    ? 'border-brand-gold bg-brand-gold/5'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/30',
                  !l.read && 'ring-1 ring-brand-gold/40'
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-heading text-sm font-bold truncate">{l.firstName} {l.lastName}</span>
                  <span className={cn('px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold flex-shrink-0', STATUS_COLOR[l.status] || 'bg-white/5')}>
                    {l.status}
                  </span>
                </div>
                <div className="text-xs text-white/55 truncate">{l.company || l.email}</div>
                <div className="text-[10px] text-white/35 mt-1">{new Date(l.createdAt).toLocaleString()}</div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="rounded-baked bg-white/[0.03] border border-white/10 p-7 space-y-5" data-testid={`ad-lead-detail-${selected.id}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-bold">{selected.firstName} {selected.lastName}</h2>
                    {selected.company && <div className="text-white/60 mt-1 text-sm">{selected.company}{selected.country ? ` · ${selected.country}` : ''}</div>}
                  </div>
                  <button onClick={() => remove(selected)} data-testid="ad-lead-delete" className="p-2 rounded-full border border-brand-red/40 text-brand-red hover:bg-brand-red/10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <DetailRow Icon={Mail} label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                  {selected.phone && <DetailRow Icon={Phone} label="Phone" value={selected.phone} href={`tel:${selected.phone}`} />}
                  {selected.company && <DetailRow Icon={Building2} label="Company" value={selected.company} />}
                  {selected.country && <DetailRow Icon={Globe} label="Country" value={selected.country} />}
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-white/50 mb-2">Message</div>
                  <div className="rounded-2xl bg-bg-primary/60 border border-white/10 p-5 text-sm text-white/85 whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="text-xs uppercase tracking-wider font-bold text-white/50 mb-3">Status</div>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(selected, s)}
                        data-testid={`ad-lead-status-${s}`}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all inline-flex items-center gap-1.5',
                          selected.status === s ? STATUS_COLOR[s] : 'bg-white/5 text-white/55 hover:text-white'
                        )}
                      >
                        {selected.status === s && <Check className="h-3 w-3" />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-baked border border-dashed border-white/10 p-12 text-center text-white/40">
                Select a lead to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ Icon, label, value, href }: { Icon: any; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3 rounded-2xl bg-bg-primary/40 border border-white/5 p-3">
      <Icon className="h-4 w-4 text-brand-gold mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold">{label}</div>
        <div className="text-sm text-white truncate">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80 transition-opacity">{inner}</a> : inner;
}
