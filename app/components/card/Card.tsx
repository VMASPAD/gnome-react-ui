'use client';
import * as React from 'react';
import { cn } from '@/lib/cn';

/* ─── Types ────────────────────────────────────────────────────────────────── */

export type CardVariant = 'default' | 'ghost' | 'outlined' | 'filled';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style variant of the card.
   * @default 'default'
   */
  variant?: CardVariant;
}

export interface CardState {
  variant: CardVariant;
}

/* ─── Styles (CSS variables from globals.css) ──────────────────────────────── */

const variantStyles: Record<CardVariant, string> = {
  default:  'border border-border bg-card text-card-foreground shadow-sm hover:shadow-md',
  ghost:    'border border-transparent bg-transparent text-card-foreground hover:bg-accent/40',
  outlined: 'border-2 border-border bg-transparent text-card-foreground hover:border-primary/50',
  filled:   'border border-primary/20 bg-primary/8 text-card-foreground hover:bg-primary/12',
};

/* ─── Card ─────────────────────────────────────────────────────────────────── */

/**
 * A surface for grouping related content.
 * Renders a `<div>` element.
 */
export const Card = React.forwardRef<HTMLDivElement, Card.Props>(
  function Card({ className, variant = 'default', ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('rounded-2xl transition-all duration-200', variantStyles[variant], className)}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

/* ─── CardHeader ───────────────────────────────────────────────────────────── */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
    );
  },
);
CardHeader.displayName = 'CardHeader';

/* ─── CardTitle ────────────────────────────────────────────────────────────── */

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn('text-xl font-semibold leading-none tracking-tight text-card-foreground', className)}
        {...props}
      />
    );
  },
);
CardTitle.displayName = 'CardTitle';

/* ─── CardDescription ──────────────────────────────────────────────────────── */

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
    );
  },
);
CardDescription.displayName = 'CardDescription';

/* ─── CardContent ──────────────────────────────────────────────────────────── */

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
  },
);
CardContent.displayName = 'CardContent';

/* ─── CardFooter ───────────────────────────────────────────────────────────── */

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
    );
  },
);
CardFooter.displayName = 'CardFooter';

/* ─── Namespace ────────────────────────────────────────────────────────────── */

export namespace Card {
  export type Props = CardProps;
  export type State = CardState;
}
