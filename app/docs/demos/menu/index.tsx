"use client";

import * as React from "react";
import { Menu } from "@/app/components/menu";
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  Bell,
  Shield,
  ChevronRight,
  Check,
  Circle,
  Palette,
  Moon,
  Sun,
  Monitor,
  Globe,
  Pencil,
  Trash2,
  Copy,
  Share2,
  ExternalLink,
  Keyboard,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/app/components/button";

// ─── Shared styles ────────────────────────────────────────────────────────────

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

// ─── 1. Basic Menu ────────────────────────────────────────────────────────────

export function MenuBasic() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button>Open menu</Button>} />
      <Menu.Portal>
        <Menu.Positioner className={positionerCls} sideOffset={6} align="start">
          <Menu.Popup className={popupCls}>
            <Menu.Item className={itemCls}>
              <User className="size-4 text-muted-foreground" />
              Profile
            </Menu.Item>
            <Menu.Item className={itemCls}>
              <CreditCard className="size-4 text-muted-foreground" />
              Billing
            </Menu.Item>
            <Menu.Item className={itemCls}>
              <Settings className="size-4 text-muted-foreground" />
              Settings
            </Menu.Item>
            <Menu.Separator className={separatorCls} />
            <Menu.Item
              className={`${itemCls} text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive`}
            >
              <LogOut className="size-4" />
              Log out
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

// ─── 2. Menu with Groups & Separators ────────────────────────────────────────

export function MenuWithGroups() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button>Account</Button>} />
      <Menu.Portal>
        <Menu.Positioner className={positionerCls} sideOffset={6} align="start">
          <Menu.Popup className={popupCls}>
            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>My Account</Menu.GroupLabel>
              <Menu.Item className={itemCls}>
                <User className="size-4 text-muted-foreground" />
                Profile
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <Bell className="size-4 text-muted-foreground" />
                Notifications
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <Shield className="size-4 text-muted-foreground" />
                Privacy & Security
              </Menu.Item>
            </Menu.Group>

            <Menu.Separator className={separatorCls} />

            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>Workspace</Menu.GroupLabel>
              <Menu.Item className={itemCls}>
                <CreditCard className="size-4 text-muted-foreground" />
                Billing
              </Menu.Item>
              <Menu.Item className={itemCls}>
                <Settings className="size-4 text-muted-foreground" />
                Settings
              </Menu.Item>
            </Menu.Group>

            <Menu.Separator className={separatorCls} />

            <Menu.Item
              className={`${itemCls} text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive`}
            >
              <LogOut className="size-4" />
              Log out
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

// ─── 3. Menu with CheckboxItems ───────────────────────────────────────────────

export function MenuWithCheckboxItems() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button>View options</Button>} />
      <Menu.Portal>
        <Menu.Positioner className={positionerCls} sideOffset={6} align="start">
          <Menu.Popup className={popupCls}>
            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>Display</Menu.GroupLabel>
              <Menu.CheckboxItem className={itemCls} defaultChecked>
                <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </Menu.CheckboxItemIndicator>
                Show toolbar
              </Menu.CheckboxItem>
              <Menu.CheckboxItem className={itemCls} defaultChecked>
                <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </Menu.CheckboxItemIndicator>
                Show sidebar
              </Menu.CheckboxItem>
              <Menu.CheckboxItem className={itemCls}>
                <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </Menu.CheckboxItemIndicator>
                Show minimap
              </Menu.CheckboxItem>
            </Menu.Group>

            <Menu.Separator className={separatorCls} />

            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>Accessibility</Menu.GroupLabel>
              <Menu.CheckboxItem className={itemCls}>
                <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </Menu.CheckboxItemIndicator>
                High contrast
              </Menu.CheckboxItem>
              <Menu.CheckboxItem className={itemCls} defaultChecked>
                <Menu.CheckboxItemIndicator className="flex size-4 items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </Menu.CheckboxItemIndicator>
                Reduce motion
              </Menu.CheckboxItem>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

// ─── 4. Menu with RadioGroup ──────────────────────────────────────────────────

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
];

export function MenuWithRadioGroup() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button><Palette className="size-4" />Appearance</Button>} />
      <Menu.Portal>
        <Menu.Positioner className={positionerCls} sideOffset={6} align="start">
          <Menu.Popup className={popupCls}>
            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>Theme</Menu.GroupLabel>
              <Menu.RadioGroup defaultValue="system">
                {themeOptions.map(({ value, label, icon: Icon }) => (
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

            <Menu.Separator className={separatorCls} />

            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>Language</Menu.GroupLabel>
              <Menu.RadioGroup defaultValue="en">
                {languageOptions.map(({ value, label }) => (
                  <Menu.RadioItem key={value} value={value} className={itemCls}>
                    <Menu.RadioItemIndicator className="flex size-4 items-center justify-center">
                      <Circle className="size-2 fill-primary text-primary" />
                    </Menu.RadioItemIndicator>
                    <Globe className="size-4 text-muted-foreground" />
                    {label}
                  </Menu.RadioItem>
                ))}
              </Menu.RadioGroup>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

// ─── 5. Menu with Links ───────────────────────────────────────────────────────

export function MenuWithLinks() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button>Help</Button>} />
      <Menu.Portal>
        <Menu.Positioner className={positionerCls} sideOffset={6} align="start">
          <Menu.Popup className={popupCls}>
            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>Resources</Menu.GroupLabel>
              <Menu.LinkItem
                href="https://base-ui.com/react/components/menu"
                target="_blank"
                className={itemCls}
              >
                <ExternalLink className="size-4 text-muted-foreground" />
                Documentation
              </Menu.LinkItem>
              <Menu.LinkItem href="/keyboard-shortcuts" className={itemCls}>
                <Keyboard className="size-4 text-muted-foreground" />
                Keyboard shortcuts
              </Menu.LinkItem>
              <Menu.LinkItem href="/help" className={itemCls}>
                <HelpCircle className="size-4 text-muted-foreground" />
                Help center
              </Menu.LinkItem>
            </Menu.Group>

            <Menu.Separator className={separatorCls} />

            <Menu.Group>
              <Menu.GroupLabel className={groupLabelCls}>Feedback</Menu.GroupLabel>
              <Menu.Item className={itemCls}>
                <Pencil className="size-4 text-muted-foreground" />
                Send feedback
              </Menu.Item>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

// ─── 6. Menu with Submenu ─────────────────────────────────────────────────────

export function MenuWithSubmenu() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button>File</Button>} />
      <Menu.Portal>
        <Menu.Positioner className={positionerCls} sideOffset={6} align="start">
          <Menu.Popup className={popupCls}>
            <Menu.Item className={itemCls}>
              <Copy className="size-4 text-muted-foreground" />
              Duplicate
            </Menu.Item>

            {/* Share submenu */}
            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger className={itemCls}>
                <Share2 className="size-4 text-muted-foreground" />
                Share
                <ChevronRight className="ml-auto size-4 text-muted-foreground" />
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner
                  className={positionerCls}
                  sideOffset={4}
                  side="right"
                  align="start"
                >
                  <Menu.Popup className={popupCls}>
                    <Menu.Group>
                      <Menu.GroupLabel className={groupLabelCls}>Share via</Menu.GroupLabel>
                      <Menu.LinkItem href="#" className={itemCls}>
                        <ExternalLink className="size-4 text-muted-foreground" />
                        Public link
                      </Menu.LinkItem>
                      <Menu.Item className={itemCls}>
                        <Copy className="size-4 text-muted-foreground" />
                        Copy link
                      </Menu.Item>
                    </Menu.Group>
                    <Menu.Separator className={separatorCls} />
                    <Menu.Item className={itemCls}>
                      <Globe className="size-4 text-muted-foreground" />
                      Publish to web
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>

            {/* More options submenu */}
            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger className={itemCls}>
                <Settings className="size-4 text-muted-foreground" />
                More options
                <ChevronRight className="ml-auto size-4 text-muted-foreground" />
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner
                  className={positionerCls}
                  sideOffset={4}
                  side="right"
                  align="start"
                >
                  <Menu.Popup className={popupCls}>
                    <Menu.Item className={itemCls}>
                      <Bell className="size-4 text-muted-foreground" />
                      Notifications
                    </Menu.Item>
                    <Menu.Item className={itemCls}>
                      <Shield className="size-4 text-muted-foreground" />
                      Permissions
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>

            <Menu.Separator className={separatorCls} />

            <Menu.Item
              className={`${itemCls} text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive`}
            >
              <Trash2 className="size-4" />
              Delete
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}