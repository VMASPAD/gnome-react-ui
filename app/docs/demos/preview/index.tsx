"use client";

import * as React from "react";
import { PreviewCard } from "@/app/components/preview-card";
import { ExternalLink, Star, GitFork, Eye } from "lucide-react";

// ─── Shared styles ────────────────────────────────────────────────────────────

const popupCls =
  "z-50 w-72 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-lg outline-none " +
  "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out " +
  "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 " +
  "data-[starting-style]:opacity-0 data-[starting-style]:scale-95";

const positionerCls = "outline-none";

const linkCls =
  "font-medium text-primary underline underline-offset-2 decoration-primary/40 " +
  "hover:decoration-primary transition-[text-decoration-color] duration-150 outline-none " +
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-sm";

// ─── 1. Basic Preview Card ────────────────────────────────────────────────────
// Inline link within a paragraph — canonical use case

export function PreviewCardBasic() {
  return (
    <p className="max-w-sm text-sm text-foreground leading-relaxed">
      The principles of good{" "}
      <PreviewCard.Root>
        <PreviewCard.Trigger
          className={linkCls}
          href="https://en.wikipedia.org/wiki/Typography"
          target="_blank"
        >
          typography
        </PreviewCard.Trigger>
        <PreviewCard.Portal>
          <PreviewCard.Positioner className={positionerCls} sideOffset={8}>
            <PreviewCard.Popup className={popupCls}>
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=576&h=240&fit=crop"
                alt="Station Hofplein signage in Rotterdam"
                width={288}
                height={120}
                className="w-full object-cover"
              />
              {/* Content */}
              <div className="p-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground leading-none">
                    Typography
                  </p>
                  <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The art and science of arranging type to make written language
                  legible, readable, and appealing.
                </p>
              </div>
            </PreviewCard.Popup>
          </PreviewCard.Positioner>
        </PreviewCard.Portal>
      </PreviewCard.Root>{" "}
      remain essential in the digital age.
    </p>
  );
}

// ─── 2. Multiple Triggers with Payload ───────────────────────────────────────
// A single PreviewCard.Root with handle, multiple triggers in the text
// Each trigger passes its own payload — recommended pattern from docs

type RepoPayload = {
  name: string;
  description: string;
  stars: string;
  forks: string;
  watchers: string;
  language: string;
  languageColor: string;
};

const repos: Record<string, RepoPayload> = {
  react: {
    name: "facebook/react",
    description:
      "The library for web and native user interfaces. Declarative, efficient, and flexible.",
    stars: "224k",
    forks: "45.8k",
    watchers: "6.7k",
    language: "JavaScript",
    languageColor: "#f1e05a",
  },
  tailwind: {
    name: "tailwindlabs/tailwindcss",
    description:
      "A utility-first CSS framework for rapid UI development with any design.",
    stars: "82.1k",
    forks: "4.1k",
    watchers: "1.2k",
    language: "CSS",
    languageColor: "#563d7c",
  },
  baseui: {
    name: "mui/base-ui",
    description:
      "Unstyled React components and hooks for building fully customizable design systems.",
    stars: "2.1k",
    forks: "198",
    watchers: "312",
    language: "TypeScript",
    languageColor: "#3178c6",
  },
};

const multiHandle = PreviewCard.createHandle<RepoPayload>();

export function PreviewCardMultipleTriggers() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Hover a repo to preview it:</p>
      <p className="max-w-sm text-sm text-foreground leading-relaxed">
        Popular open source projects include{" "}
        <PreviewCard.Trigger
          className={linkCls}
          handle={multiHandle}
          href="https://github.com/facebook/react"
          target="_blank"
          payload={repos.react}
        >
          React
        </PreviewCard.Trigger>
        ,{" "}
        <PreviewCard.Trigger
          className={linkCls}
          handle={multiHandle}
          href="https://github.com/tailwindlabs/tailwindcss"
          target="_blank"
          payload={repos.tailwind}
        >
          Tailwind CSS
        </PreviewCard.Trigger>
        , and{" "}
        <PreviewCard.Trigger
          className={linkCls}
          handle={multiHandle}
          href="https://github.com/mui/base-ui"
          target="_blank"
          payload={repos.baseui}
        >
          Base UI
        </PreviewCard.Trigger>
        .
      </p>

      <PreviewCard.Root handle={multiHandle}>
        {({ payload }) => (
          <PreviewCard.Portal>
            <PreviewCard.Positioner className={positionerCls} sideOffset={8}>
              <PreviewCard.Popup className={popupCls}>
                {payload !== undefined && (
                  <div className="p-4 space-y-3">
                    {/* Repo name */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {payload.name}
                      </p>
                      <ExternalLink className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {payload.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-0.5">
                      {/* Language */}
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          className="size-3 rounded-full shrink-0"
                          style={{ backgroundColor: payload.languageColor }}
                        />
                        {payload.language}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3.5" />
                        {payload.stars}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <GitFork className="size-3.5" />
                        {payload.forks}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="size-3.5" />
                        {payload.watchers}
                      </span>
                    </div>
                  </div>
                )}
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        )}
      </PreviewCard.Root>
    </div>
  );
}