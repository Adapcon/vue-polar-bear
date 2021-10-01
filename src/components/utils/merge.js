const clone = input => {
  if (Array.isArray(input)) {
    const output = [];

    for (let index = 0; index < input.length; ++index) output.push(clone(input[index]));

    return output;
  } if (isPlainObject(input)) {
    const output = {};

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const index in input) output[index] = clone(input[index]);

    return output;
  }

  return input;
};

export const isPlainObject = input => input && typeof input === 'object' && !Array.isArray(input);

const _recursiveMerge = (base, extend) => {
  if (!isPlainObject(base))
    return extend;

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in extend) {
    // eslint-disable-next-line no-param-reassign
    base[key] = (isPlainObject(base[key]) && isPlainObject(extend[key]))
      ? _recursiveMerge(base[key], extend[key])
      : extend[key];
  }

  return base;
};

/**
 * 
 * @param {Bollean} isClone 
 * @param {Bollean} isRecursive 
 * @param {Array} items 
 */
export const merge = ({
  isClone = true, isRecursive = true, items, omit = [],
}) => {
  let result;
  // eslint-disable-next-line no-cond-assign
  if (isClone || !isPlainObject(result = items.shift()))
    result = {};

  for (let index = 0; index < items.length; ++index) {
    const item = items[index];

    if (!isPlainObject(item))
      // eslint-disable-next-line no-continue
      continue;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in item) {
      // eslint-disable-next-line no-continue
      if (key === '__proto__') continue;

      if (omit.includes(key)) {
        // eslint-disable-next-line no-continue
        if (index > 0) continue;
        result[key] = item[key];
      } else {
        const value = isClone ? clone(item[key]) : item[key];
        result[key] = isRecursive ? _recursiveMerge(result[key], value) : value;
      }
    }
  }
  return result;
};
