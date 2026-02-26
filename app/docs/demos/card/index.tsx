"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/card";
import { ArrowRight, Star, FileText, Settings } from "lucide-react";

// ─── Default ───────────────────────────────────────────────────────────────

export function CardDefault() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
        <CardDescription>
          Browse and manage your local files with a familiar GNOME interface.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Drag and drop files, create archives, and connect to remote servers
          seamlessly.
        </p>
      </CardContent>
      <CardFooter>
        <a
          href="#"
          className="text-xs font-semibold text-primary flex items-center gap-1 hover:translate-x-1 transition-transform duration-150"
        >
          Open Files <ArrowRight className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
}

// ─── Variants ──────────────────────────────────────────────────────────────

export function CardVariants() {
  const variants = [
    {
      variant: "default" as const,
      label: "Default",
      icon: FileText,
      desc: "Standard card with a subtle shadow.",
    },
    {
      variant: "ghost" as const,
      label: "Ghost",
      icon: Star,
      desc: "Transparent background, hover accent.",
    },
    {
      variant: "outlined" as const,
      label: "Outlined",
      icon: Settings,
      desc: "Thicker border, highlights on hover.",
    },
    {
      variant: "filled" as const,
      label: "Filled",
      icon: Star,
      desc: "Tinted primary background.",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4">
      {variants.map(({ variant, label, icon: Icon, desc }) => (
        <Card key={variant} variant={variant} className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              {label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </Card>
      ))}
    </div>
  );
}

// ─── With Footer ───────────────────────────────────────────────────────────

export function CardWithFooter() {
  return (
    <Card className="w-72 overflow-hidden">
      {/* Colored accent bar at top */}
      <div className="h-1 bg-primary w-full" />
      <CardHeader>
        <CardTitle>GNOME Settings</CardTitle>
        <CardDescription>Personalise your desktop experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {["Appearance", "Privacy", "Network"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-lg px-3 py-2 bg-muted/50 hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <span className="text-sm font-medium text-foreground">{item}</span>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t border-border justify-end">
        <span className="text-xs text-muted-foreground">3 sections</span>
      </CardFooter>
    </Card>
  );
}
