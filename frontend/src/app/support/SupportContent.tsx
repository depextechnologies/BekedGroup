'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, UserPlus, LogIn, ShoppingBag, Truck, CreditCard, AlertTriangle,
  Home, Car, Handshake, Megaphone, Download, Bug,
  Plus, Minus, User, Phone, Mail, Hash, Layers, MessageSquare, ImageIcon, Receipt,
  Send, CheckCircle2, Apple, Play, Sparkles, Clock, Zap, Globe2, Users,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/lib/utils';

/* ============ HERO ============ */
function Hero({ onSearch }: { onSearch: (q: string) => void }) {
  const { locale } = useI18n();
  return (
    <section data-testid="support-hero" className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-[#0c0c0c]" />
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1800&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/85 to-bg-primary/60" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.55, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-brand-gold/15 blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-7">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-semibold">{locale === 'fr' ? 'Centre d\'assistance' : 'Help Center'}</span>
          </div>
          <h1 data-testid="support-hero-title" className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-black leading-[1.05] tracking-tighter">
            {locale === 'fr'
              ? <>Bienvenue dans le <span className="text-brand-gold">centre d&apos;assistance</span> bakēd</>
              : <>Welcome to the bakēd <span className="text-brand-gold">support center</span></>}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/65 max-w-3xl mx-auto leading-relaxed">
            {locale === 'fr'
              ? "Notre objectif : vous aider rapidement et clairement pour toute question liée à notre site, application, commandes, paiements, livraisons, votre compte ou nos services."
              : 'Our goal: help you quickly and clearly with anything about our site, app, orders, payments, deliveries, your account or our services.'}
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mt-10">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              data-testid="support-search"
              type="text"
              onChange={(e) => onSearch(e.target.value)}
              placeholder={locale === 'fr' ? 'Comment pouvons-nous vous aider ?' : 'How can we help you?'}
              className="w-full pl-14 pr-6 py-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-brand-gold focus:bg-white/10 transition-all text-base md:text-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ CATEGORIES ============ */
const CATS = (locale: 'fr' | 'en') => locale === 'fr'
  ? [
      { Icon: UserPlus, t: 'Création ou gestion de compte', c: '#F7A500', kw: ['compte', 'créer', 'inscription'] },
      { Icon: LogIn, t: 'Connexion à l\'application', c: '#3498FF', kw: ['connexion', 'connecter', 'login'] },
      { Icon: ShoppingBag, t: 'Commandes', c: '#32CD32', kw: ['commande', 'passer'] },
      { Icon: Truck, t: 'Suivi de livraison', c: '#7A3CFF', kw: ['livraison', 'suivre'] },
      { Icon: CreditCard, t: 'Paiements et remboursements', c: '#E5484D', kw: ['paiement', 'remboursement'] },
      { Icon: AlertTriangle, t: 'Problèmes de commande', c: '#F7A500', kw: ['problème', 'annuler', 'retard'] },
      { Icon: Home, t: 'Services immobiliers', c: '#7A3CFF', kw: ['immobilier'] },
      { Icon: Car, t: 'Services automobiles', c: '#E5484D', kw: ['automobile', 'voiture'] },
      { Icon: Handshake, t: 'Partenaires et commerçants', c: '#32CD32', kw: ['partenaire', 'commerçant'] },
      { Icon: Megaphone, t: 'Publicité', c: '#F7A500', kw: ['publicité', 'annonce'] },
      { Icon: Download, t: "Téléchargement de l'application", c: '#3498FF', kw: ['télécharger', 'app', 'application'] },
      { Icon: Bug, t: 'Signalement technique', c: '#E5484D', kw: ['technique', 'bug', 'erreur'] },
    ]
  : [
      { Icon: UserPlus, t: 'Account creation & management', c: '#F7A500', kw: ['account', 'register'] },
      { Icon: LogIn, t: 'App sign-in', c: '#3498FF', kw: ['login', 'sign in'] },
      { Icon: ShoppingBag, t: 'Orders', c: '#32CD32', kw: ['order', 'place'] },
      { Icon: Truck, t: 'Delivery tracking', c: '#7A3CFF', kw: ['delivery', 'track'] },
      { Icon: CreditCard, t: 'Payments & refunds', c: '#E5484D', kw: ['payment', 'refund'] },
      { Icon: AlertTriangle, t: 'Order issues', c: '#F7A500', kw: ['problem', 'cancel', 'late'] },
      { Icon: Home, t: 'Real-estate services', c: '#7A3CFF', kw: ['real estate', 'property'] },
      { Icon: Car, t: 'Automotive services', c: '#E5484D', kw: ['auto', 'car'] },
      { Icon: Handshake, t: 'Partners & merchants', c: '#32CD32', kw: ['partner', 'merchant'] },
      { Icon: Megaphone, t: 'Advertising', c: '#F7A500', kw: ['ads', 'advertising'] },
      { Icon: Download, t: 'App download', c: '#3498FF', kw: ['download', 'app'] },
      { Icon: Bug, t: 'Technical issue', c: '#E5484D', kw: ['technical', 'bug', 'error'] },
    ];

function Categories() {
  const { locale } = useI18n();
  const cats = CATS(locale);
  return (
    <section data-testid="support-categories" className="relative bg-white text-bg-primary py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Catégories' : 'Categories'}</span>
          <h2 className="font-heading mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">{locale === 'fr' ? 'Explorez par sujet' : 'Browse by topic'}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map((c, i) => (
            <motion.a
              key={i}
              href="#faq"
              data-testid={`support-cat-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-white border border-zinc-200 p-5 hover:border-zinc-300 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.18)] transition-all"
            >
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: `${c.c}18` }}>
                <c.Icon className="h-6 w-6" style={{ color: c.c }} strokeWidth={2.2} />
              </div>
              <h3 className="font-heading text-sm md:text-base font-bold tracking-tight leading-snug">{c.t}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
const FAQS = (locale: 'fr' | 'en') => locale === 'fr'
  ? [
      { q: "Comment télécharger l'application bakēd ?", a: "L'app est bientôt disponible sur l'App Store et Google Play. Inscrivez-vous pour être notifié dès le lancement." },
      { q: 'Comment créer un compte ?', a: "Ouvrez l'application, choisissez 'Créer un compte', renseignez vos informations et validez par email ou SMS." },
      { q: "Je n'arrive pas à me connecter.", a: "Vérifiez votre email/mot de passe. Sinon utilisez 'Mot de passe oublié' ou contactez le support via le formulaire ci-dessous." },
      { q: 'Comment passer une commande ?', a: "Choisissez le service (FOOD, MART, SHOP…), ajoutez vos articles, validez l'adresse, payez. Vous recevez une confirmation immédiate." },
      { q: 'Comment suivre ma livraison ?', a: "Onglet 'Mes commandes' → la livraison est suivie en temps réel sur la carte." },
      { q: 'Que faire si ma commande est en retard ?', a: "Contactez le livreur depuis l'app. Si nécessaire, ouvrez un ticket via le formulaire support." },
      { q: 'Puis-je annuler une commande ?', a: "Oui, tant qu'elle n'a pas été préparée. Sinon, des frais peuvent s'appliquer." },
      { q: 'Comment demander un remboursement ?', a: 'Ouvrez un ticket support en précisant le numéro de commande et la raison. Remboursement traité sous 5–7 jours ouvrés.' },
      { q: 'Que faire en cas de problème de paiement ?', a: "Vérifiez votre carte ou changez de moyen de paiement. Si le problème persiste, contactez-nous avec une capture d'écran." },
      { q: 'Comment signaler un problème technique ?', a: 'Utilisez le formulaire support avec une description détaillée + captures. Notre équipe technique répond sous 24h ouvrées.' },
      { q: 'Je suis un commerçant ou partenaire. Comment rejoindre bakēd ?', a: 'Remplissez le formulaire « Devenir partenaire » plus bas. Notre équipe partenariats vous recontacte sous 72h.' },
      { q: "Comment contacter l'équipe bakēd ?", a: 'Via le formulaire support ci-dessous, par email à contact@baked.group ou via les réseaux sociaux officiels.' },
    ]
  : [
      { q: 'How do I download the bakēd app?', a: 'The app is launching soon on App Store and Google Play. Sign up to be notified.' },
      { q: 'How do I create an account?', a: "Open the app, tap 'Create account', fill in your info, confirm via email or SMS." },
      { q: "I can't sign in.", a: "Double-check email/password. Otherwise use 'Forgot password' or contact support via the form below." },
      { q: 'How do I place an order?', a: 'Pick a service (FOOD, MART, SHOP…), add items, confirm the address, pay. You receive instant confirmation.' },
      { q: 'How do I track my delivery?', a: "Tab 'My orders' → real-time tracking on the map." },
      { q: 'What if my order is late?', a: "Reach the courier directly via the app. If needed, open a ticket via the support form." },
      { q: 'Can I cancel an order?', a: 'Yes, as long as it has not been prepared. Otherwise small fees may apply.' },
      { q: 'How do I request a refund?', a: 'Open a support ticket with your order number and reason. Refunds are processed in 5–7 business days.' },
      { q: 'What if I have a payment issue?', a: 'Check your card or switch payment method. If the issue persists, contact us with a screenshot.' },
      { q: 'How do I report a technical issue?', a: 'Use the support form with a detailed description + screenshots. Our tech team replies within 24 business hours.' },
      { q: 'I am a merchant/partner. How do I join bakēd?', a: "Fill the 'Become a partner' form below. Our partnerships team contacts you within 72h." },
      { q: 'How do I contact the bakēd team?', a: 'Via the support form below, email contact@baked.group, or our official social channels.' },
    ];

function FAQ({ search }: { search: string }) {
  const { locale } = useI18n();
  const items = FAQS(locale);
  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q));
  }, [items, search]);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" data-testid="support-faq" className="relative bg-white text-bg-primary py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">FAQ</span>
          <h2 className="font-heading mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">{locale === 'fr' ? 'Questions fréquentes' : 'Frequently asked'}</h2>
        </motion.div>
        <div className="space-y-3" data-testid="support-faq-list">
          {filtered.length === 0 ? (
            <div data-testid="support-faq-empty" className="text-center text-zinc-500 py-12">
              {locale === 'fr' ? 'Aucun résultat. Essayez d\'autres mots-clés.' : 'No results. Try other keywords.'}
            </div>
          ) : (
            filtered.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="rounded-2xl border border-zinc-200 overflow-hidden bg-white" data-testid={`support-faq-item-${i}`}>
                  <button onClick={() => setOpen(isOpen ? null : i)} data-testid={`support-faq-toggle-${i}`} className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-zinc-50 transition-colors" aria-expanded={isOpen}>
                    <span className="font-heading text-base md:text-lg font-bold tracking-tight">{it.q}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-brand-gold shrink-0" /> : <Plus className="h-5 w-5 text-zinc-400 shrink-0" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-6 pb-5 text-sm md:text-base text-zinc-600 leading-relaxed">{it.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

/* ============ REQUIRED INFO ============ */
function RequiredInfo() {
  const { locale } = useI18n();
  const items = locale === 'fr'
    ? [
        { Icon: User, t: 'Nom complet' },
        { Icon: Phone, t: 'Téléphone ou email' },
        { Icon: Hash, t: 'Numéro de commande' },
        { Icon: Layers, t: 'Service concerné' },
        { Icon: MessageSquare, t: 'Description du problème' },
        { Icon: ImageIcon, t: "Captures d'écran" },
        { Icon: Receipt, t: 'Preuve de paiement' },
      ]
    : [
        { Icon: User, t: 'Full name' },
        { Icon: Phone, t: 'Phone or email' },
        { Icon: Hash, t: 'Order number' },
        { Icon: Layers, t: 'Service concerned' },
        { Icon: MessageSquare, t: 'Issue description' },
        { Icon: ImageIcon, t: 'Screenshots' },
        { Icon: Receipt, t: 'Payment proof' },
      ];
  return (
    <section data-testid="support-required-info" className="relative bg-white text-bg-primary py-20 md:py-28 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">Checklist</span>
          <h2 className="font-heading mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">{locale === 'fr' ? 'Informations à fournir au support' : 'Info to provide to support'}</h2>
          <p className="mt-5 text-base md:text-lg text-zinc-700 leading-relaxed">{locale === 'fr' ? 'Pour résoudre votre demande rapidement, incluez ces éléments quand vous nous contactez.' : 'To resolve your request quickly, include these details when you contact us.'}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              data-testid={`support-checklist-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 transition-all"
            >
              <div className="h-10 w-10 rounded-xl bg-brand-gold/12 flex items-center justify-center flex-shrink-0">
                <it.Icon className="h-4.5 w-4.5 text-brand-gold" strokeWidth={2.2} />
              </div>
              <span className="text-sm font-semibold text-zinc-800">{it.t}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SUPPORT FORM ============ */
function SupportForm() {
  const { locale } = useI18n();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', orderNumber: '', service: '', subject: '', description: '', attachmentUrl: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const ch = (k: keyof typeof form) => (e: any) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/support/ticket', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setStatus('success');
      setForm({ fullName: '', email: '', phone: '', orderNumber: '', service: '', subject: '', description: '', attachmentUrl: '' });
    } catch (err: any) { setStatus('error'); setError(err.message || 'failed'); }
  };

  return (
    <section id="contact" data-testid="support-form-section" className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 h-[420px] w-[420px] rounded-full bg-brand-gold/15 blur-[140px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Support client' : 'Customer support'}</span>
          <h2 className="font-heading mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">{locale === 'fr' ? 'Contacter le Support Client' : 'Contact customer support'}</h2>
          <p className="mt-5 text-white/70">{locale === 'fr' ? 'Besoin d\'aide ? Notre équipe est prête à vous assister.' : 'Need help? Our team is ready to assist.'}</p>
        </motion.div>

        {status === 'success' ? (
          <div data-testid="support-form-success" className="rounded-baked bg-white/[0.04] border border-white/10 p-10 md:p-14 text-center backdrop-blur-xl">
            <CheckCircle2 className="h-14 w-14 mx-auto text-brand-green mb-5" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">{locale === 'fr' ? 'Demande envoyée !' : 'Request sent!'}</h3>
            <p className="text-white/70">{locale === 'fr' ? 'Notre équipe revient vers vous sous 24h ouvrées.' : 'Our team replies within 24 business hours.'}</p>
            <button onClick={() => setStatus('idle')} className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/85 text-xs uppercase tracking-wider font-bold hover:border-brand-gold hover:text-brand-gold transition-colors">
              {locale === 'fr' ? 'Nouvelle demande' : 'New request'}
            </button>
          </div>
        ) : (
          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} data-testid="support-form" className="rounded-baked bg-white/[0.04] backdrop-blur-xl border border-white/10 p-7 md:p-10 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <DarkInput label={locale === 'fr' ? 'Nom complet' : 'Full name'} required value={form.fullName} onChange={ch('fullName')} testid="support-field-fullName" />
              <DarkInput label="Email" type="email" required value={form.email} onChange={ch('email')} testid="support-field-email" />
              <DarkInput label={locale === 'fr' ? 'Téléphone' : 'Phone'} type="tel" value={form.phone} onChange={ch('phone')} testid="support-field-phone" />
              <DarkInput label={locale === 'fr' ? 'Numéro de commande' : 'Order number'} value={form.orderNumber} onChange={ch('orderNumber')} testid="support-field-orderNumber" />
              <DarkInput label={locale === 'fr' ? 'Service concerné' : 'Service'} value={form.service} onChange={ch('service')} testid="support-field-service" />
              <DarkInput label={locale === 'fr' ? 'Sujet' : 'Subject'} required value={form.subject} onChange={ch('subject')} testid="support-field-subject" />
            </div>
            <DarkInput label={locale === 'fr' ? 'Description du problème' : 'Issue description'} required textarea value={form.description} onChange={ch('description')} testid="support-field-description" />
            <DarkInput label={locale === 'fr' ? 'URL capture d\'écran (optionnel)' : 'Screenshot URL (optional)'} type="url" value={form.attachmentUrl} onChange={ch('attachmentUrl')} testid="support-field-attachment" />
            {error && <div className="text-sm text-brand-red" data-testid="support-form-error">{error}</div>}
            <button type="submit" disabled={status === 'sending'} data-testid="support-form-submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-brand-gold text-bg-primary text-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-gold">
              {status === 'sending' ? (locale === 'fr' ? 'Envoi…' : 'Sending…') : <><Send className="h-4 w-4" /> {locale === 'fr' ? 'Envoyer ma demande' : 'Send my request'}</>}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function DarkInput({ label, required, type = 'text', value, onChange, testid, textarea }: any) {
  return (
    <label className={cn('block', textarea && 'md:col-span-2')}>
      <span className="text-xs uppercase tracking-wider font-bold text-white/55 block mb-2">{label}{required && ' *'}</span>
      {textarea ? (
        <textarea required={required} value={value} onChange={onChange} rows={5} data-testid={testid} className="w-full bg-bg-primary border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-brand-gold transition-colors resize-y" />
      ) : (
        <input type={type} required={required} value={value} onChange={onChange} data-testid={testid} className="w-full bg-bg-primary border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-brand-gold transition-colors" />
      )}
    </label>
  );
}

/* ============ PARTNER FORM ============ */
const PARTNER_TYPES = ['Restaurant', 'Commerce', 'Livraison / Delivery', 'Automobile', 'Immobilier / Real Estate', 'Publicité / Advertising', 'Services', 'Autre / Other'];

function PartnerForm() {
  const { locale } = useI18n();
  const [form, setForm] = useState({ companyName: '', activityType: '', cityRegion: '', contactName: '', phone: '', email: '', website: '', partnerType: PARTNER_TYPES[0], description: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const ch = (k: keyof typeof form) => (e: any) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/support/partner', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      setStatus('success');
      setForm({ companyName: '', activityType: '', cityRegion: '', contactName: '', phone: '', email: '', website: '', partnerType: PARTNER_TYPES[0], description: '' });
    } catch (err: any) { setStatus('error'); setError(err.message || 'failed'); }
  };

  return (
    <section id="partner" data-testid="partner-form-section" className="relative bg-white text-bg-primary py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? 'Partenariats' : 'Partnerships'}</span>
          <h2 className="font-heading mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">{locale === 'fr' ? 'Devenir Partenaire bakēd' : 'Become a bakēd Partner'}</h2>
          <p className="mt-5 text-zinc-700 max-w-2xl mx-auto leading-relaxed">{locale === 'fr' ? "Vous êtes commerçant, restaurant, vendeur, agence immobilière, concessionnaire, annonceur ou entreprise ? Développez votre activité grâce à l'écosystème bakēd." : "Merchant, restaurant, retailer, real-estate agency, dealership, advertiser or enterprise? Grow with the bakēd ecosystem."}</p>
        </motion.div>

        {status === 'success' ? (
          <div data-testid="partner-form-success" className="rounded-baked bg-white border border-zinc-200 p-10 md:p-14 text-center shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)]">
            <CheckCircle2 className="h-14 w-14 mx-auto text-brand-green mb-5" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">{locale === 'fr' ? 'Candidature envoyée !' : 'Application sent!'}</h3>
            <p className="text-zinc-600">{locale === 'fr' ? 'Notre équipe partenariats vous recontacte sous 72h.' : 'Our partnerships team contacts you within 72h.'}</p>
            <button onClick={() => setStatus('idle')} className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-700 text-xs uppercase tracking-wider font-bold hover:border-brand-gold hover:text-brand-gold transition-colors">
              {locale === 'fr' ? 'Nouvelle candidature' : 'New application'}
            </button>
          </div>
        ) : (
          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} data-testid="partner-form" className="rounded-baked bg-white border border-zinc-200 p-7 md:p-10 space-y-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)]">
            <div className="grid md:grid-cols-2 gap-4">
              <LightInput label={locale === 'fr' ? "Nom de l'entreprise" : 'Company name'} required value={form.companyName} onChange={ch('companyName')} testid="partner-field-companyName" />
              <LightInput label={locale === 'fr' ? "Type d'activité" : 'Activity type'} required value={form.activityType} onChange={ch('activityType')} testid="partner-field-activityType" />
              <LightInput label={locale === 'fr' ? 'Ville / Région' : 'City / Region'} value={form.cityRegion} onChange={ch('cityRegion')} testid="partner-field-cityRegion" />
              <LightInput label={locale === 'fr' ? 'Nom du contact principal' : 'Primary contact name'} required value={form.contactName} onChange={ch('contactName')} testid="partner-field-contactName" />
              <LightInput label={locale === 'fr' ? 'Téléphone' : 'Phone'} type="tel" required value={form.phone} onChange={ch('phone')} testid="partner-field-phone" />
              <LightInput label="Email" type="email" required value={form.email} onChange={ch('email')} testid="partner-field-email" />
              <LightInput label={locale === 'fr' ? 'Site web' : 'Website'} type="url" value={form.website} onChange={ch('website')} testid="partner-field-website" />
              <label className="block">
                <span className="text-xs uppercase tracking-wider font-bold text-zinc-500 block mb-2">{locale === 'fr' ? 'Type de partenariat' : 'Partnership type'} *</span>
                <select required value={form.partnerType} onChange={ch('partnerType')} data-testid="partner-field-partnerType" className="w-full bg-white border border-zinc-300 rounded-xl py-3 px-4 outline-none focus:border-brand-gold transition-colors">
                  {PARTNER_TYPES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </label>
            </div>
            <LightInput label={locale === 'fr' ? 'Description de votre activité' : 'Activity description'} required textarea value={form.description} onChange={ch('description')} testid="partner-field-description" />
            {error && <div className="text-sm text-brand-red" data-testid="partner-form-error">{error}</div>}
            <button type="submit" disabled={status === 'sending'} data-testid="partner-form-submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50">
              {status === 'sending' ? (locale === 'fr' ? 'Envoi…' : 'Sending…') : <><Handshake className="h-4 w-4" /> {locale === 'fr' ? 'Demander un partenariat' : 'Request partnership'}</>}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function LightInput({ label, required, type = 'text', value, onChange, testid, textarea }: any) {
  return (
    <label className={cn('block', textarea && 'md:col-span-2')}>
      <span className="text-xs uppercase tracking-wider font-bold text-zinc-500 block mb-2">{label}{required && ' *'}</span>
      {textarea ? (
        <textarea required={required} value={value} onChange={onChange} rows={5} data-testid={testid} className="w-full bg-white border border-zinc-300 rounded-xl py-3 px-4 outline-none focus:border-brand-gold transition-colors resize-y" />
      ) : (
        <input type={type} required={required} value={value} onChange={onChange} data-testid={testid} className="w-full bg-white border border-zinc-300 rounded-xl py-3 px-4 outline-none focus:border-brand-gold transition-colors" />
      )}
    </label>
  );
}

/* ============ COMMITMENT ============ */
function Commitment() {
  const { locale } = useI18n();
  const stats = [
    { Icon: Clock, t: '24/7', l: locale === 'fr' ? 'Support' : 'Support' },
    { Icon: Zap, t: locale === 'fr' ? 'Réponse rapide' : 'Fast response', l: locale === 'fr' ? '< 24h' : '< 24h' },
    { Icon: Globe2, t: locale === 'fr' ? 'Écosystème multi-services' : 'Multi-service ecosystem', l: '6 apps' },
    { Icon: Users, t: locale === 'fr' ? 'Réseau partenaires' : 'Partner network', l: '+1000' },
  ];
  return (
    <section data-testid="support-commitment" className="relative bg-bg-primary text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-gold/12 blur-[140px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? "Notre engagement" : 'Our commitment'}</span>
          <h2 className="font-heading mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">{locale === 'fr' ? "L'engagement de bakēd Group" : 'The bakēd Group commitment'}</h2>
          <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">{locale === 'fr' ? "bakēd Group s'engage à offrir une expérience simple, rapide et pratique. Nous améliorons continuellement nos services et soutenons nos partenaires locaux." : 'bakēd Group is committed to a simple, fast, practical experience — continuously improving our services and supporting local partners.'}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} data-testid={`support-commit-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-baked bg-white/[0.04] backdrop-blur-xl border border-white/10 p-7 text-center">
              <s.Icon className="h-7 w-7 mx-auto text-brand-gold mb-3" strokeWidth={2.2} />
              <div className="font-heading text-2xl md:text-3xl font-black tracking-tight">{s.t}</div>
              <div className="text-xs uppercase tracking-wider text-white/55 font-bold mt-2">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ DOWNLOAD APP ============ */
function DownloadApp() {
  const { locale } = useI18n();
  return (
    <section data-testid="support-download" className="relative bg-gradient-to-br from-bg-primary via-[#0c0c0c] to-bg-primary text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.35, 0.6, 0.35] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] bg-brand-gold/15 blur-[160px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-6">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">{locale === 'fr' ? "L'application" : 'The app'}</span>
          <h2 className="font-heading mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">{locale === 'fr' ? <>Téléchargez <span className="text-brand-gold">l&apos;application bakēd</span></> : <>Download <span className="text-brand-gold">the bakēd app</span></>}</h2>
          <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">{locale === 'fr' ? "Accédez à tous les services bakēd depuis une seule application." : 'Access all bakēd services from a single application.'}</p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <button type="button" disabled data-testid="support-app-store-btn" className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.06] backdrop-blur border border-white/15 text-white cursor-not-allowed">
              <Apple className="h-7 w-7" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 leading-none mb-1">{locale === 'fr' ? 'Bientôt disponible' : 'Coming soon'}</div>
                <div className="text-sm font-bold leading-none">{locale === 'fr' ? "Sur l'App Store" : 'Download on the App Store'}</div>
              </div>
            </button>
            <button type="button" disabled data-testid="support-play-store-btn" className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.06] backdrop-blur border border-white/15 text-white cursor-not-allowed">
              <Play className="h-7 w-7 fill-white" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 leading-none mb-1">{locale === 'fr' ? 'Bientôt disponible' : 'Coming soon'}</div>
                <div className="text-sm font-bold leading-none">{locale === 'fr' ? 'Sur Google Play' : 'Get it on Google Play'}</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* iPhone mockup */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-6 relative h-[560px] flex items-center justify-center">
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative">
            <div className="relative h-[520px] w-[260px] rounded-[42px] bg-gradient-to-br from-zinc-800 to-zinc-900 border-[6px] border-zinc-800 shadow-[0_30px_80px_-20px_rgba(247,165,0,0.4)] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 flex justify-center z-10"><span className="mt-2 h-1 w-12 rounded bg-zinc-700" /></div>
              <img
                src="/support/splash-screen.png"
                alt="bakēd app splash screen"
                data-testid="support-app-mockup-image"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
          {/* Floating accent chips */}
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-12 right-6 rounded-2xl bg-white/[0.06] backdrop-blur border border-white/15 px-4 py-2 text-xs font-bold">⚡ Instant orders</motion.div>
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-12 left-4 rounded-2xl bg-white/[0.06] backdrop-blur border border-white/15 px-4 py-2 text-xs font-bold">🔒 Secure payments</motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ EXPORT ============ */
export function SupportContent() {
  const [search, setSearch] = useState('');
  return (
    <div data-testid="support-page">
      <Hero onSearch={setSearch} />
      <Categories />
      <FAQ search={search} />
      <RequiredInfo />
      <SupportForm />
      <PartnerForm />
      <Commitment />
      <DownloadApp />
    </div>
  );
}
