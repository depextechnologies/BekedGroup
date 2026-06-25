'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  motion, useScroll, useTransform, useInView, useMotionValue, animate, AnimatePresence,
} from 'framer-motion';
import { useEffect } from 'react';
import {
  ArrowRight, Sparkles, Search, Target, MapPin, Award, BarChart3, Users,
  Truck, UtensilsCrossed, ShoppingBag, ShoppingCart, Car, Home, Building2,
  Goal, UsersRound, Palette, Rocket, LineChart, Wallet, MousePointerClick,
  Eye, TrendingUp, Plus, Minus, Send, CheckCircle2, Phone, Globe,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/lib/utils';

/* ============ HERO ============ */
function Hero() {
  const { locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={ref}
      data-testid="ad-hero"
      className="relative min-h-[100vh] pt-32 md:pt-40 pb-20 overflow-hidden"
    >
      <motion.div style={{ y: yImg, opacity: opacityBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-[#0c0c0c]" />
        <img
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1800&q=85"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/85 to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-gold/20 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[420px] w-[420px] rounded-full bg-brand-purple/15 blur-[140px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-sm mb-6">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">AD<span className="lowercase">bakēd</span></span>
          </div>
          <h1
            data-testid="ad-hero-title"
            style={{ textWrap: 'balance' as any }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black leading-[1.02] tracking-tighter text-white"
          >
            {locale === 'fr' ? (
              <>SOYEZ <span className="text-brand-gold">VISIBLE</span> PARTOUT EN LIGNE</>
            ) : (
              <>GET <span className="text-brand-gold">VISIBLE</span> EVERYWHERE ONLINE</>
            )}
          </h1>
          <p className="mt-7 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
            {locale === 'fr'
              ? "Nous aidons les entreprises à booster leur visibilité grâce à nos solutions de e-commerce, services locaux et publicité digitale. Des campagnes pensées pour vous démarquer sur les moteurs de recherche, les réseaux sociaux et l'écosystème bakēd."
              : 'We help businesses boost their online visibility using our e-commerce, local services, and digital advertising solutions. Campaigns designed to help you stand out across search engines, social media, and the bakēd ecosystem.'}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              data-testid="ad-hero-cta-start"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-gold text-bg-primary text-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-glow-gold"
            >
              {locale === 'fr' ? 'Lancer une campagne' : 'Start Advertising'} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              data-testid="ad-hero-cta-expert"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:border-brand-gold hover:text-brand-gold transition-all"
            >
              {locale === 'fr' ? 'Parler à un expert' : 'Talk to an Expert'}
            </a>
          </div>
        </motion.div>

        {/* Floating metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative h-[460px]"
        >
          <FloatingMetric Icon={Eye} value={500} suffix="K+" label={locale === 'fr' ? 'Impressions' : 'Impressions'} color="#F7A500" pos="top-4 left-4" delay={0.4} />
          <FloatingMetric Icon={MousePointerClick} value={50} suffix="K+" label={locale === 'fr' ? 'Clics' : 'Clicks'} color="#3498FF" pos="top-32 right-2" delay={0.6} />
          <FloatingMetric Icon={Users} value={1000} suffix="+" label={locale === 'fr' ? 'Entreprises touchées' : 'Businesses reached'} color="#32CD32" pos="bottom-12 left-8" delay={0.8} />
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-purple/30 blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingMetric({ Icon, value, suffix, label, color, pos, delay }: { Icon: any; value: number; suffix: string; label: string; color: string; pos: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const [v, setV] = useState(0);
  const mv = useMotionValue(0);
  useEffect(() => {
    if (inView) {
      const c = animate(mv, value, { duration: 2.2, ease: 'easeOut' });
      const u = mv.on('change', (x) => setV(Math.round(x)));
      return () => { c.stop(); u(); };
    }
  }, [inView, value, mv]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn('absolute rounded-baked bg-white/[0.04] backdrop-blur-xl border border-white/15 p-5 shadow-2xl min-w-[200px]', pos)}
      style={{ animation: `floatY 6s ease-in-out infinite ${delay}s` }}
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}22`, boxShadow: `0 0 30px ${color}44` }}>
          <Icon className="h-5 w-5" style={{ color }} strokeWidth={2.2} />
        </div>
        <div>
          <div className="font-heading text-2xl font-black leading-none" style={{ color }}>+{v}{suffix}</div>
          <div className="text-[10px] uppercase tracking-wider text-white/55 mt-1">{label}</div>
        </div>
      </div>
      <style>{`@keyframes floatY { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }`}</style>
    </motion.div>
  );
}

/* ============ WHY ADbakēd ============ */
function WhyAd() {
  const { locale } = useI18n();
  const cards = locale === 'fr'
    ? [
        { Icon: Search, t: 'Visibilité de recherche', d: 'Apparaissez en tête lorsque les clients cherchent vos produits.', c: '#F7A500' },
        { Icon: Target, t: 'Publicité ciblée', d: 'Atteignez la bonne audience au bon moment, sans gaspillage.', c: '#3498FF' },
        { Icon: MapPin, t: 'Acquisition locale', d: 'Captez les clients à proximité avec une portée géolocalisée.', c: '#32CD32' },
        { Icon: Award, t: 'Notoriété de marque', d: 'Construisez une présence forte et durable dans votre marché.', c: '#7A3CFF' },
        { Icon: BarChart3, t: 'Analyses en temps réel', d: 'Tableaux de bord clairs pour mesurer chaque euro investi.', c: '#E5484D' },
        { Icon: Users, t: 'Matching d\'audience intelligent', d: 'Notre IA identifie vos meilleurs prospects automatiquement.', c: '#F7A500' },
      ]
    : [
        { Icon: Search, t: 'Search Visibility', d: 'Show up at the top when customers are looking for what you sell.', c: '#F7A500' },
        { Icon: Target, t: 'Targeted Advertising', d: 'Reach the right audience at the right moment, with no waste.', c: '#3498FF' },
        { Icon: MapPin, t: 'Local Customer Acquisition', d: 'Capture nearby customers with geo-targeted reach.', c: '#32CD32' },
        { Icon: Award, t: 'Brand Awareness', d: 'Build strong, lasting presence in your market.', c: '#7A3CFF' },
        { Icon: BarChart3, t: 'Real-Time Analytics', d: 'Clear dashboards to measure every dollar spent.', c: '#E5484D' },
        { Icon: Users, t: 'Smart Audience Matching', d: 'Our AI identifies your best prospects automatically.', c: '#F7A500' },
      ];

  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32" data-testid="ad-why">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? "Pourquoi ADbakēd" : 'Why ADbakēd'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? <>Maximisez vos chances <span className="text-brand-gold">d&apos;être choisi</span></> : <>Give yourself the best chance of <span className="text-brand-gold">being chosen</span></>}
          </h2>
          <p className="mt-5 text-base md:text-lg text-zinc-700 leading-relaxed">
            {locale === 'fr'
              ? "Apparaissez aux positions premium de l'écosystème bakēd et touchez des clients qui recherchent activement des produits et services."
              : 'Appear in premium positions across the bakēd ecosystem and reach customers actively looking for products and services.'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              data-testid={`ad-why-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="group rounded-baked bg-white border border-zinc-200 p-7 hover:border-zinc-300 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)] transition-all"
            >
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: `${c.c}15` }}>
                <c.Icon className="h-6 w-6" style={{ color: c.c }} strokeWidth={2.2} />
              </div>
              <h3 className="font-heading text-xl font-bold tracking-tight mb-2">{c.t}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ AD NETWORK ============ */
function AdNetwork() {
  const { locale } = useI18n();
  const platforms = [
    { name: 'EXPRESSbakēd', Icon: Truck, color: '#F7A500', angle: 0 },
    { name: 'FOODbakēd', Icon: UtensilsCrossed, color: '#32CD32', angle: 60 },
    { name: 'SHOPbakēd', Icon: ShoppingBag, color: '#F7A500', angle: 120 },
    { name: 'AUTObakēd', Icon: Car, color: '#E5484D', angle: 180 },
    { name: 'MARTbakēd', Icon: ShoppingCart, color: '#32CD32', angle: 240 },
    { name: 'IMMObakēd', Icon: Home, color: '#7A3CFF', angle: 300 },
  ];

  return (
    <section className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden" data-testid="ad-network">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 section-divider opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-brand-gold/8 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Le réseau' : 'The network'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? <>Votre audience <span className="text-brand-gold">est déjà ici</span></> : <>Your audience <span className="text-brand-gold">is already here</span></>}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
            {locale === 'fr'
              ? "Touchez des clients à travers plusieurs points de contact via une seule plateforme publicitaire."
              : 'Reach customers across multiple touchpoints through a single advertising platform.'}
          </p>
        </motion.div>

        {/* Hexagonal ecosystem */}
        <div className="relative max-w-3xl mx-auto h-[480px] md:h-[560px]" data-testid="ad-network-diagram">
          {/* SVG connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
            {platforms.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const cx = 300 + 220 * Math.cos(rad);
              const cy = 300 + 220 * Math.sin(rad);
              return (
                <motion.line
                  key={i}
                  x1="300" y1="300" x2={cx} y2={cy}
                  stroke={p.color} strokeWidth="1" strokeDasharray="4 6" opacity="0.4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Central AD hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center shadow-[0_0_60px_rgba(247,165,0,0.5)]">
              <span className="font-heading text-2xl md:text-3xl font-black text-bg-primary tracking-tight">AD<br />bakēd</span>
              <span className="absolute inset-0 rounded-full ring-2 ring-brand-gold/40 animate-ping" />
            </div>
          </motion.div>

          {/* Platforms */}
          {platforms.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const top = `calc(50% + ${36.6 * Math.sin(rad)}% - 38px)`;
            const left = `calc(50% + ${36.6 * Math.cos(rad)}% - 50px)`;
            return (
              <motion.a
                key={p.name}
                href="#contact"
                data-testid={`ad-network-platform-${i}`}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                style={{ top, left }}
                className="absolute group"
              >
                <div className="relative flex flex-col items-center gap-2">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 flex items-center justify-center transition-all group-hover:border-white/40" style={{ boxShadow: `0 0 0 transparent` }}>
                    <p.Icon className="h-7 w-7 md:h-8 md:w-8" style={{ color: p.color }} strokeWidth={2.2} />
                    <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 40px ${p.color}66` }} />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-center text-white/85 whitespace-nowrap">{p.name}</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ HOW IT WORKS ============ */
function HowItWorks() {
  const { locale } = useI18n();
  const steps = locale === 'fr'
    ? [
        { Icon: Goal, t: 'Définir l\'objectif', d: 'Trafic, leads, ventes, notoriété — vous choisissez la finalité.' },
        { Icon: UsersRound, t: 'Sélection d\'audience', d: 'Segmentez par géographie, intérêts et comportements.' },
        { Icon: Palette, t: 'Création des visuels', d: 'Nos équipes conçoivent des créas conformes à votre marque.' },
        { Icon: Rocket, t: 'Lancement', d: 'Mise en ligne sur l\'écosystème bakēd en quelques heures.' },
        { Icon: LineChart, t: 'Reporting & optimisation', d: 'Mesure continue, ajustements et insights actionnables.' },
      ]
    : [
        { Icon: Goal, t: 'Define Goal', d: 'Traffic, leads, sales, awareness — you choose the outcome.' },
        { Icon: UsersRound, t: 'Audience Selection', d: 'Segment by geography, interests and behaviors.' },
        { Icon: Palette, t: 'Creative Development', d: 'Our team designs on-brand assets that perform.' },
        { Icon: Rocket, t: 'Campaign Launch', d: 'Live on the bakēd ecosystem within hours.' },
        { Icon: LineChart, t: 'Reporting & Optimization', d: 'Continuous measurement, tuning and actionable insights.' },
      ];

  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32" data-testid="ad-how">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Comment ça marche' : 'How it works'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? <>Vous fixez l&apos;objectif. <span className="text-brand-gold">ADbakēd</span> pilote la campagne.</> : <>You set the goal. <span className="text-brand-gold">ADbakēd</span> manages the campaign.</>}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              data-testid={`ad-step-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-baked bg-white border border-zinc-200 p-6 hover:border-brand-gold hover:shadow-[0_20px_60px_-25px_rgba(247,165,0,0.35)] transition-all"
            >
              <div className="text-4xl font-heading font-black text-brand-gold leading-none mb-4">{(i + 1).toString().padStart(2, '0')}</div>
              <s.Icon className="h-6 w-6 text-zinc-800 mb-3" strokeWidth={2.2} />
              <h3 className="font-heading text-base font-bold tracking-tight mb-2">{s.t}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ BUDGET CONTROL ============ */
function BudgetControl() {
  const { locale } = useI18n();
  return (
    <section className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden" data-testid="ad-budget">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-gold/15 blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Budget' : 'Budget'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? <>Gardez votre budget <span className="text-brand-gold">sous contrôle</span></> : <>Keep your budget <span className="text-brand-gold">under control</span></>}
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
            {locale === 'fr'
              ? "Vous fixez le budget. ADbakēd l'alloue intelligemment grâce au ciblage d'audience, à l'optimisation des placements et aux objectifs de campagne."
              : 'You set the budget. ADbakēd allocates it intelligently using audience targeting, placement optimization, and campaign objectives.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <div className="rounded-baked bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl p-7 md:p-9 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 font-bold">Campaign Dashboard</div>
                <div className="font-heading text-lg font-bold mt-1">Q1 2026 — Real Estate</div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/15 text-brand-green text-[10px] uppercase tracking-wider font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" /> Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DashStat Icon={Wallet} label={locale === 'fr' ? 'Budget' : 'Budget'} value="€12,500" sub="of €15,000" color="#F7A500" />
              <DashStat Icon={Eye} label={locale === 'fr' ? 'Portée' : 'Reach'} value="486K" sub="+12% WoW" color="#3498FF" />
              <DashStat Icon={MousePointerClick} label="Clicks" value="42.8K" sub="CTR 8.8%" color="#32CD32" />
              <DashStat Icon={TrendingUp} label={locale === 'fr' ? 'Conversions' : 'Conversions'} value="1,204" sub="ROAS 4.2×" color="#7A3CFF" />
            </div>
            {/* Sparkline */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 font-bold mb-3">Last 14 days</div>
              <div className="flex items-end gap-1.5 h-20">
                {[40, 55, 48, 62, 70, 58, 72, 80, 75, 84, 78, 90, 95, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.04 }}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand-gold/30 to-brand-gold"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashStat({ Icon, label, value, sub, color }: { Icon: any; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/55 font-bold">{label}</span>
      </div>
      <div className="font-heading text-2xl font-black" style={{ color }}>{value}</div>
      <div className="text-[10px] text-white/45 mt-1">{sub}</div>
    </div>
  );
}

/* ============ TARGETING ============ */
function Targeting() {
  const { locale } = useI18n();
  const targets = locale === 'fr'
    ? [
        { Icon: Car, l: 'Acheteurs de véhicules', c: '#E5484D' },
        { Icon: Home, l: "Chercheurs d'immobilier", c: '#7A3CFF' },
        { Icon: ShoppingBag, l: 'Acheteurs en ligne', c: '#F7A500' },
        { Icon: UtensilsCrossed, l: 'Clients livraison repas', c: '#32CD32' },
        { Icon: MapPin, l: 'Consommateurs locaux', c: '#3498FF' },
        { Icon: Building2, l: "Dirigeants d'entreprise", c: '#F7A500' },
        { Icon: Globe, l: 'Audiences régionales', c: '#32CD32' },
      ]
    : [
        { Icon: Car, l: 'Vehicle Buyers', c: '#E5484D' },
        { Icon: Home, l: 'Property Seekers', c: '#7A3CFF' },
        { Icon: ShoppingBag, l: 'Online Shoppers', c: '#F7A500' },
        { Icon: UtensilsCrossed, l: 'Food Delivery Customers', c: '#32CD32' },
        { Icon: MapPin, l: 'Local Consumers', c: '#3498FF' },
        { Icon: Building2, l: 'Business Owners', c: '#F7A500' },
        { Icon: Globe, l: 'Regional Audiences', c: '#32CD32' },
      ];
  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32" data-testid="ad-targeting">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Ciblage' : 'Targeting'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? <>Ciblage de <span className="text-brand-gold">précision</span></> : <>Precision <span className="text-brand-gold">targeting</span></>}
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {targets.map((t, i) => (
            <motion.div
              key={i}
              data-testid={`ad-target-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.18)] transition-all"
            >
              <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ backgroundColor: `${t.c}18` }}>
                <t.Icon className="h-5 w-5" style={{ color: t.c }} strokeWidth={2.4} />
              </div>
              <span className="text-sm font-semibold text-zinc-800">{t.l}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ DELIVERY NETWORK ============ */
function DeliveryNetwork() {
  const { locale } = useI18n();
  const platforms = [
    { name: 'AUTObakēd', Icon: Car, color: '#E5484D', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=85' },
    { name: 'IMMObakēd', Icon: Home, color: '#7A3CFF', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85' },
    { name: 'SHOPbakēd', Icon: ShoppingBag, color: '#F7A500', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=85' },
    { name: 'MARTbakēd', Icon: ShoppingCart, color: '#32CD32', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85' },
    { name: 'FOODbakēd', Icon: UtensilsCrossed, color: '#32CD32', img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=900&q=85' },
    { name: locale === 'fr' ? 'Futurs produits bakēd' : 'Future bakēd Properties', Icon: Sparkles, color: '#F7A500', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85' },
  ];
  return (
    <section className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden" data-testid="ad-delivery">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? "Réseau de diffusion" : 'Delivery network'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? <>Où apparaissent <span className="text-brand-gold">vos publicités</span></> : <>Where your ads <span className="text-brand-gold">appear</span></>}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
            {locale === 'fr'
              ? "Choisissez une plateforme ou diffusez sur l'ensemble de l'écosystème bakēd."
              : 'Choose one platform or advertise across the entire bakēd ecosystem.'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              data-testid={`ad-delivery-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-baked overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-baked opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 20px 60px -20px ${p.color}66` }} />
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
                <div className="absolute top-4 left-4 h-12 w-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: p.color, boxShadow: `0 0 30px ${p.color}66` }}>
                  <p.Icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="font-heading text-xl font-bold tracking-tight">{p.name}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const { locale } = useI18n();
  const items = locale === 'fr'
    ? [
        { q: 'Quand puis-je commencer ?', a: "Les campagnes peuvent être lancées en 24 à 72 heures après validation des éléments créatifs et du ciblage." },
        { q: 'Puis-je cibler une audience spécifique ?', a: 'Oui. ADbakēd offre un ciblage par géographie, intérêts, comportements d\'achat et démographie.' },
        { q: 'Où apparaîtront mes publicités ?', a: "À travers l'écosystème bakēd : EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd." },
        { q: "Ai-je besoin d'une expérience préalable ?", a: 'Non. Nos équipes vous accompagnent de A à Z, de la stratégie à la création et au reporting.' },
        { q: 'Comment mesure-t-on le succès ?', a: 'Impressions, clics, taux de conversion, ROAS, coût par lead — un tableau de bord en temps réel suit chaque KPI.' },
      ]
    : [
        { q: 'How soon can I get started?', a: 'Campaigns can be live within 24–72 hours of creative + targeting sign-off.' },
        { q: 'Can I target a specific audience?', a: 'Yes. ADbakēd supports targeting by geography, interests, purchase behavior and demographics.' },
        { q: 'Where will my ads appear?', a: 'Across the bakēd ecosystem: EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd.' },
        { q: 'Do I need prior experience?', a: 'No. Our team supports you end-to-end — strategy, creative and reporting.' },
        { q: 'How is success measured?', a: 'Impressions, clicks, conversion rate, ROAS and cost-per-lead — a real-time dashboard tracks every KPI.' },
      ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32" data-testid="ad-faq">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">FAQ</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? <>Questions <span className="text-brand-gold">fréquentes</span></> : <>Frequently asked <span className="text-brand-gold">questions</span></>}
          </h2>
        </motion.div>
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-2xl border border-zinc-200 overflow-hidden bg-white" data-testid={`ad-faq-item-${i}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-testid={`ad-faq-toggle-${i}`}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-zinc-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base md:text-lg font-bold tracking-tight">{it.q}</span>
                  {isOpen ? <Minus className="h-5 w-5 text-brand-gold shrink-0" /> : <Plus className="h-5 w-5 text-zinc-400 shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm md:text-base text-zinc-600 leading-relaxed">{it.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT FORM ============ */
function ContactForm() {
  const { locale } = useI18n();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', country: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/advertising', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', country: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'failed');
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-br from-white via-white to-zinc-50 text-bg-primary py-24 md:py-32" data-testid="ad-contact">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Contact' : 'Contact'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr'
              ? <>Vos futurs clients <span className="text-brand-gold">vous cherchent déjà</span></>
              : <>Your future customers <span className="text-brand-gold">are already looking for you</span></>}
          </h2>
          <p className="mt-5 text-base md:text-lg text-zinc-700">
            {locale === 'fr' ? "Parlons de votre prochaine campagne." : "Let's discuss your next campaign."}
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-baked bg-white border border-zinc-200 p-10 md:p-14 text-center shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)]"
            data-testid="ad-contact-success"
          >
            <CheckCircle2 className="h-14 w-14 mx-auto text-brand-green mb-5" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              {locale === 'fr' ? 'Merci ! Nous vous contactons sous peu.' : 'Thank you! We\'ll get back to you shortly.'}
            </h3>
            <p className="text-zinc-600">
              {locale === 'fr' ? "Notre équipe revient vers vous sous 24h ouvrées." : 'Our team typically replies within 24 business hours.'}
            </p>
            <button onClick={() => setStatus('idle')} className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-700 text-xs uppercase tracking-wider font-bold hover:border-brand-gold hover:text-brand-gold transition-colors">
              {locale === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-baked bg-white border border-zinc-200 p-8 md:p-12 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)]"
            data-testid="ad-contact-form"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Input label={locale === 'fr' ? 'Prénom' : 'First name'} required value={form.firstName} onChange={onChange('firstName')} testid="ad-contact-firstName" />
              <Input label={locale === 'fr' ? 'Nom' : 'Last name'} required value={form.lastName} onChange={onChange('lastName')} testid="ad-contact-lastName" />
              <Input label="Email" type="email" required value={form.email} onChange={onChange('email')} testid="ad-contact-email" />
              <Input label={locale === 'fr' ? 'Téléphone' : 'Phone'} type="tel" value={form.phone} onChange={onChange('phone')} testid="ad-contact-phone" />
              <Input label={locale === 'fr' ? 'Entreprise' : 'Company'} value={form.company} onChange={onChange('company')} testid="ad-contact-company" />
              <Input label={locale === 'fr' ? 'Pays' : 'Country'} value={form.country} onChange={onChange('country')} testid="ad-contact-country" />
            </div>
            <div className="mt-5">
              <label className="block">
                <span className="text-xs uppercase tracking-wider font-bold text-zinc-500 block mb-2">
                  {locale === 'fr' ? 'Comment pouvons-nous vous aider ?' : 'How can we help you?'} *
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange('message')}
                  data-testid="ad-contact-message"
                  className="w-full bg-white border border-zinc-300 rounded-xl py-3 px-4 outline-none focus:border-brand-gold transition-colors resize-y"
                />
              </label>
            </div>
            {error && (
              <div className="mt-4 text-sm text-brand-red" data-testid="ad-contact-error">{error}</div>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              data-testid="ad-contact-submit"
              className="mt-7 w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-brand-gold text-bg-primary text-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-gold"
            >
              {status === 'sending'
                ? (locale === 'fr' ? 'Envoi…' : 'Sending…')
                : <><Send className="h-4 w-4" /> {locale === 'fr' ? 'Lancer ma campagne' : 'Start My Campaign'}</>}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function Input({ label, required, type = 'text', value, onChange, testid }: any) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-bold text-zinc-500 block mb-2">{label}{required ? ' *' : ''}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        data-testid={testid}
        className="w-full bg-white border border-zinc-300 rounded-xl py-3 px-4 outline-none focus:border-brand-gold transition-colors"
      />
    </label>
  );
}

/* ============ FINAL CTA ============ */
function FinalCTA() {
  const { locale } = useI18n();
  return (
    <section className="relative bg-bg-primary py-24 md:py-32 overflow-hidden" data-testid="ad-final-cta">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-gradient-to-r from-brand-gold/20 via-brand-purple/20 to-brand-gold/20 blur-[140px]"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto px-6 md:px-12 text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-white">
          {locale === 'fr' ? <>Prêt à <span className="text-brand-gold">accélérer</span> votre croissance ?</> : <>Ready to <span className="text-brand-gold">grow</span> your business?</>}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            data-testid="ad-final-launch"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-brand-gold to-yellow-500 text-bg-primary font-bold text-sm uppercase tracking-wider hover:from-yellow-400 hover:to-brand-gold transition-all shadow-glow-gold"
          >
            {locale === 'fr' ? 'Lancer une campagne' : 'Launch Campaign'} <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            data-testid="ad-final-sales"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-brand-gold hover:text-brand-gold transition-all"
          >
            <Phone className="h-4 w-4" /> {locale === 'fr' ? 'Parler aux ventes' : 'Contact Sales'}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ============ EXPORT ============ */
export function AdvertisingContent() {
  return (
    <div data-testid="advertising-page">
      <Hero />
      <WhyAd />
      <AdNetwork />
      <HowItWorks />
      <BudgetControl />
      <Targeting />
      <DeliveryNetwork />
      <FAQ />
      <ContactForm />
      <FinalCTA />
    </div>
  );
}
