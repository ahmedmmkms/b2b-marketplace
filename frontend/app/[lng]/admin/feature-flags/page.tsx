import { AppShell } from '@/components/common/app-shell';
import { FeatureFlagsAdmin } from './feature-flags-admin';

export default function FeatureFlagsPage() {
  return (
    <AppShell>
      <FeatureFlagsAdmin />
    </AppShell>
  );
}
