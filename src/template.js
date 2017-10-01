/**
 * Parse format string and return object
 *
 * @param {String} format format string
 */
exports.parse = function (format) {
  let regex = /\$\{(\w+)\}/g;
  let result = [];

  let index = 0;
  let length = 0;
  let match;
  while (match = regex.exec(format)) {
    if (index + length < match.index) {
      result.push({type: 'text', value: format.substring(index + length, match.index)});
    }
    result.push({type: 'key', key: match[1], value: match[0]});

    index = match.index;
    length = match[0].length;
  }
  if ((index + length) < format.length) {
    result.push({type: 'text', value: format.substring(index + length, format.length)});
  }
  return result;
}

/**
 * Parse format string and return object
 *
 * @param {String} parsed parsed format string
 * @param {Object} data metadata
 */
exports.resolve = function (parsed, data) {
  let result = '';
  parsed.forEach(function (el) {
    if (el.type === 'key') {
      result += data[el.key] || el.value;
    } else {
      result += el.value;
    }
  });
  return result;
}