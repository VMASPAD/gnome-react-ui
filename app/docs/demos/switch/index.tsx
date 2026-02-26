"use client";
import * as React from 'react';
import { Switch } from '@/app/components/switch';
import { Field } from '@/app/components/field';
import { Shield, Bell, Wifi } from 'lucide-react';

const switchRootBase =
  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring bg-input data-[checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50';
const switchThumbBase =
  'pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 translate-x-0 data-[checked]:translate-x-4';

export function SwitchDefault() {
  return (
    <Field.Root className="flex items-center gap-3 w-full max-w-xs">
      <Switch.Root id="airplane-mode" className={switchRootBase}>
        <Switch.Thumb className={switchThumbBase} />
      </Switch.Root>
      <Field.Label htmlFor="airplane-mode" className="text-sm font-medium text-foreground cursor-pointer select-none">
        Airplane mode
      </Field.Label>
    </Field.Root>
  );
}

export function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <Field.Root className="flex items-center gap-3">
        <Switch.Root disabled className={switchRootBase}>
          <Switch.Thumb className={switchThumbBase} />
        </Switch.Root>
        <Field.Label className="text-sm font-medium text-muted-foreground select-none cursor-not-allowed">
          Disabled (Off)
        </Field.Label>
      </Field.Root>

      <Field.Root className="flex items-center gap-3">
        <Switch.Root disabled defaultChecked className={switchRootBase}>
          <Switch.Thumb className={switchThumbBase} />
        </Switch.Root>
        <Field.Label className="text-sm font-medium text-muted-foreground select-none cursor-not-allowed">
          Disabled (On)
        </Field.Label>
      </Field.Root>
    </div>
  );
}

export function SwitchWithIcons() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-1 mb-2">
        <h3 className="text-base font-semibold text-foreground">Connectivity</h3>
        <p className="text-sm text-muted-foreground">Manage your networks and notifications.</p>
      </div>

      <Field.Root className="flex items-center justify-between">
        <Field.Label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer select-none">
          <Wifi className="size-4 text-muted-foreground" />
          Wireless Network
        </Field.Label>
        <Switch.Root defaultChecked className={switchRootBase}>
          <Switch.Thumb className={switchThumbBase} />
        </Switch.Root>
      </Field.Root>

      <Field.Root className="flex items-center justify-between">
        <Field.Label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer select-none">
          <Bell className="size-4 text-muted-foreground" />
          Push Notifications
        </Field.Label>
        <Switch.Root defaultChecked className={switchRootBase}>
          <Switch.Thumb className={switchThumbBase} />
        </Switch.Root>
      </Field.Root>
      
      <Field.Root className="flex items-center justify-between mt-2 pt-4 border-t border-border">
        <Field.Label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer select-none">
          <Shield className="size-4 text-[oklch(0.55_0.12_250)]" />
          Firewall
        </Field.Label>
        <Switch.Root defaultChecked className={`${switchRootBase} data-[checked]:bg-[oklch(0.55_0.12_250)]`}>
          <Switch.Thumb className={switchThumbBase} />
        </Switch.Root>
      </Field.Root>
    </div>
  );
}
