"use client";
import * as React from 'react';
import { Toolbar } from '@/app/components/toolbar';
import { Toggle } from '@/app/components/toggle';
import { ToggleGroup } from '@/app/components/toggle-group';
import { Bold, Italic, Strikethrough, AlignLeft, AlignCenter, AlignRight, Link, Image } from 'lucide-react';

const toolbarButtonBase =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-primary data-[pressed]:text-primary-foreground';

export function ToolbarDefault() {
  const [format, setFormat] = React.useState<string[]>([]);
  const [align, setAlign] = React.useState<string[]>(['left']);

  return (
    <Toolbar.Root className="flex w-full max-w-2xl flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
      <Toolbar.Group className="flex items-center gap-1">
        <ToggleGroup multiple value={format} onValueChange={setFormat} className="flex gap-1">
          <Toggle value="bold" className={toolbarButtonBase} aria-label="Bold">
            <Bold className="size-4" />
          </Toggle>
          <Toggle value="italic" className={toolbarButtonBase} aria-label="Italic">
            <Italic className="size-4" />
          </Toggle>
          <Toggle value="strikethrough" className={toolbarButtonBase} aria-label="Strikethrough">
            <Strikethrough className="size-4" />
          </Toggle>
        </ToggleGroup>
      </Toolbar.Group>

      <Toolbar.Separator className="mx-2 h-5 w-px bg-border" />

      <Toolbar.Group className="flex items-center gap-1">
        <ToggleGroup value={align} onValueChange={setAlign} className="flex gap-1">
          <Toggle value="left" className={toolbarButtonBase} aria-label="Align Left">
            <AlignLeft className="size-4" />
          </Toggle>
          <Toggle value="center" className={toolbarButtonBase} aria-label="Align Center">
            <AlignCenter className="size-4" />
          </Toggle>
          <Toggle value="right" className={toolbarButtonBase} aria-label="Align Right">
            <AlignRight className="size-4" />
          </Toggle>
        </ToggleGroup>
      </Toolbar.Group>

      <Toolbar.Separator className="mx-2 h-5 w-px bg-border" />

      <Toolbar.Group className="flex items-center gap-1">
        <Toolbar.Button className={toolbarButtonBase} aria-label="Add Link">
          <Link className="size-4" />
        </Toolbar.Button>
        <Toolbar.Button className={toolbarButtonBase} aria-label="Add Image">
          <Image className="size-4" />
        </Toolbar.Button>
      </Toolbar.Group>
    </Toolbar.Root>
  );
}

export function ToolbarVertical() {
  return (
    <Toolbar.Root orientation="vertical" className="flex h-fit w-14 flex-col items-center gap-2 rounded-xl border border-border bg-card py-2 shadow-sm">
      <Toolbar.Button className={toolbarButtonBase} aria-label="Bold">
        <Bold className="size-4" />
      </Toolbar.Button>
      <Toolbar.Button className={toolbarButtonBase} aria-label="Italic">
        <Italic className="size-4" />
      </Toolbar.Button>
      <Toolbar.Separator className="my-1 h-px w-5 bg-border" />
      <Toolbar.Button className={toolbarButtonBase} aria-label="Align Left">
        <AlignLeft className="size-4" />
      </Toolbar.Button>
    </Toolbar.Root>
  );
}

export function ToolbarWithInput() {
  return (
    <Toolbar.Root className="flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
      <Toolbar.Input 
        className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring placeholder:text-muted-foreground" 
        placeholder="Buscar herramienta..." 
      />
      <Toolbar.Button className={`${toolbarButtonBase} shrink-0 bg-primary text-primary-foreground hover:brightness-95 hover:bg-primary`}>
        Ir
      </Toolbar.Button>
    </Toolbar.Root>
  );
}