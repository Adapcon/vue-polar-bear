const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const removeLetters = value => String(value).replace(/[^\d.-]/g, '');

export {
  removeAccents,
  removeLetters,
};
