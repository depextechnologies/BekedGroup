'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowUpRight, Package, UtensilsCrossed, ShoppingCart, ShoppingBag, Car, Home } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const floatingItems = [
  { Icon: Package, color: '#F7A500', top: '12%', left: '6%', delay: 0, size: 56 },
  { Icon: UtensilsCrossed, color: '#32CD32', top: '18%', right: '8%', delay: 0.3, size: 60 },
  { Icon: ShoppingCart, color: '#32CD32', top: '62%', left: '4%', delay: 0.6, size: 54 },
  { Icon: ShoppingBag, color: '#F7A500', bottom: '14%', right: '12%', delay: 0.9, size: 58 },
  { Icon: Car, color: '#3498FF', top: '48%', right: '4%', delay: 1.2, size: 60 },
  { Icon: Home, color: '#7A3CFF', bottom: '22%', left: '14%', delay: 1.5, size: 56 },
];

interface HeroProps {
  titleFr: string;
  titleEn: string;
  highlightFr: string;
  highlightEn: string;
  bgImage: string;
  foregroundImage: string;
}

export function Hero({ titleFr, titleEn, highlightFr, highlightEn, bgImage, foregroundImage }: HeroProps) {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const title = locale === 'fr' ? titleFr : titleEn;
  const highlight = locale === 'fr' ? highlightFr : highlightEn;

  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(new RegExp(`(${highlight})`, 'i'));
    return parts.map((p, i) =>
      p.toUpperCase() === highlight.toUpperCase() ? (
        <span key={i} className="text-brand-gold">{p}</span>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  };

  return (
    <section
      ref={ref}
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-bg-primary/70 to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-transparent to-bg-primary/40" />
      </motion.div>

      {/* Floating glowing service icons */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {floatingItems.map((item, i) => {
          const { Icon, color, delay, size, ...pos } = item;
          return (
            <motion.div
              key={i}
              data-testid={`hero-floating-icon-${i}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.4, duration: 0.7 }}
              style={pos}
              className="absolute hidden sm:block"
            >
              <motion.div
                animate={{ y: [0, -16, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-2xl backdrop-blur-md p-4 border"
                style={{
                  backgroundColor: `${color}22`,
                  borderColor: `${color}66`,
                  boxShadow: `0 0 60px ${color}55, inset 0 0 20px ${color}22`,
                }}
              >
                <Icon size={size * 0.6} color={color} strokeWidth={2.2} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 grid lg:grid-cols-12 gap-10 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/70 font-semibold">Baked Growth</span>
          </div>
          <h1
            data-testid="hero-title"
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tighter text-white"
          >
            {renderTitle()}
          </h1>
          <p
            data-testid="hero-subtitle"
            className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed"
          >
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#services"
              data-testid="hero-cta-primary"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-brand-gold text-bg-primary font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-glow-gold"
            >
              {t('hero.cta_primary')}
              <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#careers"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full border-2 border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-white/60 hover:bg-white/5 transition-all"
            >
              {t('hero.cta_secondary')}
              <ArrowUpRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Foreground image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="hidden lg:block lg:col-span-5 relative"
        >
          <div className="relative rounded-[28px] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl">
            <img src={foregroundImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
          </div>
          <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-brand-gold/30 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-brand-purple/30 blur-3xl" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 text-xs uppercase tracking-[0.3em] font-semibold"
      >
        ↓ {t('hero.scroll')}
      </motion.div>
    </section>
  );
}
