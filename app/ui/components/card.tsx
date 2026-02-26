import * as React from "react";
import { cn } from "../../utils/cn";

// ─── Types ─────────────────────────────────────────────────────────────────

export type CardVariant = "default" | "ghost" | "outlined" | "filled";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

// ─── Variant styles (use project CSS vars from globals.css) ─────────────────

const variantStyles: Record<CardVariant, string> = {
  default:
    "border border-border bg-card text-card-foreground shadow-sm hover:shadow-md",
  ghost:
    "border border-transparent bg-transparent text-card-foreground hover:bg-accent/40",
  outlined:
    "border-2 border-border bg-transparent text-card-foreground hover:border-primary/50",
  filled:
    "border border-primary/20 bg-primary/8 text-card-foreground hover:bg-primary/12",
};

// ─── Card ──────────────────────────────────────────────────────────────────

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// ─── CardHeader ────────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// ─── CardTitle ─────────────────────────────────────────────────────────────

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-card-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ─── CardDescription ───────────────────────────────────────────────────────

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ─── CardContent ───────────────────────────────────────────────────────────

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// ─── CardFooter ────────────────────────────────────────────────────────────

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
