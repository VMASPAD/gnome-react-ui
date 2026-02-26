'use client';
import * as React from 'react';
import { cn } from '@/lib/cn';

/* ─── Types ────────────────────────────────────────────────────────────────── */

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual style variant of the badge.
   * @default 'default'
   */
  variant?: BadgeVariant;
  /**
   * The size of the badge.
   * @default 'md'
   */
  size?: BadgeSize;
}

export interface BadgeState {
  variant: BadgeVariant;
  size: BadgeSize;
}

/* ─── Styles (CSS variables from globals.css) ──────────────────────────────── */

const variantStyles: Record<BadgeVariant, string> = {
  default:     'bg-muted text-muted-foreground border-border',
  primary:     'bg-primary/10 text-primary border-primary/25',
  secondary:   'bg-secondary text-secondary-foreground border-border',
  success:     'bg-[oklch(0.65_0.18_150)]/10 text-[oklch(0.45_0.15_150)] border-[oklch(0.65_0.18_150)]/20 dark:text-[oklch(0.65_0.18_150)]',
  warning:     'bg-[oklch(0.75_0.18_80)]/10 text-[oklch(0.5_0.15_80)] border-[oklch(0.75_0.18_80)]/20 dark:text-[oklch(0.75_0.18_80)]',
  destructive: 'bg-destructive/10 text-destructive border-destructive/25',
  outline:     'bg-transparent text-foreground border-border',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

/* ─── Badge ────────────────────────────────────────────────────────────────── */

/**
 * A small label component for status, categories, or counts.
 * Renders a `<span>` element.
 */
export const Badge = React.forwardRef<HTMLSpanElement, Badge.Props>(
  function Badge(
    { className, variant = 'default', size = 'md', ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full border font-medium transition-colors',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';

export namespace Badge {
  export type Props = BadgeProps;
  export type State = BadgeState;
}
