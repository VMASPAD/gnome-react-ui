"use client";
import { useState, useEffect } from "react";
import { Palette, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "../ui/AnimatedThemeToggler";

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

type ThemeId = (typeof THEMES)[number]["id"];

const LS_KEY = "gnome-ui-theme";

function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(LS_KEY) as ThemeId | null;
    if (stored && THEMES.some((t) => t.id === stored)) {
      setThemeState(stored);
      applyTheme(stored);
    }
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem(LS_KEY, id);
    applyTheme(id);
  };

  return { theme, setTheme, mounted };
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
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
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
            Your preference is saved in <code className="rounded border border-border/60 bg-muted px-1 py-0.5 text-[0.8em] font-mono">localStorage</code> and loaded automatically.
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
