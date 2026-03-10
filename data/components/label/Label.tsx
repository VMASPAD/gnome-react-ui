'use client';
import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * A label component that renders a styled `<label>` element.
 * Designed to pair with form controls (Input, Textarea, Select, etc.).
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" placeholder="you@example.com" />
 * ```
 */
export function Label(props: Label.Props) {
  const { className, ref, ...restProps } = props;

  return (
    <label
      ref={ref as React.Ref<HTMLLabelElement>}
      className={cn(
        'text-sm font-medium text-foreground leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        typeof className === 'string' ? className : undefined,
      )}
      {...restProps}
    />
  );
}

export interface LabelProps extends React.ComponentPropsWithRef<'label'> {}

export namespace Label {
  export type Props = LabelProps;
}
