'use client';
import * as React from 'react';
import { cn } from '@/lib/cn';

/* ─── Types ────────────────────────────────────────────────────────────────── */

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}
export interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {}
export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {}
export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether this link represents the current page (aria-current="page").
   * @default false
   */
  active?: boolean;
}
export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {}
export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

/* ─── Breadcrumb ───────────────────────────────────────────────────────────── */

/**
 * Navigational breadcrumb trail.
 * Renders a `<nav>` element with aria-label="Breadcrumb".
 */
export const Breadcrumb = React.forwardRef<HTMLElement, Breadcrumb.Props>(
  function Breadcrumb({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('', className)}
        {...props}
      />
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';

/* ─── BreadcrumbList ───────────────────────────────────────────────────────── */

/**
 * Ordered list of breadcrumb items.
 * Renders an `<ol>` element.
 */
export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, ...props }, ref) {
    return (
      <ol
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground',
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbList.displayName = 'BreadcrumbList';

/* ─── BreadcrumbItem ───────────────────────────────────────────────────────── */

/**
 * A single breadcrumb step.
 * Renders an `<li>` element.
 */
export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return (
      <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
    );
  },
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

/* ─── BreadcrumbLink ───────────────────────────────────────────────────────── */

/**
 * An anchor within a breadcrumb item.
 * Pass `active` to mark the current page.
 * Renders an `<a>` element.
 */
export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ className, active = false, ...props }, ref) {
    return (
      <a
        ref={ref}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'transition-colors duration-150',
          active
            ? 'font-medium text-foreground pointer-events-none'
            : 'text-muted-foreground hover:text-foreground',
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

/* ─── BreadcrumbSeparator ──────────────────────────────────────────────────── */

/**
 * A visual separator between breadcrumb items.
 * Renders an `<li>` element with role="presentation".
 */
export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn('text-muted-foreground/50', className)}
        {...props}
      >
        {children ?? (
          <svg
            className="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </li>
    );
  },
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/* ─── BreadcrumbEllipsis ───────────────────────────────────────────────────── */

/**
 * An ellipsis indicator for collapsed breadcrumb items.
 * Renders a `<span>` element.
 */
export const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  function BreadcrumbEllipsis({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer',
          className,
        )}
        {...props}
      >
        ⋯
      </span>
    );
  },
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

/* ─── Namespace ────────────────────────────────────────────────────────────── */

export namespace Breadcrumb {
  export type Props = BreadcrumbProps;
}
