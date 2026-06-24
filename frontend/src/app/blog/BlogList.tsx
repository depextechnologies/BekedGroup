'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, FileText } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export interface PublicPost {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  featuredImage: string;
  category: string;
  updatedAt: string;
}

function formatDate(iso: string, locale: 'fr' | 'en') {
  try {
    return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export function BlogList({ posts }: { posts: PublicPost[] }) {
  const { locale } = useI18n();
  const title = locale === 'fr' ? 'BLOG' : 'BLOG';
  const kicker = locale === 'fr' ? 'INSIGHTS & RÉCITS' : 'INSIGHTS & STORIES';
  const subtitle = locale === 'fr'
    ? "Histoires, idées et perspectives de l'équipe bakēd Group."
    : 'Stories, ideas and perspectives from the bakēd Group team.';

  const [featured, ...rest] = posts;

  return (
    <div data-testid="blog-list-page">
      {/* HERO */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-[#0c0c0c]" />
          <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-brand-gold/15 blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[360px] w-[360px] rounded-full bg-brand-purple/15 blur-[140px]" />
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
              data-testid="blog-hero-title"
              className="font-heading text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tighter"
            >
              {title.replace('BLOG', '')}<span className="text-brand-gold">BLOG</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative bg-bg-primary text-white pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {posts.length === 0 ? (
            <EmptyState locale={locale} />
          ) : (
            <>
              {/* Featured */}
              <FeaturedCard post={featured} locale={locale} />

              {/* Rest grid */}
              {rest.length > 0 && (
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((p, i) => (
                    <PostCard key={p.id} post={p} locale={locale} delay={i * 0.05} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyState({ locale }: { locale: 'fr' | 'en' }) {
  return (
    <div data-testid="blog-empty" className="rounded-baked border border-white/10 bg-white/[0.02] p-12 md:p-20 text-center">
      <FileText className="h-12 w-12 mx-auto mb-6 text-white/20" />
      <h3 className="font-heading text-2xl font-bold mb-3">
        {locale === 'fr' ? 'Aucun article pour le moment' : 'No posts yet'}
      </h3>
      <p className="text-white/55 max-w-md mx-auto">
        {locale === 'fr'
          ? "Nos premiers articles arrivent bientôt. Revenez bientôt pour découvrir nos analyses, annonces et coulisses produit."
          : 'Our first articles are on the way. Check back soon for analysis, announcements and product behind-the-scenes.'}
      </p>
    </div>
  );
}

function FeaturedCard({ post, locale }: { post: PublicPost; locale: 'fr' | 'en' }) {
  const title = locale === 'fr' ? post.titleFr || post.titleEn : post.titleEn || post.titleFr;
  const excerpt = locale === 'fr' ? post.excerptFr || post.excerptEn : post.excerptEn || post.excerptFr;
  return (
    <motion.article
      data-testid={`blog-card-featured`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block rounded-baked border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/30">
        <div className="grid lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            {post.featuredImage ? (
              <img src={post.featuredImage} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/30 to-brand-purple/30" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/60 via-transparent to-transparent" />
            <span className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold text-bg-primary text-[10px] uppercase tracking-[0.25em] font-bold">
              {locale === 'fr' ? 'À LA UNE' : 'FEATURED'}
            </span>
          </div>
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-brand-gold font-bold mb-4">
              <span>{post.category}</span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-1.5 text-white/50">
                <Calendar className="h-3 w-3" />
                {formatDate(post.updatedAt, locale)}
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-black leading-[1.05] tracking-tight mb-4 group-hover:text-brand-gold transition-colors">
              {title}
            </h2>
            <p className="text-white/65 leading-relaxed line-clamp-3">{excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">
              {locale === 'fr' ? 'Lire la suite' : 'Read more'} <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function PostCard({ post, locale, delay }: { post: PublicPost; locale: 'fr' | 'en'; delay: number }) {
  const title = locale === 'fr' ? post.titleFr || post.titleEn : post.titleEn || post.titleFr;
  const excerpt = locale === 'fr' ? post.excerptFr || post.excerptEn : post.excerptEn || post.excerptFr;
  return (
    <motion.article
      data-testid={`blog-card-${post.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block rounded-baked border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden h-full transition-all duration-500 hover:border-white/30">
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.featuredImage ? (
            <img src={post.featuredImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-gold/20 to-brand-purple/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[10px] uppercase tracking-[0.2em] font-bold text-white">
            {post.category}
          </span>
        </div>
        <div className="p-6">
          <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2 inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {formatDate(post.updatedAt, locale)}
          </div>
          <h3 className="font-heading text-xl font-bold leading-tight tracking-tight group-hover:text-brand-gold transition-colors">
            {title}
          </h3>
          <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-3">{excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold">
            {locale === 'fr' ? 'Lire' : 'Read'} <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
