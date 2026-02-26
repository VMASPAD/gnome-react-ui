import * as React from "react";
import { cn } from "../../utils/cn";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}
export interface PaginationContentProps
  extends React.HTMLAttributes<HTMLUListElement> {}
export interface PaginationItemProps
  extends React.HTMLAttributes<HTMLLIElement> {}
export interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}
export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

// ─── Pagination ────────────────────────────────────────────────────────────

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
);
Pagination.displayName = "Pagination";

// ─── PaginationContent ─────────────────────────────────────────────────────

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

// ─── PaginationItem ────────────────────────────────────────────────────────

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

// ─── PaginationButton ──────────────────────────────────────────────────────

const PaginationButton = React.forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ className, active, disabled, ...props }, ref) => (
  <button
    ref={ref}
    aria-current={active ? "page" : undefined}
    disabled={disabled}
    className={cn(
      "inline-flex h-9 min-w-9 items-center justify-center rounded-xl border text-sm font-medium transition-colors duration-150",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      active
        ? "border-primary bg-primary text-primary-foreground hover:brightness-95"
        : "border-border bg-card text-foreground hover:bg-accent",
      className
    )}
    {...props}
  />
));
PaginationButton.displayName = "PaginationButton";

// ─── PaginationPrevious ────────────────────────────────────────────────────

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ className, ...props }, ref) => (
  <PaginationButton
    ref={ref}
    aria-label="Go to previous page"
    className={cn("gap-1 px-2.5", className)}
    {...props}
  >
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
    <span className="hidden sm:inline">Prev</span>
  </PaginationButton>
));
PaginationPrevious.displayName = "PaginationPrevious";

// ─── PaginationNext ────────────────────────────────────────────────────────

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ className, ...props }, ref) => (
  <PaginationButton
    ref={ref}
    aria-label="Go to next page"
    className={cn("gap-1 px-2.5", className)}
    {...props}
  >
    <span className="hidden sm:inline">Next</span>
    <svg
      className="h-4 w-4"
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
  </PaginationButton>
));
PaginationNext.displayName = "PaginationNext";

// ─── PaginationEllipsis ────────────────────────────────────────────────────

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn(
      "flex h-9 w-9 items-center justify-center text-muted-foreground",
      className
    )}
    {...props}
  >
    ⋯
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
