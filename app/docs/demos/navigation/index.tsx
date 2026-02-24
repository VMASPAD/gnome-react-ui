"use client";
import * as React from 'react';
import { NavigationMenu } from '@/app/components/navigation-menu';
import { ChevronDown, Box, Layout, Code, Settings } from 'lucide-react';

export function NavigationDefault() {
  return (
    <NavigationMenu.Root className="relative z-10 flex w-full justify-center">
      <NavigationMenu.List className="flex items-center justify-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-sm">
        
        {/* Item 1: Productos */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[active]:bg-accent/60">
            Productos
            <NavigationMenu.Icon className="transition-transform duration-200 group-data-[active]:rotate-180">
              <ChevronDown className="size-4 text-muted-foreground" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full p-4 md:w-[400px]">
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="flex flex-col gap-1.5 rounded-md p-3 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Box className="size-4 text-primary" /> Componentes
                </div>
                <p className="text-xs text-muted-foreground">Bloques de construcción accesibles para tu UI.</p>
              </a>
              <a href="#" className="flex flex-col gap-1.5 rounded-md p-3 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Layout className="size-4 text-primary" /> Plantillas
                </div>
                <p className="text-xs text-muted-foreground">Diseños pre-armados listos para integrarse.</p>
              </a>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Item 2: Desarrollo */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[active]:bg-accent/60">
            Desarrollo
            <NavigationMenu.Icon className="transition-transform duration-200 group-data-[active]:rotate-180">
              <ChevronDown className="size-4 text-muted-foreground" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full p-4 md:w-[250px]">
            <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                  <Code className="size-4 text-muted-foreground" /> Documentación API
                </a>
                <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                  <Settings className="size-4 text-muted-foreground" /> Configuración
                </a>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Item 3: Enlace directo */}
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#" className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            Comunidad
          </NavigationMenu.Link>
        </NavigationMenu.Item>

      </NavigationMenu.List>

      {/* Portal y Popup del Menú */}
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner className="z-50 pt-2" sideOffset={8}>
          <NavigationMenu.Popup className="origin-[var(--transform-origin)] rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none transition-[opacity,transform] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
            <NavigationMenu.Arrow className="fill-border" />
            {/* El Viewport maneja la transición de tamaño automáticamente según el contenido */}
            <NavigationMenu.Viewport className="relative overflow-hidden rounded-xl bg-popover transition-[width,height] duration-200" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}