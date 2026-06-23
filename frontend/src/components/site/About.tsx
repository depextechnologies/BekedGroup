'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Users } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const cards = [
  { key: 'mission', Icon: Target, color: '#F7A500' },
  { key: 'vision', Icon: Eye, color: '#3498FF' },
  { key: 'innovation', Icon: Sparkles, color: '#7A3CFF' },
  { key: 'community', Icon: Users, color: '#32CD32' },
];

interface AboutProps {
  titleFr: string;
  titleEn: string;
  bodyFr: string;
  bodyEn: string;
}

export function About({ titleFr, titleEn, bodyFr, bodyEn }: AboutProps) {
  const { t, locale } = useI18n();
  const title = locale === 'fr' ? titleFr : titleEn;
  const body = locale === 'fr' ? bodyFr : bodyEn;

  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-white text-bg-primary py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
              {t('about.kicker')}
            </span>
            <h2
              data-testid="about-title"
              className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter"
            >
              {title}
            </h2>
            <p className="mt-6 text-base md:text-lg text-zinc-700 leading-relaxed max-w-xl">
              {body}
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {cards.map((c, i) => (
              <motion.div
                key={c.key}
                data-testid={`about-card-${c.key}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-baked border border-zinc-200 bg-white p-7 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] transition-all duration-500"
              >
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${c.color}1A` }}
                >
                  <c.Icon className="h-7 w-7" style={{ color: c.color }} strokeWidth={2.2} />
                </div>
                <h3 className="font-heading text-2xl font-bold tracking-tight">
                  {t(`about.cards.${c.key}.title`)}
                </h3>
                <p className="mt-3 text-sm md:text-base text-zinc-600 leading-relaxed">
                  {t(`about.cards.${c.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
