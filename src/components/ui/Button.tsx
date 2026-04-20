'use client';

import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover border border-transparent',
  secondary:
    'bg-transparent text-foreground-muted border border-border-strong hover:border-foreground hover:text-foreground',
  ghost:
    'bg-transparent text-foreground-muted border border-transparent hover:bg-background-subtle hover:text-foreground',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-sm',
  md: 'text-base px-4 py-2 rounded-md',
  lg: 'text-lg px-5 py-2.5 rounded-md',
};

type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={[
        'inline-flex items-center justify-center font-medium cursor-pointer',
        'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        'data-disabled:opacity-50 data-disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}
