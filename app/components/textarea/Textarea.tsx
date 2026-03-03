'use client';
import * as React from 'react';
import type { BaseUIComponentProps } from '../utils/types';
import { cn } from '@/lib/cn';

/**
 * A textarea component for multi-line text input.
 * Renders a `<textarea>` element with consistent GNOME-style theming.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Write your message..." rows={4} />
 * ```
 */
export function Textarea(props: Textarea.Props) {
  const { className, ref, ...restProps } = props;

  return (
    <textarea
      ref={ref as React.Ref<HTMLTextAreaElement>}
      className={cn(
        'flex min-h-[80px] w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-y',
        typeof className === 'string' ? className : undefined,
      )}
      {...restProps}
    />
  );
}

export interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {}

export namespace Textarea {
  export type Props = TextareaProps;
}
