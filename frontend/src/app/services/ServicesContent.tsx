'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import {
  Truck, UtensilsCrossed, ShoppingCart, ShoppingBag, Car, Home,
  ArrowRight, ArrowUpRight, Download, Sparkles, Layers, Cpu, Heart, Clock, Globe,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

/* ---------- HERO ---------- */
function ServicesHero() {
  const { locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const yShift = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const title = locale === 'fr' ? 'NOS SERVICES' : 'OUR SERVICES';
  const subtitle = locale === 'fr'
    ? 'La technologie au service de votre quotidien.'
    : 'Technology that powers your everyday life.';
  const paras = locale === 'fr'
    ? [
        "bakēd Group est un pionnier du numérique qui simplifie la vie des gens grâce à des produits révolutionnaires.",
        "Nous cherchons à répondre aux besoins des utilisateurs les plus exigeants.",
      ]
    : [
        'bakēd Group is a digital pioneer simplifying lives with revolutionary products.',
        'We meet the needs of the most demanding users.',
      ];

  return (
    <section ref={ref} style={{ position: 'relative' }} className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden" data-testid="services-hero">
      <motion.div style={{ opacity: opacityBg, y: yShift }} className="absolute inset-0 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80" alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/70 via-bg-primary/90 to-bg-primary" />
        <div className="absolute inset-0 map-grid opacity-40" />
        <div className="absolute top-1/3 left-1/4 h-[420px] w-[420px] rounded-full bg-brand-gold/15 blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[380px] w-[380px] rounded-full bg-brand-blue/15 blur-[140px]" />
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            style={{ top: `${(i * 73) % 100}%`, left: `${(i * 41) % 100}%`, width: 2 + (i % 3), height: 2 + (i % 3) }}
            className="absolute rounded-full bg-brand-gold/50"
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl mx-auto px-6 md:px-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
          <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">bakēd Group</span>
        </div>
        <h1 data-testid="services-hero-title" className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter">
          {title.split(' ')[0]} <span className="text-brand-gold">{title.split(' ')[1]}</span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-white/85 font-medium max-w-3xl mx-auto">{subtitle}</p>
        <div className="mt-6 space-y-3 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
          {paras.map((p, i) => <motion.p key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}>{p}</motion.p>)}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#grid" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-gold text-bg-primary text-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-glow-gold">
            {locale === 'fr' ? 'Découvrir nos solutions' : 'Discover our solutions'} <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/#mobile" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:border-white/60 hover:bg-white/5 transition-all">
            <Download className="h-4 w-4" /> {locale === 'fr' ? "Télécharger l'application" : 'Download the app'}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- SUPER APP ECOSYSTEM ---------- */
function SuperAppSection() {
  const { locale } = useI18n();
  const orbit = [
    { Icon: Truck, color: '#F7A500', angle: 0 },
    { Icon: UtensilsCrossed, color: '#32CD32', angle: 60 },
    { Icon: ShoppingCart, color: '#32CD32', angle: 120 },
    { Icon: ShoppingBag, color: '#F7A500', angle: 180 },
    { Icon: Car, color: '#E5484D', angle: 240 },
    { Icon: Home, color: '#7A3CFF', angle: 300 },
  ];
  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32 overflow-hidden" data-testid="services-superapp">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }} className="lg:col-span-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-brand-gold" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? "L'écosystème" : 'The ecosystem'}</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">SUPER APPLICATION <span className="text-brand-gold">bakēd</span></h2>
          <div className="mt-7 space-y-5 text-base md:text-lg text-zinc-700 leading-relaxed">
            <p>{locale === 'fr' ? "La mission de bakēd est d'améliorer et de faciliter la vie des clients au quotidien en innovant sans relâche pour eux." : "bakēd's mission is to improve and simplify daily life by relentlessly innovating for our customers."}</p>
            <p>{locale === 'fr' ? "Nous nous efforçons d'offrir un large choix, de la valeur et de la commodité à travers une gamme d'expériences client, notamment les achats en ligne, la livraison à la demande, la logistique, l'immobilier, l'automobile, la publicité, les moyens de paiement et bien plus encore." : 'We strive to deliver wide selection, value and convenience across online shopping, on-demand delivery, logistics, real estate, automotive, advertising, payments and much more.'}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:col-span-6 relative">
          <div className="relative aspect-square max-w-[520px] mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-200 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-zinc-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-32 w-32 rounded-3xl bg-bg-primary flex items-center justify-center shadow-2xl" style={{ boxShadow: '0 30px 60px -20px rgba(247,165,0,0.4)' }}>
                <img src="/logos/baked-header.png" alt="bakēd" className="h-16 w-auto object-contain" />
              </div>
            </div>
            {orbit.map((o, i) => {
              const rad = (o.angle * Math.PI) / 180;
              const r = 200;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.15 }}
                  style={{ left: `calc(50% + ${x}px - 32px)`, top: `calc(50% + ${y}px - 32px)` }}
                  className="absolute h-16 w-16 rounded-2xl flex items-center justify-center cursor-pointer transition-transform"
                >
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }} className="h-full w-full rounded-2xl flex items-center justify-center" style={{ backgroundColor: o.color, boxShadow: `0 12px 30px -10px ${o.color}88` }}>
                    <o.Icon className="h-7 w-7 text-white" strokeWidth={2.4} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- SERVICES GRID ---------- */
function ServicesGrid() {
  const { locale } = useI18n();
  const services = locale === 'fr' ? [
    { Icon: Truck, color: '#F7A500', title: 'Livraison & Logistique', desc: "bakēd est le leader des services de livraison express avec suivi GPS en temps réel. Vos documents, colis et autres articles sont expédiés en toute sécurité. Choisissez entre la livraison instantanée ou programmée. Un service sûr, abordable et rapide, à portée de main.", img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80' },
    { Icon: UtensilsCrossed, color: '#32CD32', title: 'Livraison de repas', desc: "Chaque jour, nous assurons la livraison rapide de plats et de boissons de restaurants et de cafés à des milliers de clients affamés. En quelques clics, vous pouvez vous faire livrer vos envies directement chez vous.", img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80' },
    { Icon: ShoppingCart, color: '#32CD32', title: 'Marché & Supermarché', desc: "Trouvez tout ce dont vous avez besoin : produits d'épicerie et bien plus encore. Nous livrons vos essentiels du quotidien en moins d'une heure ou à votre convenance. Des produits frais aux bouquets, livraison rapide et sans tracas.", img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80' },
    { Icon: ShoppingBag, color: '#F7A500', title: 'Boutique', desc: "Nous travaillons chaque jour pour gagner et conserver la confiance de nos clients et des milliers de petites et moyennes entreprises. De la mode et high-tech aux équipements automobiles, nous proposons une vaste sélection.", img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80' },
    { Icon: Car, color: '#E5484D', title: 'Automobile', desc: "Notre plateforme automobile innovante permet de trouver le véhicule qui correspond parfaitement à votre mode de vie. Nous accompagnons chaque utilisateur et aidons concessionnaires et partenaires grâce à des outils basés sur les données.", img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=80' },
    { Icon: Home, color: '#7A3CFF', title: 'Immobilier', desc: "Notre compréhension de l'immobilier n'a pas d'égal. Qu'il s'agisse de nouveaux locataires, d'appartements urbains ou de maisons de campagne, notre plateforme est conçue pour satisfaire et dépasser les attentes.", img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80' },
  ] : [
    { Icon: Truck, color: '#F7A500', title: 'Delivery & Logistics', desc: 'bakēd leads express delivery with real-time GPS tracking. Your documents, parcels and items ship safely. Choose instant or scheduled — safe, affordable, fast.', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80' },
    { Icon: UtensilsCrossed, color: '#32CD32', title: 'Food Delivery', desc: 'Every day we deliver meals and drinks from restaurants and cafés to thousands of hungry customers. In a few taps, get your favorites delivered.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80' },
    { Icon: ShoppingCart, color: '#32CD32', title: 'Market & Grocery', desc: 'Find groceries and everyday essentials. Get them in under an hour or scheduled at your convenience — from fresh produce to flowers.', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80' },
    { Icon: ShoppingBag, color: '#F7A500', title: 'Marketplace', desc: 'We work every day to earn and keep the trust of customers and thousands of SMBs. From fashion and tech to auto parts and crafts — wide selection with multiple delivery options.', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80' },
    { Icon: Car, color: '#E5484D', title: 'Automotive', desc: 'Our innovative auto platform helps consumers find the right vehicle. We guide every user end-to-end and help dealers grow with data-driven tools.', img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=80' },
    { Icon: Home, color: '#7A3CFF', title: 'Real Estate', desc: 'Our real estate understanding is second to none — from rentals and urban apartments to country homes. A platform built to exceed expectations.', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80' },
  ];

  return (
    <section id="grid" className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden" data-testid="services-grid">
      <div className="absolute inset-0 section-divider opacity-25 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Notre expertise' : 'Our expertise'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">{locale === 'fr' ? "NOS DOMAINES D'EXPERTISE" : 'OUR AREAS OF EXPERTISE'}</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              data-testid={`service-card-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-baked border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/30"
              style={{ boxShadow: '0 0 0 transparent' }}
            >
              <div className="absolute inset-0 rounded-baked opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `0 20px 60px -20px ${s.color}55` }} />
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={s.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
                <div className="absolute top-4 left-4 h-12 w-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: s.color, boxShadow: `0 0 30px ${s.color}66` }}>
                  <s.Icon className="h-6 w-6 text-white" strokeWidth={2.4} />
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-heading text-2xl font-bold tracking-tight mb-3">{s.title}</h3>
                <p className="text-sm md:text-base text-white/65 leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] font-bold opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>{locale === 'fr' ? 'En savoir plus' : 'Learn more'}</span>
                  <span className="h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-110" style={{ borderColor: s.color, color: s.color }}>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE BAKED ---------- */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
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

function WhyChooseBaked() {
  const { locale } = useI18n();
  const benefits = locale === 'fr' ? [
    { Icon: Sparkles, t: 'Innovation Continue', d: "Une R&D infatigable au service de l'expérience utilisateur.", c: '#F7A500' },
    { Icon: Layers, t: 'Écosystème Numérique Complet', d: 'Six services majeurs réunis dans une seule application.', c: '#7A3CFF' },
    { Icon: Cpu, t: 'Technologie Intelligente', d: 'IA, données et infrastructure de classe mondiale.', c: '#3498FF' },
    { Icon: Heart, t: 'Expérience Client Exceptionnelle', d: 'Pensée pour la rapidité, la simplicité et la confiance.', c: '#32CD32' },
  ] : [
    { Icon: Sparkles, t: 'Relentless Innovation', d: 'Tireless R&D in service of the user experience.', c: '#F7A500' },
    { Icon: Layers, t: 'Complete Digital Ecosystem', d: 'Six major services in a single application.', c: '#7A3CFF' },
    { Icon: Cpu, t: 'Smart Technology', d: 'World-class AI, data and infrastructure.', c: '#3498FF' },
    { Icon: Heart, t: 'Exceptional Customer Experience', d: 'Built for speed, simplicity and trust.', c: '#32CD32' },
  ];

  return (
    <section className="relative bg-white text-bg-primary py-24 md:py-32 overflow-hidden" data-testid="services-why">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Pourquoi nous' : 'Why us'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">{locale === 'fr' ? 'Pourquoi choisir bakēd ?' : 'Why choose bakēd?'}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.08 }} whileHover={{ y: -8 }} className="group rounded-baked bg-white border border-zinc-200 p-7 transition-all hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.15)]">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ backgroundColor: `${b.c}1A` }}>
                <b.Icon className="h-7 w-7" style={{ color: b.c }} strokeWidth={2.2} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">{b.t}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-baked bg-bg-primary text-white p-10 md:p-12">
          {[
            { v: 6, sfx: '+', l: locale === 'fr' ? 'Services Principaux' : 'Core Services', c: '#F7A500' },
            { v: 1, sfx: '', l: 'Super App', c: '#3498FF' },
            { v: 24, sfx: '/7', l: locale === 'fr' ? 'Disponibilité' : 'Availability', c: '#32CD32' },
            { v: 100, sfx: '%', l: locale === 'fr' ? 'Orienté Client' : 'Customer-First', c: '#7A3CFF' },
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-heading text-5xl md:text-6xl font-black tracking-tighter" style={{ color: s.c, textShadow: `0 0 40px ${s.c}55` }}>
                <Counter to={s.v} suffix={s.sfx} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] font-bold text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DIGITAL AFRICA ---------- */
function DigitalAfricaSection() {
  const { locale } = useI18n();
  return (
    <section className="relative bg-bg-primary py-0 overflow-hidden" data-testid="services-africa">
      <div className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
        <motion.img initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=2000&q=85" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/85 to-bg-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur mb-6">
              <Globe className="h-3.5 w-3.5 text-brand-gold" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold">{locale === 'fr' ? 'Vision Afrique' : 'Africa Vision'}</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tighter">
              {locale === 'fr' ? <>Construire <span className="text-brand-gold">{`l'avenir numérique`}</span> {`de l'Afrique.`}</> : <>Building Africa&apos;s <span className="text-brand-gold">digital future.</span></>}
            </h2>
            <p className="mt-6 text-lg text-white/75 max-w-xl leading-relaxed">
              {locale === 'fr' ? "bakēd Group développe des solutions numériques innovantes destinées à simplifier le quotidien des particuliers, des entreprises et des communautés à travers l'Afrique." : "bakēd Group builds innovative digital solutions to simplify daily life for individuals, businesses and communities across Africa."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function ServicesCTA() {
  const { locale } = useI18n();
  return (
    <section className="relative bg-bg-primary py-24 md:py-32 overflow-hidden" data-testid="services-cta">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] bg-gradient-to-r from-brand-gold/30 via-yellow-500/20 to-brand-gold/30 blur-[140px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter">
          {locale === 'fr' ? <>Rejoignez la <span className="text-brand-gold">révolution numérique</span><br />avec bakēd.</> : <>Join the <span className="text-brand-gold">digital revolution</span><br />with bakēd.</>}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/#mobile" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-brand-gold to-yellow-500 text-bg-primary font-bold text-sm uppercase tracking-wider hover:from-yellow-400 hover:to-brand-gold transition-all shadow-glow-gold">
            <Download className="h-4 w-4" /> {locale === 'fr' ? "Télécharger l'application" : 'Download the app'}
          </Link>
          <Link href="/#contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-brand-gold hover:text-brand-gold transition-all">
            {locale === 'fr' ? 'Nous contacter' : 'Contact us'} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export function ServicesContent() {
  return (
    <div data-testid="services-page">
      <ServicesHero />
      <SuperAppSection />
      <ServicesGrid />
      <WhyChooseBaked />
      <DigitalAfricaSection />
      <ServicesCTA />
    </div>
  );
}
