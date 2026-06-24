'use client';

import { useState } from 'react';
import { Save, Power, PowerOff, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface App {
  id: string;
  slug: string;
  prefix: string;
  color: string;
  colorKey: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  illustration: string;
  logoImage: string;
  icon: string;
  enabled: boolean;
  order: number;
}

const colorOptions = [
  { key: 'gold', hex: '#F7A500', label: 'Gold' },
  { key: 'green', hex: '#32CD32', label: 'Green' },
  { key: 'purple', hex: '#7A3CFF', label: 'Purple' },
  { key: 'blue', hex: '#3498FF', label: 'Blue' },
  { key: 'red', hex: '#E5484D', label: 'Red' },
];

const iconOptions = ['Truck', 'UtensilsCrossed', 'ShoppingCart', 'ShoppingBag', 'Car', 'Home', 'Package', 'Smartphone'];

export function AppsEditor({ initialApps }: { initialApps: App[] }) {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [saving, setSaving] = useState<string | null>(null);

  const updateLocal = (id: string, patch: Partial<App>) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const save = async (app: App) => {
    setSaving(app.id);
    try {
      const res = await fetch(`/api/admin/apps/${app.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app),
      });
      if (!res.ok) throw new Error();
      toast.success(`${app.prefix}bakēd saved`);
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(null);
    }
  };

  const toggle = async (app: App) => {
    const next = !app.enabled;
    updateLocal(app.id, { enabled: next });
    try {
      await fetch(`/api/admin/apps/${app.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...app, enabled: next }),
      });
      toast.success(`${app.prefix}bakēd ${next ? 'enabled' : 'disabled'}`);
    } catch {
      toast.error('Failed');
      updateLocal(app.id, { enabled: !next });
    }
  };

  return (
    <div className="space-y-8" data-testid="apps-editor">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">Applications</h1>
        <p className="text-white/60 mt-2">Manage the 6 apps of the bakēd ecosystem.</p>
      </div>

      <div className="space-y-6">
        {apps.map((app) => (
          <div
            key={app.id}
            data-testid={`app-row-${app.slug}`}
            className={cn(
              'rounded-baked border border-white/10 bg-white/[0.03] p-6 md:p-8 transition-opacity',
              !app.enabled && 'opacity-60'
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center font-heading font-black"
                  style={{ backgroundColor: `${app.color}22`, color: app.color }}
                >
                  {app.prefix.slice(0, 2)}
                </div>
                <div>
                  <Logo size="md" prefix={app.prefix} prefixColor={app.color} />
                  <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">{app.slug}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggle(app)}
                  data-testid={`app-toggle-${app.slug}`}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-colors',
                    app.enabled
                      ? 'bg-brand-green/15 text-brand-green hover:bg-brand-green/25'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  )}
                >
                  {app.enabled ? <><Power className="h-3 w-3" /> Enabled</> : <><PowerOff className="h-3 w-3" /> Disabled</>}
                </button>
                <button
                  onClick={() => save(app)}
                  disabled={saving === app.id}
                  data-testid={`app-save-${app.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-gold text-bg-primary text-xs uppercase tracking-wider font-bold hover:bg-yellow-400 transition-colors disabled:opacity-60"
                >
                  {saving === app.id ? '...' : <><Save className="h-3 w-3" /> Save</>}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Prefix (uppercase)" value={app.prefix} onChange={(v) => updateLocal(app.id, { prefix: v.toUpperCase() })} testId={`field-prefix-${app.slug}`} />
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-2">Color</span>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => updateLocal(app.id, { color: c.hex, colorKey: c.key })}
                      data-testid={`color-${c.key}-${app.slug}`}
                      className={cn(
                        'h-9 w-9 rounded-xl border-2 transition-all',
                        app.color === c.hex ? 'border-white scale-110' : 'border-transparent'
                      )}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-2">Icon</span>
                <select
                  value={app.icon}
                  onChange={(e) => updateLocal(app.id, { icon: e.target.value })}
                  data-testid={`field-icon-${app.slug}`}
                  className="w-full bg-bg-secondary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold"
                >
                  {iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <Field label="Order" type="number" value={String(app.order)} onChange={(v) => updateLocal(app.id, { order: parseInt(v) || 0 })} testId={`field-order-${app.slug}`} />
              <Field label="Description (French)" value={app.descFr} multiline onChange={(v) => updateLocal(app.id, { descFr: v })} testId={`field-descFr-${app.slug}`} />
              <Field label="Description (English)" value={app.descEn} multiline onChange={(v) => updateLocal(app.id, { descEn: v })} testId={`field-descEn-${app.slug}`} />
              <Field label="Illustration URL" value={app.illustration} onChange={(v) => updateLocal(app.id, { illustration: v })} testId={`field-illustration-${app.slug}`} className="md:col-span-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', multiline, testId, className }: any) {
  return (
    <label className={cn('block', className)}>
      <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-2">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          data-testid={testId}
          className="w-full bg-bg-secondary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testId}
          className="w-full bg-bg-secondary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold"
        />
      )}
    </label>
  );
}
