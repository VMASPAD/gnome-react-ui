import Image from 'next/image';
import Link from 'next/link';
import {
  Accessibility,
  ArrowRight,
  CheckCircle2,
  Code2,
  Github,
  Layers,
  Monitor,
  Palette,
  Zap,
  Box,
  Sparkles,
  Terminal,
  Globe,
  Lock,
  Linkedin,
} from 'lucide-react';
import { AnimatedThemeToggler } from '@/components/animated-theme-toggler';

const features = [
  {
    icon: Palette,
    title: 'GNOME Aesthetics',
    description: 'Beautifully crafted components following the GNOME Human Interface Guidelines.',
    accent: 'text-primary',
    border: 'group-hover:border-b-primary',
  },
  {
    icon: Layers,
    title: 'Modular Architecture',
    description: 'Built on top of Base UI primitives for maximum flexibility and control.',
    accent: 'text-[oklch(0.6_0.15_250)]',
    border: 'group-hover:border-b-[oklch(0.6_0.15_250)]',
  },
  {
    icon: Accessibility,
    title: 'Accessible by Default',
    description: 'Adheres to WAI-ARIA standards, providing a seamless experience for everyone.',
    accent: 'text-[oklch(0.65_0.18_150)]',
    border: 'group-hover:border-b-[oklch(0.65_0.18_150)]',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Optimized for speed, tiny bundle impact, and production-grade performance.',
    accent: 'text-[oklch(0.72_0.17_80)]',
    border: 'group-hover:border-b-[oklch(0.72_0.17_80)]',
  },
  {
    icon: Code2,
    title: 'TypeScript Native',
    description: 'Strictly typed components for a robust and safe development workflow.',
    accent: 'text-[oklch(0.65_0.18_150)]',
    border: 'group-hover:border-b-[oklch(0.65_0.18_150)]',
  },
  {
    icon: Monitor,
    title: 'Ultra Responsive',
    description: 'Fluid layouts that look sharp on phones, desktops, and ultrawide displays.',
    accent: 'text-primary',
    border: 'group-hover:border-b-primary',
  },
];

const featuredComponents = [
  { name: 'Button', category: 'Action', description: 'Versatile button system with multiple variants and states.' },
  { name: 'Dialog', category: 'Overlay', description: 'Modal windows for focused interactions.' },
  { name: 'Popover', category: 'Overlay', description: 'Contextual information that floats near its anchor.' },
  { name: 'Form', category: 'Input', description: 'Accessible, composable fields for real product flows.' },
  { name: 'Tabs', category: 'Navigation', description: 'Switch between views with clear and predictable interactions.' },
  { name: 'Toast', category: 'Feedback', description: 'Non-intrusive notifications with queue and priority support.' },
  { name: 'Select', category: 'Input', description: 'Searchable dropdown with keyboard navigation.' },
  { name: 'Tooltip', category: 'Overlay', description: 'Contextual hints with accessible focus triggers.' },
  { name: 'Slider', category: 'Input', description: 'Range input with ARIA roles and keyboard control.' },
];

const categoryColor: Record<string, string> = {
  Action: 'text-primary border-primary/30 bg-primary/10',
  Overlay: 'text-[oklch(0.5_0.15_330)] border-[oklch(0.5_0.15_330)]/30 bg-[oklch(0.5_0.15_330)]/10 dark:text-[oklch(0.72_0.18_330)]',
  Input: 'text-[oklch(0.55_0.15_250)] border-[oklch(0.55_0.15_250)]/30 bg-[oklch(0.55_0.15_250)]/10 dark:text-[oklch(0.72_0.16_250)]',
  Navigation: 'text-[oklch(0.65_0.18_150)] border-[oklch(0.65_0.18_150)]/30 bg-[oklch(0.65_0.18_150)]/10',
  Feedback: 'text-[oklch(0.65_0.18_80)] border-[oklch(0.65_0.18_80)]/30 bg-[oklch(0.65_0.18_80)]/10',
};

const stats = [
  { value: '45+', label: 'Components' },
  { value: '100%', label: 'Accessible' },
  { value: 'Base UI', label: 'Based' },
  { value: 'TypeScript', label: 'First-class' },
  { value: 'MIT', label: 'License' },
];

const inputBase =
  'flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
               <Image src="/favicon.ico" alt="gnome-ui logo" width={16} height={16} />
             
              <span className="text-sm font-bold tracking-tight text-foreground">gnome-ui</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {[
                { href: '/docs', label: 'Docs' },
                { href: '/docs/components/Button', label: 'Components' },
                { href: '/themes', label: 'Themes' },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://npmx.dev/package/gnome-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-1 hidden items-center gap-1.5 rounded-full border border-[oklch(0.65_0.18_150)]/30 bg-[oklch(0.65_0.18_150)]/8 px-3 py-1 text-[11px] font-semibold text-[oklch(0.55_0.18_150)] dark:text-[oklch(0.65_0.18_150)] sm:flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.65_0.18_150)]" />
              v1.9.5
            </a>

            <a
              href="https://github.com/VMASPAD/gnome-react-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
              aria-label="GitHub repository"
            >
              <Github className="h-4 w-4" />
            </a>

            <AnimatedThemeToggler />
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-28 pt-24 md:pb-32 md:pt-36">
        {/* Dot grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-60" />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -left-32 top-1/2 h-64 w-64 rounded-full bg-[oklch(0.45_0.15_330)]/15 blur-[80px]" />
          <div className="absolute -right-32 top-1/3 h-48 w-48 rounded-full bg-[oklch(0.55_0.15_250)]/12 blur-[80px]" />
        </div>

        <div className="relative container mx-auto max-w-5xl px-4 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3 w-3" />
            Introducing gnome-ui v1.9
            <span className="h-px w-4 bg-primary/40" />
            <span className="font-normal text-primary/70">45+ components</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tighter text-foreground md:text-6xl lg:text-7xl">
            Build beautiful interfaces{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient">with gnome-ui.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-160 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Production-ready components with GNOME aesthetics and Ubuntu tokens.
            Accessible, themeable, and built for real teams shipping real products.
          </p>

          {/* CTA buttons */}
          <div className="mb-20 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-150 hover:brightness-105 hover:-translate-y-0.5 sm:w-auto"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/components/Button"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-accent hover:-translate-y-0.5 sm:w-auto"
            >
              Browse components
            </Link>
          </div>

          {/* Terminal */}
          <div className="relative mx-auto max-w-lg text-left">
            <div className="absolute -inset-4 rounded-3xl bg-primary/8 opacity-50 blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.6_0.18_20)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.18_80)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_150)]" />
                <span className="ml-3 flex items-center gap-1.5 font-mono text-[11px] font-medium text-muted-foreground">
                  <Terminal className="h-3 w-3" />
                  zsh — gnome-ui
                </span>
              </div>

              <div className="bg-[oklch(0.14_0.02_330)] p-5 font-mono text-sm">
                <div className="flex gap-2 text-muted-foreground">
                  <span className="text-primary">❯</span>
                  <span className="text-secondary">
                    npm install <span className="font-semibold text-primary">gnome-ui</span>
                  </span>
                </div>
                
                <div className="mt-2 flex gap-2">
                  <span className="text-primary">❯</span>
                  <span className="text-muted-foreground">
                    import {'{'}{' '}
                    <span className="text-[oklch(0.65_0.18_150)]">Button</span>{' '} 
                    {'}'} from{' '}
                    <span className="text-[oklch(0.72_0.17_80)]">&apos;gnome-ui/button&apos;</span>
                  </span>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────────────────────────── */}
      <div className="border-y border-border bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-around gap-4 py-5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <span className="font-mono text-lg font-bold text-foreground">{stat.value}</span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-16 max-w-xl">
            <span className="mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              — Why gnome-ui
            </span>
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
              Everything you need to ship fast.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built on proven foundations, designed for production from day one.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 card-lift border-b-2 border-b-transparent transition-[border-color] duration-200 ${feature.border}`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-colors duration-150">
                  <feature.icon className={`h-5 w-5 ${feature.accent}`} />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── New components banner ───────────────────────────────────────── */}
      <div className="border-y border-border bg-primary/4">
        <div className="container mx-auto max-w-7xl px-4 py-5">
          <div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-primary/20 bg-card p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/12 blur-2xl" />
            <div className="relative z-10 min-w-0 flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="inline-flex h-5 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                  ✦ New
                </span>
                <span className="text-xs font-medium text-muted-foreground">Just shipped</span>
              </div>
              <h2 className="text-base font-bold text-foreground">
                2 new components: Textarea &amp; Label
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Same GNOME token system. Zero configuration.
              </p>
            </div>
            <div className="relative z-10 flex shrink-0 flex-wrap gap-2">
              <div className="flex flex-col rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-primary">
                <span className="text-xs font-bold">Textarea</span>
                <span className="text-[10px] font-medium opacity-70">3 variants</span>
              </div>
              <div className="flex flex-col rounded-xl border border-[oklch(0.45_0.15_150)]/20 bg-[oklch(0.45_0.15_150)]/10 px-3 py-2 text-[oklch(0.45_0.15_150)] dark:text-[oklch(0.65_0.18_150)]">
                <span className="text-xs font-bold">Label</span>
                <span className="text-[10px] font-medium opacity-70">3 variants</span>
              </div>
            </div>
            <Link
              href="/docs"
              className="relative z-10 inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors duration-150 hover:bg-primary/20"
            >
              Explore
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Featured components ─────────────────────────────────────────── */}
      <section id="components" className="py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                — Component library
              </span>
              <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                Featured Components
              </h2>
              <p className="mt-3 max-w-xl text-lg text-muted-foreground">
                A focused library of high-quality, production-ready components.
              </p>
            </div>
            <Link
              href="/docs/components/Button"
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border border-border px-4 text-sm font-semibold text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
            >
              View all 45+
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredComponents.map((component) => (
              <article
                key={component.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 card-lift"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`inline-flex h-5 items-center rounded-full border px-2 font-mono text-[10px] font-bold uppercase tracking-widest ${categoryColor[component.category] ?? ''}`}
                    >
                      {component.category}
                    </span>
                    <Box className="h-4 w-4 text-muted-foreground/40 transition-colors duration-150 group-hover:text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground transition-colors duration-150 group-hover:text-primary">
                    {component.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {component.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <Link
                    href={`/docs/components/${component.name}`}
                    className="flex items-center gap-1 text-xs font-semibold text-primary transition-transform duration-150 group-hover:translate-x-1"
                  >
                    View docs
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <span className="font-mono text-[10px] font-medium text-muted-foreground/60">
                    gnome-ui
                  </span>
                </div>

                {/* Bottom glow edge on hover */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature detail + form ───────────────────────────────────────── */}
      <section className="overflow-hidden border-t border-border py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col space-y-6">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                — The foundation
              </span>
              <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
                The full power of{' '}
                <span className="text-gradient">GNOME</span>{' '}
                in your React app.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Refined details, accessibility-first behavior, and consistent tokenized styling
                from base primitives to production workflows.
              </p>

              <ul className="space-y-3">
                {[
                  { icon: CheckCircle2, text: 'Accessible and compliant (WCAG 2.1)' },
                  { icon: Palette, text: 'Customizable through utility classes' },
                  { icon: Globe, text: 'Light and dark mode out of the box' },
                  { icon: Zap, text: 'Fluid, native-feeling interactions' },
                  { icon: Lock, text: 'Modular architecture powered by Base UI' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12 ring-1 ring-primary/20">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative lg:ml-10">
              <div className="absolute -inset-1.5 animate-pulse rounded-3xl bg-primary/15 opacity-30 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight text-foreground">
                        Create an account
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Enter your email below to create your account.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground transition-all duration-150 hover:bg-accent hover:-translate-y-0.5">
                          <Github className="h-4 w-4" /> GitHub
                        </button>
                        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground transition-all duration-150 hover:bg-accent hover:-translate-y-0.5">
                          <Globe className="h-4 w-4" /> Google
                        </button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 font-mono font-medium text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <input className={inputBase} placeholder="Email address" />
                        <input className={inputBase} placeholder="Password" type="password" />
                      </div>
                    </div>

                    <button className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-150 hover:brightness-105 hover:-translate-y-0.5">
                      Create account
                    </button>

                    <p className="text-center text-[11px] text-muted-foreground">
                      By clicking continue, you agree to our{' '}
                      <span className="cursor-pointer text-foreground underline underline-offset-2">
                        Terms of Service
                      </span>{' '}
                      and{' '}
                      <span className="cursor-pointer text-foreground underline underline-offset-2">
                        Privacy Policy
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-12 shadow-xl">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-75 w-150 rounded-full bg-primary/10 blur-[80px]" />
            </div>
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="relative z-10">
              <span className="mb-4 inline-block font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                — Open source
              </span>
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
                Start building today.
              </h2>
              <p className="mx-auto mb-10 max-w-md text-lg text-muted-foreground">
                Free, open source, and built for the community. Install in seconds,
                customize to fit your brand.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/docs"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-150 hover:brightness-105 hover:-translate-y-0.5 sm:w-auto"
                >
                  Read the docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com/VMASPAD/gnome-react-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 text-sm font-bold text-foreground transition-all duration-150 hover:bg-accent hover:-translate-y-0.5 sm:w-auto"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <Image src="/favicon.ico" alt="gnome-ui logo" width={16} height={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">gnome-ui</p>
                <p className="font-mono text-[11px] text-muted-foreground">Built for the community</p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-muted-foreground">
              {[
                { href: 'https://github.com/vmaspad/gnome-react-ui', label: 'GitHub', external: true },
                { href: '/docs', label: 'Documentation', external: false },
                { href: '/themes', label: 'Themes', external: false },
                { href: 'https://npmx.dev/package/gnome-ui', label: 'NPM', external: true },
                {
                  href: 'https://github.com/vmaspad/gnome-react-ui/blob/main/LICENSE',
                  label: 'License',
                  external: true,
                },
              ].map(({ href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="transition-colors duration-150 hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </nav>

            <p className="font-mono text-xs text-muted-foreground">MIT License · 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
