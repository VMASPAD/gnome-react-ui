"use client"
import { useState, useEffect, useSyncExternalStore } from "react";
import { Palette, Check, ArrowLeft, Copy, ChevronDown } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "../ui/AnimatedThemeToggler";
import { Accordion } from "@/app/components/accordion";

/* ── Demo components (real UI library components) ──────────────────────── */
import { ButtonDefault, ButtonSizes } from "@/app/docs/demos/button/index";
import { SliderDefault } from "@/app/docs/demos/slider/index";
import { CheckboxDefault } from "@/app/docs/demos/checkbox/index";
import { SwitchDefault, SwitchWithIcons } from "@/app/docs/demos/switch/index";
import { SelectDefault } from "@/app/docs/demos/select/index";
import { CardDefault } from "@/app/docs/demos/card/index";
import { BadgeDefault, BadgeVariants } from "@/app/docs/demos/badge/index";
import { InputDefault } from "@/app/docs/demos/input/index";
import { ProgressDefault } from "@/app/docs/demos/progress/index";
import { RadioGroupBasic } from "@/app/docs/demos/radio/index";
import { TabsPill } from "@/app/docs/demos/tabs/index";
import { ToggleGroupSingle } from "@/app/docs/demos/toggle/index";
import { AlertNormal } from "@/app/docs/demos/alert/index";
import { BreadcrumbDefault } from "@/app/docs/demos/breadcrumb/index";
import { PaginationDefault } from "@/app/docs/demos/pagination/index";

/* ─── Theme definitions ──────────────────────────────────────────────────── */
const THEMES = [
  { id: "default", label: "Ubuntu Orange", swatch: "oklch(0.61 0.18 35)" },
  { id: "cyan",    label: "Cyan / Sky",    swatch: "oklch(0.58 0.16 230)" },
  { id: "green",   label: "Green",         swatch: "oklch(0.55 0.16 150)" },
  { id: "red",     label: "Red",           swatch: "oklch(0.55 0.22 25)" },
  { id: "black",   label: "Black",         swatch: "oklch(0.25 0 0)" },
  { id: "white",   label: "White",         swatch: "oklch(0.7 0 0)" },
  { id: "violet",  label: "Violet",        swatch: "oklch(0.5 0.2 300)" },
  { id: "yellow",  label: "Yellow",        swatch: "oklch(0.72 0.17 80)" },
  { id: "gray",    label: "Gray",          swatch: "oklch(0.5 0.01 260)" },
] as const;

const THEME_COLORS_CODE = [
  "const themeColors = {",
  ...THEMES.map((t) => `  ${t.id}: \"${t.swatch}\",`),
  "} as const"
].join("\n")

const DOC_STYLE_SNIPPETS = [
  {
    id: "button",
    title: "Button",
    description: "Primary/secondary action styles with tokenized states",
    code: [
      'const styleButton = "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"',
      'const styleButtonGhost = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"'
    ].join("\n")
  },
  {
    id: "badge",
    title: "Badge",
    description: "Compact status chips using semantic surface tokens",
    code: [
      'const styleBadge = "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground"',
      'const styleBadgeAccent = "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"'
    ].join("\n")
  },
  {
    id: "input",
    title: "Input",
    description: "Form input base with focus ring and muted placeholder",
    code: [
      'const styleInput = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"'
    ].join("\n")
  },
  {
    id: "card",
    title: "Card",
    description: "Container surfaces for content previews",
    code: [
      'const styleCard = "rounded-2xl border border-border bg-card text-card-foreground shadow-sm"',
      'const styleCardHeader = "border-b border-border/70 px-5 py-4"',
      'const styleCardContent = "px-5 py-4"'
    ].join("\n")
  },
  {
    id: "slider",
    title: "Slider",
    description: "Track/range/thumb styles with smooth motion",
    code: [
      'const styleSliderRoot = "relative flex w-full touch-none select-none items-center"',
      'const styleSliderTrack = "relative h-1.5 w-full rounded-full bg-muted"',
      'const styleSliderRange = "absolute h-full rounded-full bg-primary transition-[width] duration-150 ease-out"',
      'const styleSliderThumb = "block h-4 w-4 rounded-full border border-primary/30 bg-background shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring"'
    ].join("\n")
  },
  {
    id: "progress",
    title: "Progress",
    description: "Progress bar primitives with tokenized indicator",
    code: [
      'const styleProgressRoot = "h-2 w-full overflow-hidden rounded-full bg-muted"',
      'const styleProgressIndicator = "h-full bg-primary transition-[transform,width] duration-300 ease-out"'
    ].join("\n")
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "Checkbox control + checked state tokens",
    code: [
      'const styleCheckbox = "peer h-4 w-4 shrink-0 rounded-[4px] border border-input bg-background text-primary transition-colors duration-150 data-checked:bg-primary data-checked:text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"',
      'const styleCheckboxLabel = "text-sm text-foreground peer-disabled:opacity-70"'
    ].join("\n")
  },
  {
    id: "switch",
    title: "Switch",
    description: "Track + thumb motion with checked color transitions",
    code: [
      'const styleSwitch = "relative inline-flex h-6 w-11 items-center rounded-full border border-transparent bg-muted transition-colors duration-200 data-checked:bg-primary focus-visible:outline-2 focus-visible:outline-ring"',
      'const styleSwitchThumb = "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm transition-transform duration-200 data-checked:translate-x-5"'
    ].join("\n")
  },
  {
    id: "select",
    title: "Select",
    description: "Trigger, popup and item state classes",
    code: [
      'const styleSelectTrigger = "inline-flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-ring"',
      'const styleSelectPopup = "rounded-xl border border-border bg-popover text-popover-foreground shadow-md transition-[opacity,transform] duration-150 ease-out data-starting-style:opacity-0 data-starting-style:translate-y-1 data-ending-style:opacity-0 data-ending-style:translate-y-1"',
      'const styleSelectItem = "relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors data-highlighted:bg-accent data-highlighted:text-accent-foreground"'
    ].join("\n")
  },
  {
    id: "radio-group",
    title: "Radio Group",
    description: "Radio item + indicator semantic styles",
    code: [
      'const styleRadioItem = "h-4 w-4 rounded-full border border-input bg-background text-primary transition-colors data-checked:border-primary focus-visible:outline-2 focus-visible:outline-ring"',
      'const styleRadioIndicator = "flex items-center justify-center text-primary"',
      'const styleRadioLabel = "text-sm text-foreground"'
    ].join("\n")
  },
  {
    id: "tabs",
    title: "Tabs",
    description: "Pill tabs with selected state tokens",
    code: [
      'const styleTabsList = "inline-flex h-10 items-center rounded-lg border border-border bg-muted/40 p-1"',
      'const styleTabsTrigger = "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-150 data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm focus-visible:outline-2 focus-visible:outline-ring"',
      'const styleTabsPanel = "rounded-xl border border-border bg-card p-4 text-foreground"'
    ].join("\n")
  },
  {
    id: "toggle-group",
    title: "Toggle Group",
    description: "Single/multiple toggle buttons with selected tokens",
    code: [
      'const styleToggle = "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-selected:bg-primary data-selected:text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring"'
    ].join("\n")
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    description: "Dialog surface + title/description token pair",
    code: [
      'const styleAlertDialogContent = "rounded-xl border border-border bg-card p-4 text-foreground shadow-sm"',
      'const styleAlertDialogTitle = "text-base font-semibold text-foreground"',
      'const styleAlertDialogDescription = "text-sm text-muted-foreground"'
    ].join("\n")
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    description: "Navigation trail typography and hover states",
    code: [
      'const styleBreadcrumbList = "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"',
      'const styleBreadcrumbLink = "transition-colors hover:text-foreground"',
      'const styleBreadcrumbCurrent = "font-medium text-foreground"'
    ].join("\n")
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Pagination controls with active/hover token states",
    code: [
      'const stylePaginationItem = "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"',
      'const stylePaginationActive = "border-primary/30 bg-primary/10 text-primary"'
    ].join("\n")
  },
  {
    id: "accordion",
    title: "Accordion",
    description: "Core accordion classes with panel height animation",
    code: [
      'const styleAccordion = "rounded-xl border border-border bg-card text-foreground shadow-sm"',
      'const styleAccordionTrigger = "group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-accent/60 focus-visible:outline-2 focus-visible:outline-ring data-panel-open:bg-primary/8"',
      'const styleAccordionPanel = "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0"'
    ].join("\n")
  },
  {
    id: "token-colors",
    title: "Tokenized colors",
    description: "Shared semantic tokens used in all component styles",
    code: [
      'const styleTokensSurface = "bg-background bg-card bg-popover border-border"',
      'const styleTokensText = "text-foreground text-muted-foreground text-primary text-destructive"',
      'const styleTokensState = "bg-accent text-accent-foreground bg-primary text-primary-foreground"',
      'const styleFocusRing = "focus-visible:outline-2 focus-visible:outline-ring focus-visible:rounded"'
    ].join("\n")
  }
] as const

type ThemeId = (typeof THEMES)[number]["id"];

const LS_KEY = "gnome-ui-theme";

const subscribeHydration = () => () => {};

function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") {
    return "default";
  }

  const stored = localStorage.getItem(LS_KEY) as ThemeId | null;
  if (stored && THEMES.some((t) => t.id === stored)) {
    return stored;
  }

  return "default";
}

function useHydrated() {
  return useSyncExternalStore(subscribeHydration, () => true, () => false);
}

function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(LS_KEY, theme);
  }, [theme]);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
  };

  return { theme, setTheme };
}

function applyTheme(id: ThemeId) {
  const html = document.documentElement;
  if (id === "default") {
    html.removeAttribute("data-theme");
  } else {
    html.setAttribute("data-theme", id);
  }
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ThemesPage() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0]
  const activeThemeCode = [
    "const activeTheme = {",
    `  id: \"${activeTheme.id}\",`,
    `  label: \"${activeTheme.label}\",`,
    `  primary: \"${activeTheme.swatch}\",`,
    "}"
  ].join("\n")

  const copyText = async (key: string, text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = text
        textarea.setAttribute("readonly", "")
        textarea.style.position = "absolute"
        textarea.style.left = "-9999px"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }

      setCopiedKey(key)
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev))
      }, 1600)
    } catch {
      setCopiedKey(null)
    }
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <h1 className="text-sm font-semibold">Themes</h1>
            </div>
          </div>
          <AnimatedThemeToggler />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* ── Intro ──────────────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Color Themes</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
            Choose a primary accent color that applies globally to every component.
          </p>
        </div>

        {/* ── Theme picker ──────────────────────────────────────────── */}
        <section className="mb-14">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Select a theme</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`group relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200 ${
                    active
                      ? "border-primary bg-primary/5 shadow-sm shadow-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/3"
                  }`}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-inner transition-transform group-hover:scale-110"
                    style={{ background: t.swatch }}
                  >
                    {active && <Check className="h-3.5 w-3.5 text-white drop-shadow" strokeWidth={3} />}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">{t.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Theme color code (copy) ─────────────────────────────── */}
        <section className="mb-14">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Copy color code</h3>
          <PreviewCard title="Theme tokens (copy ready)">
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              Copy the active theme token or the full map to reuse the same palette in docs, demos, or app pages.
            </p>

            <div className="w-full space-y-4">
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Active theme</span>
                  <button
                    type="button"
                    onClick={() => copyText("active-theme", activeThemeCode)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copiedKey === "active-theme" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto px-3 py-3 font-mono text-[12px] leading-relaxed text-muted-foreground">
                  {activeThemeCode}
                </pre>
              </div>

              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">All themes map</span>
                  <button
                    type="button"
                    onClick={() => copyText("all-themes", THEME_COLORS_CODE)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copiedKey === "all-themes" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto px-3 py-3 font-mono text-[12px] leading-relaxed text-muted-foreground">
                  {THEME_COLORS_CODE}
                </pre>
              </div>
            </div>
          </PreviewCard>
        </section>

        {/* ── Live Component Previews ───────────────────────────────── */}
        <section>
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Live component preview</h3>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* ── Buttons ──────────────────────────────────────────── */}
            <PreviewCard title="Buttons">
              <ButtonDefault />
              <div className="mt-4">
                <ButtonSizes />
              </div>
            </PreviewCard>

            {/* ── Badges ───────────────────────────────────────────── */}
            <PreviewCard title="Badges">
              <BadgeDefault />
              <div className="mt-3">
                <BadgeVariants />
              </div>
            </PreviewCard>

            {/* ── Input ────────────────────────────────────────────── */}
            <PreviewCard title="Input">
              <InputDefault />
            </PreviewCard>

            {/* ── Card ─────────────────────────────────────────────── */}
            <PreviewCard title="Card">
              <CardDefault />
            </PreviewCard>

            {/* ── Slider ───────────────────────────────────────────── */}
            <PreviewCard title="Slider">
              <SliderDefault />
            </PreviewCard>

            {/* ── Progress ─────────────────────────────────────────── */}
            <PreviewCard title="Progress">
              <ProgressDefault />
            </PreviewCard>

            {/* ── Checkbox & Switch ─────────────────────────────────── */}
            <PreviewCard title="Checkbox & Switch">
              <div className="flex flex-col gap-5">
                <CheckboxDefault />
                <SwitchDefault />
                <SwitchWithIcons />
              </div>
            </PreviewCard>

            {/* ── Select ───────────────────────────────────────────── */}
            <PreviewCard title="Select">
              <SelectDefault />
            </PreviewCard>

            {/* ── Radio ────────────────────────────────────────────── */}
            <PreviewCard title="Radio Group">
              <RadioGroupBasic />
            </PreviewCard>

            {/* ── Tabs ─────────────────────────────────────────────── */}
            <PreviewCard title="Tabs">
              <TabsPill />
            </PreviewCard>

            {/* ── Toggle ───────────────────────────────────────────── */}
            <PreviewCard title="Toggle Group">
              <ToggleGroupSingle />
            </PreviewCard>

            {/* ── Alert ────────────────────────────────────────────── */}
            <PreviewCard title="Alert Dialog">
              <AlertNormal />
            </PreviewCard>

            {/* ── Breadcrumb ───────────────────────────────────────── */}
            <PreviewCard title="Breadcrumb">
              <BreadcrumbDefault />
            </PreviewCard>

            {/* ── Pagination ───────────────────────────────────────── */}
            <PreviewCard title="Pagination">
              <PaginationDefault />
            </PreviewCard>
          </div>
        </section>

        {/* ── Docs style snippets ───────────────────────────────────── */}
        <section className="mt-14">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Docs style snippets</h3>
          <PreviewCard title="All components style constants">
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              Copy-ready snippets for all components in this page, focused on tokenized colors and key interaction/animation classes.
            </p>

            <Accordion.Root
              multiple
              defaultValue={[DOC_STYLE_SNIPPETS[0].id]}
              className="w-full overflow-hidden rounded-xl border border-border"
            >
              {DOC_STYLE_SNIPPETS.map((snippet) => (
                <Accordion.Item
                  key={snippet.id}
                  value={snippet.id}
                  className="border-b border-border last:border-b-0"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center gap-3 bg-background px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-ring">
                      <div>
                        <p className="text-sm font-medium text-foreground">{snippet.title}</p>
                        <p className="text-xs text-muted-foreground">{snippet.description}</p>
                      </div>
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-data-panel-open:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
                    <div className="border-t border-border/60 bg-muted/20 p-3">

                      <pre className="overflow-x-auto rounded-md border border-border bg-background px-3 py-2 font-mono text-[12px] leading-relaxed text-muted-foreground">
                        {snippet.code}
                      </pre>
                        <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => copyText(`snippet-${snippet.id}`, snippet.code)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          {copiedKey === `snippet-${snippet.id}` ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </PreviewCard>
        </section>
      </main>
    </div>
  );
}

/* ─── PreviewCard ─────────────────────────────────────────────────────────── */
function PreviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">{title}</h4>
      <div className="flex flex-col items-start">{children}</div>
    </div>
  );
}
