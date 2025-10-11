// app/[lng]/page.tsx
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { LanguageSwitcher } from '../../libs/i18n/LanguageSwitcher';

export default async function HomePage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'HomePage' });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-lg text-gray-600 text-center">{t('description')}</p>
        <div className="flex gap-4 mt-8">
          <Link 
            href={`/${lng}/catalog`} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Browse Catalog
          </Link>
          <LanguageSwitcher />
        </div>
      </main>
    </div>
  );
}