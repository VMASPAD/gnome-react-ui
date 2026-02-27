"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu as MenuIcon } from "lucide-react";
import { AnimatedThemeToggler } from "../../ui/AnimatedThemeToggler";

/** Convert a slug like "alert-dialog" → "Alert Dialog" */
function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function DocsTopbar({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const pathname = usePathname();
  // Extract slug from /docs/[slug]
  const slug = pathname?.split("/").pop() ?? "";
  const label = slug ? slugToLabel(slug) : "Docs";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="-ml-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        >
          <MenuIcon size={18} />
        </button>
        <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
          <span className="text-muted-foreground">Docs</span>
          <ChevronRight size={13} className="text-border" />
          <span className="font-medium text-foreground">{label}</span>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <AnimatedThemeToggler />
        <a
          href="https://github.com/VMASPAD/gnome-react-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
