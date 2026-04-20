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
              'py-3 px-4 font-mono text-xs tracking-wider uppercase',
              triggerClassName,
            )}
          >
            {trigger}
          </Button>
        }
      />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="fixed inset-0 bg-overlay z-[40]" />
        <BaseDrawer.Popup className="fixed inset-y-0 right-0 w-[420px] max-w-full bg-background border-l border-border z-[50] overflow-y-auto">
          <BaseDrawer.Title className="sr-only">{title}</BaseDrawer.Title>
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
