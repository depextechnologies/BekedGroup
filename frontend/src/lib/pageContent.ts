import { prisma } from './prisma';

// =====================================================================
// Page content schema (typed) — used by both public pages and Admin CMS
// =====================================================================

export type Bilingual<T = string> = { fr: T; en: T };

export interface HeroBlock {
  eyebrowFr?: string;
  eyebrowEn?: string;
  titleFr?: string;
  titleEn?: string;
  subtitleFr?: string;
  subtitleEn?: string;
}

export interface CtaBlock {
  titleFr?: string;
  titleEn?: string;
  bodyFr?: string;
  bodyEn?: string;
  labelFr?: string;
  labelEn?: string;
  url?: string;
}

export interface AboutValue {
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
}

export interface ServiceItem {
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
}

export interface AdFeature {
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
}

export interface SupportFaq {
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
}

export interface AboutPageData {
  hero?: HeroBlock;
  cta?: CtaBlock;
  values?: AboutValue[];
}
export interface ServicesPageData {
  hero?: HeroBlock;
  cta?: CtaBlock;
  services?: ServiceItem[];
}
export interface AdvertisingPageData {
  hero?: HeroBlock;
  cta?: CtaBlock;
  features?: AdFeature[];
}
export interface SupportPageData {
  hero?: HeroBlock;
  cta?: CtaBlock;
  faqs?: SupportFaq[];
}

export type PageKey = 'about' | 'services' | 'advertising' | 'support';

export type PageDataMap = {
  about: AboutPageData;
  services: ServicesPageData;
  advertising: AdvertisingPageData;
  support: SupportPageData;
};

// ---------------------------------------------------------------------
// Defaults — used as initial seed and frontend fallback
// ---------------------------------------------------------------------

export const PAGE_DEFAULTS: PageDataMap = {
  about: {
    hero: {
      eyebrowFr: 'QUI SOMMES-NOUS',
      eyebrowEn: 'WHO WE ARE',
      titleFr: 'À PROPOS DE NOUS',
      titleEn: 'ABOUT US',
      subtitleFr:
        "bakēd Group développe l'application incontournable d'Afrique : livraison, repas, courses, immobilier, automobile, paiements et bien plus.",
      subtitleEn:
        "bakēd Group is building Africa's essential super app — delivery, food, groceries, real estate, automotive, payments and so much more.",
    },
    values: [
      { titleFr: "Soutien à l'entrepreneuriat", titleEn: 'Backing entrepreneurship', descFr: "Nous proposons des outils et des ressources pour aider les petites et moyennes entreprises, les commerçants, et les partenaires de livraison à développer leur activité.", descEn: 'We provide tools and resources to help small and medium businesses, merchants and delivery partners grow their activity.' },
      { titleFr: "Impact à l'échelle locale", titleEn: 'Local impact at scale', descFr: 'Nous croyons fermement au développement social et économique de notre continent. Nous jouons un rôle essentiel au sein des territoires où nos collaborateurs vivent et travaillent.', descEn: 'We strongly believe in the social and economic development of our continent. We play an essential role in the communities where our people live and work.' },
    ],
    cta: {
      titleFr: 'Rejoignez la révolution',
      titleEn: 'Join the revolution',
      bodyFr: "Construisons ensemble l'application incontournable d'Afrique.",
      bodyEn: "Let's build Africa's essential super-app together.",
      labelFr: 'Télécharger bakēd',
      labelEn: 'Download bakēd',
      url: '/#download',
    },
  },
  services: {
    hero: {
      eyebrowFr: 'NOS SERVICES',
      eyebrowEn: 'OUR SERVICES',
      titleFr: 'Tout ce dont vous avez besoin, en une seule app',
      titleEn: 'Everything you need, in one app',
      subtitleFr: 'Une Super App qui simplifie chaque aspect de votre quotidien.',
      subtitleEn: 'A super app that simplifies every aspect of your daily life.',
    },
    services: [
      { titleFr: 'Livraison à la demande', titleEn: 'On-demand delivery', descFr: 'Recevez vos colis et achats en quelques minutes grâce à notre réseau de coursiers.', descEn: 'Get your parcels and purchases delivered in minutes through our network of couriers.' },
      { titleFr: 'Commande de repas', titleEn: 'Food ordering', descFr: 'Vos restaurants préférés, livrés rapidement, chauds et prêts à déguster.', descEn: 'Your favourite restaurants, delivered fast, hot and ready to enjoy.' },
      { titleFr: 'Courses du quotidien', titleEn: 'Daily groceries', descFr: 'Faites vos courses depuis votre canapé. Tous vos essentiels en un clic.', descEn: 'Shop from your couch. All your essentials in a single tap.' },
      { titleFr: 'Commerce électronique', titleEn: 'E-commerce', descFr: 'Une marketplace complète : mode, tech, beauté, et bien plus encore.', descEn: 'A full marketplace: fashion, tech, beauty, and much more.' },
      { titleFr: 'Immobilier', titleEn: 'Real estate', descFr: 'Découvrez, comparez et louez ou achetez le bien parfait, partout en Afrique.', descEn: 'Discover, compare and rent or buy the perfect property, across Africa.' },
      { titleFr: 'Automobile', titleEn: 'Automotive', descFr: 'Voitures neuves, occasion, location : trouvez le véhicule qui vous correspond.', descEn: 'New, used, or rental cars: find the vehicle that fits you.' },
    ],
    cta: {
      titleFr: 'Prêt à transformer votre quotidien ?',
      titleEn: 'Ready to transform your day-to-day?',
      bodyFr: "Téléchargez l'application bakēd dès maintenant.",
      bodyEn: 'Download the bakēd app today.',
      labelFr: "Télécharger l'app",
      labelEn: 'Download the app',
      url: '/#download',
    },
  },
  advertising: {
    hero: {
      eyebrowFr: 'ADBAKĒD ADVERTISING',
      eyebrowEn: 'ADBAKĒD ADVERTISING',
      titleFr: 'Faites grandir votre marque avec ADbakēd',
      titleEn: 'Grow your brand with ADbakēd',
      subtitleFr:
        "Atteignez des millions d'utilisateurs sur la Super App #1 d'Afrique avec des publicités intelligentes et ciblées.",
      subtitleEn:
        "Reach millions of users on Africa's #1 super app with smart, targeted advertising.",
    },
    features: [
      { titleFr: 'Visibilité de recherche', titleEn: 'Search Visibility', descFr: 'Apparaissez en tête lorsque les clients cherchent vos produits.', descEn: 'Show up at the top when customers are looking for what you sell.' },
      { titleFr: 'Publicité ciblée', titleEn: 'Targeted Advertising', descFr: 'Atteignez la bonne audience au bon moment, sans gaspillage budgétaire.', descEn: 'Reach the right audience at the right moment with no wasted spend.' },
      { titleFr: 'Acquisition locale', titleEn: 'Local Customer Acquisition', descFr: 'Captez les clients à proximité grâce au géo-ciblage précis.', descEn: 'Capture nearby customers through precise geo-targeting.' },
      { titleFr: 'Notoriété de marque', titleEn: 'Brand Awareness', descFr: 'Renforcez la reconnaissance et la présence de votre marque.', descEn: 'Increase recognition and strengthen your brand presence.' },
      { titleFr: 'Analyses en temps réel', titleEn: 'Real-Time Analytics', descFr: 'Suivez la performance de vos campagnes et optimisez instantanément.', descEn: 'Track campaign performance and optimize results instantly.' },
      { titleFr: "Matching d'audience intelligent", titleEn: 'Smart Audience Matching', descFr: "Connectez-vous aux clients les plus pertinents automatiquement grâce à l'IA.", descEn: 'Connect with the most relevant customers automatically via AI.' },
    ],
    cta: {
      titleFr: 'Prêt à booster votre marque ?',
      titleEn: 'Ready to boost your brand?',
      bodyFr: 'Lancez votre première campagne ADbakēd en moins de 24h.',
      bodyEn: 'Launch your first ADbakēd campaign in under 24h.',
      labelFr: 'Demander un devis',
      labelEn: 'Request a quote',
      url: '#contact',
    },
  },
  support: {
    hero: {
      eyebrowFr: 'CENTRE D\u2019AIDE',
      eyebrowEn: 'HELP CENTER',
      titleFr: "Comment pouvons-nous vous aider\u00a0?",
      titleEn: 'How can we help you?',
      subtitleFr:
        'Trouvez des réponses rapides, contactez notre équipe ou devenez partenaire bakēd.',
      subtitleEn:
        'Find quick answers, contact our team, or become a bakēd partner.',
    },
    faqs: [
      { questionFr: 'Comment passer une commande sur bakēd ?', questionEn: 'How do I place an order on bakēd?', answerFr: "Téléchargez l'app, créez un compte, parcourez les services et confirmez votre commande en quelques clics.", answerEn: 'Download the app, create an account, browse services and confirm your order in a few taps.' },
      { questionFr: 'Quels sont les délais de livraison ?', questionEn: 'What are the delivery times?', answerFr: "Selon le service et la zone, les livraisons varient de 15 minutes à plusieurs heures. Le délai exact s'affiche avant validation.", answerEn: 'Depending on the service and the area, deliveries range from 15 minutes to several hours. The exact ETA is shown before checkout.' },
      { questionFr: 'Comment contacter le support ?', questionEn: 'How do I contact support?', answerFr: 'Utilisez le formulaire ci-dessous, envoyez-nous un email à support@baked.group, ou contactez-nous via nos réseaux officiels.', answerEn: 'Use the support form below, email support@baked.group, or reach us through our official channels.' },
      { questionFr: 'Comment devenir partenaire ?', questionEn: 'How can I become a partner?', answerFr: "Remplissez le formulaire \u00abPartenariat\u00bb. Notre équipe vous recontactera sous 72h.", answerEn: 'Fill out the "Partnership" form. Our team will get back to you within 72 hours.' },
    ],
    cta: {
      titleFr: 'Toujours besoin d\u2019aide ?',
      titleEn: 'Still need help?',
      bodyFr: 'Notre équipe répond 7j/7 sur tous nos canaux.',
      bodyEn: 'Our team replies 7 days a week on every channel.',
      labelFr: 'Nous contacter',
      labelEn: 'Contact us',
      url: 'mailto:support@baked.group',
    },
  },
};

// ---------------------------------------------------------------------
// Deep-merge defaults + DB row (preserves user-supplied values & arrays)
// ---------------------------------------------------------------------

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function mergeDeep<T>(base: T, patch: unknown): T {
  if (!isPlainObject(patch)) return base;
  if (!isPlainObject(base)) return patch as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(patch)) {
    if (Array.isArray(v)) {
      out[k] = v; // arrays are replaced, not merged
    } else if (isPlainObject(v) && isPlainObject(out[k])) {
      out[k] = mergeDeep(out[k], v);
    } else if (v !== undefined && v !== null && v !== '') {
      out[k] = v;
    }
  }
  return out as T;
}

export async function getPageContent<K extends PageKey>(key: K): Promise<PageDataMap[K]> {
  try {
    const row = await prisma.pageContent.findUnique({ where: { pageKey: key } });
    const data = (row?.data ?? {}) as unknown;
    return mergeDeep(PAGE_DEFAULTS[key] as unknown as PageDataMap[K], data);
  } catch {
    return PAGE_DEFAULTS[key] as unknown as PageDataMap[K];
  }
}
