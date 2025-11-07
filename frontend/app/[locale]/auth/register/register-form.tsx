'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister, useMe } from '@/libs/api';
import { useAuthStore } from '@/libs/store/auth-store';
import { surfaceApiError } from '@/libs/api/api-error';

const schema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  orgId: z.string().min(2),
});

type FormValues = z.infer<typeof schema>;

export const RegisterForm = () => {
  const t = useTranslations('auth.register');
  const actions = useTranslations('common.actions');
  const router = useRouter();
  const locale = useLocale();
  const [, startTransition] = useTransition();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const setUser = useAuthStore((state) => state.setUser);
  const meQuery = useMe({ query: { enabled: false } });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', password: '', orgId: '' },
  });

  const registerMutation = useRegister({
    mutation: {
      onSuccess: async (payload) => {
        setCredentials(payload);
        toast.success('Account created');
        try {
          const profile = await meQuery.refetch();
          if (profile.data) {
            setUser(profile.data);
          }
        } catch (error) {
          surfaceApiError(error);
        }
        startTransition(() => router.push(`/${locale}`));
      },
      onError: (error) => surfaceApiError(error),
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    registerMutation.mutate({ data: values });
  });

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-6 py-10">
      <Card className="border-border/70 w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('name')}</Label>
              <Input id="fullName" {...form.register('fullName')} />
              {form.formState.errors.fullName ? (
                <p className="text-xs text-danger">{form.formState.errors.fullName.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" type="email" {...form.register('email')} />
              {form.formState.errors.email ? (
                <p className="text-xs text-danger">{form.formState.errors.email.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input id="password" type="password" {...form.register('password')} />
              {form.formState.errors.password ? (
                <p className="text-xs text-danger">{form.formState.errors.password.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgId">{t('orgId')}</Label>
              <Input id="orgId" {...form.register('orgId')} />
              {form.formState.errors.orgId ? (
                <p className="text-xs text-danger">{form.formState.errors.orgId.message}</p>
              ) : null}
            </div>
            <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? 'Creating...' : t('cta')}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/${locale}/auth/signin`)}
            >
              {actions('signIn')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
