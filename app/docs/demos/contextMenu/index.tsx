"use client";

import * as React from "react";
import { ContextMenu } from "@/app/components/context-menu";
import {
  Check,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  FilePenLine,
  FolderOpen,
  Scissors,
  Share2,
  Trash2,
} from "lucide-react";

const popupCls =
  "z-50 min-w-[220px] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-md " +
  "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out " +
  "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 " +
  "data-[starting-style]:opacity-0 data-[starting-style]:scale-95";

const itemCls =
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors duration-100 " +
  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const groupLabelCls =
  "px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

const separatorCls = "mx-1 my-1 h-px bg-border";

function ContextSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 text-foreground shadow-sm">
      {children}
    </div>
  );
}

export function ContextMenuBasic() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="block rounded-lg border border-border bg-background px-5 py-8 text-center text-sm text-muted-foreground transition-colors hover:bg-accent/50 data-[popup-open]:border-primary data-[popup-open]:text-foreground">
        Right click here to open the context menu
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Positioner sideOffset={8} className="z-50 outline-none">
          <ContextMenu.Popup className={popupCls}>
            <ContextMenu.Item className={itemCls}>
              <Scissors className="size-4 text-muted-foreground" />
              Cut
            </ContextMenu.Item>
            <ContextMenu.Item className={itemCls}>
              <Copy className="size-4 text-muted-foreground" />
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item className={itemCls}>
              <FolderOpen className="size-4 text-muted-foreground" />
              Open in new tab
            </ContextMenu.Item>
            <ContextMenu.Separator className={separatorCls} />
            <ContextMenu.Item className={`${itemCls} text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive`}>
              <Trash2 className="size-4" />
              Delete
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export function ContextMenuViewOptions() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="block rounded-lg border border-border bg-background px-5 py-8 text-center text-sm text-muted-foreground transition-colors hover:bg-accent/50 data-[popup-open]:border-primary data-[popup-open]:text-foreground">
        Right click to configure view options
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Positioner sideOffset={8} className="z-50 outline-none">
          <ContextMenu.Popup className={popupCls}>
            <ContextMenu.Group>
              <ContextMenu.GroupLabel className={groupLabelCls}>
                Visibility
              </ContextMenu.GroupLabel>

              <ContextMenu.CheckboxItem className={itemCls} defaultChecked>
                <ContextMenu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </ContextMenu.CheckboxItemIndicator>
                <Eye className="size-4 text-muted-foreground" />
                Show hidden files
              </ContextMenu.CheckboxItem>

              <ContextMenu.CheckboxItem className={itemCls}>
                <ContextMenu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </ContextMenu.CheckboxItemIndicator>
                <EyeOff className="size-4 text-muted-foreground" />
                Compact mode
              </ContextMenu.CheckboxItem>
            </ContextMenu.Group>

            <ContextMenu.Separator className={separatorCls} />

            <ContextMenu.Group>
              <ContextMenu.GroupLabel className={groupLabelCls}>
                Sort by
              </ContextMenu.GroupLabel>

              <ContextMenu.RadioGroup defaultValue="name">
                <ContextMenu.RadioItem value="name" className={itemCls}>
                  <ContextMenu.RadioItemIndicator className="flex size-4 items-center justify-center">
                    <div className="size-2 rounded-full bg-primary" />
                  </ContextMenu.RadioItemIndicator>
                  Name
                </ContextMenu.RadioItem>

                <ContextMenu.RadioItem value="date" className={itemCls}>
                  <ContextMenu.RadioItemIndicator className="flex size-4 items-center justify-center">
                    <div className="size-2 rounded-full bg-primary" />
                  </ContextMenu.RadioItemIndicator>
                  Date modified
                </ContextMenu.RadioItem>
              </ContextMenu.RadioGroup>
            </ContextMenu.Group>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export function ContextMenuSubmenu() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="block rounded-lg border border-border bg-background px-5 py-8 text-center text-sm text-muted-foreground transition-colors hover:bg-accent/50 data-[popup-open]:border-primary data-[popup-open]:text-foreground">
        Right click to open actions with submenu
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Positioner sideOffset={8} className="z-50 outline-none">
          <ContextMenu.Popup className={popupCls}>
            <ContextMenu.Item className={itemCls}>
              <FilePenLine className="size-4 text-muted-foreground" />
              Rename
            </ContextMenu.Item>

            <ContextMenu.SubmenuRoot>
              <ContextMenu.SubmenuTrigger className={`${itemCls} justify-between`}>
                <span className="inline-flex items-center gap-2">
                  <Share2 className="size-4 text-muted-foreground" />
                  Share
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </ContextMenu.SubmenuTrigger>

              <ContextMenu.Portal>
                <ContextMenu.Positioner sideOffset={6} alignOffset={-4} className="z-50 outline-none">
                  <ContextMenu.Popup className={popupCls}>
                    <ContextMenu.Item className={itemCls}>Copy link</ContextMenu.Item>
                    <ContextMenu.Item className={itemCls}>Share to team</ContextMenu.Item>
                    <ContextMenu.LinkItem href="#" className={itemCls}>
                      Share settings
                    </ContextMenu.LinkItem>
                  </ContextMenu.Popup>
                </ContextMenu.Positioner>
              </ContextMenu.Portal>
            </ContextMenu.SubmenuRoot>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export function ContextMenuShowcase() {
  return (
    <ContextSurface>
      <div className="space-y-4">
        <ContextMenuBasic />
      </div>
    </ContextSurface>
  );
}