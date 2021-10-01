import {
  isUndefinedOrNull, isPlainObject, isArray,
} from './inspect';
import { camelize } from './utils';

export const toFloat = (value, defaultValue = NaN) => {
  const float = parseFloat(value);
  // eslint-disable-next-line no-restricted-globals
  return isNaN(float) ? defaultValue : float;
};

// Convert a value to a string that can be rendered
// `undefined`/`null` will be converted to `''`
// Plain objects and arrays will be JSON stringified
export const toString = (val, spaces = 2) => {
  if (isUndefinedOrNull(val)) return '';

  return isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
    ? JSON.stringify(val, null, spaces)
    : String(val);
};

export const toInteger = (value, defaultValue = NaN) => {
  const integer = parseInt(value, 10);
  // eslint-disable-next-line no-restricted-globals
  return isNaN(integer) ? defaultValue : integer;
};

export const concat = (...args) => Array.prototype.concat.apply([], args);

export function styleToObject(style) {
  return style.split(';')
    .map(s => s.trim())
    .filter(s => s)
    .reduce((acc, pair) => {
      const i = pair.indexOf(':');
      const prop = camelize(pair.slice(0, i));
      const value = pair.slice(i + 1).trim();

      acc[prop] = value;

      return acc;
    }, {});
}

export function classToObject(cls) {
  return cls.split(/\s+/)
    .reduce((acc, c) => {
      acc[c] = true;

      return acc;
    }, {});
}

export function combineClassObjects(...objs) {
  return objs.reduce((acc, obj) => {
    if (Array.isArray(obj))
      acc = acc.concat(obj);
    else acc.push(obj);

    return acc;
  }, []);
}
