import { getTranslations } from 'next-intl/server';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('description')}</p>
      </main>
    </div>
  );
}