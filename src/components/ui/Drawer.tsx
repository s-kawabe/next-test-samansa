'use client';

import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type DrawerProps = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  triggerClassName?: string;
};

export function Drawer({
  trigger,
  title,
  children,
  triggerClassName,
}: DrawerProps) {
  return (
    <BaseDrawer.Root swipeDirection="right">
      <BaseDrawer.Trigger
        render={
          <Button
            variant="secondary"
            size="sm"
            type="button"
            className={cn(
              'py-3 px-4 font-label text-xs tracking-wider',
              triggerClassName,
            )}
          >
            {trigger}
          </Button>
        }
      />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="fixed inset-0 bg-overlay z-[40] opacity-0 transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)] data-[open]:opacity-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <BaseDrawer.Viewport className="fixed inset-y-0 right-0 w-[420px] max-w-full z-[50] translate-x-full transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] data-[open]:translate-x-0 data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full">
          <BaseDrawer.Popup className="h-full bg-background border-l border-border overflow-y-auto">
            <BaseDrawer.Title className="sr-only">{title}</BaseDrawer.Title>
            {children}
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
