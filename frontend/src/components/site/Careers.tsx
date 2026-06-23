'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const HIGHLIGHTS = ['REJOIGNEZ-NOUS.', 'JOIN US.'];

function CareersHeadline({ text }: { text: string }) {
  // Find any of the highlight phrases at the end of the title and color them gold.
  for (const phrase of HIGHLIGHTS) {
    const idx = text.toUpperCase().indexOf(phrase);
    if (idx !== -1) {
      const before = text.slice(0, idx);
      const match = text.slice(idx, idx + phrase.length);
      const after = text.slice(idx + phrase.length);
      return (
        <>
          {before}
          <span className="text-brand-gold">{match}</span>
          {after}
        </>
      );
    }
  }
  return <>{text}</>;
}

export function Careers({ image }: { image: string }) {
  const { t } = useI18n();
  return (
    <section
      id="careers"
      data-testid="careers-section"
      className="relative bg-bg-primary py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="rounded-baked overflow-hidden bg-white grid lg:grid-cols-2 shadow-2xl relative">
          {/* Decorative gold pluses */}
          <div className="absolute top-6 right-6 grid grid-cols-3 gap-2 z-20 pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="text-brand-gold text-lg font-black opacity-70">+</span>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] lg:aspect-auto"
          >
            <img src={image} alt="Baked team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative p-8 md:p-14 flex flex-col justify-center text-bg-primary"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
              {t('careers.kicker')}
            </span>
            <h2
              data-testid="careers-title"
              className="font-heading mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-[0.95] tracking-tighter"
            >
              {t('careers.title').split('REJOIGNEZ-NOUS.').map((part, i, arr) =>
                arr.length > 1 && i === arr.length - 1 ? (
                  <span key={i}>
                    <span className="text-brand-gold">REJOIGNEZ-NOUS.</span>{part}
                  </span>
                ) : (
                  <span key={i}>{part}{arr.length > 1 && i === 0 ? '' : ''}</span>
                )
              )}
            </h2>
            <p className="mt-5 text-base md:text-lg text-zinc-600 leading-relaxed">
              {t('careers.body')}
            </p>

            <div className="mt-8">
              <Link
                href="/careers"
                data-testid="careers-cta"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border-2 border-brand-gold text-brand-gold text-sm font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-bg-primary transition-all duration-300"
              >
                {t('careers.cta')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
