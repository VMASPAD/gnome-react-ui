"use client";

import * as React from "react";
import { Menubar } from "@/app/components/menubar";
import { Menu } from "@/app/components/menu";
import {
  ChevronRight,
  FilePlus,
  FolderOpen,
  Save,
  Printer,
  FileOutput,
  Scissors,
  Copy,
  Clipboard,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize,
  LayoutTemplate,
  Check,
  Circle,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  HelpCircle,
  Info,
  BookOpen,
  MessageSquare,
} from "lucide-react";

// ─── Shared styles ────────────────────────────────────────────────────────────

const menubarCls =
  "flex items-center gap-0.5 rounded-xl border border-border bg-card px-1 py-1 shadow-sm";

const triggerCls =
  "flex h-7 cursor-default select-none items-center rounded-md px-2.5 text-sm font-medium outline-none " +
  "transition-colors duration-100 " +
  "hover:bg-accent hover:text-accent-foreground " +
  "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-40";

const popupCls =
  "z-50 min-w-[200px] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-md " +
  "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out " +
  "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 " +
  "data-[starting-style]:opacity-0 data-[starting-style]:scale-95 " +
  "p-1";

const itemCls =
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none " +
  "transition-colors duration-100 " +
  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const groupLabelCls =
  "px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider";

const separatorCls = "my-1 h-px bg-border mx-1";

const positionerCls = "outline-none";

const shortcutCls = "ml-auto text-xs text-muted-foreground";

// ─── 1. App Menubar ───────────────────────────────────────────────────────────
// Classic desktop-app style: File · Edit · View · Help

export function MenubarApp() {
  return (
    <Menubar className={menubarCls}>
      {/* File */}
      <Menu.Root>
        <Menu.Trigger className={triggerCls}>File</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            className={positionerCls}
            sideOffset={6}
            alignOffset={-2}
            align="start"
          >
            <Menu.Popup className={popupCls}>
              <Menu.Item className={itemCls}>
                <FilePlus className="size-4 text-muted-foreground" />
                New file
                <span className={shortcutCls}>⌘N</span>
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <FolderOpen className="size-4 text-muted-foreground" />
                Open…
                <span className={shortcutCls}>⌘O</span>
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <Save className="size-4 text-muted-foreground" />
                Save
                <span className={shortcutCls}>⌘S</span>
              </Menu.Item>

              {/* Export submenu */}
              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className={itemCls}>
                  <FileOutput className="size-4 text-muted-foreground" />
                  Export
                  <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner
                    className={positionerCls}
                    sideOffset={4}
                    side="right"
                    alignOffset={-4}
                    align="start"
                  >
                    <Menu.Popup className={popupCls}>
                      <Menu.Item className={itemCls}>PDF</Menu.Item>
                      <Menu.Item className={itemCls}>PNG</Menu.Item>
                      <Menu.Item className={itemCls}>SVG</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator className={separatorCls} />
              <Menu.Item className={itemCls}>
                <Printer className="size-4 text-muted-foreground" />
                Print…
                <span className={shortcutCls}>⌘P</span>
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {/* Edit */}
      <Menu.Root>
        <Menu.Trigger className={triggerCls}>Edit</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            className={positionerCls}
            sideOffset={6}
            align="start"
          >
            <Menu.Popup className={popupCls}>
              <Menu.Item className={itemCls}>
                <Undo2 className="size-4 text-muted-foreground" />
                Undo
                <span className={shortcutCls}>⌘Z</span>
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <Redo2 className="size-4 text-muted-foreground" />
                Redo
                <span className={shortcutCls}>⇧⌘Z</span>
              </Menu.Item>
              <Menu.Separator className={separatorCls} />
              <Menu.Item className={itemCls}>
                <Scissors className="size-4 text-muted-foreground" />
                Cut
                <span className={shortcutCls}>⌘X</span>
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <Copy className="size-4 text-muted-foreground" />
                Copy
                <span className={shortcutCls}>⌘C</span>
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <Clipboard className="size-4 text-muted-foreground" />
                Paste
                <span className={shortcutCls}>⌘V</span>
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {/* View */}
      <Menu.Root>
        <Menu.Trigger className={triggerCls}>View</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            className={positionerCls}
            sideOffset={6}
            align="start"
          >
            <Menu.Popup className={popupCls}>
              <Menu.Item className={itemCls}>
                <ZoomIn className="size-4 text-muted-foreground" />
                Zoom in
                <span className={shortcutCls}>⌘+</span>
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <ZoomOut className="size-4 text-muted-foreground" />
                Zoom out
                <span className={shortcutCls}>⌘-</span>
              </Menu.Item>

              {/* Layout submenu */}
              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className={itemCls}>
                  <LayoutTemplate className="size-4 text-muted-foreground" />
                  Layout
                  <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner
                    className={positionerCls}
                    sideOffset={4}
                    side="right"
                    alignOffset={-4}
                    align="start"
                  >
                    <Menu.Popup className={popupCls}>
                      <Menu.Item className={itemCls}>Single page</Menu.Item>
                      <Menu.Item className={itemCls}>Two pages</Menu.Item>
                      <Menu.Item className={itemCls}>Continuous</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator className={separatorCls} />
              <Menu.Item className={itemCls}>
                <Maximize className="size-4 text-muted-foreground" />
                Full screen
                <span className={shortcutCls}>F11</span>
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {/* Help — disabled */}
      <Menu.Root disabled>
        <Menu.Trigger className={triggerCls}>Help</Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

// ─── 2. Editor Menubar ────────────────────────────────────────────────────────
// Rich-text editor style: Format · Insert · Help
// Showcases CheckboxItems and RadioGroup inside a Menubar

const alignOptions = [
  { value: "left", label: "Left", icon: AlignLeft },
  { value: "center", label: "Center", icon: AlignCenter },
  { value: "right", label: "Right", icon: AlignRight },
];

export function MenubarEditor() {
  return (
    <Menubar className={menubarCls}>
      {/* Format */}
      <Menu.Root>
        <Menu.Trigger className={triggerCls}>Format</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            className={positionerCls}
            sideOffset={6}
            alignOffset={-2}
            align="start"
          >
            <Menu.Popup className={popupCls}>
              {/* Text style checkboxes */}
              <Menu.Group>
                <Menu.GroupLabel className={groupLabelCls}>Style</Menu.GroupLabel>
                <Menu.CheckboxItem className={itemCls} defaultChecked>
                  <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                    <Check className="size-3.5 text-primary" />
                  </Menu.CheckboxItemIndicator>
                  <Bold className="size-4 text-muted-foreground" />
                  Bold
                  <span className={shortcutCls}>⌘B</span>
                </Menu.CheckboxItem>
                <Menu.CheckboxItem className={itemCls}>
                  <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                    <Check className="size-3.5 text-primary" />
                  </Menu.CheckboxItemIndicator>
                  <Italic className="size-4 text-muted-foreground" />
                  Italic
                  <span className={shortcutCls}>⌘I</span>
                </Menu.CheckboxItem>
                <Menu.CheckboxItem className={itemCls}>
                  <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                    <Check className="size-3.5 text-primary" />
                  </Menu.CheckboxItemIndicator>
                  <Underline className="size-4 text-muted-foreground" />
                  Underline
                  <span className={shortcutCls}>⌘U</span>
                </Menu.CheckboxItem>
              </Menu.Group>

              <Menu.Separator className={separatorCls} />

              {/* Alignment radio */}
              <Menu.Group>
                <Menu.GroupLabel className={groupLabelCls}>Alignment</Menu.GroupLabel>
                <Menu.RadioGroup defaultValue="left">
                  {alignOptions.map(({ value, label, icon: Icon }) => (
                    <Menu.RadioItem key={value} value={value} className={itemCls}>
                      <Menu.RadioItemIndicator className="flex size-4 items-center justify-center">
                        <Circle className="size-2 fill-primary text-primary" />
                      </Menu.RadioItemIndicator>
                      <Icon className="size-4 text-muted-foreground" />
                      {label}
                    </Menu.RadioItem>
                  ))}
                </Menu.RadioGroup>
              </Menu.Group>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {/* Insert */}
      <Menu.Root>
        <Menu.Trigger className={triggerCls}>Insert</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            className={positionerCls}
            sideOffset={6}
            align="start"
          >
            <Menu.Popup className={popupCls}>
              <Menu.Item className={itemCls}>
                <List className="size-4 text-muted-foreground" />
                List
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <LayoutTemplate className="size-4 text-muted-foreground" />
                Table
              </Menu.Item>
              <Menu.Separator className={separatorCls} />
              <Menu.Item className={itemCls}>
                <MessageSquare className="size-4 text-muted-foreground" />
                Comment
                <span className={shortcutCls}>⌘⌥M</span>
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {/* Help */}
      <Menu.Root>
        <Menu.Trigger className={triggerCls}>Help</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            className={positionerCls}
            sideOffset={6}
            align="start"
          >
            <Menu.Popup className={popupCls}>
              <Menu.Item className={itemCls}>
                <BookOpen className="size-4 text-muted-foreground" />
                Documentation
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <HelpCircle className="size-4 text-muted-foreground" />
                Keyboard shortcuts
              </Menu.Item>
              <Menu.Separator className={separatorCls} />
              <Menu.Item className={itemCls}>
                <Info className="size-4 text-muted-foreground" />
                About
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </Menubar>
  );
}