/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */
export function resolveRef<T extends HTMLElement | null | undefined>(
  maybeRef: T | React.RefObject<T>,
): T {
  if (maybeRef == null) {
    return maybeRef as T;
  }

  return 'current' in maybeRef ? (maybeRef.current as T) : (maybeRef as T);
}
