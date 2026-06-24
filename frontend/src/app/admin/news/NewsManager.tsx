'use client';

import { useState } from 'react';
import { Plus, Save, Trash2, Eye, EyeOff, Newspaper, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface NewsArticle {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  bodyFr: string;
  bodyEn: string;
  image: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const empty: NewsArticle = {
  id: 'new',
  slug: '',
  titleFr: '',
  titleEn: '',
  bodyFr: '',
  bodyEn: '',
  image: '',
  published: false,
};

export function NewsManager({ initialArticles }: { initialArticles: NewsArticle[] }) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [tab, setTab] = useState<'fr' | 'en'>('fr');

  const create = () => setEditing({ ...empty });

  const save = async () => {
    if (!editing) return;
    if (!editing.titleFr || !editing.titleEn) {
      toast.error('Title (FR + EN) is required');
      return;
    }
    const isNew = editing.id === 'new';
    const url = isNew ? '/api/admin/news' : `/api/admin/news/${editing.id}`;
    const method = isNew ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      if (isNew) setArticles([data.article, ...articles]);
      else setArticles(articles.map((a) => (a.id === editing.id ? data.article : a)));
      setEditing(null);
      toast.success(isNew ? 'Article created' : 'Article updated');
    } catch (e: any) {
      toast.error(e.message || 'Save failed');
    }
  };

  const remove = async (a: NewsArticle) => {
    if (!confirm(`Delete "${a.titleFr || a.titleEn}"?`)) return;
    const res = await fetch(`/api/admin/news/${a.id}`, { method: 'DELETE' });
    if (!res.ok) return toast.error('Delete failed');
    setArticles(articles.filter((x) => x.id !== a.id));
    toast.success('Deleted');
  };

  const togglePublish = async (a: NewsArticle) => {
    const next = !a.published;
    setArticles(articles.map((x) => (x.id === a.id ? { ...x, published: next } : x)));
    const res = await fetch(`/api/admin/news/${a.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...a, published: next }),
    });
    if (!res.ok) {
      setArticles((curr) => curr.map((x) => (x.id === a.id ? { ...x, published: a.published } : x)));
      toast.error('Failed to update publish status');
    }
  };

  return (
    <div className="space-y-8" data-testid="news-manager">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">News</h1>
          <p className="text-white/60 mt-2">Publish press releases and corporate announcements.</p>
        </div>
        <button
          onClick={create}
          data-testid="news-create-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-bg-primary text-xs uppercase tracking-wider font-bold hover:bg-yellow-400 transition-colors"
        >
          <Plus className="h-4 w-4" /> New article
        </button>
      </div>

      <div className="space-y-3">
        {articles.map((a) => (
          <div
            key={a.id}
            data-testid={`news-row-${a.id}`}
            className="rounded-baked border border-white/10 bg-white/[0.03] p-5 flex items-start justify-between gap-4 flex-wrap"
          >
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
                {a.image ? (
                  <img src={a.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-white/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-brand-blue font-bold">News</div>
                <div className="font-heading text-lg font-bold mt-1 truncate">{a.titleFr || a.titleEn}</div>
                <div className="text-xs text-white/40 mt-1">/news/{a.slug}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => togglePublish(a)}
                data-testid={`news-toggle-${a.id}`}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold',
                  a.published ? 'bg-brand-green/15 text-brand-green' : 'bg-white/5 text-white/50'
                )}
              >
                {a.published ? (
                  <>
                    <Eye className="h-3 w-3 inline mr-1" />Published
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3 inline mr-1" />Draft
                  </>
                )}
              </button>
              <button
                onClick={() => setEditing(a)}
                data-testid={`news-edit-${a.id}`}
                className="px-3 py-1.5 rounded-full bg-white/5 text-white/80 text-xs uppercase tracking-wider font-bold hover:bg-white/10"
              >
                Edit
              </button>
              <button
                onClick={() => remove(a)}
                data-testid={`news-delete-${a.id}`}
                className="p-2 rounded-full border border-brand-red/40 text-brand-red hover:bg-brand-red/10"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div
            data-testid="news-empty"
            className="rounded-baked border border-white/10 bg-white/[0.02] p-10 text-center text-white/50"
          >
            <Newspaper className="h-10 w-10 mx-auto mb-4 text-white/20" />
            No articles yet. Click <span className="text-brand-gold font-bold">New article</span> to publish your first press release.
          </div>
        )}
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setEditing(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-bg-secondary border border-white/15 rounded-baked w-full max-w-3xl max-h-[92vh] overflow-y-auto p-8 space-y-5"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-heading text-2xl font-bold">{editing.id === 'new' ? 'New news article' : 'Edit news article'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/60 hover:text-white">✕</button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Slug" v={editing.slug} on={(v: string) => setEditing({ ...editing, slug: v })} placeholder="auto-generated from EN title" testid="news-field-slug" />
              <Field label="Cover image URL" v={editing.image} on={(v: string) => setEditing({ ...editing, image: v })} placeholder="https://..." testid="news-field-image" />
            </div>

            <div className="flex gap-2 border-b border-white/10 pb-3" data-testid="news-locale-tabs">
              <LocaleTab active={tab === 'fr'} onClick={() => setTab('fr')} testid="news-tab-fr">🇫🇷 French</LocaleTab>
              <LocaleTab active={tab === 'en'} onClick={() => setTab('en')} testid="news-tab-en">🇬🇧 English</LocaleTab>
            </div>

            {tab === 'fr' ? (
              <div className="space-y-4">
                <Field label="Titre (FR)" v={editing.titleFr} on={(v: string) => setEditing({ ...editing, titleFr: v })} testid="news-field-titleFr" />
                <Field label="Corps (FR) — markdown" v={editing.bodyFr} on={(v: string) => setEditing({ ...editing, bodyFr: v })} multiline rows={12} testid="news-field-bodyFr" />
              </div>
            ) : (
              <div className="space-y-4">
                <Field label="Title (EN)" v={editing.titleEn} on={(v: string) => setEditing({ ...editing, titleEn: v })} testid="news-field-titleEn" />
                <Field label="Body (EN) — markdown" v={editing.bodyEn} on={(v: string) => setEditing({ ...editing, bodyEn: v })} multiline rows={12} testid="news-field-bodyEn" />
              </div>
            )}

            <label className="flex items-center gap-3 pt-2 border-t border-white/10">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                data-testid="news-field-published"
                className="h-4 w-4 accent-brand-gold"
              />
              <span className="text-sm">Published (visible on public news page)</span>
            </label>

            <button
              onClick={save}
              data-testid="news-save-btn"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-bg-primary font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors"
            >
              <Save className="h-4 w-4" /> {editing.id === 'new' ? 'Create article' : 'Update article'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LocaleTab({ active, children, testid, ...props }: any) {
  return (
    <button
      {...props}
      data-testid={testid}
      className={cn(
        'px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-colors',
        active ? 'bg-brand-gold text-bg-primary' : 'text-white/60 hover:text-white'
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, v, on, multiline, rows = 3, placeholder, testid, className }: any) {
  return (
    <label className={cn('block', className)}>
      <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-2">{label}</span>
      {multiline ? (
        <textarea
          value={v ?? ''}
          onChange={(e) => on(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          data-testid={testid}
          className="w-full bg-bg-primary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold resize-y"
        />
      ) : (
        <input
          value={v ?? ''}
          onChange={(e) => on(e.target.value)}
          placeholder={placeholder}
          data-testid={testid}
          className="w-full bg-bg-primary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold"
        />
      )}
    </label>
  );
}
