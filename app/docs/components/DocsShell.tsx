"use client";

import * as React from "react";
import { DocsSidebar } from "./DocsSidebar";
import { DocsTopbar } from "./DocsTopbar";
import type { DocMeta } from "../lib/docs";

/**
 * Client island — manages sidebar open/close state only.
 * DocsTopbar is rendered here directly so we can pass onOpenSidebar
 * as a regular prop (no cloneElement needed).
 */
export function DocsShell({
  docs,
  children,
}: {
  docs: DocMeta[];
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <DocsSidebar
        docs={docs}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DocsTopbar onOpenSidebar={() => setSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}
