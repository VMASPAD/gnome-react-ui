
import { Collapsible } from '@/app/components/collapsible';
import { ChevronDown, Key, Terminal, Info, FileCode2, GitBranch, Wifi } from 'lucide-react';

// ─── Default ──────────────────────────────────────────────────────────────────
// Inspired by GNOME Settings expandable row — clean card with chevron trigger

export function CollapsibleDefault() {
  return (
    <Collapsible.Root className="w-80 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <Collapsible.Trigger className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Key className="size-4" />
        </div>
        <span className="flex-1 text-sm font-medium text-foreground">Recovery keys</span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180" />
      </Collapsible.Trigger>

      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-250 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
        <div className="flex flex-col divide-y divide-border border-t border-border">
          {['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'].map((key) => (
            <div key={key} className="flex items-center gap-2 px-4 py-2.5">
              <Key className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="font-mono text-xs text-foreground">{key}</span>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

// ─── Terminal / Code block ────────────────────────────────────────────────────
// Inspired by GNOME Builder's collapsible output panel

export function CollapsibleTerminal() {
  return (
    <Collapsible.Root defaultOpen className="w-[420px] overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <Collapsible.Trigger className="group flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[panel-open]:border-b-border">
        <Terminal className="size-4 shrink-0 text-primary" />
        <span className="flex-1 text-sm font-medium text-foreground">Build output</span>
        <span className="mr-1 rounded-full bg-[oklch(0.88_0.08_150)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.4_0.12_150)]">
          Done
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180" />
      </Collapsible.Trigger>

      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-250 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
        <div className="bg-[oklch(0.18_0.02_330)] px-4 py-3">
          {[
            { icon: GitBranch, text: 'Cloning repository…', color: 'text-muted-foreground' },
            { icon: FileCode2, text: 'Compiling src/index.tsx', color: 'text-muted-foreground' },
            { icon: Wifi, text: 'Bundling assets…', color: 'text-muted-foreground' },
            { icon: Terminal, text: '✓ Build finished in 1.24s', color: 'text-[oklch(0.7_0.15_150)]' },
          ].map(({ icon: Icon, text, color }, i) => (
            <div key={i} className={`flex items-center gap-2.5 py-1 font-mono text-xs ${color}`}>
              <Icon className="size-3.5 shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

// ─── Info card / Description row ─────────────────────────────────────────────
// Inspired by GNOME Files properties panel — "More info" expandable section

export function CollapsibleInfo() {
  return (
    <div className="flex w-80 flex-col gap-px overflow-hidden rounded-xl border border-border bg-border shadow-sm">
      {[
        {
          label: 'Wi-Fi',
          value: 'Connected',
          detail: 'Network: Ubuntu-Home\nIP: 192.168.1.42\nChannel: 6 (2.4 GHz)\nSignal: Excellent',
          icon: Wifi,
          badge: 'bg-[oklch(0.88_0.08_150)] text-[oklch(0.4_0.12_150)]',
        },
        {
          label: 'SSH Keys',
          value: '3 active',
          detail: 'id_ed25519 — added 3 days ago\nid_rsa — added 2 months ago\nwork_key — added 6 months ago',
          icon: Key,
          badge: 'bg-primary/10 text-primary',
        },
        {
          label: 'Build info',
          value: 'v2.4.1',
          detail: 'Commit: a3f9c12\nBranch: main\nBuilt: Feb 23 2026 at 09:14',
          icon: Info,
          badge: 'bg-muted text-muted-foreground',
        },
      ].map(({ label, value, detail, icon: Icon, badge }) => (
        <Collapsible.Root key={label} className="bg-card">
          <Collapsible.Trigger className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            <Icon className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:text-primary transition-colors duration-150" />
            <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge}`}>
              {value}
            </span>
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180" />
          </Collapsible.Trigger>
          <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-250 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
            <div className="border-t border-border px-4 py-3">
              {detail.split('\n').map((line, i) => (
                <p key={i} className="font-mono text-xs leading-relaxed text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
          </Collapsible.Panel>
        </Collapsible.Root>
      ))}
    </div>
  );
}