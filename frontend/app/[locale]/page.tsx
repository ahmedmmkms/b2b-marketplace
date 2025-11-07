import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Navbar, type NavItem } from '@/components/navbar';
import { Hero, type HeroContent } from '@/components/hero';
import { Features, type FeatureItem } from '@/components/features';
import { Steps, type StepItem } from '@/components/steps';
import { Categories, type CategoryItem } from '@/components/categories';
import { Testimonials, type TestimonialItem } from '@/components/testimonials';
import { Footer, type FooterColumn, type FooterContact } from '@/components/footer';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/libs/i18n';

type LandingPageProps = {
  params: { locale: Locale };
};

export default async function LandingPage({ params: { locale } }: LandingPageProps) {
  const brandT = await getTranslations({ locale, namespace: 'brand' });
  const navT = await getTranslations({ locale, namespace: 'nav' });
  const heroT = await getTranslations({ locale, namespace: 'hero' });
  const sectionsT = await getTranslations({ locale, namespace: 'sections' });
  const ctaT = await getTranslations({ locale, namespace: 'cta' });
  const footerT = await getTranslations({ locale, namespace: 'footer' });

  const heroContent: HeroContent = {
    title: heroT('title'),
    subtitle: heroT('subtitle'),
    primaryCta: heroT('primary'),
    secondaryCta: heroT('secondary'),
    search: heroT('search'),
    searchLabel: heroT('searchLabel'),
    searchButton: heroT('searchButton'),
    badge: heroT('badge'),
    highlights: (await heroT.raw('highlights')) as string[],
    stats: (await heroT.raw('stats')) as HeroContent['stats'],
    mockup: (await heroT.raw('mockup')) as HeroContent['mockup'],
  };

  const features = (await sectionsT.raw('features.items')) as FeatureItem[];
  const steps = (await sectionsT.raw('steps.items')) as StepItem[];
  const categories = (await sectionsT.raw('categories.items')) as CategoryItem[];
  const testimonials = (await sectionsT.raw('testimonials.items')) as TestimonialItem[];
  const footerColumns = (await footerT.raw('columns')) as FooterColumn[];
  const footerContact = (await footerT.raw('contact')) as FooterContact;

  const anchor = (hash: string) => `/${locale}${hash}`;
  const catalogPath = `/${locale}/catalog`;
  const signinHref = `/${locale}/auth/signin?next=${encodeURIComponent(catalogPath)}`;
  const ctaHref = anchor('#pricing');
  const buyersHref = anchor('#buyers');

  const navItems: NavItem[] = [
    { id: 'buyers', label: navT('buyers'), href: anchor('#buyers') },
    { id: 'suppliers', label: navT('suppliers'), href: anchor('#suppliers') },
    { id: 'categories', label: navT('categories'), href: anchor('#categories') },
    { id: 'pricing', label: navT('pricing'), href: anchor('#pricing') },
    { id: 'contact', label: navT('contact'), href: anchor('#contact') },
  ];

  const switchLabel = locale === 'ar' ? navT('switchToEn') : navT('switchToAr');
  const switchAriaLabel = locale === 'ar' ? navT('switchToEnAria') : navT('switchToArAria');

  const finalCta = {
    title: ctaT('title'),
    button: ctaT('button'),
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-white text-slate-900">
      <Navbar
        brandPrimary={brandT('name')}
        brandSecondary={brandT('alt')}
        navItems={navItems}
        currentLocale={locale}
        switchLabel={switchLabel}
        switchAriaLabel={switchAriaLabel}
        ctaLabel={navT('cta')}
        ctaHref={ctaHref}
        authLabel={navT('signin')}
        authHref={signinHref}
      />
      <main className="container space-y-24 py-16">
        <Hero content={heroContent} primaryHref={signinHref} secondaryHref={buyersHref} />
        <Features
          title={sectionsT('features.title')}
          subtitle={sectionsT('features.subtitle')}
          items={features}
        />
        <Steps title={sectionsT('steps.title')} subtitle={sectionsT('steps.subtitle')} items={steps} />
        <Categories
          title={sectionsT('categories.title')}
          subtitle={sectionsT('categories.subtitle')}
          description={sectionsT('categories.description')}
          items={categories}
        />
        <Testimonials
          title={sectionsT('testimonials.title')}
          subtitle={sectionsT('testimonials.subtitle')}
          items={testimonials}
        />
        <section
          id="pricing"
          className="rounded-[32px] border border-border/60 bg-gradient-to-r from-primary/10 via-white to-accent/10 p-10 text-center shadow-subtle"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            {brandT('tagline')}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">{footerT('tagline')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href={anchor('#contact')}>{finalCta.button}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={anchor('#buyers')}>{navT('buyers')}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer
        brandPrimary={brandT('name')}
        brandSecondary={brandT('alt')}
        tagline={footerT('tagline')}
        columns={footerColumns}
        contact={footerContact}
      />
    </div>
  );
}
