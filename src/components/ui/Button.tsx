'use client';

import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center font-medium cursor-pointer',
    'transition-[color,background-color,border-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
    'shadow-none hover:-translate-y-px active:translate-y-0 active:scale-95',
    'data-disabled:hover:-translate-y-0 data-disabled:active:scale-100 data-disabled:shadow-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'data-disabled:opacity-50 data-disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground border border-transparent hover:bg-primary-hover hover:shadow-md',
        secondary:
          'bg-transparent text-foreground-muted border border-border-strong hover:border-foreground hover:text-foreground hover:shadow-sm',
        ghost:
          'bg-transparent text-foreground-muted border border-transparent hover:bg-background-subtle hover:text-foreground',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 rounded-sm',
        md: 'text-base px-4 py-2 rounded-md',
        lg: 'text-lg px-5 py-2.5 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = Omit<ComponentPropsWithoutRef<typeof BaseButton>, 'className'> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
