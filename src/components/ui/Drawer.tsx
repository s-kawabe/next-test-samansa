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
      <BaseDrawer.Trigger
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'inline-flex',
        }}
      >
        {trigger}
      </BaseDrawer.Trigger>
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-overlay)',
            zIndex: 40,
          }}
        />
        <BaseDrawer.Popup
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: 420,
            maxWidth: '100vw',
            backgroundColor: 'var(--color-background)',
            borderLeft: '1px solid var(--color-border)',
            zIndex: 50,
            overflowY: 'auto',
          }}
        >
          <BaseDrawer.Title
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)',
              whiteSpace: 'nowrap',
              borderWidth: 0,
            }}
          >
            {title}
          </BaseDrawer.Title>
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
