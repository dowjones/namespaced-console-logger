/**
 * Parse format string and return object
 *
 * @param {String} format format string
 * @param {Object} meta meta data
 */
export default function (format, meta) {
  const regex = /\{\{(\w+)\}\}/g;
  const result = [];
  meta = meta || {};

  if (!format || (typeof format !== 'string' &&  !(format instanceof String))) {
    return new Function('data', 'return \'\';');
  }

  let index = 0;
  let length = 0;
  let match;
  while (match = regex.exec(format)) {
    if (index + length < match.index) {
      result.push('\'' + format.substring(index + length, match.index) + '\'');
    }
    result.push('(' + (isFunction(meta[match[1]]) ? ('data.' + match[1] + '()') : ('data.' + match[1])) + ' || \'' + match[0] + '\')');

    index = match.index;
    length = match[0].length;
  }
  if ((index + length) < format.length) {
    result.push('\'' + format.substring(index + length, format.length) + '\'');
  }

  const funcBody = 'data = data || {}; return ' + result.join(' + ') + ';';
  return new Function('data', funcBody);
}

function isFunction(object) {
  return !!(object && object.constructor && object.call && object.apply);
}