"use client";
import * as React from 'react';
import { DrawerPreview as Drawer } from '@/app/components/drawer';
import { PanelRight, Settings, Bell, User, Lock, Wifi, ChevronRight, X, SlidersHorizontal, Moon, Shield } from 'lucide-react';

// ─── Shared ───────────────────────────────────────────────────────────────────

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50';

// ─── Default — Right side navigation drawer ───────────────────────────────────

export function DrawerDefault() {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className={`${btnBase} h-9 border border-border bg-card px-4 text-foreground hover:bg-accent`}>
        <PanelRight className="size-4 shrink-0" />
        Open drawer
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 min-h-dvh bg-black/40 backdrop-blur-sm transition-all duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 flex justify-end">
          <Drawer.Popup className="flex h-full w-80 flex-col border-l border-border bg-card shadow-2xl outline-none transition-transform duration-300 ease-out data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
            <Drawer.Content className="flex flex-1 flex-col overflow-y-auto">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <Settings className="size-4 shrink-0 text-primary" />
                <Drawer.Title className="flex-1 text-base font-semibold text-foreground">
                  Quick settings
                </Drawer.Title>
                <Drawer.Close className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                  <X className="size-4" />
                </Drawer.Close>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col divide-y divide-border">
                {[
                  { icon: Wifi,             label: 'Network',          value: 'Connected'  },
                  { icon: Bell,             label: 'Notifications',    value: 'On'         },
                  { icon: Moon,             label: 'Night Light',      value: 'Off'        },
                  { icon: Shield,           label: 'Privacy',          value: 'Managed'    },
                  { icon: SlidersHorizontal,label: 'Display',          value: 'Auto'       },
                  { icon: User,             label: 'Accounts',         value: '2 linked'   },
                  { icon: Lock,             label: 'Security',         value: 'Active'     },
                ].map(({ icon: Icon, label, value }) => (
                  <button
                    key={label}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm text-foreground">{label}</span>
                    <span className="text-xs text-muted-foreground">{value}</span>
                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </nav>
            </Drawer.Content>

            {/* Footer */}
            <div className="border-t border-border px-5 py-3">
              <Drawer.Close className={`${btnBase} h-9 w-full bg-primary text-primary-foreground hover:brightness-95`}>
                Close
              </Drawer.Close>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// ─── Bottom drawer with drag handle ──────────────────────────────────────────
// The drag handle allows the user to pull the drawer up or down with the mouse.

export function DrawerSnapPoints() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [height, setHeight] = React.useState(40); // percentage of viewport
  const isDragging = React.useRef(false);
  const startY = React.useRef(0);
  const startHeight = React.useRef(40);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = startY.current - ev.clientY;
      const vh = window.innerHeight;
      const pctDelta = (delta / vh) * 100;
      const newH = Math.min(95, Math.max(15, startHeight.current + pctDelta));
      setHeight(newH);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [height]);

  return (
    <>
      <button
        type="button"
        onClick={() => { setIsOpen(true); setHeight(40); }}
        className={`${btnBase} h-9 border border-border bg-card px-4 text-foreground hover:bg-accent`}
      >
        <SlidersHorizontal className="size-4 shrink-0" />
        Filter results
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom sheet */}
          <div
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border-t border-border bg-card shadow-2xl"
            style={{
              height: `${height}vh`,
              transition: isDragging.current ? 'none' : 'height 0.3s ease-out',
            }}
          >
            {/* Drag handle */}
            <div
              className="flex justify-center pb-1 pt-3 cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
            >
              <div className="h-1.5 w-12 rounded-full bg-border hover:bg-muted-foreground/40 transition-colors" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6">
              <div className="flex items-center gap-3 py-4">
                <SlidersHorizontal className="size-4 shrink-0 text-primary" />
                <h2 className="flex-1 text-base font-semibold text-foreground">
                  Filter results
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <X className="size-4" />
                </button>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Drag the handle up or down to resize. Swipe down to dismiss.
              </p>

              {/* Filter groups */}
              {[
                { label: 'Type',     options: ['All', 'Documents', 'Images', 'Videos', 'Audio'] },
                { label: 'Modified', options: ['Any time', 'Today', 'This week', 'This month'] },
                { label: 'Owner',    options: ['Anyone', 'Me', 'Others'] },
              ].map(({ label, options }) => (
                <div key={label} className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt, i) => (
                      <button
                        key={opt}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
                          i === 0
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:bg-accent'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsOpen(false)}
                className={`${btnBase} mt-2 h-10 w-full bg-primary text-primary-foreground hover:brightness-95`}
              >
                Apply filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ─── Left sidebar / navigation drawer ────────────────────────────────────────

export function DrawerNavigation() {
  return (
    <Drawer.Root swipeDirection="left">
      <Drawer.Trigger className={`${btnBase} h-9 border border-border bg-card px-4 text-foreground hover:bg-accent`}>
        <PanelRight className="size-4 shrink-0 scale-x-[-1]" />
        Navigation
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 min-h-dvh bg-black/40 backdrop-blur-sm transition-all duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 flex justify-start">
          <Drawer.Popup className="flex h-full w-72 flex-col border-r border-border bg-sidebar shadow-2xl outline-none transition-transform duration-300 ease-out data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full">
            <Drawer.Content className="flex flex-1 flex-col overflow-y-auto">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">ubuntu</p>
                  <p className="text-xs text-muted-foreground truncate">/home/ubuntu</p>
                </div>
                <Drawer.Close className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-sidebar-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                  <X className="size-3.5" />
                </Drawer.Close>
              </div>

              {/* Section label */}
              <div className="px-3 pb-1 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Places</p>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col px-2">
                {[
                  { icon: User,   label: 'Home',      active: true  },
                  { icon: Lock,   label: 'Documents',  active: false },
                  { icon: Bell,   label: 'Downloads',  active: false },
                  { icon: Shield, label: 'Pictures',   active: false },
                  { icon: Moon,   label: 'Music',      active: false },
                ].map(({ icon: Icon, label, active }) => (
                  <button
                    key={label}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
                      active
                        ? 'bg-sidebar-accent font-semibold text-sidebar-primary'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`}
                  >
                    <Icon className={`size-4 shrink-0 ${active ? 'text-sidebar-primary' : 'text-muted-foreground'}`} />
                    {label}
                  </button>
                ))}
              </nav>
            </Drawer.Content>

            <Drawer.Description className="border-t border-sidebar-border px-4 py-3 text-xs text-muted-foreground">
              Swipe left to close.
            </Drawer.Description>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}