"use client";
import * as React from 'react';
import { Slider } from '@/app/components/slider';
import { Volume2, Sun, Monitor } from 'lucide-react';

export function SliderDefault() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Slider.Root defaultValue={75} className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <label className="flex items-center gap-2">
            <Volume2 className="size-4 text-muted-foreground" />
            System volume
          </label>
          <Slider.Value />
        </div>

        <Slider.Control className="relative flex w-full items-center py-2">
          <Slider.Track className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <Slider.Indicator className="h-full bg-primary" />
          </Slider.Track>
          <Slider.Thumb className="block size-4 rounded-full border border-primary bg-background shadow-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50" />
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}

export function SliderRange() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Slider.Root defaultValue={[20, 80]} className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <label className="flex items-center gap-2">
            <Monitor className="size-4 text-muted-foreground" />
            Workspace (GB)
          </label>
          <div className="flex gap-1 text-muted-foreground">
            <Slider.Value>{(formatted) => formatted[0]}</Slider.Value> –{' '}
            <Slider.Value>{(formatted) => formatted[1]}</Slider.Value>
          </div>
        </div>

        <Slider.Control className="relative flex w-full items-center py-2">
          <Slider.Track className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <Slider.Indicator className="h-full bg-[oklch(0.55_0.12_250)]" />
          </Slider.Track>
          <Slider.Thumb index={0} className="block size-4 rounded-full border border-[oklch(0.55_0.12_250)] bg-background shadow-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.55_0.12_250)]" />
          <Slider.Thumb index={1} className="block size-4 rounded-full border border-[oklch(0.55_0.12_250)] bg-background shadow-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.55_0.12_250)]" />
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}

export function SliderVertical() {
  return (
    <div className="flex h-48 flex-col items-center gap-4">
      <Sun className="size-4 text-muted-foreground" />
      <Slider.Root orientation="vertical" defaultValue={60} className="flex h-full items-center">
        <Slider.Control className="relative flex h-full items-center px-2">
          <Slider.Track className="w-1.5 h-full overflow-hidden rounded-full bg-secondary">
            <Slider.Indicator className="w-full bg-[oklch(0.75_0.15_50)]" />
          </Slider.Track>
          <Slider.Thumb className="block size-4 rounded-full border border-[oklch(0.75_0.15_50)] bg-background shadow-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.75_0.15_50)]" />
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}