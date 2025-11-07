import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { AppShell } from '@/components/common/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type HomePageProps = {
  params: { lng: string };
};

export default async function HomePage({ params: { lng } }: HomePageProps) {
  const t = await getTranslations({ locale: lng, namespace: 'hero' });
  const cta = await getTranslations({ locale: lng, namespace: 'common.actions' });
  const status = await getTranslations({ locale: lng, namespace: 'common.status' });
  const valueProps = (await t.raw('valueProps')) as string[];

  return (
    <AppShell sidebar={false}>
      <section className="bg-card">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-6 py-16 md:flex-row md:py-24">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-semibold text-foreground md:text-5xl">{t('heading')}</h1>
            <p className="text-muted-foreground text-lg md:text-xl">{t('subheading')}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/catalog">
                <Button size="lg">{t('primaryCta')}</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" size="lg">
                  {t('secondaryCta')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="border-primary/30 bg-primary/10 rounded-3xl border p-8 shadow-subtle">
              <div className="text-sm uppercase tracking-wide text-primary">{cta('submit')}</div>
              <div className="mt-4 space-y-3 text-sm text-foreground">
                <div className="flex items-center justify-between">
                  <span>Buyer</span>
                  <span>Al Maktoum Holding</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>RFQ</span>
                  <span>Steel Pipes Q2-2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                    {status('draft')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((value, index) => (
            <Card key={index} className="border-border/60">
              <CardContent className="text-muted-foreground p-6 text-sm leading-relaxed">
                {value}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
