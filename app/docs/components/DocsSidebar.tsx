import * as React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import type { DocMeta } from "../lib/docs";
import { DocsSidebarNav } from "./DocsSidebarNav";

// Note: No "use client" directive here. This is a Server Component.
// The interactive filtering and active state is handled by the DocsSidebarNav client island.

export function DocsSidebar({
  docs,
  open,
  onClose,
}: {
  docs: DocMeta[];
  open: boolean;
  onClose: () => void; // passed from DocsShell handler
}) {
  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[17rem] flex-col border-r border-border bg-sidebar transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:z-auto`}
      >
        {/* Logo (Static) */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Image src="/icon.svg" alt="GnomeUI Logo" width={24} height={24} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              GnomeUI
            </span>
          </a>
          <button
            className="rounded-md p-1 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Client Island: Search + Nav List */}
        <DocsSidebarNav docs={docs} onClose={onClose} />

        {/* Footer (Static) */}
        <div className="shrink-0 border-t border-sidebar-border px-4 py-3">
          <p className="text-[10px] text-sidebar-foreground/30">
            {docs.length} components · v1.9.0
          </p>
        </div>
      </aside>
    </>
  );
}
