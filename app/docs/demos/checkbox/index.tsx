"use client";
import * as React from 'react';
import { Checkbox } from '@/app/components/checkbox';
import { Check, Minus } from 'lucide-react';

const checkboxBase =
  'flex size-5 shrink-0 items-center justify-center rounded-md border border-input bg-card text-card-foreground shadow-sm transition-colors duration-150 hover:border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[indeterminate]:border-primary data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50';

export function CheckboxDefault() {
  return (
    <label className="flex select-none items-center gap-3 text-sm font-medium text-foreground cursor-pointer">
      <Checkbox.Root className={checkboxBase}>
        <Checkbox.Indicator className="flex items-center justify-center">
          <Check className="size-3.5" strokeWidth={3} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      Accept terms and conditions
    </label>
  );
}

export function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex select-none items-center gap-3 text-sm font-medium text-muted-foreground cursor-not-allowed">
        <Checkbox.Root disabled className={checkboxBase}>
          <Checkbox.Indicator className="flex items-center justify-center">
            <Check className="size-3.5" strokeWidth={3} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Disabled option
      </label>

      <label className="flex select-none items-center gap-3 text-sm font-medium text-muted-foreground cursor-not-allowed">
        <Checkbox.Root disabled defaultChecked className={checkboxBase}>
          <Checkbox.Indicator className="flex items-center justify-center">
            <Check className="size-3.5" strokeWidth={3} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Checked and disabled option
      </label>
    </div>
  );
}

export function CheckboxIndeterminate() {
  const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <label className="flex select-none items-center gap-3 text-sm font-medium text-foreground cursor-pointer">
      <Checkbox.Root
        checked={checked === true}
        onCheckedChange={(c) => setChecked(c)}
        className={checkboxBase}
      >
        <Checkbox.Indicator className="flex items-center justify-center">
          {checked === 'indeterminate' ? (
            <Minus className="size-3.5" strokeWidth={3} />
          ) : (
            <Check className="size-3.5" strokeWidth={3} />
          )}
        </Checkbox.Indicator>
      </Checkbox.Root>
      Partial selection
    </label>
  );
}