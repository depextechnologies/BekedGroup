'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface Section {
  id: string;
  title: string;
  body: React.ReactNode;
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

function getSections(locale: 'fr' | 'en'): Section[] {
  if (locale === 'fr') {
    return [
      {
        id: 'donnees-collectees',
        title: '1. Données que nous collectons',
        body: (
          <>
            <p>
              Lorsque vous utilisez notre site web, notre application ou nos services, nous
              pouvons collecter les informations suivantes :
            </p>
            <h4>Informations personnelles</h4>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Adresse de livraison ou de facturation</li>
              <li>Informations de compte utilisateur</li>
              <li>Informations nécessaires au traitement d&apos;une commande, d&apos;une demande ou d&apos;un service</li>
            </ul>
            <h4>Données liées aux transactions</h4>
            <ul>
              <li>Historique des commandes</li>
              <li>Détails des services utilisés</li>
              <li>Montants payés</li>
              <li>Statut des paiements</li>
              <li>Informations nécessaires aux remboursements ou réclamations</li>
            </ul>
            <h4>Données techniques</h4>
            <ul>
              <li>Adresse IP</li>
              <li>Type d&apos;appareil</li>
              <li>Système d&apos;exploitation</li>
              <li>Navigateur utilisé</li>
              <li>Identifiants de l&apos;appareil</li>
              <li>Données de connexion</li>
              <li>Pages consultées</li>
              <li>Temps passé sur le site ou l&apos;application</li>
            </ul>
            <h4>Données de localisation</h4>
            <p>
              Avec votre autorisation, nous pouvons utiliser votre localisation afin de vous
              proposer des services adaptés, notamment la livraison, la disponibilité des
              partenaires, l&apos;affichage des offres locales ou le suivi d&apos;une commande.
            </p>
          </>
        ),
      },
      {
        id: 'utilisation',
        title: '2. Comment nous utilisons vos données',
        body: (
          <>
            <p>Nous utilisons vos données personnelles pour :</p>
            <ul>
              <li>Créer et gérer votre compte utilisateur</li>
              <li>Vous permettre d&apos;utiliser les services de bakēd</li>
              <li>Traiter les commandes, livraisons, paiements et demandes de support</li>
              <li>Améliorer l&apos;expérience utilisateur sur le site et l&apos;application</li>
              <li>Personnaliser les services, offres et recommandations</li>
              <li>Communiquer avec vous concernant votre compte, vos commandes ou vos demandes</li>
              <li>Vous envoyer des informations importantes liées aux services</li>
              <li>Prévenir les fraudes, abus, accès non autorisés ou activités illégales</li>
              <li>Respecter nos obligations légales, réglementaires et administratives</li>
              <li>Analyser les performances de nos services afin de les améliorer</li>
            </ul>
          </>
        ),
      },
      {
        id: 'partage',
        title: '3. Partage des données',
        body: (
          <>
            <p>
              Nous <B>ne vendons pas</B> vos données personnelles. Cependant, nous pouvons
              partager certaines informations avec :
            </p>
            <ul>
              <li>Les partenaires de livraison</li>
              <li>Les restaurants, commerces, vendeurs ou prestataires associés</li>
              <li>Les fournisseurs de services de paiement</li>
              <li>Les prestataires techniques, d&apos;hébergement, de sécurité ou d&apos;analyse</li>
              <li>Les équipes de support client</li>
              <li>Les autorités compétentes lorsque la loi l&apos;exige</li>
            </ul>
            <p>
              Les données partagées sont limitées aux informations nécessaires pour fournir le
              service demandé.
            </p>
          </>
        ),
      },
      {
        id: 'paiements',
        title: '4. Paiements et sécurité des transactions',
        body: (
          <>
            <p>
              Les paiements effectués via bakēd peuvent être traités par des prestataires de
              paiement sécurisés. bakēd Group ne stocke pas directement les informations
              complètes de carte bancaire, sauf si cela est autorisé par la loi et protégé
              par des normes de sécurité applicables.
            </p>
            <p>
              Nous mettons en place des mesures raisonnables pour protéger les transactions
              contre la fraude, l&apos;accès non autorisé et l&apos;utilisation abusive.
            </p>
          </>
        ),
      },
      {
        id: 'conservation',
        title: '5. Conservation des données',
        body: (
          <>
            <p>
              Nous conservons vos données uniquement pendant la durée nécessaire aux
              finalités pour lesquelles elles ont été collectées, notamment :
            </p>
            <ul>
              <li>Gestion du compte utilisateur</li>
              <li>Traitement des commandes et paiements</li>
              <li>Support client</li>
              <li>Obligations légales, fiscales ou comptables</li>
              <li>Prévention des fraudes et litiges</li>
            </ul>
            <p>
              Lorsque les données ne sont plus nécessaires, elles peuvent être supprimées,
              anonymisées ou archivées conformément aux règles applicables.
            </p>
          </>
        ),
      },
      {
        id: 'protection',
        title: '6. Protection des données',
        body: (
          <>
            <p>
              bakēd Group applique des mesures techniques et organisationnelles destinées à
              protéger vos données contre :
            </p>
            <ul>
              <li>L&apos;accès non autorisé</li>
              <li>La perte accidentelle</li>
              <li>L&apos;utilisation abusive</li>
              <li>La modification non autorisée</li>
              <li>La divulgation non autorisée</li>
              <li>La destruction accidentelle ou illégale</li>
            </ul>
            <p>
              Ces mesures peuvent inclure le chiffrement, les contrôles d&apos;accès, la
              surveillance de sécurité, les sauvegardes et les procédures internes de
              protection des données.
            </p>
          </>
        ),
      },
      {
        id: 'cookies',
        title: '7. Cookies et technologies similaires',
        body: (
          <>
            <p>
              Notre site web et notre application peuvent utiliser des cookies ou
              technologies similaires pour :
            </p>
            <ul>
              <li>Améliorer la navigation</li>
              <li>Mémoriser vos préférences</li>
              <li>Comprendre l&apos;utilisation de nos services</li>
              <li>Mesurer les performances</li>
              <li>Proposer du contenu ou des offres adaptées</li>
            </ul>
            <p>
              Vous pouvez gérer ou désactiver certains cookies depuis les paramètres de votre
              navigateur. Toutefois, certaines fonctionnalités peuvent ne pas fonctionner
              correctement sans cookies.
            </p>
          </>
        ),
      },
      {
        id: 'droits',
        title: '8. Vos droits',
        body: (
          <>
            <p>Selon la réglementation applicable, vous pouvez avoir le droit de :</p>
            <ul>
              <li>Accéder à vos données personnelles</li>
              <li>Demander la correction de données inexactes</li>
              <li>Demander la suppression de certaines données</li>
              <li>Vous opposer à certains traitements</li>
              <li>Demander la limitation du traitement</li>
              <li>Demander une copie de vos données</li>
            </ul>
            <p>
              Si vous souhaitez exercer vos droits, vous pouvez nous adresser une demande
              d&apos;exercice de vos droits en matière de protection des données en nous
              contactant aux coordonnées indiquées dans la présente Politique de
              confidentialité.
            </p>
          </>
        ),
      },
      {
        id: 'enfants',
        title: '9. Données des enfants',
        body: (
          <p>
            Les services de bakēd ne sont pas destinés aux enfants sans consentement
            approprié d&apos;un parent ou tuteur légal. Si nous découvrons que nous avons
            collecté des données personnelles d&apos;un enfant sans autorisation requise, nous
            prendrons les mesures nécessaires pour les supprimer.
          </p>
        ),
      },
      {
        id: 'liens-tiers',
        title: '10. Liens vers des sites tiers',
        body: (
          <p>
            Notre site ou notre application peut contenir des liens vers des sites,
            applications ou services tiers. bakēd Group n&apos;est pas responsable des pratiques
            de confidentialité, du contenu ou de la sécurité de ces plateformes externes.
          </p>
        ),
      },
      {
        id: 'modifications',
        title: '11. Modifications de cette politique',
        body: (
          <p>
            bakēd Group peut mettre à jour cette Politique de Confidentialité afin de
            refléter les évolutions de nos services, obligations légales ou pratiques
            internes. La date de mise à jour sera indiquée en haut de cette page.
          </p>
        ),
      },
      {
        id: 'contact',
        title: '12. Nous contacter',
        body: (
          <>
            <p>
              Si vous avez des questions, des commentaires, des plaintes ou des réclamations
              concernant la présente politique de confidentialité, ou si vous souhaitez
              accéder à vos données personnelles, les corriger et/ou exercer vos autres
              droits relatifs à celles-ci, veuillez nous contacter à l&apos;adresse électronique
              suivante :{' '}
              <a
                href="mailto:support@baked.group"
                className="text-brand-gold underline-offset-4 hover:underline"
              >
                support@baked.group
              </a>
            </p>
            <p>
              Veuillez indiquer l&apos;objet approprié dans votre courriel en fonction du droit
              que vous souhaitez exercer et/ou de vos besoins.
            </p>
          </>
        ),
      },
    ];
  }

  // EN
  return [
    {
      id: 'donnees-collectees',
      title: '1. Information we collect',
      body: (
        <>
          <p>
            When you use our website, app or services, we may collect the following
            information:
          </p>
          <h4>Personal information</h4>
          <ul>
            <li>First and last name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Delivery or billing address</li>
            <li>User account information</li>
            <li>Information needed to process an order, request or service</li>
          </ul>
          <h4>Transaction data</h4>
          <ul>
            <li>Order history</li>
            <li>Details of services used</li>
            <li>Amounts paid</li>
            <li>Payment status</li>
            <li>Information required for refunds or complaints</li>
          </ul>
          <h4>Technical data</h4>
          <ul>
            <li>IP address</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Browser used</li>
            <li>Device identifiers</li>
            <li>Login data</li>
            <li>Pages visited</li>
            <li>Time spent on the site or app</li>
          </ul>
          <h4>Location data</h4>
          <p>
            With your permission, we may use your location to provide you with tailored
            services, including delivery, partner availability, displaying local offers or
            order tracking.
          </p>
        </>
      ),
    },
    {
      id: 'utilisation',
      title: '2. How we use your data',
      body: (
        <>
          <p>We use your personal data to:</p>
          <ul>
            <li>Create and manage your user account</li>
            <li>Enable you to use bakēd services</li>
            <li>Process orders, deliveries, payments and support requests</li>
            <li>Improve the user experience on the website and app</li>
            <li>Personalize services, offers and recommendations</li>
            <li>Communicate with you about your account, orders or requests</li>
            <li>Send you important information related to the services</li>
            <li>Prevent fraud, abuse, unauthorized access or illegal activity</li>
            <li>Comply with our legal, regulatory and administrative obligations</li>
            <li>Analyze the performance of our services in order to improve them</li>
          </ul>
        </>
      ),
    },
    {
      id: 'partage',
      title: '3. Data sharing',
      body: (
        <>
          <p>
            We <B>do not sell</B> your personal data. However, we may share some
            information with:
          </p>
          <ul>
            <li>Delivery partners</li>
            <li>Restaurants, merchants, vendors or associated providers</li>
            <li>Payment service providers</li>
            <li>Technical, hosting, security or analytics providers</li>
            <li>Customer support teams</li>
            <li>Competent authorities when required by law</li>
          </ul>
          <p>
            The data shared is limited to the information necessary to provide the requested
            service.
          </p>
        </>
      ),
    },
    {
      id: 'paiements',
      title: '4. Payments and transaction security',
      body: (
        <>
          <p>
            Payments made through bakēd may be processed by secure payment providers. bakēd
            Group does not directly store full card information unless permitted by law and
            protected by applicable security standards.
          </p>
          <p>
            We put reasonable measures in place to protect transactions against fraud,
            unauthorized access and misuse.
          </p>
        </>
      ),
    },
    {
      id: 'conservation',
      title: '5. Data retention',
      body: (
        <>
          <p>
            We retain your data only for as long as necessary for the purposes for which it
            was collected, including:
          </p>
          <ul>
            <li>User account management</li>
            <li>Order and payment processing</li>
            <li>Customer support</li>
            <li>Legal, tax or accounting obligations</li>
            <li>Fraud prevention and disputes</li>
          </ul>
          <p>
            When data is no longer needed, it may be deleted, anonymized or archived in
            accordance with applicable rules.
          </p>
        </>
      ),
    },
    {
      id: 'protection',
      title: '6. Data protection',
      body: (
        <>
          <p>
            bakēd Group applies technical and organizational measures designed to protect
            your data against:
          </p>
          <ul>
            <li>Unauthorized access</li>
            <li>Accidental loss</li>
            <li>Misuse</li>
            <li>Unauthorized modification</li>
            <li>Unauthorized disclosure</li>
            <li>Accidental or unlawful destruction</li>
          </ul>
          <p>
            These measures may include encryption, access controls, security monitoring,
            backups and internal data-protection procedures.
          </p>
        </>
      ),
    },
    {
      id: 'cookies',
      title: '7. Cookies and similar technologies',
      body: (
        <>
          <p>Our website and app may use cookies or similar technologies to:</p>
          <ul>
            <li>Improve navigation</li>
            <li>Remember your preferences</li>
            <li>Understand the use of our services</li>
            <li>Measure performance</li>
            <li>Offer tailored content or offers</li>
          </ul>
          <p>
            You can manage or disable some cookies from your browser settings. However,
            certain features may not work correctly without cookies.
          </p>
        </>
      ),
    },
    {
      id: 'droits',
      title: '8. Your rights',
      body: (
        <>
          <p>Depending on applicable regulations, you may have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request the correction of inaccurate data</li>
            <li>Request the deletion of certain data</li>
            <li>Object to certain processing</li>
            <li>Request the restriction of processing</li>
            <li>Request a copy of your data</li>
          </ul>
          <p>
            If you wish to exercise your rights, you can send us a data-protection rights
            request by contacting us at the details indicated in this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: 'enfants',
      title: "9. Children's data",
      body: (
        <p>
          bakēd services are not intended for children without the appropriate consent of a
          parent or legal guardian. If we discover that we have collected personal data
          from a child without the required authorization, we will take the necessary steps
          to delete it.
        </p>
      ),
    },
    {
      id: 'liens-tiers',
      title: '10. Links to third-party sites',
      body: (
        <p>
          Our site or app may contain links to third-party sites, apps or services. bakēd
          Group is not responsible for the privacy practices, content or security of these
          external platforms.
        </p>
      ),
    },
    {
      id: 'modifications',
      title: '11. Changes to this policy',
      body: (
        <p>
          bakēd Group may update this Privacy Policy to reflect changes in our services,
          legal obligations or internal practices. The update date will be shown at the top
          of this page.
        </p>
      ),
    },
    {
      id: 'contact',
      title: '12. Contact us',
      body: (
        <>
          <p>
            If you have any questions, comments, complaints or claims regarding this
            privacy policy, or if you wish to access your personal data, correct it and/or
            exercise your other rights, please contact us at the following email address:{' '}
            <a
              href="mailto:support@baked.group"
              className="text-brand-gold underline-offset-4 hover:underline"
            >
              support@baked.group
            </a>
          </p>
          <p>
            Please indicate the appropriate subject in your email depending on the right
            you wish to exercise and/or your needs.
          </p>
        </>
      ),
    },
  ];
}

export function PrivacyContent() {
  const { locale } = useI18n();
  const sections = getSections(locale);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      const headers = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[];
      const y = window.scrollY + 160;
      let current = headers[0]?.id ?? '';
      for (const el of headers) {
        if (el.offsetTop <= y) current = el.id;
      }
      if (current && current !== activeId) setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const lastUpdated = locale === 'fr' ? 'Dernière mise à jour : 25 juin 2026' : 'Last updated: June 25, 2026';
  const heroTitle = locale === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy';
  const heroEyebrow = locale === 'fr' ? 'Documents légaux' : 'Legal documents';

  return (
    <div data-testid="privacy-page" className="bg-bg-primary text-white">
      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[820px] bg-brand-gold/15 blur-[160px]"
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 border border-brand-gold/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] font-bold text-brand-gold">
              <ShieldCheck className="h-3.5 w-3.5" />
              {heroEyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter"
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-sm md:text-base text-white/55 uppercase tracking-[0.25em]"
          >
            {lastUpdated}
          </motion.p>

          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-7 md:p-9"
          >
            <p className="text-base md:text-lg text-white/75 leading-relaxed">
              {locale === 'fr' ? (
                <>
                  La présente Politique de confidentialité décrit comment nous,{' '}
                  <B>bakēd Group</B> («&nbsp;bakēd&nbsp;»), accordons une grande importance à
                  la protection de vos données personnelles. Cette Politique explique comment
                  nous collectons, utilisons, stockons, partageons et protégeons les
                  informations des utilisateurs de notre site web, de notre application mobile
                  et de nos services.
                </>
              ) : (
                <>
                  This Privacy Policy describes how we, <B>bakēd Group</B> (&quot;bakēd&quot;),
                  place great importance on protecting your personal data. This policy
                  explains how we collect, use, store, share and protect information from
                  users of our website, mobile app and services.
                </>
              )}
            </p>
            <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
              {locale === 'fr'
                ? "bakēd Group développe une Super Application destinée à simplifier la vie quotidienne des utilisateurs, notamment à travers la livraison à la demande, la commande de repas et de courses, le commerce électronique, l'immobilier, l'automobile, la publicité, les moyens de paiement et d'autres services associés."
                : 'bakēd Group develops a Super App designed to simplify users\u2019 daily lives, including through on-demand delivery, food and grocery ordering, e-commerce, real estate, automotive, advertising, payment solutions and other related services.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ MAIN LAYOUT ============ */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
          {/* TOC */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3" data-testid="privacy-toc">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-4">
                {locale === 'fr' ? 'Sommaire' : 'Contents'}
              </div>
              <ul className="space-y-1.5 border-l border-white/10">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      data-testid={`privacy-toc-${s.id}`}
                      className={`block -ml-px pl-4 py-1.5 text-sm border-l-2 transition-all ${
                        activeId === s.id
                          ? 'border-brand-gold text-white font-medium'
                          : 'border-transparent text-white/55 hover:text-white/85 hover:border-white/30'
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Sections */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-12" data-testid="privacy-sections">
            {sections.map((s, i) => (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.2) }}
                className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-7 md:p-10"
              >
                <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white mb-5 flex items-start gap-4">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-gold flex-shrink-0" />
                  <span>{s.title}</span>
                </h2>
                <div className="prose-privacy text-white/72 text-[15px] md:text-base leading-relaxed space-y-4">
                  {s.body}
                </div>
              </motion.article>
            ))}

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/10 to-transparent p-8 md:p-10"
              data-testid="privacy-cta"
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
                {locale === 'fr' ? 'Exercer vos droits ?' : 'Exercise your rights?'}
              </h3>
              <p className="mt-3 text-white/70 text-base leading-relaxed max-w-2xl">
                {locale === 'fr'
                  ? "Vous pouvez consulter, corriger ou supprimer vos données à tout moment. Contactez notre équipe ou consultez les Conditions Générales d'Utilisation."
                  : 'You can access, correct or delete your data at any time. Contact our team or review the Terms & Conditions.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="mailto:support@baked.group"
                  data-testid="privacy-cta-email"
                  className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-brand-gold/90 transition-colors"
                >
                  support@baked.group
                </a>
                <a
                  href="/terms"
                  data-testid="privacy-cta-terms"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:border-white/50 transition-colors"
                >
                  {locale === 'fr' ? "Conditions d'utilisation" : 'Terms & conditions'}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-testid="privacy-back-to-top"
          aria-label={locale === 'fr' ? 'Retour en haut' : 'Back to top'}
          className="fixed bottom-8 right-8 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-black shadow-[0_10px_30px_-10px_rgba(247,165,0,0.7)] hover:scale-105 transition-transform"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      <style jsx>{`
        :global(.prose-privacy p) { color: rgba(255,255,255,0.72); }
        :global(.prose-privacy h4) {
          color: rgba(255,255,255,0.92);
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.01em;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }
        :global(.prose-privacy ul) {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        :global(.prose-privacy ul li) {
          position: relative;
          padding-left: 1.5rem;
          color: rgba(255,255,255,0.72);
        }
        :global(.prose-privacy ul li::before) {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(247,165,0,0.85);
        }
      `}</style>
    </div>
  );
}
