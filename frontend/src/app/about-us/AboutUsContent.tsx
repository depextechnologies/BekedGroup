'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Users, Rocket, Globe2, Truck, UtensilsCrossed, ShoppingBag, Car, Home, Zap,
  ArrowRight, Download, Layers, Cpu, Sparkle, Heart,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

/* ---------- HERO ---------- */

function AboutHero() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const heroTitle = locale === 'fr' ? 'À PROPOS DE NOUS' : 'ABOUT US';
  const heroKicker = locale === 'fr' ? 'QUI SOMMES-NOUS' : 'WHO WE ARE';
  const paragraphs = locale === 'fr'
    ? [
        "bakēd Group développe l'application incontournable d'Afrique, simplifiant plus que jamais la livraison à la demande, la commande de repas et de courses, le commerce électronique, le marché de l'immobilier et de l'automobile, la gestion des paiements et bien plus encore.",
        "bakēd Group est guidé par une mission forte : simplifier et améliorer la vie des gens et bâtir une organisation inspirante et performante.",
        "Notre Super App vise à répondre aux besoins les plus exigeants des utilisateurs. Nous fournissons à nos clients les meilleurs outils pour réussir aujourd'hui et demain.",
        "L'application bakēd est disponible en téléchargement via iOS et Android.",
      ]
    : [
        'bakēd Group is building Africa\'s essential super-app — making on-demand delivery, food and groceries ordering, e-commerce, real estate and automotive marketplaces, payment management and so much more simpler than ever.',
        'bakēd Group is driven by a strong mission: to simplify and improve people\'s lives and to build an inspiring, high-performing organization.',
        'Our Super App is designed to meet the most demanding user needs. We give our customers the best tools to succeed today and tomorrow.',
        'The bakēd app is available to download on iOS and Android.',
      ];

  return (
    <section
      ref={ref}
      data-testid="about-hero"
      style={{ position: 'relative' }}
      className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden"
    >
      {/* Animated network background */}
      <motion.div style={{ opacity: opacityBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-[#0c0c0c]" />
        <div className="absolute inset-0 map-grid opacity-40" />
        <div className="absolute top-1/4 left-1/3 h-[460px] w-[460px] rounded-full bg-brand-gold/15 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[420px] w-[420px] rounded-full bg-brand-purple/15 blur-[140px]" />
        <NetworkParticles />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">{heroKicker}</span>
          </div>
          <h1
            data-testid="about-hero-title"
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tighter"
          >
            {heroTitle.split('NOUS').length > 1 ? (
              <>
                {heroTitle.split('NOUS')[0]}
                <span className="text-brand-gold">NOUS</span>
              </>
            ) : heroTitle.includes('US') ? (
              <>
                {heroTitle.replace('US', '')}<span className="text-brand-gold">US</span>
              </>
            ) : heroTitle}
          </h1>
          <div className="mt-8 space-y-5 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-bg-primary text-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-glow-gold"
            >
              {locale === 'fr' ? 'Découvrir nos services' : 'Discover our services'} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#mobile"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:border-white/60 hover:bg-white/5 transition-all"
            >
              <Download className="h-4 w-4" /> {locale === 'fr' ? "Télécharger l'app" : 'Download the app'}
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ y: yImg }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-[28px] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=85"
              alt="African team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-primary/70 backdrop-blur border border-white/15 text-xs uppercase tracking-wider font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
                {locale === 'fr' ? 'Bâti pour l\'Afrique' : 'Built for Africa'}
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-brand-gold/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-brand-purple/30 blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

function NetworkParticles() {
  // Decorative animated dots
  const pts = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    top: `${(i * 67) % 100}%`,
    left: `${(i * 41) % 100}%`,
    size: 2 + (i % 3),
    delay: i * 0.4,
  }));
  return (
    <div className="absolute inset-0">
      {pts.map((p) => (
        <motion.span
          key={p.id}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          className="absolute rounded-full bg-brand-gold/50"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: 3.5 + (p.id % 4), repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ---------- MISSION ---------- */

function MissionSection() {
  const { locale } = useI18n();
  const body = locale === 'fr'
    ? [
        "bakēd Group s'engage à résoudre les problèmes quotidiens rencontrés par les consommateurs, tout en améliorant la qualité de vie de millions de personnes en Afrique, notamment celles du secteur informel, ainsi que les petites et moyennes entreprises.",
        "Nous facilitons la vie de nos utilisateurs en connectant des millions de personnes et en leur donnant les moyens de prendre des décisions rapides et avisées.",
      ]
    : [
        'bakēd Group is committed to solving the everyday problems consumers face, while improving the quality of life for millions of people across Africa — especially those in the informal sector, and small and medium businesses.',
        'We make our users\' lives easier by connecting millions of people and empowering them to make fast, informed decisions.',
      ];

  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32 overflow-hidden" data-testid="about-mission">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-brand-gold" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
              {locale === 'fr' ? 'Notre engagement' : 'Our commitment'}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? 'NOTRE ' : 'OUR '}
            <span className="text-brand-gold">{locale === 'fr' ? 'MISSION' : 'MISSION'}</span>
          </h2>
          <div className="mt-7 space-y-5 text-base md:text-lg text-zinc-700 leading-relaxed">
            {body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-6"
        >
          <div className="relative rounded-[28px] overflow-hidden aspect-[5/4] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1100&q=85"
              alt="Inspirational team"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 h-20 w-20 rounded-full border-2 border-brand-gold/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- CORE PILLARS ---------- */

function PillarsSection() {
  const { locale } = useI18n();
  const pillars = locale === 'fr'
    ? [
        { Icon: Users, title: 'Travail en une seule équipe', body: 'Nous nous soutenons mutuellement, communiquons ouvertement, donnons et recevons des commentaires honnêtes et respectueux, et obtenons ensemble d\'excellents résultats.', color: '#F7A500' },
        { Icon: Rocket, title: "Soutien à l'entrepreneuriat", body: 'Nous proposons des outils et des ressources pour aider les petites et moyennes entreprises, les commerçants, et les partenaires de livraison à développer leur activité.', color: '#7A3CFF' },
        { Icon: Globe2, title: 'Impact à l\'échelle locale', body: 'Nous croyons fermement au développement social et économique de notre continent. Nous jouons un rôle essentiel au sein des territoires où nos collaborateurs vivent et travaillent.', color: '#32CD32' },
      ]
    : [
        { Icon: Users, title: 'One team, one goal', body: 'We support each other, communicate openly, give and receive honest and respectful feedback, and together we deliver outstanding results.', color: '#F7A500' },
        { Icon: Rocket, title: 'Backing entrepreneurship', body: 'We provide tools and resources to help small and medium businesses, merchants and delivery partners grow their activity.', color: '#7A3CFF' },
        { Icon: Globe2, title: 'Local impact at scale', body: 'We strongly believe in the social and economic development of our continent. We play an essential role in the communities where our people live and work.', color: '#32CD32' },
      ];

  return (
    <section className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden" data-testid="about-pillars">
      <div className="absolute inset-0 section-divider opacity-25 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
            {locale === 'fr' ? 'Nos valeurs' : 'Our values'}
          </span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter max-w-3xl mx-auto">
            {locale === 'fr' ? 'NOS PILIERS FONDAMENTAUX' : 'OUR CORE PILLARS'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              data-testid={`pillar-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-baked border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-500 hover:border-white/30"
              style={{ boxShadow: `0 0 0 transparent` }}
            >
              <div
                className="absolute inset-0 rounded-baked opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 20px 60px -20px ${p.color}55` }}
              />
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${p.color}22`, boxShadow: `0 0 30px ${p.color}44` }}
              >
                <p.Icon className="h-7 w-7" style={{ color: p.color }} strokeWidth={2.2} />
              </div>
              <h3 className="font-heading text-2xl font-bold tracking-tight mb-3">{p.title}</h3>
              <p className="text-white/65 text-sm md:text-base leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BAKED EN BREF ---------- */

function BakedEnBref() {
  const { locale } = useI18n();
  const items = locale === 'fr'
    ? [
        { Icon: Truck, label: 'Livraison à la demande', color: '#F7A500' },
        { Icon: UtensilsCrossed, label: 'Commande de repas et de courses', color: '#32CD32' },
        { Icon: ShoppingBag, label: 'Commerce électronique', color: '#F7A500' },
        { Icon: Car, label: 'Automobile', color: '#E5484D' },
        { Icon: Zap, label: 'Quick Commerce', color: '#32CD32' },
        { Icon: Home, label: 'Immobilier', color: '#7A3CFF' },
      ]
    : [
        { Icon: Truck, label: 'On-demand delivery', color: '#F7A500' },
        { Icon: UtensilsCrossed, label: 'Food & grocery ordering', color: '#32CD32' },
        { Icon: ShoppingBag, label: 'E-commerce', color: '#F7A500' },
        { Icon: Car, label: 'Automotive', color: '#E5484D' },
        { Icon: Zap, label: 'Quick Commerce', color: '#32CD32' },
        { Icon: Home, label: 'Real Estate', color: '#7A3CFF' },
      ];

  const images = [
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
  ];

  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32 overflow-hidden" data-testid="about-enbref">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 grid grid-cols-2 gap-3"
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`rounded-2xl overflow-hidden ${i === 0 ? 'aspect-[4/5]' : i === 3 ? 'aspect-[4/5]' : 'aspect-square'} ${i === 0 ? 'translate-y-6' : ''}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
            {locale === 'fr' ? "L'écosystème" : 'The ecosystem'}
          </span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? 'bakēd GROUP EN BREF' : 'bakēd GROUP AT A GLANCE'}
          </h2>
          <p className="mt-5 text-base md:text-lg text-zinc-700 leading-relaxed max-w-xl">
            {locale === 'fr'
              ? 'Nous gérons une plateforme tout-en-un couvrant plusieurs secteurs majeurs.'
              : 'We run an all-in-one platform spanning several major industries.'}
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3.5 hover:border-zinc-300 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] transition-all"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${it.color}1A` }}
                >
                  <it.Icon className="h-5 w-5" style={{ color: it.color }} strokeWidth={2.4} />
                </div>
                <span className="text-sm font-semibold text-zinc-800">{it.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- WHY BAKED ---------- */

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);
  const mv = useMotionValue(0);
  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 2, ease: 'easeOut' });
      const u = mv.on('change', (v) => setVal(Math.round(v)));
      return () => { c.stop(); u(); };
    }
  }, [inView, to, mv]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function WhySection() {
  const { locale } = useI18n();
  const benefits = locale === 'fr'
    ? [
        { Icon: Layers, t: 'Écosystème unifié', d: 'Une seule app pour tous les services du quotidien.', c: '#F7A500' },
        { Icon: Cpu, t: 'Technologie intelligente', d: 'IA, données et infrastructure de classe mondiale.', c: '#3498FF' },
        { Icon: Sparkle, t: 'Expérience utilisateur simplifiée', d: 'Des flux conçus pour la rapidité et la simplicité.', c: '#32CD32' },
        { Icon: Heart, t: 'Impact économique local', d: 'Un soutien direct aux entrepreneurs et commerçants.', c: '#7A3CFF' },
      ]
    : [
        { Icon: Layers, t: 'Unified ecosystem', d: 'A single app for every essential service in your day.', c: '#F7A500' },
        { Icon: Cpu, t: 'Smart technology', d: 'World-class AI, data and infrastructure.', c: '#3498FF' },
        { Icon: Sparkle, t: 'Simplified user experience', d: 'Flows designed for speed and simplicity.', c: '#32CD32' },
        { Icon: Heart, t: 'Local economic impact', d: 'Direct support for entrepreneurs and merchants.', c: '#7A3CFF' },
      ];

  return (
    <section className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden" data-testid="about-why">
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
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            {locale === 'fr' ? 'Pourquoi choisir bakēd ?' : 'Why choose bakēd?'}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group rounded-baked bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 transition-all hover:border-white/30"
            >
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${b.c}22`, boxShadow: `0 0 30px ${b.c}33` }}>
                <b.Icon className="h-6 w-6" style={{ color: b.c }} strokeWidth={2.2} />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{b.t}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 rounded-baked bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-10 md:p-12 backdrop-blur-xl">
          {[
            { value: 6, suffix: '+', label: locale === 'fr' ? 'Applications' : 'Applications', c: '#F7A500' },
            { value: 1, suffix: '', label: locale === 'fr' ? 'Super App' : 'Super App', c: '#3498FF' },
            { value: 100, suffix: '%', label: locale === 'fr' ? 'Expérience connectée' : 'Connected experience', c: '#7A3CFF' },
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left border-b md:border-b-0 md:border-r last:border-0 border-white/10 pb-8 md:pb-0 md:pr-10 last:pr-0">
              <div className="font-heading text-6xl md:text-7xl font-black tracking-tighter" style={{ color: s.c, textShadow: `0 0 40px ${s.c}55` }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm uppercase tracking-[0.25em] font-bold text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTASection() {
  const { locale } = useI18n();
  return (
    <section className="relative bg-bg-primary py-24 md:py-32 overflow-hidden" data-testid="about-cta">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-gradient-to-r from-brand-gold/20 via-brand-purple/20 to-brand-gold/20 blur-[140px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto px-6 md:px-12 text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter">
          {locale === 'fr' ? (
            <>bakēd Group, votre quotidien <span className="text-brand-gold">simplifié</span>,<br />vos opportunités <span className="text-brand-gold">multipliées</span>.</>
          ) : (
            <>bakēd Group — your everyday <span className="text-brand-gold">simplified</span>,<br />your opportunities <span className="text-brand-gold">multiplied</span>.</>
          )}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-brand-gold to-yellow-500 text-bg-primary font-bold text-sm uppercase tracking-wider hover:from-yellow-400 hover:to-brand-gold transition-all shadow-glow-gold"
          >
            {locale === 'fr' ? 'Découvrir nos services' : 'Discover our services'} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#mobile"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-brand-gold hover:text-brand-gold transition-all"
          >
            <Download className="h-4 w-4" /> {locale === 'fr' ? "Télécharger l'application" : 'Download the application'}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- EXPORT ---------- */

export function AboutUsContent() {
  return (
    <div data-testid="about-us-page">
      <AboutHero />
      <MissionSection />
      <PillarsSection />
      <BakedEnBref />
      <WhySection />
      <CTASection />
    </div>
  );
}
