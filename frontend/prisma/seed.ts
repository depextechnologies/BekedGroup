import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@baked.group';
  const adminPassword = process.env.ADMIN_PASSWORD || 'BakedAdmin2025!';
  const hash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hash },
    create: { email: adminEmail, password: hash, name: 'bakēd Admin', role: 'admin' },
  });
  console.log(`✓ Admin: ${adminEmail}`);

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      companyName: 'bakēd Group',
      copyrightText: '© 2025 bakēd Group. Tous droits réservés.',
      footerTextFr: 'Simplifier la vie des gens et les connecter ensemble.',
      footerTextEn: "Simplifying people's lives and connecting them together.",
    },
    create: {
      id: 1,
      companyName: 'bakēd Group',
      contactEmail: 'contact@baked.group',
      contactPhone: '+33 1 23 45 67 89',
      contactAddress: 'Paris, France',
      googleMapsUrl: 'https://maps.google.com/?q=Paris,France',
      facebookUrl: 'https://facebook.com/bakedgroup',
      linkedinUrl: 'https://linkedin.com/company/bakedgroup',
      instagramUrl: 'https://instagram.com/bakedgroup',
      tiktokUrl: 'https://tiktok.com/@bakedgroup',
      youtubeUrl: 'https://youtube.com/@bakedgroup',
      copyrightText: '© 2025 bakēd Group. Tous droits réservés.',
    },
  });
  console.log('✓ Site settings');

  // 3. Homepage content (idempotent — patch any 'Baked Growth'/'Baked Group' -> 'bakēd Group', and BAKED -> bakēd in titles)
  await prisma.homepageContent.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  await prisma.$executeRawUnsafe(
    `UPDATE "HomepageContent" SET
      "aboutBodyFr" = REPLACE(REPLACE("aboutBodyFr", 'Baked Growth', 'bakēd Group'), 'Baked Group', 'bakēd Group'),
      "aboutBodyEn" = REPLACE(REPLACE("aboutBodyEn", 'Baked Growth', 'bakēd Group'), 'Baked Group', 'bakēd Group'),
      "aboutTitleFr" = REPLACE("aboutTitleFr", 'BAKED', 'bakēd'),
      "aboutTitleEn" = REPLACE("aboutTitleEn", 'BAKED', 'bakēd')
     WHERE id = 1`
  );
  console.log('✓ Homepage content');

  // 4. Applications (the 6 baked apps)
  const apps = [
    {
      slug: 'express',
      prefix: 'EXPRESS',
      color: '#F7A500',
      colorKey: 'gold',
      icon: 'Truck',
      order: 1,
      descFr: 'Livraison express pour les entreprises et les particuliers.',
      descEn: 'Express delivery for businesses and individuals.',
      illustration: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800',
      logoImage: '/logos/express.jpeg',
    },
    {
      slug: 'food',
      prefix: 'FOOD',
      color: '#32CD32',
      colorKey: 'green',
      icon: 'UtensilsCrossed',
      order: 2,
      descFr: 'Commandez vos repas auprès des meilleurs restaurants locaux.',
      descEn: 'Order meals from your favorite local restaurants.',
      illustration: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      logoImage: '/logos/food.jpeg',
    },
    {
      slug: 'mart',
      prefix: 'MART',
      color: '#32CD32',
      colorKey: 'green',
      icon: 'ShoppingCart',
      order: 3,
      descFr: 'Vos courses livrées à votre porte en quelques minutes.',
      descEn: 'Groceries and essentials delivered to your door in minutes.',
      illustration: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      logoImage: '/logos/mart.jpeg',
    },
    {
      slug: 'shop',
      prefix: 'SHOP',
      color: '#F7A500',
      colorKey: 'gold',
      icon: 'ShoppingBag',
      order: 4,
      descFr: 'La plateforme de shopping moderne pour tous vos achats.',
      descEn: 'The modern marketplace for all your shopping needs.',
      illustration: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      logoImage: '/logos/shop.jpeg',
    },
    {
      slug: 'auto',
      prefix: 'AUTO',
      color: '#E5484D',
      colorKey: 'red',
      icon: 'Car',
      order: 5,
      descFr: 'Le marché automobile le plus populaire pour les voitures neuves et d\'occasion.',
      descEn: 'The leading marketplace to buy and sell new and used vehicles.',
      illustration: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      logoImage: '/logos/auto.jpeg',
    },
    {
      slug: 'immo',
      prefix: 'IMMO',
      color: '#7A3CFF',
      colorKey: 'purple',
      icon: 'Home',
      order: 6,
      descFr: 'Nous contribuons à façonner le marché de l\'immobilier nouvelle génération.',
      descEn: 'Buy, rent, sell properties and connect with verified agents.',
      illustration: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      logoImage: '/logos/immo.jpeg',
    },
  ];

  for (const app of apps) {
    await prisma.application.upsert({
      where: { slug: app.slug },
      update: { color: app.color, colorKey: app.colorKey, logoImage: app.logoImage },
      create: app,
    });
  }
  console.log(`✓ ${apps.length} applications`);

  // 5. Sample job opening
  await prisma.jobOpening.upsert({
    where: { slug: 'senior-product-designer' },
    update: {
      descFr: 'Rejoignez notre équipe design et façonnez l\'avenir de l\'écosystème bakēd.',
      descEn: 'Join our design team and shape the future of the bakēd ecosystem.',
    },
    create: {
      slug: 'senior-product-designer',
      titleFr: 'Designer Produit Senior',
      titleEn: 'Senior Product Designer',
      departmentFr: 'Design',
      departmentEn: 'Design',
      locationFr: 'Paris / Remote',
      locationEn: 'Paris / Remote',
      typeFr: 'Temps plein',
      typeEn: 'Full-time',
      descFr: 'Rejoignez notre équipe design et façonnez l\'avenir de l\'écosystème bakēd.',
      descEn: 'Join our design team and shape the future of the bakēd ecosystem.',
      published: true,
    },
  });

  await prisma.jobOpening.upsert({
    where: { slug: 'senior-fullstack-engineer' },
    update: {
      descFr: 'Construisez les API et les expériences qui propulsent l\'écosystème bakēd à grande échelle.',
      descEn: 'Build the APIs and experiences that power the bakēd ecosystem at scale.',
    },
    create: {
      slug: 'senior-fullstack-engineer',
      titleFr: 'Ingénieur·e Full-Stack Senior',
      titleEn: 'Senior Full-Stack Engineer',
      departmentFr: 'Ingénierie',
      departmentEn: 'Engineering',
      locationFr: 'Remote',
      locationEn: 'Remote',
      typeFr: 'Temps plein',
      typeEn: 'Full-time',
      descFr: 'Construisez les API et les expériences qui propulsent l\'écosystème bakēd à grande échelle.',
      descEn: 'Build the APIs and experiences that power the bakēd ecosystem at scale.',
      published: true,
    },
  });
  console.log('✓ Job openings');

  // 6. Sample Blog Posts (idempotent — only inserted if missing)
  await prisma.blogPost.upsert({
    where: { slug: 'launch-super-app' },
    update: {},
    create: {
      slug: 'launch-super-app',
      titleFr: 'Lancement officiel de la Super App bakēd',
      titleEn: 'Official launch of the bakēd Super App',
      excerptFr: 'bakēd Group dévoile sa Super App unifiée — livraison, restauration, marché, immobilier et automobile dans une seule expérience connectée.',
      excerptEn: 'bakēd Group unveils its unified Super App — delivery, food, market, real-estate and auto in one connected experience.',
      contentFr: '## Une vision unifiée\n\nbakēd Group annonce aujourd\'hui le **lancement officiel** de sa Super App. Conçue pour simplifier le quotidien des utilisateurs africains, l\'application réunit six services essentiels en un seul écosystème connecté.\n\n### Les services intégrés\n\n- **EXPRESSbakēd** — livraison express avec suivi GPS\n- **FOODbakēd** — commande de repas\n- **MARTbakēd** — courses et supermarchés\n- **SHOPbakēd** — e-commerce\n- **AUTObakēd** — marketplace automobile\n- **IMMObakēd** — immobilier\n\n> "Nous voulons offrir une expérience fluide, rapide et locale."\n\n### Et ensuite ?\n\nLa version v1 est désormais disponible sur iOS et Android.',
      contentEn: '## A unified vision\n\nbakēd Group today announces the **official launch** of its Super App. Built to simplify daily life across Africa, the app brings six essential services together into a single connected ecosystem.\n\n### Integrated services\n\n- **EXPRESSbakēd** — express delivery with GPS tracking\n- **FOODbakēd** — meal ordering\n- **MARTbakēd** — grocery & supermarkets\n- **SHOPbakēd** — e-commerce\n- **AUTObakēd** — automotive marketplace\n- **IMMObakēd** — real estate\n\n> "We want every user to enjoy a fast, frictionless, local experience."\n\n### What\'s next?\n\nThe v1 release is now available on iOS and Android.',
      featuredImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85',
      category: 'Product',
      metaTitleFr: 'Lancement Super App bakēd',
      metaTitleEn: 'bakēd Super App Launch',
      metaDescFr: 'Découvrez le lancement officiel de la Super App bakēd Group.',
      metaDescEn: 'Discover the official launch of the bakēd Group Super App.',
      published: true,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'design-system' },
    update: {},
    create: {
      slug: 'design-system',
      titleFr: 'Construire un design system Pan-Africain',
      titleEn: 'Building a Pan-African design system',
      excerptFr: 'Comment notre équipe design a façonné un langage visuel cohérent pour six produits.',
      excerptEn: 'How our design team shaped a coherent visual language across six products.',
      contentFr: '## Pourquoi un design system ?\n\nUn design system, c\'est la **fondation** d\'une expérience cohérente. Pour bakēd, cela voulait dire concevoir un langage qui parle à des dizaines de millions d\'utilisateurs francophones et anglophones.\n\n### Les piliers\n\n1. **Tokens** — couleurs, espacement, typographie\n2. **Composants** — boutons, cards, modals\n3. **Patterns** — paiement, recherche, listings\n\nNotre couleur signature ? Le doré, évidemment.',
      contentEn: '## Why a design system?\n\nA design system is the **foundation** of a coherent experience. For bakēd, that meant crafting a language that speaks to tens of millions of French- and English-speaking users.\n\n### The pillars\n\n1. **Tokens** — colors, spacing, typography\n2. **Components** — buttons, cards, modals\n3. **Patterns** — checkout flows, search, listings\n\nOur signature color? Gold, obviously.',
      featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=85',
      category: 'Design',
      metaTitleFr: '',
      metaTitleEn: '',
      metaDescFr: '',
      metaDescEn: '',
      published: true,
    },
  });
  console.log('✓ Blog posts');

  // Ensure launch-super-app sits in the featured slot (most-recent updatedAt)
  await prisma.$executeRawUnsafe(
    `UPDATE "BlogPost" SET "updatedAt" = NOW() WHERE slug = 'launch-super-app'`
  );

  // 7. Sample News Articles (idempotent)
  await prisma.newsArticle.upsert({
    where: { slug: 'series-a-2026' },
    update: {},
    create: {
      slug: 'series-a-2026',
      titleFr: 'bakēd Group annonce une levée de Série A',
      titleEn: 'bakēd Group announces Series A round',
      bodyFr: '## Paris — Février 2026\n\nbakēd Group annonce aujourd\'hui la clôture de sa Série A pour accélérer le déploiement de sa Super App à travers le continent africain.\n\n### Les chiffres clés\n\n- Tour mené par un consortium d\'investisseurs régionaux\n- Expansion prévue dans 4 nouveaux pays sur 18 mois\n- Recrutement de 80 talents en ingénierie et produit\n\n### À propos de bakēd Group\n\nbakēd Group est la Super App africaine.',
      bodyEn: '## Paris — February 2026\n\nbakēd Group announces today the closing of its Series A round to accelerate the Super App\'s rollout across Africa.\n\n### Key figures\n\n- Round led by a consortium of regional investors\n- Expansion to 4 new countries planned over 18 months\n- 80 engineering and product hires\n\n### About bakēd Group\n\nbakēd Group is the African Super App.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85',
      published: true,
    },
  });

  await prisma.newsArticle.upsert({
    where: { slug: 'africa-tech-awards-finalist' },
    update: {},
    create: {
      slug: 'africa-tech-awards-finalist',
      titleFr: 'bakēd Group finaliste des Africa Tech Awards',
      titleEn: 'bakēd Group named Africa Tech Awards finalist',
      bodyFr: '## Une reconnaissance pour l\'écosystème\n\nbakēd Group figure parmi les finalistes des **Africa Tech Awards 2026**, dans la catégorie *Super App de l\'Année*.',
      bodyEn: '## Recognition for the ecosystem\n\nbakēd Group has been named a finalist at the **Africa Tech Awards 2026**, in the *Super App of the Year* category.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=85',
      published: true,
    },
  });
  console.log('✓ News articles');

  console.log('🎉 Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
