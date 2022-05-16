const formatProperty = (property) => property.name + ':' + property.value;
const style = (properties) => properties.map(formatProperty).join(';');

const formatAttribute = (attribute) => {
  let attributeValue = attribute.value;
  if (Array.isArray(attributeValue)) {
    attributeValue = style(attributeValue);
  }
  return attribute.name + '=' + '"' + attributeValue + '"';
};

const formatAttributes = (attributes) => {
  return attributes.map(formatAttribute).join(' ');
};

const openTag = (tag, attributes) => {
  return '<' + tag + ' ' + formatAttributes(attributes) + '>';
};

const closeTag = (tag) => '</' + tag + '>';

const generateTag = function (tag, attributes, content) {
  return openTag(tag, attributes) + content + closeTag(tag);
};

exports.generateTag = generateTag;
