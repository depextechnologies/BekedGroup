'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useI18n } from '@/i18n/I18nProvider';

export interface FullNews {
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

export function NewsArticleView({ article }: { article: FullNews }) {
  const { locale } = useI18n();
  const title = locale === 'fr' ? article.titleFr || article.titleEn : article.titleEn || article.titleFr;
  const body = locale === 'fr' ? article.bodyFr || article.bodyEn : article.bodyEn || article.bodyFr;

  return (
    <article data-testid="news-article">
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-[#0c0c0c]" />
          <div className="absolute top-1/3 right-1/4 h-[360px] w-[360px] rounded-full bg-brand-blue/12 blur-[140px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/news"
              data-testid="news-article-back"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-brand-gold transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {locale === 'fr' ? 'Toutes les actualités' : 'All news'}
            </Link>

            <div className="flex items-center gap-3 text-xs uppercase tracking-wider mb-5">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-blue/15 text-brand-blue font-bold">
                {locale === 'fr' ? 'COMMUNIQUÉ' : 'PRESS'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/55 font-bold">
                <Calendar className="h-3 w-3" />
                {formatDate(article.updatedAt, locale)}
              </span>
            </div>

            <h1
              data-testid="news-article-title"
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-black leading-[1.02] tracking-tighter"
            >
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      {article.image && (
        <section className="relative pb-8">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[16/9] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img src={article.image} alt={title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>
      )}

      <section className="relative bg-bg-primary text-white pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-3
              prose-p:text-white/75 prose-p:leading-relaxed
              prose-a:text-brand-gold hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-brand-gold prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:hidden prose-code:after:hidden
              prose-blockquote:border-l-brand-gold prose-blockquote:text-white/80
              prose-img:rounded-2xl prose-img:border prose-img:border-white/10
              prose-li:text-white/75"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body || ''}</ReactMarkdown>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-brand-gold transition-colors font-bold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {locale === 'fr' ? 'Tous les communiqués' : 'All press releases'}
            </Link>
            <ShareButton title={title} />
          </div>
        </div>
      </section>
    </article>
  );
}

function ShareButton({ title }: { title: string }) {
  const { locale } = useI18n();
  const onShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try { await (navigator as any).share({ title, url }); } catch { /* user cancelled */ }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        alert(locale === 'fr' ? 'Lien copié !' : 'Link copied!');
      } catch { /* clipboard denied */ }
    }
  };
  return (
    <button
      onClick={onShare}
      data-testid="news-article-share"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-white/80 text-xs uppercase tracking-[0.2em] font-bold hover:border-brand-gold hover:text-brand-gold transition-all"
    >
      <Share2 className="h-3.5 w-3.5" />
      {locale === 'fr' ? 'Partager' : 'Share'}
    </button>
  );
}
