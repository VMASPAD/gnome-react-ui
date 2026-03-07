"use client";
import * as React from 'react';
import { NavigationMenu } from '@/app/components/navigation-menu';
import { ChevronDown, Box, Layout, Code, Settings } from 'lucide-react';

export function NavigationDefault() {
  return (
    <NavigationMenu.Root
      className="relative z-10 flex w-full justify-center"
      delay={0}
      closeDelay={80}
    >
      <NavigationMenu.List className="flex items-center justify-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-sm">
        
        {/* Item 1: Products */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[popup-open]:bg-accent/60">
            Products
            <NavigationMenu.Icon className="transition-transform duration-180 ease-out group-data-[popup-open]:rotate-180">
              <ChevronDown className="size-4 text-muted-foreground" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="w-full p-4 transition-[opacity,transform] duration-180 ease-out data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0 data-[ending-style]:-translate-y-1 data-[ending-style]:opacity-0 motion-reduce:transition-none md:w-[400px]">
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="flex flex-col gap-1.5 rounded-md p-3 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Box className="size-4 text-primary" /> Components
                </div>
                <p className="text-xs text-muted-foreground">Accessible building blocks for your UI.</p>
              </a>
              <a href="#" className="flex flex-col gap-1.5 rounded-md p-3 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Layout className="size-4 text-primary" /> Templates
                </div>
                <p className="text-xs text-muted-foreground">Pre-built layouts ready to integrate.</p>
              </a>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Item 2: Development */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[popup-open]:bg-accent/60">
            Development
            <NavigationMenu.Icon className="transition-transform duration-180 ease-out group-data-[popup-open]:rotate-180">
              <ChevronDown className="size-4 text-muted-foreground" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="w-full p-4 transition-[opacity,transform] duration-180 ease-out data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0 data-[ending-style]:-translate-y-1 data-[ending-style]:opacity-0 motion-reduce:transition-none md:w-[250px]">
            <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                  <Code className="size-4 text-muted-foreground" /> API Documentation
                </a>
                <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                  <Settings className="size-4 text-muted-foreground" /> Settings
                </a>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Item 3: Enlace directo */}
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#" className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            Community
          </NavigationMenu.Link>
        </NavigationMenu.Item>

      </NavigationMenu.List>

      {/* Portal and Menu Popup */}
      <NavigationMenu.Portal keepMounted>
        <NavigationMenu.Positioner className="z-50 pt-2" sideOffset={8}>
          <NavigationMenu.Popup className="origin-[var(--transform-origin)] rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none transition-[opacity,transform] duration-180 ease-out data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0 motion-reduce:transition-none">
            <NavigationMenu.Arrow className="fill-border" />
            {/* The Viewport handles size transitions automatically based on content */}
            <NavigationMenu.Viewport className="relative overflow-hidden rounded-xl bg-popover transition-[width,height] duration-180 ease-out motion-reduce:transition-none" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}