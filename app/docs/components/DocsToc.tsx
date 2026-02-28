"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import type { Heading } from "../lib/docs";

/** Client island — only the IntersectionObserver scroll tracking needs the browser. */
export function DocsToc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = React.useState("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveId(e.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    document
      .querySelectorAll("h1[id],h2[id],h3[id],h4[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden w-56 shrink-0 overflow-y-auto border-l border-border bg-background py-10 pl-5 pr-4 xl:block">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
        On this page
      </p>
      <nav>
        <ul className="space-y-0.5">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block rounded py-1 text-xs leading-relaxed transition-colors duration-100 ${
                    h.level === 3 ? "pl-3" : "pl-0"
                  } ${
                    isActive
                      ? "font-medium text-primary"
                      : "text-muted-foreground/70 hover:text-foreground"
                  }`}
                >
                  {h.level === 3 && (
                    <ChevronRight
                      size={10}
                      className="mr-1 inline-block -mt-px opacity-40"
                    />
                  )}
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
