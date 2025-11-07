import { AppShell } from '@/components/common/app-shell';
import { RegisterForm } from './register-form';

export default function RegisterPage() {
  return (
    <AppShell sidebar={false}>
      <RegisterForm />
    </AppShell>
  );
}
