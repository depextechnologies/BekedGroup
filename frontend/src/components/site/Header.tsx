'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Download } from 'lucide-react';
import { useI18n, type Locale } from '@/i18n/I18nProvider';
import { cn } from '@/lib/utils';

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const homePrefix = pathname === '/' ? '' : '/';
  const links = [
    { href: homePrefix + '#home', label: t('nav.home'), active: pathname === '/' },
    { href: '/about-us', label: t('nav.about'), active: pathname === '/about-us' },
    { href: '/services', label: t('nav.services'), active: pathname === '/services' },
    { href: homePrefix + '#careers', label: t('nav.careers'), active: pathname === '/careers' },
    { href: '/advertising', label: t('nav.advertising'), active: pathname?.startsWith('/advertising') ?? false },
    { href: '/support', label: t('nav.support'), active: pathname?.startsWith('/support') ?? false },
    { href: homePrefix + '#contact', label: t('nav.contact'), active: false },
  ];

  const switchLocale = (l: Locale) => {
    setLocale(l);
    setLangOpen(false);
  };

  return (
    <header
      data-testid="site-header"
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-bg-primary/85 backdrop-blur-2xl border-b border-white/10 rounded-b-baked shadow-2xl'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        <Link href="/" data-testid="header-logo-link" className="shrink-0 inline-flex items-center">
          <img src="/logos/baked-header.png" alt="bakēd" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" data-testid="header-nav">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')}`}
              className={cn(
                'text-sm font-medium uppercase tracking-wider link-underline transition-colors',
                l.active ? 'text-brand-gold' : 'text-white/80 hover:text-white'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative" data-testid="lang-switcher">
            <button
              onClick={() => setLangOpen((v) => !v)}
              data-testid="lang-button"
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 hover:border-white/40 text-white/90 text-sm font-medium transition-all"
            >
              <span className="text-base leading-none">{locale === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
              <span className="uppercase">{locale}</span>
              <ChevronDown className={cn('h-4 w-4 transition-transform', langOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-44 bg-bg-secondary/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <button
                    onClick={() => switchLocale('fr')}
                    data-testid="lang-option-fr"
                    className={cn(
                      'w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors',
                      locale === 'fr' && 'bg-white/5 text-brand-gold'
                    )}
                  >
                    <span>🇫🇷</span> Français
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    data-testid="lang-option-en"
                    className={cn(
                      'w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors',
                      locale === 'en' && 'bg-white/5 text-brand-gold'
                    )}
                  >
                    <span>🇬🇧</span> English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download CTA */}
          <a
            href="#mobile"
            data-testid="header-download-cta"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold text-brand-gold text-sm font-semibold uppercase tracking-wider hover:bg-brand-gold hover:text-bg-primary transition-all duration-300"
          >
            <Download className="h-4 w-4" />
            {t('nav.download')}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-bg-primary/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`mobile-nav-${l.label.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')}`}
                  className={cn(
                    'text-base font-medium uppercase tracking-wider py-2 border-b border-white/5',
                    l.active ? 'text-brand-gold' : 'text-white/85'
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="#mobile"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-brand-gold text-brand-gold font-semibold uppercase tracking-wider"
              >
                <Download className="h-4 w-4" />
                {t('nav.download')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
