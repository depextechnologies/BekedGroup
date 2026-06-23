'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Apple, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const screens = [
  { src: '/screens/home.png', color: '#F7A500', labelKey: 'phones.home' },
  { src: '/screens/splash.png', color: '#7A3CFF', labelKey: 'phones.splash' },
  { src: '/screens/express-app.png', color: '#F7A500', labelKey: 'phones.delivery' },
  { src: '/screens/shop-app.png', color: '#F7A500', labelKey: 'phones.shop' },
];

const AUTO_ROTATE_MS = 4500;

export function MobileShowcase() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yShift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % screens.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + screens.length) % screens.length);
  };

  const current = screens[index];

  return (
    <section
      id="mobile"
      ref={ref}
      data-testid="mobile-showcase-section"
      style={{ position: 'relative' }}
      className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 map-grid opacity-30 pointer-events-none" />
      <motion.div
        style={{ y: yShift }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full pointer-events-none"
      >
        <div
          className="h-full w-full rounded-full blur-[120px] transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${current.color}33 0%, transparent 60%)` }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative h-[640px] flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <PhonePreview src={screens[(index - 1 + screens.length) % screens.length].src} side="left" />
            <PhonePreview src={screens[(index + 1) % screens.length].src} side="right" />
          </div>

          <div className="relative z-10" data-testid="phone-frame">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60, scale: 0.85, rotateY: direction * -8 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, x: direction * -60, scale: 0.85, rotateY: direction * 8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ filter: `drop-shadow(0 30px 60px ${current.color}55)` }}
              >
                <PhoneFrame src={current.src} glowColor={current.color} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(-1)}
            data-testid="phone-prev"
            aria-label="Previous"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-brand-gold hover:bg-brand-gold/20 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            data-testid="phone-next"
            aria-label="Next"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-brand-gold hover:bg-brand-gold/20 flex items-center justify-center transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {screens.map((s, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                data-testid={`phone-dot-${i}`}
                aria-label={`Screen ${i + 1}`}
                className="h-2 rounded-full transition-all"
                style={{
                  width: i === index ? 28 : 8,
                  backgroundColor: i === index ? s.color : 'rgba(255,255,255,0.25)',
                  boxShadow: i === index ? `0 0 12px ${s.color}` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
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
          <p className="mt-5 text-base md:text-lg text-white/60 max-w-xl">
            {t('mobile.subtitle')}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold" style={{ color: current.color }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: current.color }} />
            {t(current.labelKey)}
            <span className="text-white/30 ml-1">{index + 1} / {screens.length}</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
      </div>
    </section>
  );
}

function PhoneFrame({ src, glowColor }: { src: string; glowColor: string }) {
  return (
    <div
      className="relative w-[260px] md:w-[300px] h-[540px] md:h-[620px] rounded-[44px] bg-[#0a0a0a] p-[10px] border-2 border-white/10"
      style={{ boxShadow: `0 0 80px ${glowColor}44, inset 0 0 1px ${glowColor}66` }}
    >
      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 h-6 w-28 rounded-full bg-black z-20 border border-white/5" />
      <div className="absolute right-[-3px] top-24 h-16 w-1 rounded-full bg-zinc-800" />
      <div className="absolute right-[-3px] top-48 h-24 w-1 rounded-full bg-zinc-800" />
      <div className="absolute left-[-3px] top-28 h-10 w-1 rounded-full bg-zinc-800" />
      <div className="absolute left-[-3px] top-44 h-20 w-1 rounded-full bg-zinc-800" />

      <div className="relative h-full w-full rounded-[36px] overflow-hidden bg-black">
        <img
          src={src}
          alt="App screen"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function PhonePreview({ src, side }: { src: string; side: 'left' | 'right' }) {
  const xOff = side === 'left' ? -220 : 220;
  const rot = side === 'left' ? -10 : 10;
  return (
    <div
      className="absolute hidden md:block opacity-30 blur-[1px]"
      style={{ transform: `translateX(${xOff}px) rotate(${rot}deg) scale(0.7)` }}
    >
      <div className="w-[260px] h-[540px] rounded-[44px] bg-[#0a0a0a] p-[10px] border-2 border-white/10">
        <div className="relative h-full w-full rounded-[36px] overflow-hidden">
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
