"use client";
import * as React from 'react';
import { NumberField } from '@/app/components/number-field';
import { ChevronUp, ChevronDown, Minus, Plus, ArrowRightLeft } from 'lucide-react';

export function NumberFieldDefault() {
  return (
    <NumberField.Root defaultValue={10} className="flex flex-col gap-1.5 w-32">
      <NumberField.Group className="flex h-10 w-full overflow-hidden rounded-lg border border-input bg-card text-foreground shadow-sm transition-colors focus-within:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
        <NumberField.Input className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground" />
        <div className="flex flex-col border-l border-input">
          <NumberField.Increment className="flex flex-1 items-center justify-center px-2 hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
            <ChevronUp className="size-3" strokeWidth={3} />
          </NumberField.Increment>
          <NumberField.Decrement className="flex flex-1 items-center justify-center border-t border-input px-2 hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
            <ChevronDown className="size-3" strokeWidth={3} />
          </NumberField.Decrement>
        </div>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export function NumberFieldFormatting() {
  return (
    <NumberField.Root 
      defaultValue={99} 
      format={{ style: 'currency', currency: 'USD' }}
      className="flex flex-col gap-1.5 w-48"
    >
      <NumberField.Group className="flex h-10 w-full items-center overflow-hidden rounded-lg border border-input bg-card text-foreground shadow-sm transition-colors focus-within:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
        <NumberField.Decrement className="flex h-full items-center justify-center border-r border-input px-3 hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
          <Minus className="size-4" strokeWidth={2.5} />
        </NumberField.Decrement>
        <NumberField.Input className="w-full bg-transparent px-3 py-2 text-center text-sm outline-none placeholder:text-muted-foreground" />
        <NumberField.Increment className="flex h-full items-center justify-center border-l border-input px-3 hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
          <Plus className="size-4" strokeWidth={2.5} />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export function NumberFieldScrub() {
  return (
    <NumberField.Root defaultValue={50} className="flex flex-col gap-1.5 w-32">
      <NumberField.ScrubArea className="group flex w-fit cursor-ew-resize select-none items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        <ArrowRightLeft className="size-3.5" />
        <label className="cursor-ew-resize">Ajustar</label>
        {/* El cursor personalizado que aparece al arrastrar */}
        <NumberField.ScrubAreaCursor className="rounded-full bg-primary/20 backdrop-blur-sm" />
      </NumberField.ScrubArea>
      
      <NumberField.Group className="flex h-10 w-full overflow-hidden rounded-lg border border-input bg-card text-foreground shadow-sm transition-colors focus-within:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
        <NumberField.Input className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground" />
      </NumberField.Group>
    </NumberField.Root>
  );
}