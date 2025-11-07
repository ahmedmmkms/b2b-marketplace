import { AppShell } from '@/components/common/app-shell';
import { FeatureFlagsAdmin } from './feature-flags-admin';

// Force SSR so Cloudflare pages build produces a worker for this admin route.
export const dynamic = 'force-dynamic';

export default function FeatureFlagsPage() {
  return (
    <AppShell>
      <FeatureFlagsAdmin />
    </AppShell>
  );
}
