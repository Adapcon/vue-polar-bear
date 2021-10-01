
/**
 * Create a cached version of a pure function.
 */
export function cached(fn) {
  const cache = Object.create(null);
  return (function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
export const camelize = cached(str => str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : '')));
