"use client";
import * as React from 'react';
import { Select } from '@/app/components/select';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export function SelectDefault() {
  return (
    <Select.Root>
      <Select.Trigger className="flex h-10 w-full max-w-xs items-center justify-between rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[placeholder]:text-muted-foreground">
        <Select.Value placeholder="Select an environment..." />
        <Select.Icon>
          <ChevronDown className="size-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>
      
      <Select.Portal>
        <Select.Positioner sideOffset={4} className="z-50 w-[var(--anchor-width)]">
          <Select.Popup className="relative max-h-96 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md outline-none transition-[opacity,transform] duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
            <Select.ScrollUpArrow className="flex cursor-default items-center justify-center py-1 text-muted-foreground">
              <ChevronUp className="size-4" />
            </Select.ScrollUpArrow>
            
            <Select.List className="p-1">
              {['GNOME', 'KDE Plasma', 'XFCE', 'Cinnamon', 'Mate'].map((item) => (
                <Select.Item 
                  key={item} 
                  value={item}
                  className="relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <Select.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="size-4" strokeWidth={3} />
                  </Select.ItemIndicator>
                  <Select.ItemText>{item}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>

            <Select.ScrollDownArrow className="flex cursor-default items-center justify-center py-1 text-muted-foreground">
              <ChevronDown className="size-4" />
            </Select.ScrollDownArrow>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

export function SelectGrouped() {
  return (
    <Select.Root>
      <Select.Trigger className="flex h-10 w-full max-w-xs items-center justify-between rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        <Select.Value placeholder="Select your distribution..." />
        <Select.Icon>
          <ChevronDown className="size-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>
      
      <Select.Portal>
        <Select.Positioner sideOffset={4} className="z-50 w-[var(--anchor-width)]">
          <Select.Popup className="relative max-h-96 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md outline-none">
            <Select.List className="p-1">
              <Select.Group>
                <Select.GroupLabel className="px-8 py-1.5 text-xs font-semibold text-muted-foreground">
                  Debian-based
                </Select.GroupLabel>
                {['Ubuntu', 'Linux Mint', 'Pop!_OS'].map((item) => (
                  <Select.Item key={item} value={item} className="relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground">
                    <Select.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="size-4" strokeWidth={3} />
                    </Select.ItemIndicator>
                    <Select.ItemText>{item}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
              
              <div className="my-1 h-px bg-border" />
              
              <Select.Group>
                <Select.GroupLabel className="px-8 py-1.5 text-xs font-semibold text-muted-foreground">
                  Arch-based
                </Select.GroupLabel>
                {['Arch Linux', 'Manjaro', 'EndeavourOS'].map((item) => (
                  <Select.Item key={item} value={item} className="relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground">
                    <Select.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="size-4" strokeWidth={3} />
                    </Select.ItemIndicator>
                    <Select.ItemText>{item}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

export function SelectMultiple() {
  const [value, setValue] = React.useState<string[]>(['git']);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select.Root multiple value={value} onValueChange={setValue}>
        <Select.Trigger className="flex min-h-10 w-full items-center justify-between rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <div className="flex flex-wrap gap-1">
            {value.length === 0 && <span className="text-muted-foreground">Select packages...</span>}
            {value.length > 0 && <span className="truncate">{value.join(', ')}</span>}
          </div>
          <Select.Icon className="shrink-0 ml-2">
            <ChevronDown className="size-4 opacity-50" />
          </Select.Icon>
        </Select.Trigger>
        
        <Select.Portal>
          <Select.Positioner sideOffset={4} className="z-50 w-[var(--anchor-width)]">
            <Select.Popup className="relative max-h-96 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md outline-none">
              <Select.List className="p-1">
                {['git', 'curl', 'wget', 'htop', 'vim', 'neofetch'].map((item) => (
                  <Select.Item 
                    key={item} 
                    value={item}
                    className="relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground"
                  >
                    <Select.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="size-4" strokeWidth={3} />
                    </Select.ItemIndicator>
                    <Select.ItemText>{item}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      <p className="text-xs text-muted-foreground">Packages to install: {value.length}</p>
    </div>
  );
}