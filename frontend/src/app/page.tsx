import { prisma } from '@/lib/prisma';
import { Header } from '@/components/site/Header';
import { Hero } from '@/components/site/Hero';
import { About } from '@/components/site/About';
import { Ecosystem } from '@/components/site/Ecosystem';
import { WhyBaked } from '@/components/site/WhyBaked';
import { MobileShowcase } from '@/components/site/MobileShowcase';
import { Careers } from '@/components/site/Careers';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [homepage, settings, apps] = await Promise.all([
    prisma.homepageContent.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1 },
    }),
    prisma.siteSettings.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1 },
    }),
    prisma.application.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero
        titleFr={homepage.heroTitleFr}
        titleEn={homepage.heroTitleEn}
        highlightFr={homepage.heroHighlightFr}
        highlightEn={homepage.heroHighlightEn}
        bgImage={homepage.heroBgImage}
        foregroundImage={homepage.heroForegroundImage}
      />
      <About
        titleFr={homepage.aboutTitleFr}
        titleEn={homepage.aboutTitleEn}
        bodyFr={homepage.aboutBodyFr}
        bodyEn={homepage.aboutBodyEn}
      />
      <Ecosystem apps={apps} />
      <WhyBaked />
      <MobileShowcase />
      <Careers image={homepage.careersImage} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
