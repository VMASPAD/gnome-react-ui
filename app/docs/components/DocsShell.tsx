"use client";
import * as React from "react";
import { DocsSidebar } from "./DocsSidebar";
import type { DocMeta } from "../lib/docs";

export function DocsShell({
  docs,
  topbar,
  children,
}: {
  docs: DocMeta[];
  topbar: React.ReactNode;
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
        {/* Topbar receives a setter so the hamburger can open the sidebar */}
        {React.isValidElement(topbar)
          ? React.cloneElement(topbar as React.ReactElement<{ onOpenSidebar?: () => void }>, {
              onOpenSidebar: () => setSidebarOpen(true),
            })
          : topbar}
        {children}
      </div>
    </div>
  );
}
