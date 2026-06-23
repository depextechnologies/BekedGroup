'use client';

import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Layers, Zap, ShieldCheck, Heart } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const benefits = [
  { key: 'unified', Icon: Layers, color: '#F7A500' },
  { key: 'fast', Icon: Zap, color: '#3498FF' },
  { key: 'secure', Icon: ShieldCheck, color: '#32CD32' },
  { key: 'human', Icon: Heart, color: '#7A3CFF' },
];

function Counter({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration, ease: 'easeOut' });
      const unsub = mv.on('change', (latest) => setVal(Math.round(latest)));
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [inView, to, duration, mv]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function WhyBaked() {
  const { t } = useI18n();

  return (
    <section
      id="why"
      data-testid="why-baked-section"
      className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 section-divider opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
            {t('why.kicker')}
          </span>
          <h2
            data-testid="why-baked-title"
            className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter"
          >
            {t('why.title')}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            {t('why.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {benefits.map((b, i) => (
            <motion.div
              key={b.key}
              data-testid={`why-benefit-${b.key}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group rounded-baked bg-white/[0.03] border border-white/10 backdrop-blur-xl p-7 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06]"
            >
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${b.color}22`, boxShadow: `0 0 30px ${b.color}33` }}
              >
                <b.Icon className="h-7 w-7" style={{ color: b.color }} strokeWidth={2.2} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">{t(`why.benefits.${b.key}.title`)}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{t(`why.benefits.${b.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-baked bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-10 md:p-12 backdrop-blur-xl">
          {[
            { value: 6, suffix: '+', label: t('why.stats.apps'), color: '#F7A500' },
            { value: 1, suffix: '', label: t('why.stats.superapp'), color: '#3498FF' },
            { value: 100, suffix: '%', label: t('why.stats.connected'), color: '#7A3CFF' },
          ].map((s, i) => (
            <motion.div
              key={i}
              data-testid={`why-counter-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center md:text-left border-b md:border-b-0 md:border-r last:border-0 border-white/10 pb-8 md:pb-0 md:pr-10 last:pr-0"
            >
              <div
                className="font-heading text-6xl md:text-7xl font-black tracking-tighter"
                style={{ color: s.color, textShadow: `0 0 40px ${s.color}55` }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm uppercase tracking-[0.25em] font-bold text-white/70">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
