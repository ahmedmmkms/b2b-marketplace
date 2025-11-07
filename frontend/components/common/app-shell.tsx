'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link, usePathname, localePathnames } from '@/libs/i18n/routing';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils/tw';
import { useAuthStore } from '@/libs/store/auth-store';
import { useAuth } from '@/libs/hooks/use-auth';
import { isFeatureEnabled } from '@/libs/store/feature-flags-store';

type AppShellProps = {
  children: React.ReactNode;
  sidebar?: boolean;
};

type RoutePath = Exclude<keyof typeof localePathnames, '/product/[id]' | '/orders/[orderId]'>;

type NavItem = {
  href: RoutePath;
  labelKey: string;
  roles?: string[];
  featureFlag?: string;
};

const buyerNav: NavItem[] = [
  { href: '/catalog', labelKey: 'nav.catalog', featureFlag: 'catalog.publicBrowse' },
  { href: '/rfq', labelKey: 'nav.rfq', featureFlag: 'rfq.enabled' },
  { href: '/quotes', labelKey: 'nav.quotes' },
  { href: '/orders', labelKey: 'nav.orders' },
  { href: '/wallet', labelKey: 'nav.wallet', featureFlag: 'wallet.basic' },
];

const supplierNav: NavItem[] = [
  { href: '/supplier/quotes/inbox', labelKey: 'nav.supplierInbox', roles: ['supplier'] },
];

const adminNav: NavItem[] = [
  { href: '/admin/dashboard', labelKey: 'nav.dashboard', roles: ['admin'] },
  { href: '/admin/users', labelKey: 'nav.users', roles: ['admin'] },
  { href: '/admin/feature-flags', labelKey: 'nav.featureFlags', roles: ['admin'] },
];

const isNavVisible = (
  item: NavItem,
  roles: string[],
  flagChecker: (feature?: string) => boolean,
) => {
  if (item.roles?.length && !item.roles.some((role) => roles.includes(role))) {
    return false;
  }
  if (item.featureFlag && !flagChecker(item.featureFlag)) {
    return false;
  }
  return true;
};

export const AppShell = ({ children, sidebar = true }: AppShellProps) => {
  const t = useTranslations();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const logout = useAuthStore((state) => state.clear);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const userRoles = user?.role ? [user.role] : [];

  const unauthNav: NavItem[] = [
    { href: '/auth/signin', labelKey: 'nav.signin' },
    { href: '/auth/register', labelKey: 'nav.register' },
  ];

  const navItems: NavItem[] = [
    ...buyerNav,
    ...supplierNav,
    ...adminNav,
    ...(isAuthenticated ? [] : unauthNav),
  ];

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  const currentPath = pathname;

  const renderLinks = () =>
    navItems
      .filter((item) =>
        isNavVisible(item, userRoles, (flag) => (flag ? isFeatureEnabled(flag, true) : true)),
      )
      .map((item) => {
        const active = currentPath === item.href || currentPath.endsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'hover:bg-primary/10 block rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active ? 'bg-primary text-primary-foreground' : 'text-foreground',
            )}
          >
            {t(item.labelKey)}
          </Link>
        );
      });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {sidebar ? (
        <aside
          className={cn(
            'fixed inset-y-0 z-40 w-64 border-e border-border bg-card px-4 py-6 shadow-lg transition-transform md:static md:translate-x-0',
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-primary">
              {t('common.brand')}
            </Link>
            <button
              type="button"
              className="rounded-md border border-border px-2 py-1 text-sm md:hidden"
              onClick={() => setIsMobileNavOpen(false)}
              aria-label="Close navigation"
            >
              X
            </button>
          </div>
          <nav className="mt-6 flex flex-col gap-1">{renderLinks()}</nav>
        </aside>
      ) : null}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-sm">
          <div className="flex items-center gap-3">
            {sidebar ? (
              <button
                type="button"
                className="rounded-md border border-border px-2 py-1 text-sm md:hidden"
                onClick={() => setIsMobileNavOpen((value) => !value)}
                aria-label="Toggle navigation"
              >
                Menu
              </button>
            ) : null}
            <span className="text-lg font-semibold text-primary">{t('common.brand')}</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={() => logout()}>
                {t('common.actions.signOut')}
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm">{t('common.actions.signIn')}</Button>
              </Link>
            )}
          </div>
        </header>
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
};
