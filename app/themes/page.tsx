'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Copy, Palette, Sparkles, SwatchBook, Wand2 } from 'lucide-react';
import { AnimatedThemeToggler } from '@/components/animated-theme-toggler';
import { Accordion } from '@/data/components/accordion';

const THEMES = [
  { id: 'default', label: 'Ubuntu Orange', swatch: 'oklch(0.61 0.18 35)' },
  { id: 'cyan', label: 'Cyan / Sky', swatch: 'oklch(0.58 0.16 230)' },
  { id: 'green', label: 'Green', swatch: 'oklch(0.55 0.16 150)' },
  { id: 'red', label: 'Red', swatch: 'oklch(0.55 0.22 25)' },
  { id: 'black', label: 'Black', swatch: 'oklch(0.25 0 0)' },
  { id: 'white', label: 'White', swatch: 'oklch(0.7 0 0)' },
  { id: 'violet', label: 'Violet', swatch: 'oklch(0.5 0.2 300)' },
  { id: 'yellow', label: 'Yellow', swatch: 'oklch(0.72 0.17 80)' },
  { id: 'gray', label: 'Gray', swatch: 'oklch(0.5 0.01 260)' },
  { id: 'rose', label: 'Rose', swatch: 'oklch(0.62 0.19 10)' },
  { id: 'indigo', label: 'Indigo', swatch: 'oklch(0.56 0.17 275)' },
  { id: 'teal', label: 'Teal', swatch: 'oklch(0.6 0.14 195)' },
  { id: 'emerald', label: 'Emerald', swatch: 'oklch(0.58 0.16 165)' },
  { id: 'amber', label: 'Amber', swatch: 'oklch(0.76 0.18 75)' },
  { id: 'fuchsia', label: 'Fuchsia', swatch: 'oklch(0.63 0.22 330)' },
  { id: 'lime', label: 'Lime', swatch: 'oklch(0.78 0.17 135)' },
] as const;
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
type ThemeId = (typeof THEMES)[number]['id'];

const STORAGE_KEY = 'gnome-ui-theme';

function applyTheme(theme: ThemeId) {
  if (theme === 'default') {
    document.documentElement.removeAttribute('data-theme');
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);
}

function resolveThemeId(value: string | null): ThemeId {
  if (!value) return 'default';
  return THEMES.some((theme) => theme.id === value) ? (value as ThemeId) : 'default';
}

export default function ThemesPage() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('default');
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    const htmlTheme = resolveThemeId(document.documentElement.getAttribute('data-theme'));
    const storedTheme = resolveThemeId(localStorage.getItem(STORAGE_KEY));
    const initialTheme = htmlTheme !== 'default' ? htmlTheme : storedTheme;

    setCurrentTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const activeTheme = useMemo(
    () => THEMES.find((theme) => theme.id === currentTheme) ?? THEMES[0],
    [currentTheme],
  );

  const updateTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  };
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
  return (
    <main className="mx-auto min-h-[calc(100vh-3.5rem)] w-full max-w-[1200px] px-4 py-10 md:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Theme Playground
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Choose a preset and inspect how gnome-ui tokens behave across light and dark mode with
            real UI examples.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/docs/theming-and-tokens"
            className="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Theming docs
          </Link>
          <AnimatedThemeToggler />
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {THEMES.map((theme) => {
          const isActive = currentTheme === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => updateTheme(theme.id)}
              className="group rounded-xl border border-border bg-card p-4 text-left transition-all duration-150 hover:border-primary/30 hover:bg-muted"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="h-6 w-6 rounded-full border border-border"
                  style={{ background: theme.swatch }}
                  aria-hidden
                />

                {isActive ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    <Check className="h-3 w-3" />
                    Active
                  </span>
                ) : null}
              </div>

              <p className="text-sm font-semibold text-foreground">{theme.label}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{theme.swatch}</p>
            </button>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Palette className="h-4 w-4 text-primary" />
            Active Token Preview
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            The selected theme updates <code className="font-mono">--primary</code> and related semantic
            tokens globally.
          </p>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 h-2 rounded-full bg-muted">
              <div className="h-2 w-2/3 rounded-full bg-primary" />
            </div>
            <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
              Primary Action
            </button>
            <p className="mt-3 text-sm text-foreground">
              Active preset: <span className="font-semibold">{activeTheme.label}</span>
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Component Examples
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">Buttons, badges, cards, alerts, and links powered only by semantic tokens.</p>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Primary</button>
              <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground">Secondary</button>
              <button className="rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">Muted</button>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-medium">
              <span className="rounded-full border border-primary/35 bg-primary/10 px-2 py-0.5 text-primary">primary</span>
              <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-foreground">neutral</span>
              <span className="rounded-full border border-[oklch(0.55_0.18_25)]/25 bg-[oklch(0.55_0.18_25)]/15 text-[oklch(0.65_0.18_25)]">destructive</span>
              <span className="rounded-full border border-[oklch(0.55_0.16_150)]/25 bg-[oklch(0.55_0.16_150)]/15 text-[oklch(0.65_0.18_150)]">success</span>
            </div>

            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-xs font-semibold text-foreground">Tokenized Card</p>
              <p className="mt-1 text-xs text-muted-foreground">This surface inherits border, muted text, and focus ring from global token variables.</p>
              <a href="#" className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline">Read docs</a>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
            <SwatchBook className="h-4 w-4 text-primary" />
            Token Ramp
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">Quick visual pass of your active semantic colors.</p>

          <div className="space-y-3 text-xs">
            <div>
              <p className="mb-1 text-muted-foreground">primary</p>
              <div className="h-8 rounded-lg border border-border bg-primary" />
            </div>
            <div>
              <p className="mb-1 text-muted-foreground">accent</p>
              <div className="h-8 rounded-lg border border-border bg-accent" />
            </div>
            <div>
              <p className="mb-1 text-muted-foreground">muted</p>
              <div className="h-8 rounded-lg border border-border bg-muted" />
            </div>
            <div>
              <p className="mb-1 text-muted-foreground">card</p>
              <div className="h-8 rounded-lg border border-border bg-card" />
            </div>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-2 text-lg font-semibold text-foreground">Quick Apply Snippet</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Store and re-apply the chosen preset with <code className="font-mono">data-theme</code>.
          </p>

          <pre className="overflow-x-auto rounded-xl border border-border bg-[oklch(0.18_0.02_330)] p-4 text-xs text-white/90">
            <code>{`const selected = "${activeTheme.id}";
document.documentElement.setAttribute("data-theme", selected);
localStorage.setItem("gnome-ui-theme", selected);`}</code>
          </pre>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Wand2 className="h-4 w-4 text-primary" />
            Theme Usage Examples
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">Reference snippets for app shell, callouts, and code surfaces.</p>

          <div className="space-y-3 text-xs font-mono">
            <div className="rounded-lg border border-border bg-background p-3 text-muted-foreground">
              {`<main className="bg-background text-foreground" />`}
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-muted-foreground">
              {`<button className="bg-primary text-primary-foreground" />`}
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-muted-foreground">
              {`<div className="border border-border bg-card" />`}
            </div>
          </div>
        </article>
        
      </section>
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
    </main>
  );
}
function PreviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">{title}</h4>
      <div className="flex flex-col items-start">{children}</div>
    </div>
  );
}