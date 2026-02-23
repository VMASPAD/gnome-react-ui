"use client";
import * as React from 'react';
import { Toggle } from '@/app/components/toggle';
import { ToggleGroup } from '@/app/components/toggle-group';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const toggleBase =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-primary data-[pressed]:text-primary-foreground';

export function ToggleDefault() {
  const [pressed, setPressed] = React.useState(false);
  
  return (
    <Toggle 
      pressed={pressed} 
      onPressedChange={setPressed} 
      className={toggleBase}
      aria-label="Toggle italic"
    >
      <Italic className="size-4" />
    </Toggle>
  );
}

export function ToggleGroupSingle() {
  const [value, setValue] = React.useState<string[]>(['left']);

  return (
    <ToggleGroup 
      value={value} 
      onValueChange={setValue} 
      className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-sm"
    >
      <Toggle value="left" className={toggleBase} aria-label="Align left">
        <AlignLeft className="size-4" />
      </Toggle>
      <Toggle value="center" className={toggleBase} aria-label="Align center">
        <AlignCenter className="size-4" />
      </Toggle>
      <Toggle value="right" className={toggleBase} aria-label="Align right">
        <AlignRight className="size-4" />
      </Toggle>
    </ToggleGroup>
  );
}

export function ToggleGroupMultiple() {
  const [value, setValue] = React.useState<string[]>(['bold']);

  return (
    <ToggleGroup 
      multiple 
      value={value} 
      onValueChange={setValue} 
      className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-sm"
    >
      <Toggle value="bold" className={toggleBase} aria-label="Bold">
        <Bold className="size-4" />
      </Toggle>
      <Toggle value="italic" className={toggleBase} aria-label="Italic">
        <Italic className="size-4" />
      </Toggle>
      <Toggle value="underline" className={toggleBase} aria-label="Underline">
        <Underline className="size-4" />
      </Toggle>
    </ToggleGroup>
  );
}