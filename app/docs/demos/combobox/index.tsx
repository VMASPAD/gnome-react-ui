import * as React from 'react';
import { Combobox } from '@/app/components/combobox';
import { ChevronDown, Check, X } from 'lucide-react';

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Ember', 'Solid', 'Next.js'];

export function ComboboxDefault() {
  return (
    <div className="relative w-72">
      <Combobox.Root>
      <div className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-card px-3 text-sm text-foreground shadow-sm transition-colors focus-within:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
        <Combobox.Input 
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" 
          placeholder="Selecciona un framework..." 
        />
        <Combobox.Trigger className="ml-2 shrink-0 text-muted-foreground hover:text-foreground">
          <ChevronDown className="size-4" />
        </Combobox.Trigger>
      </div>
      
      <Combobox.Portal>
        <Combobox.Positioner className="z-50 w-[var(--anchor-width)]" sideOffset={4}>
          <Combobox.Popup className="overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none">
            <Combobox.List className="max-h-60 overflow-y-auto">
              <Combobox.Empty className="py-6 text-center text-sm text-muted-foreground">
                No se encontraron resultados.
              </Combobox.Empty>
              {frameworks.map((fw) => (
                <Combobox.Item 
                  key={fw} 
                  value={fw} 
                  className="relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <Combobox.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="size-4" strokeWidth={3} />
                  </Combobox.ItemIndicator>
                  {fw}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}

export function ComboboxMultiple() {
  const [value, setValue] = React.useState<string[]>(['React', 'Vue']);

  return (
    <div className="relative w-full max-w-md">
      <Combobox.Root multiple value={value} onValueChange={setValue}>
      <div className="flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-card p-1.5 text-sm text-foreground shadow-sm transition-colors focus-within:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
        <Combobox.Chips className="flex flex-wrap items-center gap-1.5">
          {value.map((val) => (
            <Combobox.Chip 
              key={val} 
              className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {val}
              <Combobox.ChipRemove className="ml-1 rounded-full text-muted-foreground hover:bg-muted-foreground/20 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                <X className="size-3" />
              </Combobox.ChipRemove>
            </Combobox.Chip>
          ))}
        </Combobox.Chips>
        <Combobox.Input 
          className="flex-1 min-w-[120px] bg-transparent px-2 py-1 outline-none placeholder:text-muted-foreground" 
          placeholder="Añadir más..." 
        />
      </div>
      
      <Combobox.Portal>
        <Combobox.Positioner className="z-50 w-[var(--anchor-width)]" sideOffset={4}>
          <Combobox.Popup className="overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none">
            <Combobox.List className="max-h-60 overflow-y-auto">
              <Combobox.Empty className="py-6 text-center text-sm text-muted-foreground">
                No hay más opciones.
              </Combobox.Empty>
                  {frameworks.map((fw) => (
                    <Combobox.Item 
                  key={fw} 
                  value={fw} 
                  className="relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground"
                >
                  <Combobox.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="size-4" strokeWidth={3} />
                  </Combobox.ItemIndicator>
                  {fw}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}