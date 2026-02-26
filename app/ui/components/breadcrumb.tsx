import * as React from "react";
import { cn } from "../../utils/cn";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}
export interface BreadcrumbListProps
  extends React.HTMLAttributes<HTMLOListElement> {}
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {}
export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}
export interface BreadcrumbSeparatorProps
  extends React.HTMLAttributes<HTMLLIElement> {}
export interface BreadcrumbEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

// ─── Breadcrumb ────────────────────────────────────────────────────────────

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("", className)}
      {...props}
    />
  )
);
Breadcrumb.displayName = "Breadcrumb";

// ─── BreadcrumbList ────────────────────────────────────────────────────────

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

// ─── BreadcrumbItem ────────────────────────────────────────────────────────

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

// ─── BreadcrumbLink ────────────────────────────────────────────────────────

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(
        "transition-colors duration-150",
        active
          ? "font-medium text-foreground pointer-events-none"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";

// ─── BreadcrumbSeparator ───────────────────────────────────────────────────

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("text-muted-foreground/50", className)}
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
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// ─── BreadcrumbEllipsis ────────────────────────────────────────────────────

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer",
      className
    )}
    {...props}
  >
    ⋯
  </span>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
