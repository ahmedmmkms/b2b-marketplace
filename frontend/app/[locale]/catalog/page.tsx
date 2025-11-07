import { AppShell } from '@/components/common/app-shell';
import { Suspense } from 'react';
import { CatalogContent } from './catalog-content';

export default function CatalogPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-6">Loading catalog...</div>}>
        <CatalogContent />
      </Suspense>
    </AppShell>
  );
}
