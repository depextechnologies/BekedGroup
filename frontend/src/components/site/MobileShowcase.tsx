'use client';

import { motion } from 'framer-motion';
import { Apple, Play } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export function MobileShowcase() {
  const { t } = useI18n();

  return (
    <section
      id="mobile"
      data-testid="mobile-showcase-section"
      style={{ position: 'relative' }}
      className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 map-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full pointer-events-none">
        <div className="h-full w-full rounded-full blur-[140px]" style={{ background: 'radial-gradient(circle, rgba(247,165,0,0.15) 0%, transparent 60%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-3xl mx-auto px-6 md:px-12 text-center"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
          {t('mobile.kicker')}
        </span>
        <h2
          data-testid="mobile-showcase-title"
          className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter"
        >
          {t('mobile.title')}
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/60 max-w-xl mx-auto">
          {t('mobile.subtitle')}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            data-testid="appstore-button"
            disabled
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-bg-primary opacity-90 cursor-not-allowed"
          >
            <Apple className="h-7 w-7" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">{t('mobile.comingsoon')}</div>
              <div className="text-sm font-bold leading-none">{t('mobile.appstore')}</div>
            </div>
          </button>
          <button
            data-testid="playstore-button"
            disabled
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-bg-primary opacity-90 cursor-not-allowed"
          >
            <Play className="h-7 w-7 fill-bg-primary" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">{t('mobile.comingsoon')}</div>
              <div className="text-sm font-bold leading-none">{t('mobile.playstore')}</div>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
