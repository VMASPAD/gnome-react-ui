import { isReactVersionAtLeast } from './reactVersion';

export function inertValue(value?: boolean): boolean | undefined {
  if (isReactVersionAtLeast(19)) {
    return value;
  }
  // compatibility with React < 19 — return boolean instead of string to satisfy DOM attribute typing
  return value ? true : undefined;
}
