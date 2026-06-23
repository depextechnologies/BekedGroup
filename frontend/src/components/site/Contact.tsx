'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Youtube, Send, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface ContactProps {
  settings: {
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    googleMapsUrl: string;
    facebookUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
    youtubeUrl: string;
  };
}

// TikTok icon (lucide doesn't include one)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.42a8.16 8.16 0 0 0 4.77 1.52V6.4a4.85 4.85 0 0 1-1.84-.31z" />
    </svg>
  );
}

export function Contact({ settings }: ContactProps) {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'failed');
      }
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'failed');
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-bg-secondary text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
            {t('contact.kicker')}
          </span>
          <h2
            data-testid="contact-title"
            className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter"
          >
            {t('contact.title')}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/60 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-testid="contact-form"
            className="lg:col-span-3 rounded-baked bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t('contact.form.name')}
                name="name"
                required
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                testId="contact-input-name"
              />
              <Field
                label={t('contact.form.email')}
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                testId="contact-input-email"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t('contact.form.phone')}
                name="phone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                testId="contact-input-phone"
              />
              <Field
                label={t('contact.form.company')}
                name="company"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
                testId="contact-input-company"
              />
            </div>
            <Field
              label={t('contact.form.message')}
              name="message"
              required
              multiline
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              testId="contact-input-message"
            />

            {status === 'success' && (
              <div className="flex items-center gap-2 text-brand-green text-sm" data-testid="contact-success">
                <CheckCircle2 className="h-5 w-5" />
                {t('contact.form.success')}
              </div>
            )}
            {status === 'error' && (
              <div className="text-brand-red text-sm" data-testid="contact-error">
                {t('contact.form.error')} {error && `(${error})`}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              data-testid="contact-submit"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-brand-gold text-bg-primary font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-glow-gold disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === 'sending' ? t('contact.form.submitting') : t('contact.form.submit')}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <InfoCard Icon={Mail} title={t('contact.info.email')} value={settings.contactEmail} href={`mailto:${settings.contactEmail}`} testId="contact-info-email" />
            {settings.contactPhone && (
              <InfoCard Icon={Phone} title={t('contact.info.phone')} value={settings.contactPhone} href={`tel:${settings.contactPhone}`} testId="contact-info-phone" />
            )}
            {settings.contactAddress && (
              <InfoCard Icon={MapPin} title={t('contact.info.address')} value={settings.contactAddress} testId="contact-info-address" />
            )}

            {/* Map placeholder */}
            <div className="rounded-baked overflow-hidden border border-white/10 aspect-[16/10] map-grid relative" data-testid="contact-map">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-brand-gold mx-auto mb-3" />
                  <div className="text-sm text-white/60">{settings.contactAddress || 'Paris, France'}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-bold text-white/50 mb-3">
                {t('contact.info.social')}
              </div>
              <div className="flex items-center gap-3">
                {settings.facebookUrl && <SocialLink href={settings.facebookUrl} Icon={Facebook} testId="social-facebook" />}
                {settings.linkedinUrl && <SocialLink href={settings.linkedinUrl} Icon={Linkedin} testId="social-linkedin" />}
                {settings.instagramUrl && <SocialLink href={settings.instagramUrl} Icon={Instagram} testId="social-instagram" />}
                {settings.tiktokUrl && <SocialLink href={settings.tiktokUrl} Icon={TikTokIcon} testId="social-tiktok" />}
                {settings.youtubeUrl && <SocialLink href={settings.youtubeUrl} Icon={Youtube} testId="social-youtube" />}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', name, required, multiline, testId }: any) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-2 block">{label}{required && ' *'}</span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testId}
          className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none text-white placeholder-white/30 py-3 text-base transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testId}
          className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none text-white placeholder-white/30 py-3 text-base transition-colors"
        />
      )}
    </label>
  );
}

function InfoCard({ Icon, title, value, href, testId }: any) {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="h-12 w-12 rounded-xl bg-brand-gold/15 flex items-center justify-center group-hover:bg-brand-gold/25 transition-colors">
        <Icon className="h-5 w-5 text-brand-gold" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">{title}</div>
        <div className="text-base text-white font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} data-testid={testId} className="block">{content}</a>
  ) : (
    <div data-testid={testId}>{content}</div>
  );
}

function SocialLink({ href, Icon, testId }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      className="h-11 w-11 rounded-full border border-white/15 hover:border-brand-gold flex items-center justify-center text-white/80 hover:text-brand-gold transition-all"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
