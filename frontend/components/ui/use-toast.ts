'use client';

export const useToast = () => {
  return {
    toast: ({ title, description }: { title: string; description?: string; variant?: string }) => {
      if (typeof window === 'undefined') return;
      const show = (window as any).__showToast as
        | ((title: string, description?: string) => void)
        | undefined;
      if (show) {
        show(title, description);
      }
    }
  };
};
