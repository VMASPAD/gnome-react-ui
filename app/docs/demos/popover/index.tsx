"use client";

import * as React from "react";
import { Popover } from "@/app/components/popover";
import {
  Bell,
  X,
  User,
  Mail,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  ExternalLink,
  Info,
} from "lucide-react";
import { Button } from "@/app/components/button";

// ─── Shared styles ────────────────────────────────────────────────────────────

const popupCls =
  "z-50 w-72 rounded-xl border border-border bg-card text-card-foreground shadow-lg outline-none " +
  "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out " +
  "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 " +
  "data-[starting-style]:opacity-0 data-[starting-style]:scale-95";

const positionerCls = "outline-none";

// ─── 1. Basic Popover ─────────────────────────────────────────────────────────

export function PopoverBasic() {
  return (
    <Popover.Root>
      <Popover.Trigger
        render={<Button><Bell className="size-4" />Notifications</Button>}
      />
      <Popover.Portal>
        <Popover.Positioner className={positionerCls} sideOffset={8}>
          <Popover.Popup className={popupCls}>
            <div className="p-4">
              <Popover.Title className="text-sm font-semibold text-foreground leading-none mb-1">
                Notifications
              </Popover.Title>
              <Popover.Description className="text-sm text-muted-foreground">
                You're all caught up. No new notifications right now.
              </Popover.Description>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

// ─── 2. Popover with Close button ─────────────────────────────────────────────

export function PopoverWithClose() {
  return (
    <Popover.Root>
      <Popover.Trigger
        render={<Button><Info className="size-4" />What's new</Button>}
      />
      <Popover.Portal>
        <Popover.Positioner className={positionerCls} sideOffset={8}>
          <Popover.Popup className={popupCls}>
            <div className="p-4">
              {/* Header with close button */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <Popover.Title className="text-sm font-semibold text-foreground leading-none">
                  Release 2.4.0
                </Popover.Title>
                <Popover.Close
                  className="flex size-6 items-center justify-center rounded-md text-muted-foreground outline-none
                    hover:bg-accent hover:text-accent-foreground
                    focus-visible:outline-2 focus-visible:outline-ring
                    transition-colors duration-100 -mt-0.5 -mr-0.5"
                  aria-label="Close"
                >
                  <X className="size-3.5" />
                </Popover.Close>
              </div>
              <Popover.Description className="text-sm text-muted-foreground mb-3">
                We've shipped new keyboard shortcuts, improved search performance, and fixed several
                reported bugs in the dashboard.
              </Popover.Description>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Read full changelog
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

// ─── 3. Popover with Rich Content (User Profile) ──────────────────────────────

const user = {
  name: "Sara Müller",
  role: "Product Designer",
  email: "sara@example.com",
  location: "Berlin, Germany",
  joined: "March 2022",
};

export function PopoverRichContent() {
  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <button
            className="flex items-center gap-2 rounded-full outline-none
              focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold select-none">
              SM
            </span>
          </button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner className={positionerCls} sideOffset={10} side="bottom" align="end">
          <Popover.Popup className={popupCls}>
            {/* Avatar + name header */}
            <div className="flex items-center gap-3 border-b border-border p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold select-none">
                SM
              </span>
              <div className="min-w-0">
                <Popover.Title className="truncate text-sm font-semibold text-foreground leading-none mb-0.5">
                  {user.name}
                </Popover.Title>
                <Popover.Description className="truncate text-xs text-muted-foreground">
                  {user.role}
                </Popover.Description>
              </div>
            </div>

            {/* Meta info */}
            <div className="space-y-2 p-4 border-b border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="size-3.5 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="size-3.5 shrink-0" />
                <span>Joined {user.joined}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <button
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none
                  hover:bg-accent hover:text-accent-foreground transition-colors duration-100"
              >
                <User className="size-4 text-muted-foreground" />
                View profile
              </button>
              <button
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none
                  hover:bg-accent hover:text-accent-foreground transition-colors duration-100"
              >
                <Settings className="size-4 text-muted-foreground" />
                Account settings
              </button>
              <button
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none
                  text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors duration-100"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}