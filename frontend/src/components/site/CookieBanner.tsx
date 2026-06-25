'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const STORAGE_KEY = 'baked_cookie_consent_v1';

type Prefs = {
  essential: true; // always on
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

const TXT = {
  fr: {
    title: 'Vos préférences de cookies',
    body: (
      <>
        Nous utilisons des cookies pour améliorer votre expérience, mesurer l&apos;audience et
        personnaliser le contenu. Vous pouvez accepter, refuser ou personnaliser vos
        choix.{' '}
      </>
    ),
    learn: 'En savoir plus',
    accept: 'Tout accepter',
    reject: 'Tout refuser',
    customize: 'Personnaliser',
    save: 'Enregistrer',
    cats: {
      essential: { name: 'Essentiels', desc: "Nécessaires au fonctionnement du site (sécurité, langue, session). Toujours actifs." },
      analytics: { name: 'Analyse', desc: "Nous aident à comprendre l'utilisation du site pour l'améliorer." },
      marketing: { name: 'Marketing', desc: 'Permettent de proposer du contenu et des offres adaptés.' },
    },
    required: 'Requis',
  },
  en: {
    title: 'Your cookie preferences',
    body: (
      <>
        We use cookies to improve your experience, measure traffic and personalize content.
        You can accept, reject or customize your choices.{' '}
      </>
    ),
    learn: 'Learn more',
    accept: 'Accept all',
    reject: 'Reject all',
    customize: 'Customize',
    save: 'Save preferences',
    cats: {
      essential: { name: 'Essential', desc: 'Required for the site to function (security, language, session). Always on.' },
      analytics: { name: 'Analytics', desc: 'Help us understand site usage so we can improve it.' },
      marketing: { name: 'Marketing', desc: 'Enable us to provide tailored content and offers.' },
    },
    required: 'Required',
  },
};

function readPrefs(): Prefs | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Prefs) : null;
  } catch {
    return null;
  }
}

function writePrefs(p: Prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function CookieBanner() {
  const pathname = usePathname() || '';
  const { locale } = useI18n();
  const t = TXT[locale];

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Decide visibility on mount
  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    const existing = readPrefs();
    if (!existing) {
      // Slight delay to let the page settle before showing
      const id = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(id);
    }
  }, [pathname]);

  if (pathname.startsWith('/admin')) return null;

  const handleAcceptAll = () => {
    writePrefs({ essential: true, analytics: true, marketing: true, ts: Date.now() });
    setVisible(false);
  };

  const handleRejectAll = () => {
    writePrefs({ essential: true, analytics: false, marketing: false, ts: Date.now() });
    setVisible(false);
  };

  const handleSave = () => {
    writePrefs({ essential: true, analytics, marketing, ts: Date.now() });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(94vw,860px)]"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          data-testid="cookie-banner"
        >
          <div className="rounded-3xl border border-white/10 bg-[#0e0e0e]/95 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] p-5 md:p-7">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-gold/15 border border-brand-gold/40 text-brand-gold">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  id="cookie-banner-title"
                  className="font-heading text-base md:text-lg font-bold text-white tracking-tight"
                >
                  {t.title}
                </h2>
                <p className="mt-1.5 text-[13px] md:text-sm text-white/65 leading-relaxed">
                  {t.body}
                  <Link
                    href="/privacy"
                    data-testid="cookie-banner-privacy-link"
                    className="text-brand-gold underline-offset-4 hover:underline"
                  >
                    {t.learn} →
                  </Link>
                </p>
              </div>
              <button
                type="button"
                onClick={handleRejectAll}
                aria-label={t.reject}
                data-testid="cookie-banner-close"
                className="hidden md:inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white/45 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Customize panel */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
                    {/* Essential — always on */}
                    <CategoryRow
                      name={t.cats.essential.name}
                      desc={t.cats.essential.desc}
                      checked
                      disabled
                      tag={t.required}
                      testId="cookie-cat-essential"
                    />
                    <CategoryRow
                      name={t.cats.analytics.name}
                      desc={t.cats.analytics.desc}
                      checked={analytics}
                      onChange={setAnalytics}
                      testId="cookie-cat-analytics"
                    />
                    <CategoryRow
                      name={t.cats.marketing.name}
                      desc={t.cats.marketing.desc}
                      checked={marketing}
                      onChange={setMarketing}
                      testId="cookie-cat-marketing"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                data-testid="cookie-banner-customize"
                className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] font-bold text-white/70 hover:text-white transition-colors self-start"
              >
                {t.customize}
                {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                {expanded ? (
                  <button
                    type="button"
                    onClick={handleSave}
                    data-testid="cookie-banner-save"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-black hover:bg-brand-gold/90 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {t.save}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleRejectAll}
                      data-testid="cookie-banner-reject"
                      className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white hover:border-white/50 transition-colors"
                    >
                      {t.reject}
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      data-testid="cookie-banner-accept"
                      className="inline-flex items-center justify-center rounded-full bg-brand-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-black hover:bg-brand-gold/90 transition-colors"
                    >
                      {t.accept}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CategoryRow({
  name,
  desc,
  checked,
  onChange,
  disabled,
  tag,
  testId,
}: {
  name: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  tag?: string;
  testId?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white/[0.025] border border-white/5 p-3.5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{name}</span>
          {tag && (
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold/85 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-2 py-0.5">
              {tag}
            </span>
          )}
        </div>
        <p className="mt-1 text-[12px] text-white/55 leading-relaxed">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        data-testid={testId}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-brand-gold' : 'bg-white/15'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
