"use client";
import { Tooltip } from '@/app/components/tooltip';
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Download, Trash2, Share2, Copy, Settings, Info,
} from 'lucide-react';

// ─── Shared arrow SVG ─────────────────────────────────────────────────────────

function TooltipArrowSvg() {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
      <path
        d="M0 0 L10 10 L20 0"
        className="fill-[oklch(0.25_0.02_330)] stroke-border stroke-[0.5]"
      />
    </svg>
  );
}

// ─── Shared popup style ───────────────────────────────────────────────────────

const popupCls =
  'rounded-lg bg-[oklch(0.25_0.02_330)] px-2.5 py-1.5 text-xs font-medium text-white shadow-lg outline-none transition-all duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 origin-[var(--transform-origin)]';

// ─── Default — toolbar with grouped tooltips ──────────────────────────────────
// Inspired by GNOME Text Editor toolbar — instant switch between adjacent tooltips

export function TooltipDefault() {
  const tools = [
    { icon: Bold,        label: 'Bold',           kbd: '⌘B' },
    { icon: Italic,      label: 'Italic',          kbd: '⌘I' },
    { icon: Underline,   label: 'Underline',       kbd: '⌘U' },
    { icon: AlignLeft,   label: 'Align left',      kbd: '⌘⇧L' },
    { icon: AlignCenter, label: 'Align center',    kbd: '⌘⇧E' },
    { icon: AlignRight,  label: 'Align right',     kbd: '⌘⇧R' },
  ];

  return (
    <Tooltip.Provider delay={500} closeDelay={100}>
      <div className="flex items-center gap-0.5 rounded-xl border border-border bg-card p-1.5 shadow-sm">
        {tools.map(({ icon: Icon, label, kbd }) => (
          <Tooltip.Root key={label}>
            <Tooltip.Trigger
              render={<button />}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              aria-label={label}
            >
              <Icon className="size-4 shrink-0" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8} side="bottom">
                <Tooltip.Popup className={popupCls}>
                  <Tooltip.Arrow className="flex">
                    <TooltipArrowSvg />
                  </Tooltip.Arrow>
                  <span className="flex items-center gap-2">
                    {label}
                    <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/70">
                      {kbd}
                    </kbd>
                  </span>
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}

// ─── Sides — all four positions ───────────────────────────────────────────────
// Shows top / right / bottom / left placement using the `side` prop

export function TooltipSides() {
  const sides = [
    { side: 'top'    as const, label: 'Top',    icon: Info },
    { side: 'right'  as const, label: 'Right',  icon: Info },
    { side: 'bottom' as const, label: 'Bottom', icon: Info },
    { side: 'left'   as const, label: 'Left',   icon: Info },
  ];

  return (
    <Tooltip.Provider delay={300}>
      <div className="grid grid-cols-2 gap-3">
        {sides.map(({ side, label, icon: Icon }) => (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger
              render={<button />}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm text-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Icon className="size-3.5 shrink-0 text-muted-foreground" />
              {label}
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8} side={side}>
                <Tooltip.Popup className={popupCls}>
                  Tooltip on the {label.toLowerCase()}
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}

// ─── Rich tooltip — file action bar ──────────────────────────────────────────
// Tooltips with an icon + description, inspired by GNOME Files context actions

export function TooltipRich() {
  const actions = [
    { icon: Download, label: 'Download',   desc: 'Save file to disk'           },
    { icon: Copy,     label: 'Duplicate',  desc: 'Create a copy in same folder' },
    { icon: Share2,   label: 'Share',      desc: 'Share via link or email'     },
    { icon: Settings, label: 'Properties', desc: 'View file metadata'           },
    { icon: Trash2,   label: 'Delete',     desc: 'Move to trash',  danger: true },
  ];

  return (
    <Tooltip.Provider delay={400} closeDelay={100}>
      <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-sm">
        {actions.map(({ icon: Icon, label, desc, danger }) => (
          <Tooltip.Root key={label}>
            <Tooltip.Trigger
              render={<button />}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
                danger
                  ? 'text-destructive hover:bg-destructive/10'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              aria-label={label}
            >
              <Icon className="size-4 shrink-0" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={10} side="top">
                <Tooltip.Popup className="rounded-xl border border-border bg-card p-3 shadow-xl outline-none transition-all duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 origin-[var(--transform-origin)]">
                  <Tooltip.Arrow className="flex">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                      <path
                        d="M0 0 L10 10 L20 0"
                        className="fill-card stroke-border stroke-[0.5]"
                      />
                    </svg>
                  </Tooltip.Arrow>
                  <div className="flex items-start gap-2.5">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${danger ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      <Icon className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}