'use client';

import { motion } from 'framer-motion';
import { Apple, Play, Smartphone, Truck, UtensilsCrossed, ShoppingCart, ShoppingBag, Car, Home } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { Logo } from './Logo';

const phones = [
  { color: '#F7A500', Icon: Truck, prefix: 'EXPRESS', rotate: -18, y: 40, x: -180, depth: 0.7, label: 'Delivery' },
  { color: '#32CD32', Icon: UtensilsCrossed, prefix: 'FOOD', rotate: -8, y: -20, x: -90, depth: 0.85, label: 'Restaurants' },
  { color: '#E5484D', Icon: Car, prefix: 'AUTO', rotate: 0, y: 0, x: 0, depth: 1, label: 'Vehicles' },
  { color: '#7A3CFF', Icon: Home, prefix: 'IMMO', rotate: 8, y: -20, x: 90, depth: 0.85, label: 'Real Estate' },
  { color: '#F7A500', Icon: ShoppingBag, prefix: 'SHOP', rotate: 18, y: 40, x: 180, depth: 0.7, label: 'Marketplace' },
];

export function MobileShowcase() {
  const { t } = useI18n();

  return (
    <section
      id="mobile"
      data-testid="mobile-showcase-section"
      className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Background grid + radial gradients */}
      <div className="absolute inset-0 map-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-radial from-white/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Phones */}
        <div className="relative h-[480px] md:h-[560px] flex items-center justify-center mb-12 [perspective:1500px]">
          {phones.map((p, i) => (
            <motion.div
              key={i}
              data-testid={`phone-mock-${i}`}
              initial={{ opacity: 0, y: 80, scale: 0.7 }}
              whileInView={{ opacity: 1, y: p.y, scale: p.depth }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotate}deg) scale(${p.depth})`,
                zIndex: Math.round(p.depth * 10),
              }}
              className="absolute"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneMock color={p.color} Icon={p.Icon} prefix={p.prefix} label={p.label} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
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
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-bg-primary opacity-90 cursor-not-allowed"
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
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-bg-primary opacity-90 cursor-not-allowed"
            >
              <Play className="h-7 w-7 fill-bg-primary" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">{t('mobile.comingsoon')}</div>
                <div className="text-sm font-bold leading-none">{t('mobile.playstore')}</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhoneMock({ color, Icon, prefix, label }: { color: string; Icon: any; prefix: string; label: string }) {
  return (
    <div
      className="relative w-[180px] md:w-[200px] h-[360px] md:h-[400px] rounded-[36px] bg-gradient-to-b from-zinc-900 to-black border-2 border-white/10 p-3 overflow-hidden"
      style={{ boxShadow: `0 0 60px ${color}55, 0 30px 60px rgba(0,0,0,0.7)` }}
    >
      <div
        className="absolute inset-0 rounded-[34px] pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${color}44` }}
      />
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black border border-white/10 z-10" />

      {/* Screen */}
      <div className="relative h-full w-full rounded-[28px] bg-gradient-to-b from-zinc-900 via-black to-black p-4 pt-10 flex flex-col items-center">
        <div className="mt-2">
          <Logo size="sm" prefix={prefix} prefixColor={color} />
        </div>
        <div
          className="mt-6 h-20 w-20 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: `${color}1F`, boxShadow: `0 0 30px ${color}66` }}
        >
          <Icon className="h-10 w-10" style={{ color }} strokeWidth={2} />
        </div>
        <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
          {label}
        </div>

        {/* Mock list */}
        <div className="mt-6 w-full space-y-2">
          {[0.85, 0.6, 0.7, 0.5].map((w, i) => (
            <div key={i} className="h-2 rounded-full bg-white/5" style={{ width: `${w * 100}%` }} />
          ))}
        </div>

        {/* Bottom dots */}
        <div className="mt-auto mb-2 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: i === 0 ? color : '#ffffff22' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
