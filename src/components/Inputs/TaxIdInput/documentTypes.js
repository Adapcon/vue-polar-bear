export const documentTypesData = {
  cpf: {
    placeholder: '___.___.___-__',
    length: 11,
    formattedLength: 14,
    format(value) {
      let valueFormatted = value.replace(/\D/g, '');
      valueFormatted = valueFormatted.replace(/(\d{3})(\d)/, '$1.$2');
      valueFormatted = valueFormatted.replace(/(\d{3})(\d)/, '$1.$2');
      valueFormatted = valueFormatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return valueFormatted;
    }
  },
  cnpj: {
    placeholder: '__.___.___/____-__',
    length: 14,
    formattedLength: 18,
    format(value) {
      let valueFormatted = value.replace(/\D/g, '');
      valueFormatted = valueFormatted.replace(/^(\d{2})(\d)/, '$1.$2');
      valueFormatted = valueFormatted.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      valueFormatted = valueFormatted.replace(/\.(\d{3})(\d)/, '.$1/$2');
      valueFormatted = valueFormatted.replace(/(\d{4})(\d)/, '$1-$2');
      return valueFormatted;
    },
  },
};
