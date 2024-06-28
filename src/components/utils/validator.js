import { colors, generalInputStyles, widthTypeOptions } from './constants';

export const validateColor = color => colors.includes(color);
export const validateInputStyle = style => generalInputStyles.includes(style);

export const isHexColor = color => /^#([0-9A-F]{3}){1,2}$/i.test(color);

export const validateCssUnit = value => {
  if (!value) return false;

  const validUnits = ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%'];

  const unit = value.replace(/[0-9]/g, '');

  return validUnits.indexOf(unit) >= 0;
};

export const validateWidthType = value => widthTypeOptions.includes(value);
