const assembleEntitySchema = (solicitation, entitySchema) => {
  const defaultObject = {};
  const properties = Object.keys(solicitation);

  properties.forEach(key => {
    if (entitySchema === undefined) return;
    const haveChildren = typeof solicitation[key] === 'object';
    const property = entitySchema[key];

    if (property === undefined) return;

    if (haveChildren) {
      defaultObject[key] = property;
      if (property.type === 'array') {
        defaultObject[key].contentArray = assembleEntitySchema(
          solicitation[key],
          { contentArray: property.contentArray },
        ).contentArray;
      }
      if (property.type === 'object') {
        defaultObject[key].contentObject = assembleEntitySchema(
          solicitation[key],
          property.contentObject,
        );
      }
      if (property.type === 'object-keys') {
        defaultObject[key].contentObject = assembleEntitySchema(
          solicitation[key],
          { contentObject: property.contentObject },
        ).contentObject;
      }
    } else { defaultObject[key] = property; }
  });

  return defaultObject;
};

const orderSchemaProps = entitySchema => {
  const bigNumber = 77 ** 7;
  return entitySchema.sort(
    (propA, propB) => (propA.position ?? bigNumber) - (propB.position ?? bigNumber),
  );
};

const getDefaultValue = propSchema => {
  if (propSchema.defaultValue) return propSchema.defaultValue;
  if (!propSchema.required) return;

  const defaultValues = {
    html: '',
    text: '',
    select: '',
    string: '',
    number: 0,
    datetime: 0,
    file: {},
    array: [],
    object: {},
    boolean: false,
    'object-keys': {},
    'custom-field': null,
  };
  return defaultValues[propSchema.type];
};

const formatSchemaProps = entitySchema => {
  const schemaKeys = Object.keys(entitySchema);

  return schemaKeys.reduce((acc, key) => {
    const formattedSchema = acc;
    const entity = entitySchema[key];

    const formattedEntity = {
      ...entity,
      field: key,
      defaultValue: getDefaultValue(entity),
    };

    if (formattedEntity.occult) return formattedSchema;

    if (formattedEntity.type === 'object') {
      formattedEntity.contentObject = formatSchemaProps(
        formattedEntity.contentObject,
      );
    }

    if (formattedEntity.type === 'object-keys') {
      formattedEntity.contentObject = formatSchemaProps(
        { contentObject: formattedEntity.contentObject },
      ).contentObject;
    }

    if (formattedEntity.type === 'array') {
      formattedEntity.contentArray = formatSchemaProps(
        { contentArray: formattedEntity.contentArray },
      )?.contentArray;
    }

    formattedSchema[key] = formattedEntity;
    return formattedSchema;
  }, {});
};

const getTableSchema = (entitySchema, historicPath = '', array = []) => {
  const fullEntitySchema = Object.keys(entitySchema).map(key => ({ ...entitySchema[key], field: key }));

  orderSchemaProps(fullEntitySchema).forEach(element => {
    if (!element.columnVisible) return;
    const visibleElement = element;
    visibleElement.path = historicPath ? `${historicPath}.${visibleElement.field}` : visibleElement.field;

    if (visibleElement.type !== 'object')
      array.push(visibleElement);
    else array.push(...getTableSchema(visibleElement.contentObject, visibleElement.path));
  });
  return array;
};

export const EntitySchemaUtils = {
  assembleEntitySchema,
  orderSchemaProps,
  formatSchemaProps,
  getDefaultValue,
  getTableSchema,
};
