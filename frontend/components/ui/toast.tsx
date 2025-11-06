'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { useEffect, useState } from 'react';
import { Button } from './button';

export const Toaster = () => {
  const [open, setOpen] = useState(false);
  const [toastState, setToastState] = useState<{ title: string; description?: string }>({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    (window as any).__showToast = (title: string, description?: string) => {
      setToastState({ title, description });
      setOpen(true);
    };
    return () => {
      delete (window as any).__showToast;
    };
  }, []);

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg"
      >
        <ToastPrimitive.Title className="text-sm font-semibold text-slate-900">
          {toastState.title}
        </ToastPrimitive.Title>
        {toastState.description && (
          <ToastPrimitive.Description className="text-sm text-slate-600">
            {toastState.description}
          </ToastPrimitive.Description>
        )}
        <div className="flex justify-end">
          <ToastPrimitive.Close asChild>
            <Button variant="ghost" size="sm">
              Close
            </Button>
          </ToastPrimitive.Close>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50" />
    </ToastPrimitive.Provider>
  );
};
