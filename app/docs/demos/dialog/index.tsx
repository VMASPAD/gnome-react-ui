"use client";
import { Dialog } from '@/app/components/dialog';
import { Bell, Settings, X, User, Mail, Lock, ExternalLink, Pencil } from 'lucide-react';

// ─── Shared ───────────────────────────────────────────────────────────────────

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50';

// ─── Default ──────────────────────────────────────────────────────────────────
// Notifications dialog inspired by GNOME Shell notification center

export function DialogDefault() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={`${btnBase} h-9 gap-2 border border-border bg-card px-4 text-foreground hover:bg-accent`}
      >
        <Bell className="size-4 shrink-0" />
        View notifications
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/40 backdrop-blur-sm transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-[400px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-xl outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <Bell className="size-4 shrink-0 text-primary" />
            <Dialog.Title className="flex-1 text-base font-semibold text-foreground">
              Notifications
            </Dialog.Title>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Notification list */}
          <div className="flex flex-col divide-y divide-border">
            {[
              { icon: User,         label: 'Marco joined your workspace',   time: '2m ago',  read: false },
              { icon: Mail,         label: 'New message from Sara',          time: '14m ago', read: false },
              { icon: ExternalLink, label: 'Build pipeline completed',       time: '1h ago',  read: true  },
              { icon: Lock,         label: 'Password changed successfully',  time: '3h ago',  read: true  },
            ].map(({ icon: Icon, label, time, read }) => (
              <div
                key={label}
                className={`flex items-start gap-3 px-5 py-3.5 ${read ? 'opacity-60' : ''}`}
              >
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${read ? 'bg-muted' : 'bg-primary/10'} ${read ? 'text-muted-foreground' : 'text-primary'}`}>
                  <Icon className="size-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{time}</p>
                </div>
                {!read && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-border px-5 py-3">
            <Dialog.Close className={`${btnBase} h-9 bg-primary px-4 text-primary-foreground hover:brightness-95`}>
              Mark all as read
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Settings / Form dialog ───────────────────────────────────────────────────
// Inspired by GNOME Settings modal — edit profile with inputs

export function DialogSettings() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={`${btnBase} h-9 gap-2 border border-border bg-card px-4 text-foreground hover:bg-accent`}>
        <Settings className="size-4 shrink-0" />
        Edit profile
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/40 backdrop-blur-sm transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-[440px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-xl outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <Pencil className="size-4 shrink-0 text-primary" />
            <Dialog.Title className="flex-1 text-base font-semibold text-foreground">
              Edit profile
            </Dialog.Title>
            <Dialog.Close className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Form body */}
          <div className="flex flex-col gap-4 px-5 py-5">
            <Dialog.Description className="text-sm leading-relaxed text-muted-foreground">
              Update your public profile information. Changes will be visible to all workspace members.
            </Dialog.Description>

            {[
              { label: 'Full name', placeholder: 'Elena Larsson', icon: User },
              { label: 'Email address', placeholder: 'elena@example.com', icon: Mail },
            ].map(({ label, placeholder, icon: Icon }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </label>
                <div className="relative flex items-center">
                  <Icon className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                  <input
                    placeholder={placeholder}
                    className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 hover:border-ring/50 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-ring"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
            <Dialog.Close className={`${btnBase} h-9 border border-border bg-card px-4 text-foreground hover:bg-accent`}>
              Cancel
            </Dialog.Close>
            <Dialog.Close className={`${btnBase} h-9 bg-primary px-4 text-primary-foreground hover:brightness-95`}>
              Save changes
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Non-modal / Sidebar panel ────────────────────────────────────────────────
// modal={false} — dialog opens without locking the rest of the page
// Inspired by GNOME Files properties side panel

export function DialogNonModal() {
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger className={`${btnBase} h-9 gap-2 border border-border bg-card px-4 text-foreground hover:bg-accent`}>
        <ExternalLink className="size-4 shrink-0" />
        File details
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup className="fixed top-4 right-4 w-72 overflow-hidden rounded-xl border border-border bg-card shadow-xl outline-none transition-all duration-200 data-[ending-style]:translate-x-4 data-[ending-style]:opacity-0 data-[starting-style]:translate-x-4 data-[starting-style]:opacity-0">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lock className="size-4" />
            </div>
            <Dialog.Title className="flex-1 text-sm font-semibold text-foreground">
              project-notes.md
            </Dialog.Title>
            <Dialog.Close className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              <X className="size-3.5" />
            </Dialog.Close>
          </div>

          {/* Metadata rows */}
          <div className="flex flex-col divide-y divide-border">
            {[
              { label: 'Type',     value: 'Markdown document' },
              { label: 'Size',     value: '4.2 KB' },
              { label: 'Modified', value: 'Feb 23, 2026' },
              { label: 'Owner',    value: 'ubuntu' },
              { label: 'Location', value: '~/Documents' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="font-mono text-xs text-foreground">{value}</span>
              </div>
            ))}
          </div>

          <Dialog.Description className="px-4 py-3 text-xs leading-relaxed text-muted-foreground border-t border-border">
            Page is still interactive while this panel is open.
          </Dialog.Description>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}