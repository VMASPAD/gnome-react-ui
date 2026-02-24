"use client";
import * as React from 'react';
import { Button } from '@/app/components/button';
import { Download, Send, Trash2, Plus, Loader2, Check, ArrowRight } from 'lucide-react';

// ─── Shared base classes ──────────────────────────────────────────────────────

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50';

// ─── Default ──────────────────────────────────────────────────────────────────
// Four semantic variants side by side: primary, secondary, ghost, destructive

export function ButtonDefault() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button className={`${base} h-9 bg-primary px-4 text-primary-foreground hover:brightness-95 active:brightness-90`}>
        <Send className="size-4 shrink-0" />
        Send
      </Button>

      <Button className={`${base} h-9 border border-border bg-card px-4 text-foreground hover:bg-accent active:bg-accent/80`}>
        <Download className="size-4 shrink-0" />
        Download
      </Button>

      <Button className={`${base} h-9 px-4 text-foreground hover:bg-accent active:bg-accent/80`}>
        <Plus className="size-4 shrink-0" />
        New file
      </Button>

      <Button className={`${base} h-9 border border-destructive/30 bg-destructive/8 px-4 text-destructive hover:bg-destructive/15 active:bg-destructive/20`}>
        <Trash2 className="size-4 shrink-0" />
        Delete
      </Button>
    </div>
  );
}

// ─── Sizes ────────────────────────────────────────────────────────────────────
// Five sizes from xs to xl — inspired by GNOME's toolbar and header button scale

export function ButtonSizes() {
  const sizes = [
    { label: 'Open', h: 'h-7', px: 'px-3', text: 'text-xs', icon: 'size-3' },
    { label: 'Open', h: 'h-8', px: 'px-3.5', text: 'text-xs', icon: 'size-3.5' },
    { label: 'Open', h: 'h-9', px: 'px-4', text: 'text-sm', icon: 'size-4' },
    { label: 'Open', h: 'h-10', px: 'px-5', text: 'text-sm', icon: 'size-4' },
    { label: 'Open', h: 'h-12', px: 'px-6', text: 'text-base', icon: 'size-5' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map(({ label, h, px, text, icon }, i) => (
        <Button
          key={i}
          className={`${base} ${h} ${px} ${text} bg-primary text-primary-foreground hover:brightness-95 active:brightness-90`}
        >
          <ArrowRight className={`${icon} shrink-0`} />
          {label}
        </Button>
      ))}
    </div>
  );
}

// ─── Loading state ────────────────────────────────────────────────────────────
// Simulates an async action with focusableWhenDisabled — focus stays on button

export function ButtonLoading() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'done'>('idle');

  function handleClick() {
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
      setTimeout(() => setStatus('idle'), 1800);
    }, 2000);
  }

  return (
    <Button
      disabled={status === 'loading'}
      focusableWhenDisabled
      onClick={handleClick}
      className={[
        base,
        'h-9 px-5 min-w-[130px]',
        status === 'done'
          ? 'bg-[oklch(0.55_0.15_150)] text-white'
          : 'bg-primary text-primary-foreground hover:brightness-95 active:brightness-90',
        'disabled:opacity-100 disabled:brightness-90',
      ].join(' ')}
    >
      {status === 'loading' && <Loader2 className="size-4 shrink-0 animate-spin" />}
      {status === 'done' && <Check className="size-4 shrink-0" />}
      {status === 'idle' && <Send className="size-4 shrink-0" />}
      {status === 'loading' ? 'Sending…' : status === 'done' ? 'Sent!' : 'Send message'}
    </Button>
  );
}