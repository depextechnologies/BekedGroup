'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Truck, UtensilsCrossed, ShoppingCart, ShoppingBag, Car, Home, Package } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { Logo } from './Logo';

const iconMap: Record<string, any> = {
  Truck, UtensilsCrossed, ShoppingCart, ShoppingBag, Car, Home, Package,
};

export interface AppItem {
  id: string;
  slug: string;
  prefix: string;
  color: string;
  colorKey: string;
  descFr: string;
  descEn: string;
  illustration: string;
  logoImage?: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export function Ecosystem({ apps }: { apps: AppItem[] }) {
  const { t, locale } = useI18n();
  const visible = apps.filter((a) => a.enabled).sort((a, b) => a.order - b.order);

  return (
    <section
      id="services"
      data-testid="ecosystem-section"
      className="relative bg-white text-bg-primary py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
            {t('ecosystem.kicker')}
          </span>
          <h2
            data-testid="ecosystem-title"
            className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter max-w-4xl mx-auto"
          >
            {t('ecosystem.title')}
          </h2>
          <p className="mt-5 text-base md:text-lg text-zinc-600 max-w-2xl mx-auto">
            {t('ecosystem.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {visible.map((app, i) => {
            const Icon = iconMap[app.icon] || Package;
            const desc = locale === 'fr' ? app.descFr : app.descEn;
            return (
              <motion.div
                key={app.id}
                data-testid={`ecosystem-card-${app.slug}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-baked bg-white border border-zinc-200 p-7 pb-6 overflow-hidden shadow-[0_12px_40px_-20px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] transition-all duration-500"
              >
                {/* Top color bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: app.color }}
                />

                {/* Icon */}
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${app.color}1A` }}
                >
                  <Icon className="h-7 w-7" style={{ color: app.color }} strokeWidth={2.2} />
                </div>

                {/* Title */}
                <h3 className="mb-3 min-h-[76px] flex items-center">
                  {app.logoImage ? (
                    <img
                      src={app.logoImage}
                      alt={`${app.prefix}bakēd logo`}
                      className="h-[4.75rem] w-auto object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <Logo size="lg" prefix={app.prefix} prefixColor={app.color} white={false} />
                  )}
                </h3>

                {/* Desc */}
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed min-h-[64px]">
                  {desc}
                </p>

                {/* Illustration */}
                <div className="mt-5 rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-50 border border-zinc-100">
                  <img
                    src={app.illustration}
                    alt={`${app.prefix} bakēd illustration`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Arrow */}
                <div className="mt-5 flex items-center justify-between">
                  <a
                    href="#mobile"
                    aria-label={`${app.prefix} bakēd — Download App`}
                    data-testid={`ecosystem-arrow-${app.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold transition-opacity hover:opacity-80"
                    style={{ color: app.color }}
                  >
                    <span>{locale === 'fr' ? "Télécharger l'app" : 'Download App'}</span>
                  </a>
                  <a
                    href="#mobile"
                    aria-label={`${app.prefix} bakēd — Download App`}
                    className="h-11 w-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: app.color, color: app.color }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
