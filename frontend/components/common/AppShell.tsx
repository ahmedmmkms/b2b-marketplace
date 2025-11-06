'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/libs/i18n/routing';
import { cn } from '@/libs/utils/cn';
import { useAuthStore } from '@/libs/store/auth-store';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { clearSession } from '@/libs/utils/session';

const navItems = [
  { href: '/', translation: 'nav.home', roles: ['buyer', 'supplier', 'admin', 'guest'] },
  { href: '/catalog', translation: 'nav.catalog', roles: ['buyer', 'supplier', 'guest'] },
  { href: '/rfq', translation: 'nav.rfq', roles: ['buyer'] },
  { href: '/quotes', translation: 'nav.quotes', roles: ['buyer'] },
  { href: '/supplier/quotes/inbox', translation: 'nav.supplierQuotes', roles: ['supplier'] },
  { href: '/orders', translation: 'nav.orders', roles: ['buyer'] },
  { href: '/wallet', translation: 'nav.wallet', roles: ['buyer'] },
  { href: '/admin/dashboard', translation: 'nav.adminDashboard', roles: ['admin'] }
];

export const AppShell = ({ children, showChrome }: { children: ReactNode; showChrome: boolean }) => {
  const t = useTranslations();
  const pathname = usePathname();
  const { user, clear } = useAuthStore((state) => ({
    user: state.user,
    clear: state.clear
  }));

  const roles = user?.roles && user.roles.length > 0 ? user.roles : ['guest'];

  const filteredNav = navItems.filter((item) =>
    item.roles.some((role) => roles.includes(role))
  );

  const handleSignOut = async () => {
    clear();
    await clearSession();
    window.location.href = '/auth/signin';
  };

  if (!showChrome) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand-logos/primary.svg" alt="Logo" width={120} height={40} />
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {filteredNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium text-slate-600 transition-colors hover:text-primary',
                    isActive && 'text-primary'
                  )}
                >
                  {t(item.translation)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {user ? (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                {t('common.actions.signout')}
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm">{t('common.actions.signin')}</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 bg-slate-50/60">{children}</main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {t('common.brand')}
      </footer>
    </div>
  );
};
