import {
  styleToObject,
  classToObject,
  combineClassObjects,
} from '@pb/utils/parsers';

function convert(h, element, props = {}, data = {}) {
  const children = (element.children || []).map(convert.bind(null, h));

  const mixins = Object.keys(element.attributes || {}).reduce((acc, key) => {
    const val = element.attributes[key];

    switch (key) {
      case 'class':
        acc.class = classToObject(val);
        break;
      case 'style':
        acc.style = styleToObject(val);
        break;
      default:
        acc.attrs[key] = val;
    }

    return acc;
  }, { class: {}, style: {}, attrs: {} });

  const {
    class: dClass = {}, style: dStyle = {}, attrs: dAttrs = {}, ...remainingData
  } = data;

  if (typeof element === 'string')
    return element;
   
  return h(
    element.tag,
    {
      class: combineClassObjects(mixins.class, dClass),
      style: { ...mixins.style, ...dStyle },
      attrs: { ...mixins.attrs, ...dAttrs },
      ...remainingData,
      props,
    },
    children,
  );
}

export default convert;
