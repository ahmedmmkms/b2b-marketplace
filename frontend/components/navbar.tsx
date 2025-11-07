'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils/tw';
import { useUiStore } from '@/stores/ui';

export type NavItem = {
  label: string;
  href: string;
  id: string;
};

type NavbarProps = {
  brandPrimary: string;
  brandSecondary: string;
  navItems: NavItem[];
  currentLocale: string;
  switchLabel: string;
  switchAriaLabel: string;
  ctaLabel: string;
  ctaHref: string;
  authLabel: string;
  authHref: string;
};

export const Navbar = ({
  brandPrimary,
  brandSecondary,
  navItems,
  currentLocale,
  switchLabel,
  switchAriaLabel,
  ctaLabel,
  ctaHref,
  authLabel,
  authHref,
}: NavbarProps) => {
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUiStore();
  const nextLocale = currentLocale === 'ar' ? 'en' : 'ar';

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <Link href={`/${currentLocale}`} className="flex flex-col leading-tight text-foreground">
          <span className="text-lg font-semibold">{brandPrimary}</span>
          <span className="text-sm text-primary">{brandSecondary}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 lg:flex">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="font-semibold text-primary">
            <Link href={`/${nextLocale}`} aria-label={switchAriaLabel}>
              {switchLabel}
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex">
            <Link href={authHref}>{authLabel}</Link>
          </Button>
          <Button asChild className="hidden lg:inline-flex" size="sm">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden transition-all duration-200 ease-out',
          isMobileMenuOpen ? 'max-h-screen border-t border-border/60 bg-white' : 'max-h-0 overflow-hidden',
        )}
      >
        <div className="container flex flex-col space-y-2 py-4 text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-lg px-4 py-3 hover:bg-muted/50"
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="secondary" className="mt-2 w-full">
            <Link href={`/${nextLocale}`} aria-label={switchAriaLabel}>
              {switchLabel}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href={authHref}>{authLabel}</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
