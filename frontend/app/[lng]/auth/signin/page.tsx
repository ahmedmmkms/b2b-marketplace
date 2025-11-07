import { Suspense } from 'react';
import { AppShell } from '@/components/common/app-shell';
import { SignInForm } from './sign-in-form';

export default function SignInPage() {
  return (
    <AppShell sidebar={false}>
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </AppShell>
  );
}
