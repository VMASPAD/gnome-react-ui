"use client";
import * as React from 'react';
import { Meter } from '@/app/components/meter';
import { HardDrive, Activity } from 'lucide-react';

export function MeterDefault() {
  return (
    <Meter.Root value={65} className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <Meter.Label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <HardDrive className="size-4 text-muted-foreground" />
          Almacenamiento
        </Meter.Label>
        <Meter.Value className="text-sm font-medium text-muted-foreground" />
      </div>
      <Meter.Track className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <Meter.Indicator className="h-full bg-primary transition-all duration-500 ease-in-out" />
      </Meter.Track>
    </Meter.Root>
  );
}

export function MeterFormatted() {
  return (
    <Meter.Root 
      value={850} 
      min={0} 
      max={1000} 
      format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} 
      className="flex w-full max-w-sm flex-col gap-2"
    >
      <div className="flex w-full items-center justify-between">
        <Meter.Label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Activity className="size-4 text-muted-foreground" />
          Presupuesto consumido
        </Meter.Label>
        <Meter.Value className="text-sm font-medium text-muted-foreground" />
      </div>
      <Meter.Track className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        {/* Usando el azul de GNOME/Yaru para diferenciarlo */}
        <Meter.Indicator className="h-full bg-[oklch(0.55_0.12_250)] transition-all duration-500 ease-in-out" />
      </Meter.Track>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$1,000</span>
      </div>
    </Meter.Root>
  );
}