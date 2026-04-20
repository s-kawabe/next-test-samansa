'use client';

import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import type { ReactNode } from 'react';

type DrawerProps = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
};

export function Drawer({ trigger, title, children }: DrawerProps) {
  return (
    <BaseDrawer.Root swipeDirection="right">
      <BaseDrawer.Trigger className="[all:unset] cursor-pointer inline-flex">
        {trigger}
      </BaseDrawer.Trigger>
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
