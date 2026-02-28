"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import type { DocMeta } from "../lib/docs";

export function DocsSidebarNav({
  docs,
  onClose,
}: {
  docs: DocMeta[];
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [search, setSearch] = React.useState("");

  const filtered = docs.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
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

      {/* Nav List */}
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
    </>
  );
}
