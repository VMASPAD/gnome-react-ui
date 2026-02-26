"use client";
import * as React from 'react';
import { Fieldset } from '@/app/components/fieldset';
import { Field } from '@/app/components/field';
import { Checkbox } from '@/app/components/checkbox';
import { Check } from 'lucide-react';

const checkboxBase =
  'flex size-5 shrink-0 items-center justify-center rounded-md border border-input bg-card text-card-foreground shadow-sm transition-colors duration-150 hover:border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50';

const inputBase =
  'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50';

export function FieldsetDefault() {
  return (
    <form className="w-full max-w-sm">
      <Fieldset.Root className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-1">
          <Fieldset.Legend className="text-base font-semibold text-foreground">
            Preferencias de Notificaciones
          </Fieldset.Legend>
          <p className="text-sm text-muted-foreground">
            Choose how you want to receive updates.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Field.Root className="flex items-center gap-3">
            <Checkbox.Root id="email-notif" defaultChecked className={checkboxBase}>
              <Checkbox.Indicator className="flex items-center justify-center">
                <Check className="size-3.5" strokeWidth={3} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Field.Label htmlFor="email-notif" className="text-sm font-medium text-foreground cursor-pointer select-none">
              Email notifications
            </Field.Label>
          </Field.Root>

          <Field.Root className="flex items-center gap-3">
            <Checkbox.Root id="sms-notif" className={checkboxBase}>
              <Checkbox.Indicator className="flex items-center justify-center">
                <Check className="size-3.5" strokeWidth={3} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Field.Label htmlFor="sms-notif" className="text-sm font-medium text-foreground cursor-pointer select-none">
              Mensajes SMS
            </Field.Label>
          </Field.Root>
        </div>
      </Fieldset.Root>
    </form>
  );
}

export function FieldsetDisabled() {
  return (
    <form className="w-full max-w-sm">
      <Fieldset.Root disabled className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-1">
          <Fieldset.Legend className="text-base font-semibold text-foreground group-disabled:text-muted-foreground">
            Billing details
          </Fieldset.Legend>
          <p className="text-sm text-muted-foreground">
            You do not have permission to edit this section.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Field.Root className="flex flex-col gap-1.5">
            <Field.Label className="text-sm font-medium text-muted-foreground">
              Nombre en la tarjeta
            </Field.Label>
            <Field.Control className={inputBase} defaultValue="Jane Doe" />
          </Field.Root>

          <Field.Root className="flex flex-col gap-1.5">
            <Field.Label className="text-sm font-medium text-muted-foreground">
              Card number
            </Field.Label>
            <Field.Control className={inputBase} defaultValue="**** **** **** 4242" />
          </Field.Root>
        </div>
      </Fieldset.Root>
    </form>
  );
}