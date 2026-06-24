'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Newspaper } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export interface PublicNews {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  bodyFr: string;
  bodyEn: string;
  image: string;
  updatedAt: string;
}

function formatDate(iso: string, locale: 'fr' | 'en') {
  try {
    return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return '';
  }
}

function plainPreview(md: string, limit = 200) {
  return md
    .replace(/^#+\s+/gm, '')
    .replace(/[*_`>~]+/g, '')
    .replace(/!?\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, limit);
}

export function NewsList({ articles }: { articles: PublicNews[] }) {
  const { locale } = useI18n();
  const kicker = locale === 'fr' ? 'COMMUNIQUÉS & ANNONCES' : 'PRESS & ANNOUNCEMENTS';
  const title = locale === 'fr' ? 'ACTUALITÉS' : 'NEWS';
  const accent = locale === 'fr' ? 'ACTUALITÉS' : 'NEWS';
  const subtitle = locale === 'fr'
    ? "Les dernières annonces officielles, étapes franchies et apparitions presse de bakēd Group."
    : 'The latest official announcements, milestones and press appearances from bakēd Group.';

  return (
    <div data-testid="news-list-page">
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-[#0c0c0c]" />
          <div className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-blue/15 blur-[140px]" />
          <div className="absolute bottom-1/4 left-1/4 h-[360px] w-[360px] rounded-full bg-brand-gold/15 blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">{kicker}</span>
            </div>
            <h1
              data-testid="news-hero-title"
              className="font-heading text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tighter"
            >
              {title.replace(accent, '')}<span className="text-brand-gold">{accent}</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-bg-primary text-white pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {articles.length === 0 ? (
            <EmptyState locale={locale} />
          ) : (
            <div className="space-y-5">
              {articles.map((a, i) => (
                <NewsRow key={a.id} article={a} locale={locale} delay={i * 0.06} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyState({ locale }: { locale: 'fr' | 'en' }) {
  return (
    <div data-testid="news-empty" className="rounded-baked border border-white/10 bg-white/[0.02] p-12 md:p-20 text-center">
      <Newspaper className="h-12 w-12 mx-auto mb-6 text-white/20" />
      <h3 className="font-heading text-2xl font-bold mb-3">
        {locale === 'fr' ? 'Aucune actualité pour le moment' : 'No news yet'}
      </h3>
      <p className="text-white/55 max-w-md mx-auto">
        {locale === 'fr'
          ? 'Nos prochains communiqués arriveront ici. Restez à l\'écoute.'
          : 'Our next announcements will land here. Stay tuned.'}
      </p>
    </div>
  );
}

function NewsRow({ article, locale, delay }: { article: PublicNews; locale: 'fr' | 'en'; delay: number }) {
  const title = locale === 'fr' ? article.titleFr || article.titleEn : article.titleEn || article.titleFr;
  const body = locale === 'fr' ? article.bodyFr || article.bodyEn : article.bodyEn || article.bodyFr;
  const preview = plainPreview(body, 240);
  return (
    <motion.article
      data-testid={`news-card-${article.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link href={`/news/${article.slug}`} className="block rounded-baked border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/30">
        <div className="grid md:grid-cols-12 gap-0">
          <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto overflow-hidden">
            {article.image ? (
              <img src={article.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-gold/20" />
            )}
          </div>
          <div className="md:col-span-8 p-7 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider font-bold mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-blue/15 text-brand-blue">
                {locale === 'fr' ? 'COMMUNIQUÉ' : 'PRESS'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/45">
                <Calendar className="h-3 w-3" />
                {formatDate(article.updatedAt, locale)}
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-black leading-[1.1] tracking-tight group-hover:text-brand-gold transition-colors">
              {title}
            </h2>
            <p className="mt-3 text-white/65 leading-relaxed line-clamp-2">{preview}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">
              {locale === 'fr' ? 'Lire le communiqué' : 'Read release'} <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
