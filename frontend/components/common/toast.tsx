'use client';

import { Toaster as SonnerToaster } from 'sonner';

export const Toaster = () => (
  <SonnerToaster
    position="top-right"
    richColors
    toastOptions={{
      className: 'shadow-lg border border-border rounded-lg',
      duration: 4000,
    }}
  />
);
