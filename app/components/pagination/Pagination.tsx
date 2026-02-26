'use client';
import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';

/* ─── Types ────────────────────────────────────────────────────────────────── */

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}
export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {}
export interface PaginationItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether this button represents the currently active page.
   * @default false
   */
  active?: boolean;
}

export interface PaginationPreviousProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface PaginationNextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/* ─── Pagination ───────────────────────────────────────────────────────────── */

/**
 * Root pagination navigation wrapper.
 * Renders a `<nav>` element with aria-label="pagination".
 */
export const Pagination = React.forwardRef<HTMLElement, Pagination.Props>(
  function Pagination({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
      />
    );
  },
);
Pagination.displayName = 'Pagination';

/* ─── PaginationContent ────────────────────────────────────────────────────── */

/**
 * Flex list that holds pagination items.
 * Renders a `<ul>` element.
 */
export const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  function PaginationContent({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}
      />
    );
  },
);
PaginationContent.displayName = 'PaginationContent';

/* ─── PaginationItem ───────────────────────────────────────────────────────── */

/**
 * A list item wrapping a pagination button or element.
 * Renders an `<li>` element.
 */
export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  function PaginationItem({ className, ...props }, ref) {
    return <li ref={ref} className={cn('', className)} {...props} />;
  },
);
PaginationItem.displayName = 'PaginationItem';

/* ─── PaginationButton ─────────────────────────────────────────────────────── */

/**
 * A numbered page button.
 * Renders a `<button>` element.
 */
export const PaginationButton = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  function PaginationButton({ className, active = false, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
          active
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
PaginationButton.displayName = 'PaginationButton';

/* ─── PaginationPrevious ───────────────────────────────────────────────────── */

/**
 * A "Previous page" navigation button.
 * Renders a `<button>` element.
 */
export const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  function PaginationPrevious({ className, ...props }, ref) {
    return (
      <button
        ref={ref}
        aria-label="Go to previous page"
        className={cn(
          'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>
    );
  },
);
PaginationPrevious.displayName = 'PaginationPrevious';

/* ─── PaginationNext ───────────────────────────────────────────────────────── */

/**
 * A "Next page" navigation button.
 * Renders a `<button>` element.
 */
export const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  function PaginationNext({ className, ...props }, ref) {
    return (
      <button
        ref={ref}
        aria-label="Go to next page"
        className={cn(
          'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    );
  },
);
PaginationNext.displayName = 'PaginationNext';

/* ─── PaginationEllipsis ───────────────────────────────────────────────────── */

/**
 * An ellipsis indicator for skipped page ranges.
 * Renders a `<span>` element.
 */
export const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  function PaginationEllipsis({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn('flex h-8 w-8 items-center justify-center text-muted-foreground', className)}
        {...props}
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
      </span>
    );
  },
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

/* ─── Namespace ────────────────────────────────────────────────────────────── */

export namespace Pagination {
  export type Props = PaginationProps;
}
