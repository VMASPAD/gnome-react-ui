import * as React from 'react';
import { Separator } from '@/app/components/separator';
import { Settings, User, LogOut, Terminal, Package, Monitor } from 'lucide-react';

export function SeparatorDefault() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border border-border bg-card p-4 shadow-sm">
      <h3 className="text-lg font-medium text-foreground">PanOS Settings</h3>
      <p className="text-sm text-muted-foreground">Gestiona la configuración de tu sistema.</p>
      
      <Separator className="my-4 h-px w-full bg-border" />
      
      <div className="flex flex-col gap-3">
        <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary">
          <User className="size-4" /> Perfil de Usuario
        </button>
        <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary">
          <Settings className="size-4" /> Preferencias
        </button>
      </div>
      
      <Separator className="my-4 h-px w-full bg-border" />
      
      <button className="flex items-center gap-2 text-sm text-destructive hover:brightness-110">
        <LogOut className="size-4" /> Cerrar sesión
      </button>
    </div>
  );
}

export function SeparatorVertical() {
  return (
    <div className="flex h-12 w-fit items-center gap-4 rounded-lg border border-border bg-card px-4 shadow-sm text-foreground">
      <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
        <Terminal className="size-4" /> Terminal
      </button>
      
      <Separator orientation="vertical" className="h-6 w-px bg-border" />
      
      <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
        <Package className="size-4" /> Software
      </button>

      <Separator orientation="vertical" className="h-6 w-px bg-border" />
      
      <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
        <Monitor className="size-4" /> Pantalla
      </button>
    </div>
  );
}

export function SeparatorWithContent() {
  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="flex items-center text-sm text-muted-foreground">
        <Separator className="flex-1 h-px bg-border" />
        <span className="px-3 font-medium">O continúa con</span>
        <Separator className="flex-1 h-px bg-border" />
      </div>
      
      <div className="mt-4 flex gap-3">
        <button className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-colors">
          Cuenta Local
        </button>
        <button className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-colors">
          LDAP / Directorio
        </button>
      </div>
    </div>
  );
}