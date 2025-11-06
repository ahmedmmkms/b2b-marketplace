'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { useFeatureFlagStore } from '@/libs/store/feature-flag-store';

export default function AdminFlagsPage() {
  const t = useTranslations('admin.flags');
  const flags = Object.values(useFeatureFlagStore((state) => state.flags));

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('title')} description={t('description')} />
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Key</th>
              <th className="px-4 py-3">Enabled</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-sm">
            {flags.map((flag) => (
              <tr key={flag.key}>
                <td className="px-4 py-4 font-medium text-slate-900">{flag.key}</td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      flag.enabled ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {flag.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-600">{flag.description ?? '-'}</td>
              </tr>
            ))}
            {flags.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                  No flags returned from API.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
