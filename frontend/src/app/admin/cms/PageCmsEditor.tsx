'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, GripVertical, Save, Loader2, ExternalLink } from 'lucide-react';

// ------------------- Types -------------------
export type PageKey = 'about' | 'services' | 'advertising' | 'support';

interface HeroBlock {
  eyebrowFr?: string;
  eyebrowEn?: string;
  titleFr?: string;
  titleEn?: string;
  subtitleFr?: string;
  subtitleEn?: string;
}
interface CtaBlock {
  titleFr?: string;
  titleEn?: string;
  bodyFr?: string;
  bodyEn?: string;
  labelFr?: string;
  labelEn?: string;
  url?: string;
}
type ListItem = Record<string, string>;

interface PageData {
  hero?: HeroBlock;
  cta?: CtaBlock;
  values?: ListItem[];
  services?: ListItem[];
  features?: ListItem[];
  faqs?: ListItem[];
}

// ------------------- Per-page list config -------------------
const LIST_CONFIG: Record<
  PageKey,
  {
    key: keyof PageData;
    label: string;
    addLabel: string;
    fields: { name: string; label: string; type: 'input' | 'textarea' }[];
    blank: ListItem;
  }
> = {
  about: {
    key: 'values',
    label: 'Our Values',
    addLabel: 'Add value',
    fields: [
      { name: 'titleFr', label: 'Title (FR)', type: 'input' },
      { name: 'titleEn', label: 'Title (EN)', type: 'input' },
      { name: 'descFr', label: 'Description (FR)', type: 'textarea' },
      { name: 'descEn', label: 'Description (EN)', type: 'textarea' },
    ],
    blank: { titleFr: '', titleEn: '', descFr: '', descEn: '' },
  },
  services: {
    key: 'services',
    label: 'Services',
    addLabel: 'Add service',
    fields: [
      { name: 'titleFr', label: 'Title (FR)', type: 'input' },
      { name: 'titleEn', label: 'Title (EN)', type: 'input' },
      { name: 'descFr', label: 'Description (FR)', type: 'textarea' },
      { name: 'descEn', label: 'Description (EN)', type: 'textarea' },
    ],
    blank: { titleFr: '', titleEn: '', descFr: '', descEn: '' },
  },
  advertising: {
    key: 'features',
    label: 'Advertising Features',
    addLabel: 'Add feature',
    fields: [
      { name: 'titleFr', label: 'Title (FR)', type: 'input' },
      { name: 'titleEn', label: 'Title (EN)', type: 'input' },
      { name: 'descFr', label: 'Description (FR)', type: 'textarea' },
      { name: 'descEn', label: 'Description (EN)', type: 'textarea' },
    ],
    blank: { titleFr: '', titleEn: '', descFr: '', descEn: '' },
  },
  support: {
    key: 'faqs',
    label: 'Frequently Asked Questions',
    addLabel: 'Add FAQ',
    fields: [
      { name: 'questionFr', label: 'Question (FR)', type: 'input' },
      { name: 'questionEn', label: 'Question (EN)', type: 'input' },
      { name: 'answerFr', label: 'Answer (FR)', type: 'textarea' },
      { name: 'answerEn', label: 'Answer (EN)', type: 'textarea' },
    ],
    blank: { questionFr: '', questionEn: '', answerFr: '', answerEn: '' },
  },
};

const PAGE_PREVIEW: Record<PageKey, string> = {
  about: '/about-us',
  services: '/services',
  advertising: '/advertising',
  support: '/support',
};

const PAGE_TITLE: Record<PageKey, string> = {
  about: 'About Us',
  services: 'Services',
  advertising: 'Advertising',
  support: 'Support',
};

// ------------------- Reusable inputs -------------------
function FieldGroup({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] font-bold text-white/55 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, testId, multiline, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; testId?: string; multiline?: boolean; rows?: number }) {
  const cls = 'w-full bg-white/[0.03] border border-white/10 focus:border-brand-gold/60 outline-none rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 transition-colors';
  if (multiline) {
    return (
      <textarea data-testid={testId} rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls + ' resize-y'} />
    );
  }
  return <input data-testid={testId} type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />;
}

// ------------------- Main editor -------------------
export function PageCmsEditor({ pageKey }: { pageKey: PageKey }) {
  const cfg = LIST_CONFIG[pageKey];
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<PageData>({});
  const [defaults, setDefaults] = useState<PageData>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch(`/api/admin/cms/${pageKey}`, { credentials: 'include' });
      const j = await res.json();
      if (!alive) return;
      const merged: PageData = { ...(j.defaults || {}), ...(j.data || {}) };
      // Ensure list exists
      if (!Array.isArray(merged[cfg.key])) {
        merged[cfg.key] = ((j.defaults || {})[cfg.key] as ListItem[]) || [];
      }
      setData(merged);
      setDefaults(j.defaults || {});
      setLoaded(true);
    })();
    return () => {
      alive = false;
    };
  }, [pageKey, cfg.key]);

  const hero = data.hero || {};
  const cta = data.cta || {};
  const list = (data[cfg.key] as ListItem[]) || [];

  const updateHero = (k: keyof HeroBlock, v: string) => setData((d) => ({ ...d, hero: { ...(d.hero || {}), [k]: v } }));
  const updateCta = (k: keyof CtaBlock, v: string) => setData((d) => ({ ...d, cta: { ...(d.cta || {}), [k]: v } }));

  const updateListItem = (idx: number, key: string, val: string) => {
    setData((d) => {
      const arr = [...((d[cfg.key] as ListItem[]) || [])];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...d, [cfg.key]: arr };
    });
  };
  const addItem = () => setData((d) => ({ ...d, [cfg.key]: [...((d[cfg.key] as ListItem[]) || []), { ...cfg.blank }] }));
  const removeItem = (idx: number) => setData((d) => ({ ...d, [cfg.key]: ((d[cfg.key] as ListItem[]) || []).filter((_, i) => i !== idx) }));
  const moveItem = (idx: number, dir: -1 | 1) => {
    setData((d) => {
      const arr = [...((d[cfg.key] as ListItem[]) || [])];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return d;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { ...d, [cfg.key]: arr };
    });
  };

  const resetToDefaults = () => {
    if (!confirm('Reset all fields on this page to defaults? Unsaved changes will be lost.')) return;
    setData(structuredClone(defaults));
    toast.success('Reset to defaults — click Save to persist.');
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cms/${pageKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ data }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || 'save failed');
      toast.success('Saved ✓ Public page updated.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <div data-testid="cms-loading" className="flex items-center justify-center py-24 text-white/50">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading content…
      </div>
    );
  }

  return (
    <div data-testid={`cms-editor-${pageKey}`} className="space-y-10 max-w-5xl">
      {/* Header bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 sticky top-0 z-30 -mx-6 px-6 py-4 bg-bg-primary/85 backdrop-blur border-b border-white/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-gold">Page CMS</div>
          <h1 className="text-2xl font-bold mt-0.5" data-testid="cms-page-title">Edit · {PAGE_TITLE[pageKey]}</h1>
        </div>
        <div className="flex items-center gap-2">
          <a href={PAGE_PREVIEW[pageKey]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full px-3.5 py-2 transition-colors" data-testid="cms-preview">
            <ExternalLink className="h-3.5 w-3.5" /> Preview
          </a>
          <button type="button" onClick={resetToDefaults} className="text-xs uppercase tracking-[0.2em] font-bold text-white/55 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-3.5 py-2 transition-colors" data-testid="cms-reset">
            Reset
          </button>
          <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-yellow-400 transition-colors disabled:opacity-60" data-testid="cms-save">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/85 mb-1">Hero section</h2>
        <p className="text-xs text-white/45 mb-5">The top banner of the page (eyebrow badge, big title, subtitle).</p>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldGroup label="Eyebrow (FR)"><TextInput testId="hero-eyebrow-fr" value={hero.eyebrowFr || ''} onChange={(v) => updateHero('eyebrowFr', v)} /></FieldGroup>
          <FieldGroup label="Eyebrow (EN)"><TextInput testId="hero-eyebrow-en" value={hero.eyebrowEn || ''} onChange={(v) => updateHero('eyebrowEn', v)} /></FieldGroup>
          <FieldGroup label="Title (FR)"><TextInput testId="hero-title-fr" value={hero.titleFr || ''} onChange={(v) => updateHero('titleFr', v)} /></FieldGroup>
          <FieldGroup label="Title (EN)"><TextInput testId="hero-title-en" value={hero.titleEn || ''} onChange={(v) => updateHero('titleEn', v)} /></FieldGroup>
          <FieldGroup label="Subtitle (FR)"><TextInput testId="hero-subtitle-fr" multiline rows={3} value={hero.subtitleFr || ''} onChange={(v) => updateHero('subtitleFr', v)} /></FieldGroup>
          <FieldGroup label="Subtitle (EN)"><TextInput testId="hero-subtitle-en" multiline rows={3} value={hero.subtitleEn || ''} onChange={(v) => updateHero('subtitleEn', v)} /></FieldGroup>
        </div>
      </section>

      {/* List */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/85">{cfg.label}</h2>
            <p className="text-xs text-white/45 mt-1">Add, remove and reorder the items shown on the public page.</p>
          </div>
          <button type="button" onClick={addItem} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-2 text-xs uppercase tracking-[0.2em] font-bold text-white transition-colors" data-testid="cms-list-add">
            <Plus className="h-3.5 w-3.5" /> {cfg.addLabel}
          </button>
        </div>

        <div className="space-y-3">
          {list.length === 0 && <div className="text-sm text-white/45 italic">No items yet — click &quot;{cfg.addLabel}&quot; above.</div>}
          {list.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.03] p-4" data-testid={`cms-list-item-${idx}`}>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center pt-1 gap-1">
                  <GripVertical className="h-4 w-4 text-white/30" />
                  <span className="text-[10px] font-bold text-white/40">#{idx + 1}</span>
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-3">
                  {cfg.fields.map((f) => (
                    <FieldGroup key={f.name} label={f.label}>
                      <TextInput
                        testId={`cms-item-${idx}-${f.name}`}
                        multiline={f.type === 'textarea'}
                        rows={f.type === 'textarea' ? 3 : undefined}
                        value={item[f.name] || ''}
                        onChange={(v) => updateListItem(idx, f.name, v)}
                      />
                    </FieldGroup>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={() => moveItem(idx, -1)} disabled={idx === 0} className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/55 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-2 py-1 transition-colors disabled:opacity-30" data-testid={`cms-item-up-${idx}`}>↑</button>
                  <button type="button" onClick={() => moveItem(idx, 1)} disabled={idx === list.length - 1} className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/55 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-2 py-1 transition-colors disabled:opacity-30" data-testid={`cms-item-down-${idx}`}>↓</button>
                  <button type="button" onClick={() => removeItem(idx)} className="text-brand-red/85 hover:text-brand-red border border-brand-red/20 hover:border-brand-red/45 rounded-md px-2 py-1 transition-colors" aria-label="Delete" data-testid={`cms-item-delete-${idx}`}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/85 mb-1">Final CTA section</h2>
        <p className="text-xs text-white/45 mb-5">The call-to-action block near the bottom of the page.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldGroup label="Title (FR)"><TextInput testId="cta-title-fr" value={cta.titleFr || ''} onChange={(v) => updateCta('titleFr', v)} /></FieldGroup>
          <FieldGroup label="Title (EN)"><TextInput testId="cta-title-en" value={cta.titleEn || ''} onChange={(v) => updateCta('titleEn', v)} /></FieldGroup>
          <FieldGroup label="Body (FR)"><TextInput testId="cta-body-fr" multiline rows={2} value={cta.bodyFr || ''} onChange={(v) => updateCta('bodyFr', v)} /></FieldGroup>
          <FieldGroup label="Body (EN)"><TextInput testId="cta-body-en" multiline rows={2} value={cta.bodyEn || ''} onChange={(v) => updateCta('bodyEn', v)} /></FieldGroup>
          <FieldGroup label="Button label (FR)"><TextInput testId="cta-label-fr" value={cta.labelFr || ''} onChange={(v) => updateCta('labelFr', v)} /></FieldGroup>
          <FieldGroup label="Button label (EN)"><TextInput testId="cta-label-en" value={cta.labelEn || ''} onChange={(v) => updateCta('labelEn', v)} /></FieldGroup>
          <div className="md:col-span-2">
            <FieldGroup label="Button URL (https://… or /path or mailto:…)">
              <TextInput testId="cta-url" value={cta.url || ''} onChange={(v) => updateCta('url', v)} placeholder="/contact or https://… or mailto:…" />
            </FieldGroup>
          </div>
        </div>
      </section>

      {/* Floating save reminder on mobile */}
      <div className="md:hidden sticky bottom-3 z-30 flex justify-end">
        <button type="button" onClick={save} disabled={saving} className="rounded-full bg-brand-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-lg disabled:opacity-60">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}
