'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Briefcase, X, Send, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

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
}

export function CareersClient({ jobs, contactEmail }: { jobs: Job[]; contactEmail: string }) {
  const { t, locale } = useI18n();
  const [openJob, setOpenJob] = useState<Job | null>(null);

  return (
    <section className="pt-32 pb-24 md:pb-32" data-testid="careers-page">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-gold text-xs uppercase tracking-[0.25em] font-bold mb-8 transition-colors" data-testid="careers-back">
          <ArrowLeft className="h-4 w-4" />
          {t('careers.back')}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
            {t('careers.kicker')}
          </span>
          <h1 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter max-w-3xl">
            {t('careers.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-white/60 text-base md:text-lg">{t('careers.body')}</p>
        </motion.div>

        <div className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-white/50 mb-6">
            {t('careers.open_positions')}
          </h2>
          {jobs.length === 0 ? (
            <div className="rounded-baked border border-white/10 bg-white/[0.03] p-10 text-white/70" data-testid="no-positions">
              {t('careers.no_positions')}{' '}
              <a href={`mailto:${contactEmail}`} className="text-brand-gold underline underline-offset-4">
                {contactEmail}
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((j, i) => (
                <motion.button
                  key={j.id}
                  data-testid={`job-card-${j.slug}`}
                  onClick={() => setOpenJob(j)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ x: 6 }}
                  className="group text-left rounded-baked border border-white/10 bg-white/[0.03] hover:border-brand-gold hover:bg-white/[0.06] p-6 md:p-8 backdrop-blur-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">
                        {locale === 'fr' ? j.departmentFr : j.departmentEn}
                      </div>
                      <h3 className="font-heading text-xl md:text-2xl font-bold mt-2">
                        {locale === 'fr' ? j.titleFr : j.titleEn}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/60">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" /> {locale === 'fr' ? j.locationFr : j.locationEn}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" /> {locale === 'fr' ? j.typeFr : j.typeEn}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-brand-gold text-sm uppercase tracking-wider font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                      {t('careers.apply')} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      {openJob && <ApplyModal job={openJob} onClose={() => setOpenJob(null)} />}
    </section>
  );
}

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const { t, locale } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, jobId: job.id }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-testid="apply-modal"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-secondary border border-white/15 rounded-baked w-full max-w-xl max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">
              {locale === 'fr' ? job.departmentFr : job.departmentEn}
            </div>
            <h3 className="font-heading text-2xl font-bold mt-1">
              {locale === 'fr' ? job.titleFr : job.titleEn}
            </h3>
          </div>
          <button onClick={onClose} data-testid="apply-modal-close" className="p-2 text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-white/70 mb-6">
          {locale === 'fr' ? job.descFr : job.descEn}
        </p>

        {status === 'success' ? (
          <div className="text-center py-10" data-testid="apply-success">
            <CheckCircle2 className="h-12 w-12 text-brand-green mx-auto mb-4" />
            <div className="text-lg font-bold">{t('careers.form.success')}</div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4" data-testid="apply-form">
            <input type="text" required placeholder={t('careers.form.name')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none text-white py-3" data-testid="apply-name" />
            <input type="email" required placeholder={t('careers.form.email')} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none text-white py-3" data-testid="apply-email" />
            <input type="tel" placeholder={t('careers.form.phone')} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none text-white py-3" data-testid="apply-phone" />
            <textarea required rows={4} placeholder={t('careers.form.message')} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none text-white py-3 resize-none" data-testid="apply-message" />
            {status === 'error' && <div className="text-brand-red text-sm">{t('careers.form.error')}</div>}
            <button type="submit" disabled={status === 'sending'} data-testid="apply-submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-brand-gold text-bg-primary font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors disabled:opacity-60">
              <Send className="h-4 w-4" />
              {status === 'sending' ? t('careers.form.submitting') : t('careers.form.submit')}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
