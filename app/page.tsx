"use client";
import { Button } from "./components/button";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/ui/components/card";
import { Badge } from "@/app/ui/components/badge";
import { Input } from "./components/input";
import {
  Layout,
  Palette,
  Layers,
  Github,
  CheckCircle2,
  Zap,
  Accessibility,
  Monitor,
  ArrowRight,
  Code2,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
 

function Home() {
  const [mobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Palette,
      title: "Gnome Aesthetics",
      description:
        "Beautifully crafted components following the GNOME Human Interface Guidelines.",
    },
    {
      icon: Layers,
      title: "Modular Architecture",
      description:
        "Built on top of Base UI primitives for maximum flexibility and control.",
    },
    {
      icon: Accessibility,
      title: "Accessible by Default",
      description:
        "Adheres to WAI-ARIA standards, providing a seamless experience for everyone.",
    },
    {
      icon: Zap,
      title: "Blazing Fast",
      description:
        "Optimized for speed. Zero runtime CSS, tiny bundle size, and high performance.",
    },
    {
      icon: Code2,
      title: "TypeScript Native",
      description:
        "Strictly typed components for a robust and safe development experience.",
    },
    {
      icon: Monitor,
      title: "Ultra Responsive",
      description:
        "Fluid layouts that look stunning on everything from phones to ultrawide monitors.",
    },
  ];

  const components = [
    { name: "Button", description: "Versatile button system with multiple states." },
    { name: "Dialog", description: "Modal windows for focused interactions." },
    { name: "Popover", description: "Contextual info that floats near its anchor." },
    { name: "Forms", description: "Beautifully styled accessible input fields." },
    { name: "Tabs", description: "Switch between views with elegant animations." },
    { name: "Toast", description: "Unobtrusive notifications for your users." },
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary"
      style={{ fontFamily: "'Ubuntu', sans-serif" }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <Image
                  className="text-white"
                  src="/icon.svg"
                  alt="GnomeUI Logo"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                GnomeUI
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <a
                href="/docs"
                className="hover:text-foreground transition-colors duration-150"
              >
                Documentation
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border text-[11px] font-medium text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-[oklch(0.65_0.18_150)]" />
                v1.0.0
              </div>
            </div>
            <Button className="inline-flex items-center justify-center h-8 w-8 p-0 rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors duration-150">
              <Github className="h-4 w-4" />
            </Button>
            <Button className="inline-flex items-center justify-center h-8 px-3 text-xs rounded-lg bg-primary text-primary-foreground hover:brightness-95 transition-colors duration-150 font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Subtle radial glow behind hero */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[700px] rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div className="relative container mx-auto max-w-5xl px-4 text-center">
          <Badge className="mb-6 inline-flex items-center gap-1.5 py-1 px-4 border border-primary/30 bg-primary/8 text-primary rounded-full text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Introducing GnomeUI v2.0
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1]">
            Build your interface{" "}
            <br className="hidden sm:block" />
            <span className="text-primary">with Gnome React UI.</span>
          </h1>

          <p className="max-w-[42rem] mx-auto text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            Beautifully designed components that you can copy and paste into your
            apps. Accessible. Customizable. Open Source. Inspired by GNOME.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
            <Button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-95 transition-all duration-150 text-sm">
              Read the docs
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 h-11 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-accent transition-all duration-150 text-sm">
              Browse components
            </Button>
          </div>

          {/* Terminal card */}
          <div className="max-w-xl mx-auto text-left relative">
            <div className="absolute -inset-4 bg-primary/6 blur-2xl opacity-60 rounded-3xl" />
            <div className="relative rounded-xl border border-border bg-card shadow-xl overflow-hidden">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/40">
                <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_20)]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.18_80)]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_150)]" />
                <span className="ml-2 text-[11px] font-medium text-muted-foreground font-mono">
                  bash — gnome-ui
                </span>
              </div>
              <div className="p-5 font-mono text-sm sm:text-base bg-[oklch(0.18_0.02_330)]">
                <div className="flex gap-3">
                  <span className="text-muted-foreground shrink-0">$</span>
                  <span className="text-background">npx gnome-ui@latest init</span>
                </div>
                <div className="mt-2 text-[oklch(0.65_0.18_150)]">
                  ✔ Success! Project initialized.
                </div>
                <div className="mt-1 flex gap-3">
                  <span className="text-muted-foreground shrink-0">$</span>
                  <span className="text-background">
                    npx gnome-ui@latest add button card
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ──────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group relative">
                <div className="flex flex-col space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 transition-colors duration-150 group-hover:bg-primary/15">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Components showcase ────────────────────────────────────────────── */}
      <section
        id="components"
        className="py-24"
        style={{ background: "oklch(0.96 0.004 330)" }}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
              Featured Components
            </h2>
            <p className="text-muted-foreground text-lg max-w-[42rem]">
              A library of high-quality components designed for modern web apps.
              Built with performance and accessibility in mind.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((component, index) => (
              <Card
                key={index}
                className="group border-border bg-card hover:shadow-lg hover:shadow-primary/8 hover:border-primary/30 transition-all duration-200"
              >
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                    {component.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {component.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="px-6 pb-6 pt-0">
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-150">
                    View Demo <ArrowRight className="h-3 w-3" />
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo / preview section ─────────────────────────────────────────── */}
      <section className="py-24 overflow-hidden border-t border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left copy */}
            <div className="flex flex-col space-y-6">
              <Badge className="w-fit inline-flex items-center gap-1.5 py-1 px-3 border border-primary/30 bg-primary/8 text-primary rounded-full text-xs font-semibold">
                PREVIEW
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                The full power of{" "}
                <span className="text-primary">GNOME</span> in your React app.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We've spent thousands of hours refining the details. From the exact
                shadow on our buttons to the accessibility of our dropdowns.
              </p>

              <div className="space-y-4">
                {[
                  "Accessible and compliant (WCAG)",
                  "Customizable via Tailwind utility classes",
                  "Dark mode and light mode out of the box",
                  "Fluid, native-feeling animations",
                  "Modular architecture with Base UI",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right demo card */}
            <div className="relative lg:ml-10">
              <div className="absolute -inset-1.5 bg-primary/20 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <Card className="relative p-8 bg-card border-border shadow-2xl rounded-2xl overflow-hidden">
                {/* Subtle orange top border accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
                <div className="space-y-8">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      Create an account
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your email below to create your account
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="inline-flex items-center justify-center gap-2 h-10 text-xs font-semibold rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors duration-150">
                        <Github className="h-4 w-4" /> GitHub
                      </Button>
                      <Button className="inline-flex items-center justify-center gap-2 h-10 text-xs font-semibold rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors duration-150">
                        <Layout className="h-4 w-4" /> Google
                      </Button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground font-medium">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="m@example.com"
                        className="h-10 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-ring transition-colors duration-150 hover:border-ring/50"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="h-10 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-ring transition-colors duration-150 hover:border-ring/50"
                      />
                    </div>
                  </div>

                  <Button className="inline-flex items-center justify-center w-full h-10 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-95 transition-all duration-150">
                    Create account
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center px-8">
                    By clicking continue, you agree to our{" "}
                    <span className="underline cursor-pointer text-foreground">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="underline cursor-pointer text-foreground">
                      Privacy Policy
                    </span>
                    .
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.20 0.02 330)" }}
      >
        {/* Orange glow on aubergine */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 h-64 w-96 bg-primary/20 blur-[100px] rounded-full" />
        <div className="relative container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl mb-6 leading-tight">
            Start building your{" "}
            <span className="text-primary">next big idea</span> today.
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.72 0.02 330)" }}>
            Stop worrying about the UI and focus on your business logic. GnomeUI
            gives you the foundations you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 bg-primary text-primary-foreground font-semibold h-12 rounded-xl hover:brightness-95 transition-colors duration-150 text-sm">
              Get Started for Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 font-semibold h-12 rounded-xl transition-all duration-150 text-sm"
              style={{
                border: "1px solid oklch(0.32 0.02 330)",
                background: "transparent",
                color: "oklch(0.72 0.02 330)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.28 0.02 330)";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(0.72 0.02 330)";
              }}
            >
              <Github className="h-5 w-5" /> Star on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Layout className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">GnomeUI</span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
              {["GitHub", "Documentation", "NPM", "License"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-foreground hover:text-primary transition-colors duration-150"
                >
                  {link}
                </a>
              ))}
            </nav>

            <p className="text-sm text-muted-foreground font-medium">
              Built by the community. Open source.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;