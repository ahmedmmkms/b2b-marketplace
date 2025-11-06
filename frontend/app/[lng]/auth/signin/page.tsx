'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/libs/i18n/routing';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type SignInValues = z.infer<typeof schema>;

export default function SignInPage() {
  const t = useTranslations('auth');
  const actions = useTranslations('common.actions');
  const { mutateAsync, isPending, errorMessage } = useAuthSubmit('login');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: SignInValues) => {
    await mutateAsync(values);
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-12 px-6 py-10">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold">{t('signinTitle')}</h1>
        <p className="text-sm text-slate-500">{t('noAccount')}</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-slate-200 p-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('email')}</label>
          <Input type="email" placeholder="you@company.com" {...register('email')} />
          {errors.email && <p className="text-sm text-danger">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('password')}</label>
          <Input type="password" placeholder="********" {...register('password')} />
          {errors.password && <p className="text-sm text-danger">{errors.password.message}</p>}
        </div>
        {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? '…' : actions('signin')}
        </Button>
      </form>
      <p className="text-center text-sm text-slate-600">
        <Link className="text-primary underline" href="/auth/register">
          {t('noAccount')}
        </Link>
      </p>
    </section>
  );
}
