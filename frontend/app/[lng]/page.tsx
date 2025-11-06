import { getTranslations } from 'next-intl/server';
import { Link } from '@/libs/i18n/routing';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { Locale } from '@/libs/i18n/locales';

export default async function HomePage({ params }: { params: { lng: Locale } }) {
  const t = await getTranslations({ locale: params.lng, namespace: 'home' });

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
      <section className="grid gap-8 rounded-3xl bg-primary px-8 py-12 text-white lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold lg:text-5xl">{t('hero.title')}</h1>
          <p className="text-lg opacity-90">{t('hero.subtitle')}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/catalog">
              <Button variant="secondary">{t('hero.ctaPrimary')}</Button>
            </Link>
            <Button variant="ghost" className="border border-white/60 text-white">
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/brand-logos/primary.svg"
            alt="Marketplace"
            width={220}
            height={120}
            priority
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-semibold">{t('value.rfq')}</h3>
          <p className="mt-2 text-sm text-slate-100/80">
            Automate sourcing requests with structured requirements and supplier collaboration tools.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold">{t('value.quotes')}</h3>
          <p className="mt-2 text-sm text-slate-100/80">
            Compare pricing, lead times, and shipping terms with responsive quote analytics.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold">{t('value.wallet')}</h3>
          <p className="mt-2 text-sm text-slate-100/80">
            Control cash flow with secure wallet balances, top ups, and settlement visibility.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold">{t('value.insights')}</h3>
          <p className="mt-2 text-sm text-slate-100/80">
            Track KPIs from RFQ velocity to order fulfillment to inform procurement strategy.
          </p>
        </div>
      </section>
    </main>
  );
}
