"use client";
import * as React from "react";
import { ScrollArea } from "@/app/components/scroll-area";

// ─── Shared styles ────────────────────────────────────────────────────────────

const scrollbarCls =
  "flex touch-none select-none rounded-full p-px transition-colors duration-150 " +
  "data-[orientation=vertical]:w-2 data-[orientation=vertical]:flex-col " +
  "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-row " +
  "hover:bg-border/50";

const thumbCls =
  "relative flex-1 rounded-full bg-border " +
  "transition-colors duration-150 hover:bg-muted-foreground/50";

const cornerCls = "bg-muted";

// ─── 1. ScrollAreaVertical ────────────────────────────────────────────────────
// Basic case — long text with vertical scrollbar

const loremParagraphs = [
  "Vernacular architecture is building done outside any academic tradition, and without professional guidance. It is not a particular architectural movement or style, but rather a broad category, encompassing a wide range and variety of building types.",
  "This type of architecture usually serves immediate, local needs, is constrained by the materials available in its particular region and reflects local traditions and cultural practices.",
  "The study of vernacular architecture does not examine formally schooled architects, but instead that of the design skills and tradition of local builders, who were rarely given any attribution for the work.",
  "More recently, vernacular architecture has been examined by designers and the building industry in an effort to be more energy conscious with contemporary design and construction — part of a broader interest in sustainable design.",
  "Vernacular architecture constitutes 95% of the world's built environment, as estimated in 1995 by Amos Rapoport, as measured against the small percentage of new buildings designed by architects every year.",
];

export function ScrollAreaVertical() {
  return (
    <ScrollArea.Root className="relative h-48 w-80 rounded-xl border border-border bg-card overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full">
        <ScrollArea.Content className="px-4 py-3">
          {loremParagraphs.map((text, i) => (
            <p
              key={i}
              className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0"
            >
              {text}
            </p>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={scrollbarCls} orientation="vertical">
        <ScrollArea.Thumb className={thumbCls} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

// ─── 2. ScrollAreaBothAxes ────────────────────────────────────────────────────
// Horizontal + vertical with Corner — wide table as a real use case

const tableHeaders = ["Name", "Role", "Department", "Location", "Status", "Joined", "Manager"];
const tableRows = [
  ["Alice Müller", "Senior Engineer", "Platform", "Berlin", "Active", "Jan 2021", "Tomás R."],
  ["Bruno Carvalho", "Product Manager", "Growth", "São Paulo", "Active", "Mar 2020", "Sarah L."],
  ["Chloé Martin", "Designer", "Brand", "Paris", "On leave", "Jul 2022", "Nina K."],
  ["Dmitri Volkov", "Data Scientist", "Analytics", "Remote", "Active", "Nov 2019", "James W."],
  ["Emre Yildiz", "DevOps Engineer", "Infra", "Istanbul", "Active", "Feb 2023", "Alice M."],
  ["Fatima Hassan", "QA Engineer", "Quality", "Cairo", "Inactive", "Sep 2021", "Bruno C."],
  ["Grace Nakamura", "Tech Lead", "Platform", "Tokyo", "Active", "Apr 2018", "Dmitri V."],
];

export function ScrollAreaBothAxes() {
  return (
    <ScrollArea.Root className="relative h-52 w-96 rounded-xl border border-border bg-card overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full">
        <ScrollArea.Content className="min-w-max">
          <table className="text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {tableHeaders.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors duration-100"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 py-2.5 text-foreground whitespace-nowrap"
                    >
                      {j === 4 ? (
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                            (cell === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : cell === "On leave"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-muted text-muted-foreground")
                          }
                        >
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={scrollbarCls} orientation="vertical">
        <ScrollArea.Thumb className={thumbCls} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className={scrollbarCls} orientation="horizontal">
        <ScrollArea.Thumb className={thumbCls} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={cornerCls} />
    </ScrollArea.Root>
  );
}

// ─── 3. ScrollAreaCodeBlock ───────────────────────────────────────────────────
// Horizontal scroll in code block — very common use case

const codeLines = [
  `import { ScrollArea } from "@base-ui-components/react/scroll-area";`,
  ``,
  `export function ScrollAreaExample() {`,
  `  return (`,
  `    <ScrollArea.Root className="h-48 w-full rounded-xl border border-border">`,
  `      <ScrollArea.Viewport className="h-full w-full">`,
  `        <ScrollArea.Content className="min-w-max p-4">`,
  `          {/* Your content here */}`,
  `        </ScrollArea.Content>`,
  `      </ScrollArea.Viewport>`,
  `      <ScrollArea.Scrollbar orientation="vertical">`,
  `        <ScrollArea.Thumb />`,
  `      </ScrollArea.Scrollbar>`,
  `      <ScrollArea.Scrollbar orientation="horizontal">`,
  `        <ScrollArea.Thumb />`,
  `      </ScrollArea.Scrollbar>`,
  `      <ScrollArea.Corner />`,
  `    </ScrollArea.Root>`,
  `  );`,
  `}`,
];

export function ScrollAreaCodeBlock() {
  return (
    <ScrollArea.Root className="relative w-96 rounded-xl border border-border bg-[#1e1e2e] overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full max-h-52">
        <ScrollArea.Content className="min-w-max">
          <pre className="p-4 text-xs font-mono leading-relaxed">
            {codeLines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-4 w-6 shrink-0 text-right text-[#6c7086] select-none">
                  {i + 1}
                </span>
                <span className="text-[#cdd6f4]">{line || "\u00A0"}</span>
              </div>
            ))}
          </pre>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className={
          "flex touch-none select-none rounded-full p-px transition-colors duration-150 " +
          "data-[orientation=vertical]:w-2 data-[orientation=vertical]:flex-col " +
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-row " +
          "hover:bg-white/10"
        }
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className={
          "flex touch-none select-none rounded-full p-px transition-colors duration-150 " +
          "data-[orientation=vertical]:w-2 data-[orientation=vertical]:flex-col " +
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-row " +
          "hover:bg-white/10"
        }
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-[#1e1e2e]" />
    </ScrollArea.Root>
  );
}