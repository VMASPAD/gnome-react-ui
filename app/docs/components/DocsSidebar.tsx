"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import Image from "next/image";
import type { DocMeta } from "../lib/docs";

export function DocsSidebar({
  docs,
  open,
  onClose,
}: {
  docs: DocMeta[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [search, setSearch] = React.useState("");

  const filtered = docs.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase())
  );

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
        {/* Logo */}
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

        {/* Search */}
        <div className="shrink-0 px-3 pt-3 pb-2">
          <div className="relative">
            <Search
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sidebar-foreground/40"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components…"
              className="w-full rounded-md border border-sidebar-border bg-background py-1.5 pl-8 pr-3 text-xs text-sidebar-foreground placeholder:text-sidebar-foreground/40 outline-none transition-shadow focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>

        <div className="shrink-0 px-4 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Components
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-6">
          <ul className="space-y-px">
            {filtered.map((doc) => {
              const isActive = pathname === `/docs/${doc.slug}`;
              return (
                <li key={doc.slug}>
                  <a
                    href={`/docs/${doc.slug}`}
                    onClick={onClose}
                    className={`group flex w-full items-center justify-between rounded-md px-3 py-1.5 text-[13px] transition-colors duration-100 ${
                      isActive
                        ? "bg-sidebar-accent font-medium text-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                  >
                    <span>{doc.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </a>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-8 text-center text-xs text-sidebar-foreground/40">
                No components found
              </li>
            )}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-sidebar-border px-4 py-3">
          <p className="text-[10px] text-sidebar-foreground/30">
            {docs.length} components · v1.9.0
          </p>
        </div>
      </aside>
    </>
  );
}
