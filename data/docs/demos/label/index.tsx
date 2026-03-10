// @ts-nocheck
"use client";
import * as React from 'react';
import { Label } from '@/data/components/label';
import { Input } from '@/data/components/input';

const inputBase =
  'flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50';

export function LabelDefault() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        className={inputBase}
        placeholder="you@example.com" 
      />
    </div>
  );
}

export function LabelDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="disabled-input" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Disabled field
      </Label>
      <Input 
        id="disabled-input"
        disabled
        className={`peer ${inputBase}`}
        placeholder="Cannot be edited" 
      />
    </div>
  );
}

export function LabelRequired() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="username">
        Username <span className="text-destructive">*</span>
      </Label>
      <Input 
        id="username"
        required
        className={inputBase}
        placeholder="Enter your username" 
      />
    </div>
  );
}
