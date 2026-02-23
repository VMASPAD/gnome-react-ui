'use client';
import { Autocomplete } from '@/app/components/autocomplete';
import { Tag, Search, Settings, Globe, ChevronDown, X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LabelItem {
  id: string;
  value: string;
}

interface SettingItem {
  id: string;
  value: string;
}

interface SettingGroup {
  value: string;
  items: SettingItem[];
}

interface TimezoneItem {
  id: string;
  value: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const labels: LabelItem[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-accordion', value: 'component: accordion' },
  { id: 'c-alert-dialog', value: 'component: alert dialog' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-avatar', value: 'component: avatar' },
  { id: 'c-checkbox', value: 'component: checkbox' },
  { id: 'c-dialog', value: 'component: dialog' },
  { id: 'c-menu', value: 'component: menu' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-tabs', value: 'component: tabs' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

const settingGroups: SettingGroup[] = [
  {
    value: 'System',
    items: [
      { id: 's1', value: 'Display & Brightness' },
      { id: 's2', value: 'Sound' },
      { id: 's3', value: 'Power' },
      { id: 's4', value: 'Notifications' },
    ],
  },
  {
    value: 'Connectivity',
    items: [
      { id: 'c1', value: 'Wi-Fi' },
      { id: 'c2', value: 'Bluetooth' },
      { id: 'c3', value: 'VPN' },
    ],
  },
  {
    value: 'User',
    items: [
      { id: 'u1', value: 'Privacy & Security' },
      { id: 'u2', value: 'User Accounts' },
      { id: 'u3', value: 'Online Accounts' },
    ],
  },
];

const timezones: TimezoneItem[] = [
  { id: 'tz1', value: 'America/New_York' },
  { id: 'tz2', value: 'America/Chicago' },
  { id: 'tz3', value: 'America/Denver' },
  { id: 'tz4', value: 'America/Los_Angeles' },
  { id: 'tz5', value: 'Europe/London' },
  { id: 'tz6', value: 'Europe/Paris' },
  { id: 'tz7', value: 'Europe/Berlin' },
  { id: 'tz8', value: 'Asia/Tokyo' },
  { id: 'tz9', value: 'Asia/Shanghai' },
  { id: 'tz10', value: 'Australia/Sydney' },
];

// ─── Components ───────────────────────────────────────────────────────────────

export function AutocompleteDefault() {
  return (
    <Autocomplete.Root items={labels}>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Labels
        </span>
        <div className="relative flex items-center">
          <Tag className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
          <Autocomplete.Input
            placeholder="Search labels…"
            className="h-10 w-72 rounded-lg border border-input bg-card pl-9 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 hover:border-ring/50 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-ring"
          />
        </div>
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={6} className="outline-none">
          <Autocomplete.Popup className="w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-card shadow-lg outline-none">
            <Autocomplete.Empty className="px-4 py-3 text-sm text-muted-foreground">
              No labels found.
            </Autocomplete.Empty>
            <Autocomplete.List className="max-h-[min(15rem,var(--available-height))] overflow-y-auto py-1.5 outline-none">
              {(label: LabelItem) => (
                <Autocomplete.Item
                  key={label.id}
                  value={label}
                  className="relative flex cursor-default items-center gap-2.5 px-3 py-2 text-sm text-foreground outline-none select-none transition-colors duration-100 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                >
                  <Tag className="size-3.5 shrink-0 text-muted-foreground" />
                  {label.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

export function AutocompleteGrouped() {
  return (
    <Autocomplete.Root items={settingGroups}>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Settings
        </span>
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
          <Autocomplete.Input
            placeholder="Search settings…"
            className="h-10 w-72 rounded-lg border border-input bg-card pl-9 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 hover:border-ring/50 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-ring"
          />
        </div>
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={6} className="outline-none">
          <Autocomplete.Popup className="w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-card shadow-lg outline-none">
            <Autocomplete.Empty className="px-4 py-3 text-sm text-muted-foreground">
              No settings found.
            </Autocomplete.Empty>
            <Autocomplete.List className="max-h-[min(18rem,var(--available-height))] overflow-y-auto py-1.5 outline-none">
              {(group: SettingGroup) => (
                <Autocomplete.Group key={group.value}>
                  <Autocomplete.GroupLabel className="flex items-center gap-2 px-3 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    <Settings className="size-3 shrink-0" />
                    {group.value}
                  </Autocomplete.GroupLabel>
                  {group.items.map((item) => (
                    <Autocomplete.Item
                      key={item.id}
                      value={item}
                      className="relative flex cursor-default items-center gap-2.5 py-2 pl-7 pr-3 text-sm text-foreground outline-none select-none transition-colors duration-100 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                    >
                      {item.value}
                    </Autocomplete.Item>
                  ))}
                  <Autocomplete.Separator className="my-1 h-px bg-border last:hidden" />
                </Autocomplete.Group>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

export function AutocompleteClear() {
  return (
    <Autocomplete.Root items={timezones}>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Timezone
        </span>
        <div className="relative flex items-center">
          <Globe className="pointer-events-none absolute left-3 size-4 shrink-0 text-muted-foreground" />
          <Autocomplete.Input
            placeholder="Select a timezone…"
            className="h-10 w-72 rounded-lg border border-input bg-card pl-9 pr-16 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 hover:border-ring/50 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-ring"
          />
          <Autocomplete.Clear className="absolute right-8 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground opacity-0 transition-opacity duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring [[data-has-value]_&]:opacity-100">
            <X className="size-3" />
          </Autocomplete.Clear>
          <Autocomplete.Trigger className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[popup-open]:text-foreground">
            <ChevronDown className="size-4 transition-transform duration-200 data-[popup-open]:rotate-180" />
          </Autocomplete.Trigger>
        </div>
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={6} className="outline-none">
          <Autocomplete.Popup className="w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-card shadow-lg outline-none">
            <Autocomplete.Empty className="px-4 py-3 text-sm text-muted-foreground">
              No timezones found.
            </Autocomplete.Empty>
            <Autocomplete.List className="max-h-[min(15rem,var(--available-height))] overflow-y-auto py-1.5 outline-none">
              {(tz: TimezoneItem) => (
                <Autocomplete.Item
                  key={tz.id}
                  value={tz}
                  className="relative flex cursor-default items-center gap-2.5 px-3 py-2 text-sm text-foreground outline-none select-none transition-colors duration-100 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                >
                  <Globe className="size-3.5 shrink-0 text-muted-foreground" />
                  {tz.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}