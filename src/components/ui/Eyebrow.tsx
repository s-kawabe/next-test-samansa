import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const eyebrowVariants = cva(
  'font-label text-xs font-medium tracking-wider uppercase',
  {
    variants: {
      tone: {
        subtle: 'text-foreground-subtle',
        muted: 'text-foreground-muted',
        foreground: 'text-foreground',
      },
    },
    defaultVariants: {
      tone: 'subtle',
    },
  },
);

type EyebrowProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof eyebrowVariants>;

export function Eyebrow({ tone, className, ...props }: EyebrowProps) {
  return <span className={cn(eyebrowVariants({ tone }), className)} {...props} />;
}
