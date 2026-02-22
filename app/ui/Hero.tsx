import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../components";

export default function Hero() {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div className="container flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <a
          data-slot="badge"
          data-variant="secondary"
          className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-secondary-foreground [a&amp;]:hover:bg-secondary/90 bg-muted"
          href="/docs/changelog/2026-01-rtl"
        >
          RTL Support{" "}
          <ArrowRight className="size-4" />
        </a>
        <h1 className="text-primary leading-tighter text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
          GNOME React UI
        </h1>
        <p className="text-foreground max-w-4xl text-base text-balance sm:text-lg">
          A new React component library built with Base UI and Tailwind CSS, designed to bring the elegance of GNOME's design system to the web.
        </p>
        <div className="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none">
          <a
            data-slot="button"
            data-variant="default"
            data-size="sm"
            href="/docs/installation"
          >
            <Button className={""}>
            Get Started
            </Button>
          </a>
          <a
            data-slot="button"
            data-variant="ghost"
            data-size="sm"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 gap-1.5 px-3 has-[&gt;svg]:px-2.5 rounded-lg"
            href="/docs/components"
          >
            View Components
          </a>
        </div>
      </div>
    </section>
  );
}
