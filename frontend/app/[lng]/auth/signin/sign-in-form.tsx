'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin, useMe } from '@/libs/api';
import { useAuthStore } from '@/libs/store/auth-store';
import { surfaceApiError } from '@/libs/api/api-error';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export const SignInForm = () => {
  const t = useTranslations('auth.signin');
  const actions = useTranslations('common.actions');
  const router = useRouter();
  const params = useSearchParams();
  const locale = useLocale();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const setUser = useAuthStore((state) => state.setUser);
  const [, startTransition] = useTransition();
  const meQuery = useMe({ query: { enabled: false } });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useLogin({
    mutation: {
      onSuccess: async (payload) => {
        setCredentials(payload);
        toast.success('Signed in successfully');
        try {
          const profile = await meQuery.refetch();
          if (profile.data) {
            setUser(profile.data);
          }
        } catch (error) {
          surfaceApiError(error);
        }
        const next = params.get('next') ?? `/${locale}`;
        startTransition(() => router.push(next));
      },
      onError: (error) => surfaceApiError(error),
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    loginMutation.mutate({ data: values });
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
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
              {form.formState.errors.email ? (
                <p className="text-xs text-danger">{form.formState.errors.email.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...form.register('password')}
              />
              {form.formState.errors.password ? (
                <p className="text-xs text-danger">{form.formState.errors.password.message}</p>
              ) : null}
            </div>
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Signing in...' : t('cta')}
            </Button>
          </form>
          <p className="text-muted-foreground mt-4 text-center text-xs">
            {actions('register')}?{' '}
            <button
              type="button"
              className="text-primary underline"
              onClick={() => router.push(`/${locale}/auth/register`)}
            >
              {actions('register')}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
