'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/libs/i18n/routing';

const schema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    company: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword']
  });

type RegisterValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const t = useTranslations('auth');
  const actions = useTranslations('common.actions');
  const validation = useTranslations('forms.validation');
  const { mutateAsync, isPending, errorMessage } = useAuthSubmit('register');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: RegisterValues) => {
    await mutateAsync(values);
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-12 px-6 py-10">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold">{t('registerTitle')}</h1>
        <p className="text-sm text-slate-500">{t('hasAccount')}</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 p-8">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">{t('firstName')}</label>
          <Input {...register('firstName')} />
          {errors.firstName && <p className="text-sm text-danger">{errors.firstName.message}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">{t('lastName')}</label>
          <Input {...register('lastName')} />
          {errors.lastName && <p className="text-sm text-danger">{errors.lastName.message}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">{t('company')}</label>
          <Input {...register('company')} />
          {errors.company && <p className="text-sm text-danger">{errors.company.message}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">{t('email')}</label>
          <Input type="email" {...register('email')} />
          {errors.email && <p className="text-sm text-danger">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">{t('password')}</label>
          <Input type="password" {...register('password')} />
          {errors.password && <p className="text-sm text-danger">{errors.password.message}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">{t('confirmPassword')}</label>
          <Input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="text-sm text-danger">
              {errors.confirmPassword.message === 'passwordMismatch'
                ? validation('passwordMismatch')
                : errors.confirmPassword.message}
            </p>
          )}
        </div>

        {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? '…' : actions('register')}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600">
        <Link className="text-primary underline" href="/auth/signin">
          {t('hasAccount')}
        </Link>
      </p>
    </section>
  );
}
