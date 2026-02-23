import { DrawerPreview as Drawer } from '@/app/components/drawer';
import { PanelRight, Settings, Bell, User, Lock, Wifi, ChevronRight, X, SlidersHorizontal, Moon, Shield } from 'lucide-react';

// ─── Shared ───────────────────────────────────────────────────────────────────

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50';

// ─── Default — Right side navigation drawer ───────────────────────────────────
// Inspired by GNOME Shell's quick settings panel sliding from the right

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

// ─── Bottom drawer with snap points ──────────────────────────────────────────
// Inspired by GNOME Mobile action sheet — snaps to half or full height

export function DrawerSnapPoints() {
  return (
    <Drawer.Root snapPoints={[0.4, 1]} defaultSnapPoint={0.4} swipeDirection="down">
      <Drawer.Trigger className={`${btnBase} h-9 border border-border bg-card px-4 text-foreground hover:bg-accent`}>
        <SlidersHorizontal className="size-4 shrink-0" />
        Filter results
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 min-h-dvh bg-black/40 backdrop-blur-sm transition-all duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 flex items-end">
          <Drawer.Popup className="flex max-h-full w-full flex-col rounded-t-2xl border-t border-border bg-card shadow-2xl outline-none transition-transform duration-300 ease-out data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full">
            {/* Drag handle */}
            <div className="flex justify-center pb-1 pt-3">
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>

            <Drawer.Content className="flex flex-1 flex-col overflow-y-auto px-5 pb-6">
              <div className="flex items-center gap-3 py-4">
                <SlidersHorizontal className="size-4 shrink-0 text-primary" />
                <Drawer.Title className="flex-1 text-base font-semibold text-foreground">
                  Filter results
                </Drawer.Title>
                <Drawer.Close className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                  <X className="size-4" />
                </Drawer.Close>
              </div>

              <Drawer.Description className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Drag up to see all filter options. Swipe down to dismiss.
              </Drawer.Description>

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
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
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

              <Drawer.Close className={`${btnBase} mt-2 h-10 w-full bg-primary text-primary-foreground hover:brightness-95`}>
                Apply filters
              </Drawer.Close>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// ─── Left sidebar / navigation drawer ────────────────────────────────────────
// Inspired by GNOME Files side panel — left-to-right swipe open

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
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
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