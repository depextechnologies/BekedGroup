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
    create: { email: adminEmail, password: hash, name: 'Baked Admin', role: 'admin' },
  });
  console.log(`✓ Admin: ${adminEmail}`);

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: 'Baked Growth',
      contactEmail: 'contact@baked.group',
      contactPhone: '+33 1 23 45 67 89',
      contactAddress: 'Paris, France',
      googleMapsUrl: 'https://maps.google.com/?q=Paris,France',
      facebookUrl: 'https://facebook.com/bakedgrowth',
      linkedinUrl: 'https://linkedin.com/company/bakedgrowth',
      instagramUrl: 'https://instagram.com/bakedgrowth',
      tiktokUrl: 'https://tiktok.com/@bakedgrowth',
      youtubeUrl: 'https://youtube.com/@bakedgrowth',
    },
  });
  console.log('✓ Site settings');

  // 3. Homepage content
  await prisma.homepageContent.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
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
    update: {},
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
      descFr: 'Rejoignez notre équipe design et façonnez l\'avenir de l\'écosystème Baked.',
      descEn: 'Join our design team and shape the future of the Baked ecosystem.',
      published: true,
    },
  });

  await prisma.jobOpening.upsert({
    where: { slug: 'senior-fullstack-engineer' },
    update: {},
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
      descFr: 'Construisez les API et les expériences qui propulsent l\'écosystème Baked à grande échelle.',
      descEn: 'Build the APIs and experiences that power the Baked ecosystem at scale.',
      published: true,
    },
  });
  console.log('✓ Job openings');

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
