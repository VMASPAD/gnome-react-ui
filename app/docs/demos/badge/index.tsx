
import * as React from "react";
import { Badge } from "@/app/components/badge";
import { CheckCircle2, AlertTriangle, Info, Zap, Star } from "lucide-react";

// ─── Default ───────────────────────────────────────────────────────────────

export function BadgeDefault() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="primary">
        <Zap className="h-2.5 w-2.5" /> Primary
      </Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">
        <CheckCircle2 className="h-2.5 w-2.5" /> Success
      </Badge>
      <Badge variant="warning">
        <AlertTriangle className="h-2.5 w-2.5" /> Warning
      </Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

// ─── All Variants ──────────────────────────────────────────────────────────

export function BadgeVariants() {
  const variants = [
    { variant: "default" as const,     label: "Default" },
    { variant: "primary" as const,     label: "Primary" },
    { variant: "secondary" as const,   label: "Secondary" },
    { variant: "success" as const,     label: "Success" },
    { variant: "warning" as const,     label: "Warning" },
    { variant: "destructive" as const, label: "Destructive" },
    { variant: "outline" as const,     label: "Outline" },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map(({ variant, label }) => (
        <Badge key={variant} variant={variant}>
          {label}
        </Badge>
      ))}
    </div>
  );
}

// ─── Sizes ─────────────────────────────────────────────────────────────────

export function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="primary" size="sm">
        <Star className="h-2 w-2" /> Small
      </Badge>
      <Badge variant="primary" size="md">
        <Star className="h-2.5 w-2.5" /> Medium
      </Badge>
      <Badge variant="primary" size="lg">
        <Star className="h-3 w-3" /> Large
      </Badge>
    </div>
  );
}

// ─── With Icon ─────────────────────────────────────────────────────────────

export function BadgeWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        <CheckCircle2 className="h-2.5 w-2.5" /> Verified
      </Badge>
      <Badge variant="warning">
        <AlertTriangle className="h-2.5 w-2.5" /> Review
      </Badge>
      <Badge variant="primary">
        <Info className="h-2.5 w-2.5" /> New
      </Badge>
      <Badge variant="destructive">
        <Zap className="h-2.5 w-2.5" /> Urgent
      </Badge>
    </div>
  );
}
