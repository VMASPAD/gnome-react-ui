import * as React from 'react';
import { Input } from '@/app/components/input';

const inputBase =
  'flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50';

export function InputDefault() {
  return (
    <div className="w-full max-w-sm">
      <Input 
        className={inputBase} 
        placeholder="Escribe algo aquí..." 
      />
    </div>
  );
}

export function InputDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input 
        disabled 
        className={inputBase} 
        placeholder="Entrada deshabilitada" 
      />
      <Input 
        disabled 
        className={inputBase} 
        defaultValue="ubuntu-admin@local" 
      />
    </div>
  );
}

export function InputFile() {
  return (
    <div className="w-full max-w-sm">
      <Input 
        type="file" 
        className={`${inputBase} cursor-pointer file:mr-4 file:cursor-pointer file:font-semibold file:text-primary hover:file:text-primary/80`} 
      />
    </div>
  );
}