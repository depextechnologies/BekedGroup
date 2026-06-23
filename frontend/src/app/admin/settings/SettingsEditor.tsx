'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function SettingsEditor({ initialSettings, initialHomepage }: { initialSettings: any; initialHomepage: any }) {
  const [tab, setTab] = useState<'contact' | 'social' | 'footer' | 'homepage'>('contact');
  const [settings, setSettings] = useState(initialSettings);
  const [homepage, setHomepage] = useState(initialHomepage);
  const [saving, setSaving] = useState(false);

  const upd = (patch: any) => setSettings({ ...settings, ...patch });
  const updHp = (patch: any) => setHomepage({ ...homepage, ...patch });

  const save = async () => {
    setSaving(true);
    try {
      const [r1, r2] = await Promise.all([
        fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) }),
        fetch('/api/admin/homepage', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(homepage) }),
      ]);
      if (!r1.ok || !r2.ok) throw new Error();
      toast.success('Settings saved');
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'contact', label: 'Contact' },
    { id: 'social', label: 'Social' },
    { id: 'footer', label: 'Footer & Branding' },
    { id: 'homepage', label: 'Homepage Content' },
  ];

  return (
    <div className="space-y-8" data-testid="settings-editor">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">Settings</h1>
          <p className="text-white/60 mt-2">Edit site-wide configuration and homepage content.</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          data-testid="settings-save"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-bg-primary text-xs uppercase tracking-wider font-bold hover:bg-yellow-400 transition-colors disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save all changes'}
        </button>
      </div>

      <div className="flex gap-2 flex-wrap border-b border-white/10 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            data-testid={`settings-tab-${t.id}`}
            className={cn(
              'px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-colors',
              tab === t.id ? 'bg-brand-gold text-bg-primary' : 'text-white/60 hover:text-white'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-baked border border-white/10 bg-white/[0.03] p-6 md:p-8 grid md:grid-cols-2 gap-5">
        {tab === 'contact' && (
          <>
            <F label="Company name" v={settings.companyName} on={(v) => upd({ companyName: v })} test="set-companyName" />
            <F label="Contact email" v={settings.contactEmail} on={(v) => upd({ contactEmail: v })} test="set-contactEmail" />
            <F label="Contact phone" v={settings.contactPhone} on={(v) => upd({ contactPhone: v })} test="set-contactPhone" />
            <F label="Address" v={settings.contactAddress} on={(v) => upd({ contactAddress: v })} test="set-contactAddress" />
            <F label="Google Maps URL" v={settings.googleMapsUrl} on={(v) => upd({ googleMapsUrl: v })} test="set-googleMapsUrl" className="md:col-span-2" />
          </>
        )}
        {tab === 'social' && (
          <>
            <F label="Facebook URL" v={settings.facebookUrl} on={(v) => upd({ facebookUrl: v })} test="set-facebookUrl" />
            <F label="LinkedIn URL" v={settings.linkedinUrl} on={(v) => upd({ linkedinUrl: v })} test="set-linkedinUrl" />
            <F label="Instagram URL" v={settings.instagramUrl} on={(v) => upd({ instagramUrl: v })} test="set-instagramUrl" />
            <F label="TikTok URL" v={settings.tiktokUrl} on={(v) => upd({ tiktokUrl: v })} test="set-tiktokUrl" />
            <F label="YouTube URL" v={settings.youtubeUrl} on={(v) => upd({ youtubeUrl: v })} test="set-youtubeUrl" />
          </>
        )}
        {tab === 'footer' && (
          <>
            <F label="Footer text (French)" v={settings.footerTextFr} on={(v) => upd({ footerTextFr: v })} test="set-footerTextFr" multiline className="md:col-span-2" />
            <F label="Footer text (English)" v={settings.footerTextEn} on={(v) => upd({ footerTextEn: v })} test="set-footerTextEn" multiline className="md:col-span-2" />
            <F label="Copyright text" v={settings.copyrightText} on={(v) => upd({ copyrightText: v })} test="set-copyrightText" className="md:col-span-2" />
            <F label="Logo URL (optional)" v={settings.logoUrl} on={(v) => upd({ logoUrl: v })} test="set-logoUrl" />
            <F label="Favicon URL (optional)" v={settings.faviconUrl} on={(v) => upd({ faviconUrl: v })} test="set-faviconUrl" />
            <F label="App Store URL" v={settings.appStoreUrl} on={(v) => upd({ appStoreUrl: v })} test="set-appStoreUrl" />
            <F label="Google Play URL" v={settings.playStoreUrl} on={(v) => upd({ playStoreUrl: v })} test="set-playStoreUrl" />
          </>
        )}
        {tab === 'homepage' && (
          <>
            <F label="Hero title (French)" v={homepage.heroTitleFr} on={(v) => updHp({ heroTitleFr: v })} test="hp-heroTitleFr" multiline className="md:col-span-2" />
            <F label="Hero title (English)" v={homepage.heroTitleEn} on={(v) => updHp({ heroTitleEn: v })} test="hp-heroTitleEn" multiline className="md:col-span-2" />
            <F label="Highlighted word (FR)" v={homepage.heroHighlightFr} on={(v) => updHp({ heroHighlightFr: v })} test="hp-heroHighlightFr" />
            <F label="Highlighted word (EN)" v={homepage.heroHighlightEn} on={(v) => updHp({ heroHighlightEn: v })} test="hp-heroHighlightEn" />
            <F label="Hero subtitle (FR)" v={homepage.heroSubFr} on={(v) => updHp({ heroSubFr: v })} test="hp-heroSubFr" multiline />
            <F label="Hero subtitle (EN)" v={homepage.heroSubEn} on={(v) => updHp({ heroSubEn: v })} test="hp-heroSubEn" multiline />
            <F label="Hero background image URL" v={homepage.heroBgImage} on={(v) => updHp({ heroBgImage: v })} test="hp-heroBgImage" className="md:col-span-2" />
            <F label="Hero foreground image URL" v={homepage.heroForegroundImage} on={(v) => updHp({ heroForegroundImage: v })} test="hp-heroForegroundImage" className="md:col-span-2" />
            <F label="About title (FR)" v={homepage.aboutTitleFr} on={(v) => updHp({ aboutTitleFr: v })} test="hp-aboutTitleFr" />
            <F label="About title (EN)" v={homepage.aboutTitleEn} on={(v) => updHp({ aboutTitleEn: v })} test="hp-aboutTitleEn" />
            <F label="About body (FR)" v={homepage.aboutBodyFr} on={(v) => updHp({ aboutBodyFr: v })} test="hp-aboutBodyFr" multiline className="md:col-span-2" />
            <F label="About body (EN)" v={homepage.aboutBodyEn} on={(v) => updHp({ aboutBodyEn: v })} test="hp-aboutBodyEn" multiline className="md:col-span-2" />
            <F label="Careers image URL" v={homepage.careersImage} on={(v) => updHp({ careersImage: v })} test="hp-careersImage" className="md:col-span-2" />
          </>
        )}
      </div>
    </div>
  );
}

function F({ label, v, on, test, multiline, className }: any) {
  return (
    <label className={cn('block', className)}>
      <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-2">{label}</span>
      {multiline ? (
        <textarea
          value={v ?? ''}
          onChange={(e) => on(e.target.value)}
          rows={3}
          data-testid={test}
          className="w-full bg-bg-secondary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold resize-none"
        />
      ) : (
        <input
          type="text"
          value={v ?? ''}
          onChange={(e) => on(e.target.value)}
          data-testid={test}
          className="w-full bg-bg-secondary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold"
        />
      )}
    </label>
  );
}
