'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollText, ChevronUp } from 'lucide-react';
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
        id: 'presentation',
        title: '1. Présentation',
        body: (
          <>
            <p>
              <B>bakēd Group</B> développe une Super Application destinée à simplifier la vie
              quotidienne des utilisateurs. Nos services peuvent inclure, selon la
              disponibilité locale :
            </p>
            <ul>
              <li>Livraison à la demande</li>
              <li>Commande de repas</li>
              <li>Courses et produits du quotidien</li>
              <li>Commerce électronique</li>
              <li>Immobilier</li>
              <li>Automobile</li>
              <li>Moyens de paiement</li>
            </ul>
            <p>
              Certains services peuvent être fournis directement par bakēd Group, tandis que
              d&apos;autres peuvent être proposés par des partenaires, vendeurs, commerçants,
              livreurs, agences ou prestataires tiers.
            </p>
          </>
        ),
      },
      {
        id: 'compte',
        title: '2. Création et utilisation du compte',
        body: (
          <>
            <p>
              Pour utiliser certaines fonctionnalités, vous pouvez être invité à créer un
              compte. Vous acceptez de fournir des informations exactes, complètes et à jour.
            </p>
            <p>Vous êtes responsable de :</p>
            <ul>
              <li>La confidentialité de vos identifiants</li>
              <li>L&apos;activité réalisée depuis votre compte</li>
              <li>La mise à jour de vos informations personnelles</li>
              <li>Toute utilisation non autorisée résultant d&apos;une négligence de votre part</li>
            </ul>
            <p>
              bakēd Group se réserve le droit de suspendre ou supprimer un compte en cas
              d&apos;utilisation abusive, frauduleuse ou contraire aux présentes conditions.
            </p>
          </>
        ),
      },
      {
        id: 'regles',
        title: "3. Règles d'utilisation",
        body: (
          <>
            <p>En utilisant nos services, vous vous engagez à ne pas :</p>
            <ul>
              <li>Utiliser la plateforme à des fins illégales</li>
              <li>Fournir de fausses informations</li>
              <li>Passer des commandes frauduleuses</li>
              <li>Porter atteinte aux droits de bakēd, des utilisateurs ou des partenaires</li>
              <li>Tenter d&apos;accéder sans autorisation à nos systèmes</li>
              <li>Copier, modifier ou exploiter le contenu de la plateforme sans autorisation</li>
              <li>Perturber le fonctionnement du site, de l&apos;application ou des services</li>
              <li>Utiliser la plateforme pour envoyer du contenu offensant, abusif, trompeur ou nuisible</li>
            </ul>
          </>
        ),
      },
      {
        id: 'commandes',
        title: '4. Commandes et services',
        body: (
          <>
            <p>
              Les commandes passées via bakēd dépendent de la disponibilité des produits,
              partenaires, livreurs, zones géographiques et horaires de service.
            </p>
            <p>
              bakēd s&apos;efforce d&apos;assurer une expérience fiable, mais ne garantit pas que tous
              les services seront disponibles à tout moment ou dans toutes les régions.
            </p>
            <p>Une commande peut être refusée, annulée ou retardée en cas de :</p>
            <ul>
              <li>Indisponibilité du produit ou service</li>
              <li>Problème de paiement</li>
              <li>Adresse incorrecte ou inaccessible</li>
              <li>Problème technique</li>
              <li>Suspicion de fraude</li>
              <li>Non-respect des présentes conditions</li>
            </ul>
          </>
        ),
      },
      {
        id: 'prix',
        title: '5. Prix, paiements et facturation',
        body: (
          <>
            <p>
              Les prix affichés sur la plateforme peuvent varier selon le service, le vendeur,
              la zone, les frais de livraison, les taxes, les promotions ou les frais de
              traitement applicables.
            </p>
            <p>
              En confirmant une commande ou un service payant, vous acceptez de payer le
              montant total indiqué.
            </p>
            <p>
              Les paiements peuvent être traités par des prestataires de paiement tiers. bakēd
              Group n&apos;est pas responsable des erreurs, refus ou interruptions causés par un
              prestataire externe, mais fera de son mieux pour vous assister en cas de
              problème.
            </p>
          </>
        ),
      },
      {
        id: 'remboursements',
        title: '6. Annulations et remboursements',
        body: (
          <>
            <p>
              Les conditions d&apos;annulation et de remboursement peuvent varier selon le type de
              service, le statut de la commande et les règles du partenaire concerné.
            </p>
            <p>Un remboursement peut être étudié dans les cas suivants :</p>
            <ul>
              <li>Commande annulée avant préparation ou expédition</li>
              <li>Produit indisponible après paiement</li>
              <li>Erreur confirmée dans la commande</li>
              <li>Paiement débité sans service fourni</li>
              <li>Problème validé par l&apos;équipe de support</li>
            </ul>
            <p>Un remboursement peut être refusé dans les cas suivants :</p>
            <ul>
              <li>Informations de livraison incorrectes fournies par l&apos;utilisateur</li>
              <li>Absence de l&apos;utilisateur lors de la livraison</li>
              <li>Commande déjà préparée, expédiée ou livrée</li>
              <li>Réclamation tardive ou non justifiée</li>
              <li>Utilisation abusive du système de remboursement</li>
            </ul>
            <p>
              Les délais de remboursement peuvent dépendre du mode de paiement, de la banque
              ou du prestataire de paiement utilisé.
            </p>
          </>
        ),
      },
      {
        id: 'responsabilites-utilisateur',
        title: "7. Responsabilités de l'utilisateur",
        body: (
          <>
            <p>L&apos;utilisateur est responsable de :</p>
            <ul>
              <li>Fournir des informations exactes</li>
              <li>Vérifier les détails de la commande avant confirmation</li>
              <li>Être disponible pour recevoir une livraison</li>
              <li>Utiliser les services conformément à la loi</li>
              <li>Respecter les partenaires, livreurs, vendeurs et équipes de support</li>
              <li>Signaler rapidement tout problème lié à une commande ou un service</li>
            </ul>
          </>
        ),
      },
      {
        id: 'limitations',
        title: '8. Responsabilités et limitations',
        body: (
          <>
            <p>
              bakēd travaille à fournir des services rapides, pratiques et fiables. Toutefois,
              nous ne pouvons pas garantir :
            </p>
            <ul>
              <li>Une disponibilité permanente de la plateforme</li>
              <li>L&apos;absence totale d&apos;erreurs techniques</li>
              <li>L&apos;exactitude complète des informations fournies par des partenaires tiers</li>
              <li>La disponibilité continue de tous les produits ou services</li>
              <li>Des délais de livraison identiques dans toutes les situations</li>
            </ul>
            <p>
              bakēd ne pourra être tenu responsable des pertes indirectes, pertes commerciales,
              pertes de données, retards causés par des tiers ou événements indépendants de
              notre contrôle.
            </p>
          </>
        ),
      },
      {
        id: 'tiers',
        title: '9. Services fournis par des tiers',
        body: (
          <>
            <p>
              Certains produits, annonces, services, paiements ou livraisons peuvent être
              fournis par des partenaires externes. Ces partenaires restent responsables de
              leurs produits, informations, prix, disponibilités, services et obligations
              légales.
            </p>
            <p>
              bakēd peut agir comme plateforme de connexion entre les utilisateurs et les
              partenaires, sans être partie directe à certaines transactions entre eux, sauf
              indication contraire.
            </p>
          </>
        ),
      },
      {
        id: 'publicite',
        title: '10. Publicité et contenus promotionnels',
        body: (
          <>
            <p>
              bakēd Group peut proposer des espaces publicitaires ou contenus promotionnels
              sur son site, son application ou ses canaux numériques.
            </p>
            <p>
              Les annonceurs et partenaires sont responsables de l&apos;exactitude de leurs
              contenus, offres, visuels, prix, liens et engagements commerciaux. bakēd Group
              se réserve le droit de refuser ou retirer toute publicité non conforme à ses
              règles internes ou à la loi.
            </p>
          </>
        ),
      },
      {
        id: 'propriete',
        title: '11. Propriété intellectuelle',
        body: (
          <>
            <p>
              Tous les éléments présents sur le site et l&apos;application bakēd, notamment les
              textes, logos, images, interfaces, designs, fonctionnalités, marques et
              contenus, sont protégés par les lois relatives à la propriété intellectuelle.
            </p>
            <p>
              Aucune reproduction, modification, distribution ou exploitation commerciale ne
              peut être faite sans l&apos;autorisation écrite préalable de bakēd Group.
            </p>
          </>
        ),
      },
      {
        id: 'suspension',
        title: '12. Suspension ou résiliation',
        body: (
          <>
            <p>
              bakēd Group peut suspendre, limiter ou supprimer l&apos;accès à un compte ou service
              en cas de :
            </p>
            <ul>
              <li>Violation des présentes conditions</li>
              <li>Activité frauduleuse ou suspecte</li>
              <li>Comportement abusif envers nos équipes ou partenaires</li>
              <li>Utilisation illégale ou non autorisée</li>
              <li>Risque de sécurité ou de dommage pour la plateforme</li>
            </ul>
          </>
        ),
      },
      {
        id: 'donnees',
        title: '13. Protection des données',
        body: (
          <p>
            L&apos;utilisation de vos données personnelles est régie par notre{' '}
            <a href="/privacy" className="text-brand-gold underline-offset-4 hover:underline">
              Politique de Confidentialité
            </a>
            . En utilisant nos services, vous acceptez également les pratiques décrites dans
            cette politique.
          </p>
        ),
      },
      {
        id: 'force-majeure',
        title: '14. Force majeure',
        body: (
          <p>
            bakēd Group ne sera pas responsable des retards ou interruptions causés par des
            événements échappant à son contrôle raisonnable, notamment catastrophe naturelle,
            panne internet, interruption de service, conflit, grève, décision gouvernementale,
            problème logistique ou incident technique majeur.
          </p>
        ),
      },
      {
        id: 'modification',
        title: '15. Modification des conditions',
        body: (
          <>
            <p>
              bakēd Group peut modifier les présentes Conditions Générales d&apos;Utilisation à
              tout moment. Les modifications seront publiées sur cette page avec une nouvelle
              date de mise à jour.
            </p>
            <p>
              L&apos;utilisation continue de nos services après publication des modifications
              constitue votre acceptation des nouvelles conditions.
            </p>
          </>
        ),
      },
      {
        id: 'droit',
        title: '16. Droit applicable et juridiction',
        body: (
          <p>
            Les présentes conditions sont régies par les lois de la <B>République de Côte d&apos;Ivoire</B>.
            Tout litige relatif à l&apos;utilisation des services de bakēd sera soumis aux
            tribunaux compétents d&apos;<B>Abidjan</B>, sauf disposition légale contraire.
          </p>
        ),
      },
      {
        id: 'contact',
        title: '17. Contact',
        body: (
          <p>
            Vous pouvez nous contacter via la page d&apos;aide de l&apos;application bakēd ou par
            courriel à l&apos;adresse{' '}
            <a
              href="mailto:customerservice@baked.group"
              className="text-brand-gold underline-offset-4 hover:underline"
            >
              customerservice@baked.group
            </a>
            . Toutes vos communications seront enregistrées et conservées dans nos archives.
          </p>
        ),
      },
    ];
  }

  // EN
  return [
    {
      id: 'presentation',
      title: '1. Overview',
      body: (
        <>
          <p>
            <B>bakēd Group</B> develops a Super App designed to simplify users&apos; daily
            lives. Depending on local availability, our services may include:
          </p>
          <ul>
            <li>On-demand delivery</li>
            <li>Food ordering</li>
            <li>Groceries and everyday products</li>
            <li>E-commerce</li>
            <li>Real estate</li>
            <li>Automotive</li>
            <li>Payment solutions</li>
          </ul>
          <p>
            Some services may be provided directly by bakēd Group, while others may be
            offered by partners, vendors, merchants, couriers, agencies or third-party
            providers.
          </p>
        </>
      ),
    },
    {
      id: 'compte',
      title: '2. Account creation and use',
      body: (
        <>
          <p>
            To access certain features, you may be required to create an account. You agree
            to provide accurate, complete and up-to-date information.
          </p>
          <p>You are responsible for:</p>
          <ul>
            <li>The confidentiality of your credentials</li>
            <li>All activity carried out from your account</li>
            <li>Keeping your personal information up to date</li>
            <li>Any unauthorized use resulting from your own negligence</li>
          </ul>
          <p>
            bakēd Group reserves the right to suspend or delete any account in case of
            abusive, fraudulent use, or any breach of these terms.
          </p>
        </>
      ),
    },
    {
      id: 'regles',
      title: '3. Rules of use',
      body: (
        <>
          <p>By using our services, you agree not to:</p>
          <ul>
            <li>Use the platform for illegal purposes</li>
            <li>Provide false information</li>
            <li>Place fraudulent orders</li>
            <li>Infringe the rights of bakēd, other users or partners</li>
            <li>Attempt to access our systems without authorization</li>
            <li>Copy, modify or exploit platform content without permission</li>
            <li>Disrupt the operation of the website, app or services</li>
            <li>
              Use the platform to send offensive, abusive, misleading or harmful content
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'commandes',
      title: '4. Orders and services',
      body: (
        <>
          <p>
            Orders placed via bakēd depend on the availability of products, partners,
            couriers, geographic zones and service hours.
          </p>
          <p>
            bakēd strives to deliver a reliable experience but does not guarantee that all
            services will be available at all times or in every region.
          </p>
          <p>An order may be refused, cancelled or delayed in case of:</p>
          <ul>
            <li>Product or service unavailability</li>
            <li>Payment issue</li>
            <li>Incorrect or inaccessible address</li>
            <li>Technical problem</li>
            <li>Suspected fraud</li>
            <li>Breach of these terms</li>
          </ul>
        </>
      ),
    },
    {
      id: 'prix',
      title: '5. Pricing, payment and billing',
      body: (
        <>
          <p>
            Prices displayed on the platform may vary based on service, vendor, area,
            delivery fees, taxes, promotions or applicable processing fees.
          </p>
          <p>
            By confirming an order or a paid service, you agree to pay the total amount
            shown.
          </p>
          <p>
            Payments may be processed by third-party payment providers. bakēd Group is not
            liable for errors, declines or interruptions caused by an external provider,
            but will do its best to assist you should an issue arise.
          </p>
        </>
      ),
    },
    {
      id: 'remboursements',
      title: '6. Cancellations and refunds',
      body: (
        <>
          <p>
            Cancellation and refund terms may vary depending on the type of service, order
            status and the applicable partner&apos;s policy.
          </p>
          <p>A refund may be considered in the following cases:</p>
          <ul>
            <li>Order cancelled before preparation or shipping</li>
            <li>Product unavailable after payment</li>
            <li>Confirmed error in the order</li>
            <li>Payment charged without the service being delivered</li>
            <li>Issue validated by the support team</li>
          </ul>
          <p>A refund may be refused in the following cases:</p>
          <ul>
            <li>Incorrect delivery information provided by the user</li>
            <li>User unavailable at the time of delivery</li>
            <li>Order already prepared, shipped or delivered</li>
            <li>Late or unsubstantiated claim</li>
            <li>Abuse of the refund system</li>
          </ul>
          <p>
            Refund processing times may depend on the payment method, bank or payment
            provider used.
          </p>
        </>
      ),
    },
    {
      id: 'responsabilites-utilisateur',
      title: '7. User responsibilities',
      body: (
        <>
          <p>The user is responsible for:</p>
          <ul>
            <li>Providing accurate information</li>
            <li>Reviewing order details before confirmation</li>
            <li>Being available to receive a delivery</li>
            <li>Using the services in accordance with the law</li>
            <li>Respecting partners, couriers, vendors and support teams</li>
            <li>Promptly reporting any issue related to an order or service</li>
          </ul>
        </>
      ),
    },
    {
      id: 'limitations',
      title: '8. Liability and limitations',
      body: (
        <>
          <p>
            bakēd works to provide fast, convenient and reliable services. However, we
            cannot guarantee:
          </p>
          <ul>
            <li>Permanent availability of the platform</li>
            <li>The complete absence of technical errors</li>
            <li>Full accuracy of information provided by third-party partners</li>
            <li>Continuous availability of all products or services</li>
            <li>Identical delivery times across all situations</li>
          </ul>
          <p>
            bakēd shall not be held liable for indirect losses, business losses, data
            losses, delays caused by third parties or events beyond our control.
          </p>
        </>
      ),
    },
    {
      id: 'tiers',
      title: '9. Third-party services',
      body: (
        <>
          <p>
            Some products, listings, services, payments or deliveries may be provided by
            external partners. These partners remain responsible for their products,
            information, pricing, availability, services and legal obligations.
          </p>
          <p>
            bakēd may act as a connection platform between users and partners, without
            being a direct party to certain transactions between them, unless otherwise
            stated.
          </p>
        </>
      ),
    },
    {
      id: 'publicite',
      title: '10. Advertising and promotional content',
      body: (
        <>
          <p>
            bakēd Group may offer advertising space or promotional content on its website,
            app or digital channels.
          </p>
          <p>
            Advertisers and partners are responsible for the accuracy of their content,
            offers, visuals, prices, links and commercial commitments. bakēd Group reserves
            the right to refuse or remove any advertisement that does not comply with its
            internal policies or applicable law.
          </p>
        </>
      ),
    },
    {
      id: 'propriete',
      title: '11. Intellectual property',
      body: (
        <>
          <p>
            All elements present on the bakēd website and app, including texts, logos,
            images, interfaces, designs, features, trademarks and content, are protected by
            intellectual property laws.
          </p>
          <p>
            No reproduction, modification, distribution or commercial exploitation may be
            made without the prior written authorization of bakēd Group.
          </p>
        </>
      ),
    },
    {
      id: 'suspension',
      title: '12. Suspension or termination',
      body: (
        <>
          <p>
            bakēd Group may suspend, restrict or remove access to an account or service in
            case of:
          </p>
          <ul>
            <li>Violation of these terms</li>
            <li>Fraudulent or suspicious activity</li>
            <li>Abusive behaviour towards our teams or partners</li>
            <li>Illegal or unauthorized use</li>
            <li>Security risk or threat to the platform</li>
          </ul>
        </>
      ),
    },
    {
      id: 'donnees',
      title: '13. Data protection',
      body: (
        <p>
          The use of your personal data is governed by our{' '}
          <a href="/privacy" className="text-brand-gold underline-offset-4 hover:underline">
            Privacy Policy
          </a>
          . By using our services, you also accept the practices described in that policy.
        </p>
      ),
    },
    {
      id: 'force-majeure',
      title: '14. Force majeure',
      body: (
        <p>
          bakēd Group will not be liable for delays or interruptions caused by events
          beyond its reasonable control, including natural disasters, internet outages,
          service interruptions, conflicts, strikes, government decisions, logistical
          issues or major technical incidents.
        </p>
      ),
    },
    {
      id: 'modification',
      title: '15. Changes to these terms',
      body: (
        <>
          <p>
            bakēd Group may modify these Terms of Use at any time. Changes will be posted on
            this page with a new update date.
          </p>
          <p>
            Continued use of our services after changes are published constitutes your
            acceptance of the new terms.
          </p>
        </>
      ),
    },
    {
      id: 'droit',
      title: '16. Governing law and jurisdiction',
      body: (
        <p>
          These terms are governed by the laws of the <B>Republic of Côte d&apos;Ivoire</B>. Any
          dispute related to the use of bakēd&apos;s services shall be submitted to the
          competent courts of <B>Abidjan</B>, unless otherwise required by law.
        </p>
      ),
    },
    {
      id: 'contact',
      title: '17. Contact',
      body: (
        <p>
          You can reach us through the help page in the bakēd app or by email at{' '}
          <a
            href="mailto:customerservice@baked.group"
            className="text-brand-gold underline-offset-4 hover:underline"
          >
            customerservice@baked.group
          </a>
          . All your communications will be recorded and kept in our archives.
        </p>
      ),
    },
  ];
}

export function TermsContent() {
  const { locale } = useI18n();
  const sections = getSections(locale);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [showTop, setShowTop] = useState(false);

  // Scroll-spy + back-to-top
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
  const heroTitle = locale === 'fr' ? "Conditions Générales d'Utilisation" : 'Terms & Conditions';
  const heroEyebrow = locale === 'fr' ? 'Documents légaux' : 'Legal documents';

  return (
    <div data-testid="terms-page" className="bg-bg-primary text-white">
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
              <ScrollText className="h-3.5 w-3.5" />
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
            <p className="text-lg md:text-xl font-medium text-white mb-5">
              {locale === 'fr' ? 'Bienvenue sur bakēd !' : 'Welcome to bakēd!'}
            </p>
            <ul className="space-y-3 text-sm md:text-base text-white/70 leading-relaxed list-none">
              {(locale === 'fr'
                ? [
                    'Comme tout prestataire de services, nous avons aussi nos propres conditions générales que les utilisateurs doivent accepter avant d\u2019utiliser notre service.',
                    'Les conditions générales constituent un accord entre vous, en tant qu\u2019utilisateur, et bakēd, afin d\u2019éviter tout malentendu ultérieur.',
                    'bakēd Group est une entreprise technologique et un réseau numérique qui fonctionne comme un marché permettant aux utilisateurs d\u2019accéder à des produits et services et de les commander. Afin de répondre à tous vos besoins, bakēd collabore également avec des partenaires. Nous ne sommes pas responsables des contenus et offres proposés par ces tiers.',
                    'bakēd est une application gratuite proposant des services payants. Pour créer un compte et utiliser les services bakēd, vous devez être âgé d\u2019au moins 18 ans. En tant qu\u2019utilisateur, vous êtes entièrement responsable de vos décisions lors de l\u2019accès aux services sur l\u2019application bakēd.',
                    'Le code de vérification/OTP est confidentiel. Ne le partagez jamais avec qui que ce soit, même pas avec nous.',
                    'En utilisant l\u2019application bakēd, vous êtes lié par les réglementations relatives aux présentes conditions d\u2019utilisation.',
                  ]
                : [
                    'Like any service provider, we also have our own terms that users must accept before using our service.',
                    'These terms constitute an agreement between you, as a user, and bakēd, to avoid any future misunderstanding.',
                    'bakēd Group is a technology company and digital network that operates as a marketplace allowing users to access and order products and services. To meet all your needs, bakēd also collaborates with partners. We are not responsible for the content and offers proposed by these third parties.',
                    'bakēd is a free application offering paid services. To create an account and use bakēd services, you must be at least 18 years old. As a user, you are fully responsible for your decisions when accessing services on the bakēd app.',
                    'The verification code/OTP is confidential. Never share it with anyone, not even with us.',
                    'By using the bakēd app, you are bound by the rules of these terms of use.',
                  ]
              ).map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ============ MAIN LAYOUT ============ */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
          {/* TOC */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3" data-testid="terms-toc">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-4">
                {locale === 'fr' ? 'Sommaire' : 'Contents'}
              </div>
              <ul className="space-y-1.5 border-l border-white/10">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      data-testid={`terms-toc-${s.id}`}
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
          <div className="lg:col-span-8 xl:col-span-9 space-y-12" data-testid="terms-sections">
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
                <div className="prose-terms text-white/72 text-[15px] md:text-base leading-relaxed space-y-4">
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
              data-testid="terms-cta"
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
                {locale === 'fr' ? 'Une question sur ces conditions ?' : 'A question about these terms?'}
              </h3>
              <p className="mt-3 text-white/70 text-base leading-relaxed max-w-2xl">
                {locale === 'fr'
                  ? "Notre équipe est disponible pour clarifier toute partie de ce document. Contactez-nous via le centre d'assistance ou par email."
                  : 'Our team is available to clarify any part of this document. Reach out through our support center or via email.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/support"
                  data-testid="terms-cta-support"
                  className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-brand-gold/90 transition-colors"
                >
                  {locale === 'fr' ? "Centre d'assistance" : 'Support center'}
                </a>
                <a
                  href="mailto:customerservice@baked.group"
                  data-testid="terms-cta-email"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:border-white/50 transition-colors"
                >
                  customerservice@baked.group
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
          data-testid="terms-back-to-top"
          aria-label={locale === 'fr' ? 'Retour en haut' : 'Back to top'}
          className="fixed bottom-8 right-8 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-black shadow-[0_10px_30px_-10px_rgba(247,165,0,0.7)] hover:scale-105 transition-transform"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      <style jsx>{`
        :global(.prose-terms p) { color: rgba(255,255,255,0.72); }
        :global(.prose-terms ul) {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        :global(.prose-terms ul li) {
          position: relative;
          padding-left: 1.5rem;
          color: rgba(255,255,255,0.72);
        }
        :global(.prose-terms ul li::before) {
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
