// @ts-nocheck
"use client";
import * as React from 'react';
import { Textarea } from '@/data/components/textarea';

const textareaBase =
  'flex min-h-[80px] w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y';

export function TextareaDefault() {
  return (
    <div className="w-full max-w-sm">
      <Textarea 
        className={textareaBase}
        placeholder="Write your message..." 
        rows={4}
      />
    </div>
  );
}

export function TextareaDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Textarea 
        disabled 
        className={textareaBase}
        placeholder="Disabled textarea" 
        rows={3}
      />
      <Textarea 
        disabled 
        className={textareaBase}
        defaultValue="This textarea is disabled and cannot be edited."
        rows={3}
      />
    </div>
  );
}

export function TextareaWithLabel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="text-sm font-medium text-foreground" htmlFor="bio">
        Bio
      </label>
      <Textarea 
        id="bio"
        className={textareaBase}
        placeholder="Tell us about yourself..."
        rows={4}
      />
      <p className="text-xs text-muted-foreground">
        Write a short description about yourself.
      </p>
    </div>
  );
}
