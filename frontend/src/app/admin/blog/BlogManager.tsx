'use client';

import { useState } from 'react';
import { Plus, Save, Trash2, Eye, EyeOff, FileText, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface BlogPost {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  contentFr: string;
  contentEn: string;
  featuredImage: string;
  category: string;
  metaTitleFr: string;
  metaTitleEn: string;
  metaDescFr: string;
  metaDescEn: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const empty: BlogPost = {
  id: 'new',
  slug: '',
  titleFr: '',
  titleEn: '',
  excerptFr: '',
  excerptEn: '',
  contentFr: '',
  contentEn: '',
  featuredImage: '',
  category: 'News',
  metaTitleFr: '',
  metaTitleEn: '',
  metaDescFr: '',
  metaDescEn: '',
  published: false,
};

const CATEGORIES = ['News', 'Press', 'Product', 'Engineering', 'Design', 'Company'];

export function BlogManager({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [tab, setTab] = useState<'fr' | 'en'>('fr');

  const create = () => setEditing({ ...empty });

  const save = async () => {
    if (!editing) return;
    if (!editing.titleFr || !editing.titleEn) {
      toast.error('Title (FR + EN) is required');
      return;
    }
    const isNew = editing.id === 'new';
    const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${editing.id}`;
    const method = isNew ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      if (isNew) setPosts([data.post, ...posts]);
      else setPosts(posts.map((p) => (p.id === editing.id ? data.post : p)));
      setEditing(null);
      toast.success(isNew ? 'Post created' : 'Post updated');
    } catch (e: any) {
      toast.error(e.message || 'Save failed');
    }
  };

  const remove = async (p: BlogPost) => {
    if (!confirm(`Delete "${p.titleFr || p.titleEn}"?`)) return;
    const res = await fetch(`/api/admin/blog/${p.id}`, { method: 'DELETE' });
    if (!res.ok) return toast.error('Delete failed');
    setPosts(posts.filter((x) => x.id !== p.id));
    toast.success('Deleted');
  };

  const togglePublish = async (p: BlogPost) => {
    const next = !p.published;
    setPosts(posts.map((x) => (x.id === p.id ? { ...x, published: next } : x)));
    await fetch(`/api/admin/blog/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...p, published: next }),
    });
  };

  return (
    <div className="space-y-8" data-testid="blog-manager">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">Blog</h1>
          <p className="text-white/60 mt-2">Write and publish bilingual blog posts.</p>
        </div>
        <button
          onClick={create}
          data-testid="blog-create-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-bg-primary text-xs uppercase tracking-wider font-bold hover:bg-yellow-400 transition-colors"
        >
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <div
            key={p.id}
            data-testid={`blog-row-${p.id}`}
            className="rounded-baked border border-white/10 bg-white/[0.03] p-5 flex items-start justify-between gap-4 flex-wrap"
          >
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
                {p.featuredImage ? (
                  <img src={p.featuredImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-white/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-brand-gold font-bold">{p.category}</div>
                <div className="font-heading text-lg font-bold mt-1 truncate">{p.titleFr || p.titleEn}</div>
                <div className="text-xs text-white/40 mt-1">/blog/{p.slug}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => togglePublish(p)}
                data-testid={`blog-toggle-${p.id}`}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold',
                  p.published ? 'bg-brand-green/15 text-brand-green' : 'bg-white/5 text-white/50'
                )}
              >
                {p.published ? (
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
                onClick={() => setEditing(p)}
                data-testid={`blog-edit-${p.id}`}
                className="px-3 py-1.5 rounded-full bg-white/5 text-white/80 text-xs uppercase tracking-wider font-bold hover:bg-white/10"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p)}
                data-testid={`blog-delete-${p.id}`}
                className="p-2 rounded-full border border-brand-red/40 text-brand-red hover:bg-brand-red/10"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div
            data-testid="blog-empty"
            className="rounded-baked border border-white/10 bg-white/[0.02] p-10 text-center text-white/50"
          >
            <FileText className="h-10 w-10 mx-auto mb-4 text-white/20" />
            No posts yet. Click <span className="text-brand-gold font-bold">New post</span> to create your first article.
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
              <h2 className="font-heading text-2xl font-bold">{editing.id === 'new' ? 'New blog post' : 'Edit blog post'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/60 hover:text-white">✕</button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Slug" v={editing.slug} on={(v: string) => setEditing({ ...editing, slug: v })} placeholder="auto-generated from EN title" testid="blog-field-slug" />
              <Field label="Category" v={editing.category} on={(v: string) => setEditing({ ...editing, category: v })} testid="blog-field-category" options={CATEGORIES} />
              <Field label="Featured image URL" v={editing.featuredImage} on={(v: string) => setEditing({ ...editing, featuredImage: v })} placeholder="https://..." testid="blog-field-image" className="md:col-span-2" />
            </div>

            {/* Locale tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-3" data-testid="blog-locale-tabs">
              <LocaleTab active={tab === 'fr'} onClick={() => setTab('fr')} testid="blog-tab-fr">🇫🇷 French</LocaleTab>
              <LocaleTab active={tab === 'en'} onClick={() => setTab('en')} testid="blog-tab-en">🇬🇧 English</LocaleTab>
            </div>

            {tab === 'fr' ? (
              <div className="space-y-4">
                <Field label="Titre (FR)" v={editing.titleFr} on={(v: string) => setEditing({ ...editing, titleFr: v })} testid="blog-field-titleFr" />
                <Field label="Extrait (FR)" v={editing.excerptFr} on={(v: string) => setEditing({ ...editing, excerptFr: v })} multiline rows={2} testid="blog-field-excerptFr" />
                <Field label="Contenu (FR) — markdown" v={editing.contentFr} on={(v: string) => setEditing({ ...editing, contentFr: v })} multiline rows={10} testid="blog-field-contentFr" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Meta title (FR)" v={editing.metaTitleFr} on={(v: string) => setEditing({ ...editing, metaTitleFr: v })} testid="blog-field-metaTitleFr" />
                  <Field label="Meta description (FR)" v={editing.metaDescFr} on={(v: string) => setEditing({ ...editing, metaDescFr: v })} multiline rows={2} testid="blog-field-metaDescFr" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Field label="Title (EN)" v={editing.titleEn} on={(v: string) => setEditing({ ...editing, titleEn: v })} testid="blog-field-titleEn" />
                <Field label="Excerpt (EN)" v={editing.excerptEn} on={(v: string) => setEditing({ ...editing, excerptEn: v })} multiline rows={2} testid="blog-field-excerptEn" />
                <Field label="Content (EN) — markdown" v={editing.contentEn} on={(v: string) => setEditing({ ...editing, contentEn: v })} multiline rows={10} testid="blog-field-contentEn" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Meta title (EN)" v={editing.metaTitleEn} on={(v: string) => setEditing({ ...editing, metaTitleEn: v })} testid="blog-field-metaTitleEn" />
                  <Field label="Meta description (EN)" v={editing.metaDescEn} on={(v: string) => setEditing({ ...editing, metaDescEn: v })} multiline rows={2} testid="blog-field-metaDescEn" />
                </div>
              </div>
            )}

            <label className="flex items-center gap-3 pt-2 border-t border-white/10">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                data-testid="blog-field-published"
                className="h-4 w-4 accent-brand-gold"
              />
              <span className="text-sm">Published (visible on public blog)</span>
            </label>

            <button
              onClick={save}
              data-testid="blog-save-btn"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-bg-primary font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors"
            >
              <Save className="h-4 w-4" /> {editing.id === 'new' ? 'Create post' : 'Update post'}
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

function Field({ label, v, on, multiline, rows = 3, options, placeholder, testid, className }: any) {
  return (
    <label className={cn('block', className)}>
      <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-2">{label}</span>
      {options ? (
        <select
          value={v ?? ''}
          onChange={(e) => on(e.target.value)}
          data-testid={testid}
          className="w-full bg-bg-primary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold"
        >
          {options.map((o: string) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : multiline ? (
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
