'use client';

import { useState } from 'react';
import { Plus, Save, Trash2, Eye, EyeOff, Briefcase, Users, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Job {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  departmentFr: string;
  departmentEn: string;
  locationFr: string;
  locationEn: string;
  typeFr: string;
  typeEn: string;
  descFr: string;
  descEn: string;
  published: boolean;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string | null;
  resumeUrl: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export function JobsManager({ initialJobs, applications }: { initialJobs: Job[]; applications: Application[] }) {
  const [tab, setTab] = useState<'list' | 'applications'>('list');
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [editing, setEditing] = useState<Job | null>(null);

  const create = () => {
    setEditing({
      id: 'new',
      slug: '',
      titleFr: '',
      titleEn: '',
      departmentFr: 'Engineering',
      departmentEn: 'Engineering',
      locationFr: 'Remote',
      locationEn: 'Remote',
      typeFr: 'Temps plein',
      typeEn: 'Full-time',
      descFr: '',
      descEn: '',
      published: false,
    } as Job);
  };

  const save = async () => {
    if (!editing) return;
    const isNew = editing.id === 'new';
    const url = isNew ? '/api/admin/jobs' : `/api/admin/jobs/${editing.id}`;
    const method = isNew ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (isNew) {
        setJobs([data.job, ...jobs]);
      } else {
        setJobs(jobs.map((j) => (j.id === editing.id ? data.job : j)));
      }
      setEditing(null);
      toast.success('Job saved');
    } catch (e: any) {
      toast.error(e.message || 'Save failed');
    }
  };

  const remove = async (j: Job) => {
    if (!confirm(`Delete "${j.titleFr}"?`)) return;
    await fetch(`/api/admin/jobs/${j.id}`, { method: 'DELETE' });
    setJobs(jobs.filter((x) => x.id !== j.id));
    toast.success('Deleted');
  };

  const togglePublish = async (j: Job) => {
    const next = !j.published;
    setJobs(jobs.map((x) => (x.id === j.id ? { ...x, published: next } : x)));
    await fetch(`/api/admin/jobs/${j.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...j, published: next }) });
  };

  return (
    <div className="space-y-8" data-testid="jobs-manager">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight">Careers</h1>
          <p className="text-white/60 mt-2">Manage job openings and view applications.</p>
        </div>
        <button onClick={create} data-testid="jobs-create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-bg-primary text-xs uppercase tracking-wider font-bold hover:bg-yellow-400 transition-colors">
          <Plus className="h-4 w-4" /> New job
        </button>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-3">
        <TabBtn active={tab === 'list'} onClick={() => setTab('list')} data-testid="jobs-tab-list">
          <Briefcase className="h-3 w-3 inline mr-1.5" /> Openings ({jobs.length})
        </TabBtn>
        <TabBtn active={tab === 'applications'} onClick={() => setTab('applications')} data-testid="jobs-tab-applications">
          <Users className="h-3 w-3 inline mr-1.5" /> Applications ({applications.length})
        </TabBtn>
      </div>

      {tab === 'list' && (
        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.id} data-testid={`job-row-${j.id}`} className="rounded-baked border border-white/10 bg-white/[0.03] p-5 flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-brand-gold font-bold">{j.departmentFr}</div>
                <div className="font-heading text-lg font-bold mt-1">{j.titleFr}</div>
                <div className="text-xs text-white/50 mt-1">{j.locationFr} · {j.typeFr}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublish(j)} className={cn('px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold', j.published ? 'bg-brand-green/15 text-brand-green' : 'bg-white/5 text-white/50')}>
                  {j.published ? <><Eye className="h-3 w-3 inline mr-1" />Published</> : <><EyeOff className="h-3 w-3 inline mr-1" />Draft</>}
                </button>
                <button onClick={() => setEditing(j)} className="px-3 py-1.5 rounded-full bg-white/5 text-white/80 text-xs uppercase tracking-wider font-bold hover:bg-white/10">Edit</button>
                <button onClick={() => remove(j)} className="p-2 rounded-full border border-brand-red/40 text-brand-red hover:bg-brand-red/10"><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <div className="rounded-baked border border-white/10 bg-white/[0.02] p-10 text-center text-white/50">No jobs yet. Click "New job" to create one.</div>}
        </div>
      )}

      {tab === 'applications' && (
        <div className="space-y-3">
          {applications.length === 0 && <div className="rounded-baked border border-white/10 bg-white/[0.02] p-10 text-center text-white/50">No applications yet.</div>}
          {applications.map((a) => (
            <div key={a.id} data-testid={`application-row-${a.id}`} className="rounded-baked border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-bold">{a.name} <span className="text-white/40 font-normal">· {a.email}</span>{a.phone && <span className="text-white/40 font-normal"> · {a.phone}</span>}</div>
                  <div className="text-xs text-brand-gold uppercase tracking-wider mt-1">Applied for: {a.jobTitle}</div>
                </div>
                <div className="flex items-center gap-3">
                  {a.resumeUrl && (
                    <a
                      href={a.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`application-resume-${a.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-gold/25 transition-colors"
                    >
                      <Download className="h-3 w-3" />
                      Resume
                    </a>
                  )}
                  <div className="text-xs text-white/40">{new Date(a.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-white/70 whitespace-pre-wrap">{a.message}</div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-bg-secondary border border-white/15 rounded-baked w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="font-heading text-2xl font-bold">{editing.id === 'new' ? 'New job' : 'Edit job'}</h2>
              <button onClick={() => setEditing(null)} className="text-white/60">✕</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <JF label="Slug" v={editing.slug} on={(v: string) => setEditing({ ...editing, slug: v })} />
              <JF label="Department (FR)" v={editing.departmentFr} on={(v: string) => setEditing({ ...editing, departmentFr: v })} />
              <JF label="Title (FR)" v={editing.titleFr} on={(v: string) => setEditing({ ...editing, titleFr: v })} />
              <JF label="Title (EN)" v={editing.titleEn} on={(v: string) => setEditing({ ...editing, titleEn: v })} />
              <JF label="Location (FR)" v={editing.locationFr} on={(v: string) => setEditing({ ...editing, locationFr: v })} />
              <JF label="Location (EN)" v={editing.locationEn} on={(v: string) => setEditing({ ...editing, locationEn: v })} />
              <JF label="Type (FR)" v={editing.typeFr} on={(v: string) => setEditing({ ...editing, typeFr: v })} />
              <JF label="Type (EN)" v={editing.typeEn} on={(v: string) => setEditing({ ...editing, typeEn: v })} />
              <JF label="Description (FR)" v={editing.descFr} on={(v: string) => setEditing({ ...editing, descFr: v })} multiline />
              <JF label="Description (EN)" v={editing.descEn} on={(v: string) => setEditing({ ...editing, descEn: v })} multiline />
              <label className="flex items-center gap-3 md:col-span-2">
                <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
                <span className="text-sm">Published</span>
              </label>
            </div>
            <button onClick={save} data-testid="job-save" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-bg-primary font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors">
              <Save className="h-4 w-4" /> Save job
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, children, ...props }: any) {
  return (
    <button {...props} className={cn('px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-colors', active ? 'bg-brand-gold text-bg-primary' : 'text-white/60 hover:text-white')}>
      {children}
    </button>
  );
}

function JF({ label, v, on, multiline }: any) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-2">{label}</span>
      {multiline ? (
        <textarea value={v ?? ''} onChange={(e) => on(e.target.value)} rows={3} className="w-full bg-bg-primary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold resize-none" />
      ) : (
        <input value={v ?? ''} onChange={(e) => on(e.target.value)} className="w-full bg-bg-primary border border-white/10 rounded-xl py-2.5 px-3 text-white outline-none focus:border-brand-gold" />
      )}
    </label>
  );
}
