'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  tone?: 'default' | 'danger';
};

export const ConfirmDialog = ({
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  tone = 'default',
}: ConfirmDialogProps) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm" />
      <AlertDialog.Content className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
          <AlertDialog.Title className="text-lg font-semibold text-foreground">
            {title}
          </AlertDialog.Title>
          {description ? (
            <AlertDialog.Description className="text-muted-foreground mt-2 text-sm">
              {description}
            </AlertDialog.Description>
          ) : null}
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="outline">{cancelLabel}</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant={tone === 'danger' ? 'destructive' : 'default'} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </AlertDialog.Action>
          </div>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
