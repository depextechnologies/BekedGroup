'use client';

import Link from 'next/link';
import { Apple, Play, Facebook, Linkedin, Instagram, Youtube, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { useI18n, type Locale } from '@/i18n/I18nProvider';
import { useState } from 'react';

interface FooterProps {
  settings: {
    facebookUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
    youtubeUrl: string;
    footerTextFr: string;
    footerTextEn: string;
    copyrightText: string;
  };
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.42a8.16 8.16 0 0 0 4.77 1.52V6.4a4.85 4.85 0 0 1-1.84-.31z" />
    </svg>
  );
}

export function Footer({ settings }: FooterProps) {
  const { t, locale, setLocale } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const tagline = locale === 'fr' ? settings.footerTextFr : settings.footerTextEn;

  return (
    <footer
      data-testid="site-footer"
      className="relative bg-bg-primary text-white border-t border-white/10 pt-20 pb-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 max-w-md">
          <img src="/logos/baked.jpeg" alt="bakēd" className="h-12 w-auto object-contain rounded-md" />
          <p className="mt-5 text-sm text-white/60 leading-relaxed">{tagline}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <Column title={t('footer.download')}>
            <a href="#mobile" className="footer-link inline-flex items-center gap-2" data-testid="footer-appstore">
              <Apple className="h-4 w-4" /> {t('mobile.appstore')}
            </a>
            <a href="#mobile" className="footer-link inline-flex items-center gap-2" data-testid="footer-playstore">
              <Play className="h-4 w-4 fill-white" /> {t('mobile.playstore')}
            </a>
          </Column>

          <Column title={t('footer.discover')}>
            <a href="#about" className="footer-link" data-testid="footer-about">{t('footer.about')}</a>
            <a href="#services" className="footer-link" data-testid="footer-services">{t('footer.services')}</a>
            <Link href="/careers" className="footer-link" data-testid="footer-careers">{t('footer.careers')}</Link>
            <a href="#contact" className="footer-link" data-testid="footer-press">{t('footer.press')}</a>
          </Column>

          <Column title={t('footer.help')}>
            <a href="#contact" className="footer-link" data-testid="footer-contact">{t('footer.contact')}</a>
            <a href="#contact" className="footer-link" data-testid="footer-support">{t('footer.support')}</a>
            <a href="/privacy" className="footer-link" data-testid="footer-privacy">{t('footer.privacy')}</a>
            <a href="/terms" className="footer-link" data-testid="footer-terms">{t('footer.terms')}</a>
          </Column>

          <Column title={t('footer.social')}>
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-2"><Facebook className="h-4 w-4" /> Facebook</a>
            )}
            {settings.linkedinUrl && (
              <a href={settings.linkedinUrl} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            )}
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram</a>
            )}
            {settings.tiktokUrl && (
              <a href={settings.tiktokUrl} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-2"><TikTokIcon className="h-4 w-4" /> TikTok</a>
            )}
            {settings.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-2"><Youtube className="h-4 w-4" /> YouTube</a>
            )}
          </Column>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-white/10">
          <div className="text-xs text-white/40">{settings.copyrightText}</div>

          {/* Language selector */}
          <div className="relative" data-testid="footer-lang-switcher">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/80 text-xs uppercase tracking-wider hover:border-white/40 transition-colors"
              data-testid="footer-lang-button"
            >
              <span>{locale === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-44 bg-bg-secondary/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <button onClick={() => { setLocale('fr' as Locale); setLangOpen(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-white/5">🇫🇷 Français</button>
                <button onClick={() => { setLocale('en' as Locale); setLangOpen(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-white/5">🇬🇧 English</button>
              </div>
            )}
          </div>
        </div>

        {/* Giant logo */}
        <div className="mt-20 -mb-6 text-center select-none">
          <Logo size="2xl" />
        </div>
      </div>
      <style jsx>{`
        :global(.footer-link) {
          color: rgba(255,255,255,0.6);
          font-size: 0.875rem;
          padding: 0.25rem 0;
          transition: color 0.2s ease;
          display: block;
        }
        :global(.footer-link:hover) {
          color: #F7A500;
        }
      `}</style>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 mb-4">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
