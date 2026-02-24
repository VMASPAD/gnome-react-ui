"use client";
import * as React from 'react';
import { Field } from '@/app/components/field';
import { AlertCircle } from 'lucide-react';

const inputBase =
  'flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:border-destructive data-[invalid]:focus-visible:outline-destructive';

export function FieldDefault() {
  return (
    <Field.Root className="flex w-full max-w-sm flex-col gap-2">
      <Field.Label className="text-sm font-medium text-foreground">
        Correo electrónico
      </Field.Label>
      <Field.Control 
        className={inputBase} 
        placeholder="tu@ejemplo.com" 
        type="email" 
      />
      <Field.Description className="text-xs text-muted-foreground">
        Usaremos este correo para enviarte notificaciones del sistema.
      </Field.Description>
    </Field.Root>
  );
}

export function FieldWithError() {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        // Lógica de envío
      }}
      className="w-full max-w-sm"
    >
      <Field.Root 
        className="flex w-full flex-col gap-2" 
        validate={(value) => {
          if (!value) return 'El nombre de usuario es obligatorio.';
          if (String(value).length < 4) return 'Debe tener al menos 4 caracteres.';
          return null;
        }}
      >
        <Field.Label className="text-sm font-medium text-foreground">
          Nombre de usuario
        </Field.Label>
        <Field.Control 
          className={inputBase} 
          placeholder="Ej: ubuntu_user" 
        />
        
        <Field.Error className="flex items-center gap-1.5 text-sm font-medium text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <Field.Validity>
            {(state) => state.error || 'Entrada inválida'}
          </Field.Validity>
        </Field.Error>
        
        <button 
          type="submit" 
          className="mt-2 inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring active:brightness-90"
        >
          Guardar
        </button>
      </Field.Root>
    </form>
  );
}